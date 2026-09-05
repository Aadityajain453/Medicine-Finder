import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicalNavbar from "./MedicalNavbar";

// ─── Styles (Modern UI Theme) ────────────────────────────────────────────────
const PAGE_CSS = `
  .pwd-page {
    background: #f1f5f9;
    min-height: calc(100vh - 60px);
    padding: 40px 24px;
    font-family: 'DM Sans', system-ui, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pwd-card {
    width: 100%;
    max-width: 800px;
    background: #fff;
    border-radius: 20px;
    border: 0.5px solid #e2e8f0;
    display: grid;
    grid-template-columns: 240px 1fr;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  }

  /* ── Sidebar Panel ── */
  .pwd-sidebar {
    background: #0f172a;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .pwd-icon-box {
    width: 48px;
    height: 48px;
    background: #14b8a6;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .pwd-sidebar h2 {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 10px;
    letter-spacing: -0.3px;
  }
  .pwd-sidebar p {
    color: rgba(255,255,255,0.45);
    font-size: 12px;
    line-height: 1.6;
    margin: 0;
  }
  .pwd-tips {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .pwd-tip-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    line-height: 1.4;
  }
  .pwd-tip-item i { color: #14b8a6; margin-top: 2px; }

  /* ── Form Panel ── */
  .pwd-form-panel { padding: 40px 36px; }
  .pwd-form-head { margin-bottom: 24px; }
  .pwd-form-head h4 {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 4px;
  }
  .pwd-form-head p { font-size: 12px; color: #94a3b8; margin: 0; }

  /* ── Status Alert Banners ── */
  .pwd-alert {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .pwd-alert.success { background: #f0fdf4; border: 0.5px solid #bbf7d0; color: #166534; }
  .pwd-alert.danger  { background: #fef2f2; border: 0.5px solid #fecaca; color: #991b1b; }

  /* ── Input Wrapper & Fields ── */
  .pwd-field-group { margin-bottom: 18px; }
  .pwd-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #64748b;
    display: block;
    margin-bottom: 6px;
  }
  .pwd-input-wrapper {
    position: relative;
    width: 100%;
  }
  .pwd-input {
    width: 100%;
    padding: 10px 14px;
    background: #f8fafc;
    border: 0.5px solid #e2e8f0;
    border-radius: 10px;
    font-size: 13px;
    color: #1e293b;
    font-weight: 500;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  }
  .pwd-input:focus {
    background: #fff;
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20,184,166,0.12);
  }
  .pwd-input.is-hidden { letter-spacing: 3px; }

  /* ── Hover Eye Toggle ── */
  .pwd-toggle-btn {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s, transform 0.1s;
    z-index: 10;
  }
  .pwd-toggle-btn:hover {
    color: #14b8a6;
    transform: translateY(-50%) scale(1.05);
  }

  /* ── Submit Button ── */
  .pwd-submit-btn {
    width: 100%;
    padding: 12px;
    background: #0f172a;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s;
    margin-top: 8px;
  }
  .pwd-submit-btn:hover { background: #1e293b; }

  @media (max-width: 640px) {
    .pwd-card { grid-template-columns: 1fr; }
    .pwd-sidebar { display: none; }
    .pwd-form-panel { padding: 24px 20px; }
  }
`;

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const EyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const EyeClosed = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a19.79 19.79 0 0 1 2.1-3.6m3.43-3.43A10.04 10.04 0 0 1 12 4c7 0 10 7 10 7a19.5 19.5 0 0 1-2.93 4.83m-7-.17a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
);

// ─── InputField Sub-Component with Hover Trigger ─────────────────────────────
const PasswordField = ({ label, value, inputRef, placeholder, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="pwd-field-group">
      <label className="pwd-label">{label}</label>
      <div className="pwd-input-wrapper">
        <input
          ref={inputRef}
          className={`pwd-input ${!showPassword ? "is-hidden" : ""}`}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          style={{ paddingRight: "44px" }}
        />
        <button
          type="button"
          className="pwd-toggle-btn"
          onMouseEnter={() => setShowPassword(true)}  // Hover: Show
          onMouseLeave={() => setShowPassword(false)} // Leave: Hide
          onTouchStart={() => setShowPassword(true)}  // Mobile Touch Support
          onTouchEnd={() => setShowPassword(false)}
          title="Hover to view"
        >
          {showPassword ? <EyeOpen /> : <EyeClosed />}
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const UpdateMedicalPassw = () => {
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmnewpassword, setConfirmNewPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  // Focus Refs
  const oldRef = useRef();
  const newRef = useRef();
  const confirmRef = useRef();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await axios.get("https://medicine-finder-1-zwuu.onrender.com/isUser");
      const data = response.data;

      if (data.usertype === "nouser" || data.usertype !== "medical") {
        navigate("/auth_error", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showValidationMsg = (text, ref) => {
    setStatusMsg({ type: "danger", text });
    ref?.current?.focus();
  };

  const handleChangePassword = async () => {
    setStatusMsg({ type: "", text: "" });

    if (oldpassword.trim() === "") {
      showValidationMsg("Please enter your old password.", oldRef);
      return;
    }
    if (newpassword.trim() === "") {
      showValidationMsg("Please enter your new password.", newRef);
      return;
    }
    if (confirmnewpassword.trim() === "") {
      showValidationMsg("Please confirm your new password.", confirmRef);
      return;
    }
    if (newpassword !== confirmnewpassword) {
      showValidationMsg("New password and confirm password do not match.", confirmRef);
      return;
    }

    try {
      const response = await axios.post("https://medicine-finder-1-zwuu.onrender.com/updateMedicalPassword", {
        oldpassword,
        newpassword,
        confirmnewpassword,
      });

      let result = response.data;
      console.log(result);

      if (result.msg === "successful") {
        setStatusMsg({ type: "success", text: "Password Updated Successfully!" });
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setTimeout(() => setStatusMsg({ type: "", text: "" }), 4000);
      } else if (result.msg === "New password and confirm password do not match") {
        setStatusMsg({ type: "danger", text: "Confirm password does not match." });
      } else if (result.msg === "Please fill all fields") {
        setStatusMsg({ type: "danger", text: "Please fill all fields properly." });
      } else if (result.msg === "session out") {
        setStatusMsg({ type: "danger", text: "Session expired. Redirecting..." });
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    } catch (error) {
      console.log(error);
      setStatusMsg({ type: "danger", text: "Something went wrong. Please try again." });
    }
  };

  return (
    <>
      <style>{PAGE_CSS}</style>
      <MedicalNavbar />

      <div className="pwd-page">
        <div className="pwd-card">
          
          {/* ── Sidebar ── */}
          <div className="pwd-sidebar">
            <div>
              <div className="pwd-icon-box">
                <LockIcon />
              </div>
              <h2>Security Settings</h2>
              <p>Keep your account secure by updating your password regularly.</p>
              
              <div className="pwd-tips">
                <div className="pwd-tip-item">
                  <i className="ti ti-shield-check" /> Standard encryption protects your updates.
                </div>
                <div className="pwd-tip-item">
                  <i className="ti ti-info-circle" /> Use symbols and numbers for a strong setup.
                </div>
              </div>
            </div>
          </div>

          {/* ── Form Panel ── */}
          <div className="pwd-form-panel">
            <div className="pwd-form-head">
              <h4>Update Password</h4>
              <p>Verify your old identity to apply a fresh secure password.</p>
            </div>

            {/* Inline Banner Alerts */}
            {statusMsg.text && (
              <div className={`pwd-alert ${statusMsg.type}`}>
                <i className={`ti ti-${statusMsg.type === "success" ? "circle-check" : "circle-x"}`} style={{ fontSize: "16px" }} />
                {statusMsg.text}
              </div>
            )}

            <PasswordField
              label="Old Password"
              value={oldpassword}
              inputRef={oldRef}
              placeholder="Enter current password"
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <PasswordField
              label="New Password"
              value={newpassword}
              inputRef={newRef}
              placeholder="Enter new strong password"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <PasswordField
              label="Confirm New Password"
              value={confirmnewpassword}
              inputRef={confirmRef}
              placeholder="Repeat new password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />

            <button onClick={handleChangePassword} className="pwd-submit-btn">
              Apply Secure Password
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default UpdateMedicalPassw;