import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdmNav";

// ─────────────────────────────────────────────────────────────
// PROFESSIONAL MEDICAL REGISTRATION PAGE
// ─────────────────────────────────────────────────────────────

const PAGE_CSS = `
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  body{
    background:#f1f5f9;
  }

  .mr-page{
    min-height:100vh;
    padding:40px 20px;
    background:
      linear-gradient(to bottom right,#f8fafc,#eef6ff);
    display:flex;
    justify-content:center;
    align-items:center;
    font-family:'Inter',sans-serif;
  }

  .mr-card{
    width:100%;
    max-width:1200px;
    min-height:720px;
    display:grid;
    grid-template-columns:360px 1fr;
    background:#ffffff;
    border-radius:30px;
    overflow:hidden;
    border:1px solid #e2e8f0;
    box-shadow:
      0 10px 40px rgba(15,23,42,0.08);
  }

  /* ───────── SIDEBAR ───────── */

  .mr-sidebar{
    position:relative;
    padding:45px 35px;
    background:
      linear-gradient(
        180deg,
        #0f172a,
        #1e293b
      );
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    overflow:hidden;
  }

  .mr-sidebar::before{
    content:'';
    position:absolute;
    width:280px;
    height:280px;
    border-radius:50%;
    background:#14b8a6;
    top:-120px;
    right:-120px;
    opacity:0.12;
  }

  .mr-sidebar::after{
    content:'';
    position:absolute;
    width:220px;
    height:220px;
    border-radius:50%;
    background:#38bdf8;
    bottom:-100px;
    left:-100px;
    opacity:0.12;
  }

  .mr-back-btn{
    width:max-content;
    border:none;
    background:rgba(255,255,255,0.08);
    color:#fff;
    padding:10px 18px;
    border-radius:14px;
    display:flex;
    align-items:center;
    gap:8px;
    cursor:pointer;
    font-size:13px;
    font-weight:600;
    transition:0.3s;
  }

  .mr-back-btn:hover{
    background:#14b8a6;
    transform:translateY(-2px);
  }

  .mr-logo-box{
    width:82px;
    height:82px;
    border-radius:24px;
    background:linear-gradient(135deg,#14b8a6,#0ea5e9);
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:28px;
    box-shadow:
      0 12px 30px rgba(20,184,166,0.3);
  }

  .mr-sidebar h2{
    color:#fff;
    font-size:34px;
    font-weight:800;
    line-height:1.2;
    margin-bottom:15px;
  }

  .mr-sidebar p{
    color:rgba(255,255,255,0.7);
    line-height:1.8;
    font-size:14px;
  }

  .mr-checklist{
    margin-top:40px;
    display:flex;
    flex-direction:column;
    gap:16px;
  }

  .mr-check{
    display:flex;
    align-items:center;
    gap:12px;
    padding:14px;
    border-radius:16px;
    background:rgba(255,255,255,0.07);
    border:1px solid rgba(255,255,255,0.05);
    color:#fff;
    font-size:14px;
    backdrop-filter:blur(10px);
  }

  /* ───────── FORM PANEL ───────── */

  .mr-form-panel{
    padding:55px;
    background:#ffffff;
    display:flex;
    flex-direction:column;
    justify-content:center;
  }

  .mr-tag{
    width:max-content;
    display:inline-flex;
    align-items:center;
    gap:8px;
    padding:8px 16px;
    border-radius:40px;
    background:#ecfeff;
    color:#0891b2;
    font-size:13px;
    font-weight:700;
    margin-bottom:20px;
    border:1px solid #cffafe;
  }

  .mr-form-head h4{
    font-size:36px;
    font-weight:800;
    color:#0f172a;
    margin-bottom:10px;
    letter-spacing:-1px;
  }

  .mr-form-head p{
    color:#64748b;
    font-size:15px;
    margin-bottom:40px;
    line-height:1.7;
  }

  .mr-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:24px;
  }

  .mr-full{
    grid-column:1/-1;
  }

  .mr-label{
    display:block;
    margin-bottom:8px;
    color:#334155;
    font-size:13px;
    font-weight:700;
  }

  .mr-input-wrapper{
    position:relative;
  }

  .mr-input{
    width:100%;
    height:60px;
    border-radius:18px;
    border:1.5px solid #dbe4ee;
    background:#f8fafc;
    padding:0 18px;
    font-size:14px;
    color:#0f172a;
    font-weight:500;
    transition:0.3s;
    outline:none;
  }

  .mr-input:hover{
    border-color:#cbd5e1;
    background:#fff;
  }

  .mr-input:focus{
    border-color:#14b8a6;
    background:#fff;
    box-shadow:
      0 0 0 5px rgba(20,184,166,0.12);
  }

  .mr-password{
    letter-spacing:2px;
  }

  .mr-password-toggle{
    position:absolute;
    top:50%;
    right:16px;
    transform:translateY(-50%);
    border:none;
    background:none;
    color:#64748b;
    cursor:pointer;
  }

  .mr-divider{
    height:1px;
    background:#e2e8f0;
    margin:5px 0;
  }

  /* ───────── BUTTON ───────── */

  .mr-submit-btn{
    width:100%;
    height:62px;
    border:none;
    border-radius:18px;
    background:
      linear-gradient(
        135deg,
        #14b8a6,
        #0ea5e9
      );
    color:#fff;
    font-size:16px;
    font-weight:700;
    cursor:pointer;
    transition:0.3s;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:10px;
    box-shadow:
      0 12px 30px rgba(14,165,233,0.25);
  }

  .mr-submit-btn:hover{
    transform:translateY(-3px);
    box-shadow:
      0 18px 40px rgba(14,165,233,0.32);
  }

  .mr-submit-btn:disabled{
    opacity:0.7;
    cursor:not-allowed;
  }

  /* ───────── ALERTS ───────── */

  .mr-alert{
    padding:15px 18px;
    border-radius:16px;
    margin-bottom:22px;
    font-size:14px;
    font-weight:600;
    display:flex;
    align-items:center;
    gap:10px;
  }

  .mr-alert.success{
    background:#ecfdf5;
    color:#047857;
    border:1px solid #a7f3d0;
  }

  .mr-alert.danger{
    background:#fef2f2;
    color:#b91c1c;
    border:1px solid #fecaca;
  }

  /* ───────── RESPONSIVE ───────── */

  @media(max-width:950px){

    .mr-card{
      grid-template-columns:1fr;
    }

    .mr-sidebar{
      padding:35px 25px;
    }

    .mr-form-panel{
      padding:35px 25px;
    }

    .mr-grid{
      grid-template-columns:1fr;
    }

    .mr-form-head h4{
      font-size:28px;
    }
  }

  @media(max-width:500px){

    .mr-page{
      padding:15px;
    }

    .mr-sidebar{
      padding:25px 18px;
    }

    .mr-form-panel{
      padding:25px 18px;
    }

    .mr-sidebar h2{
      font-size:26px;
    }
  }
`;

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const Icon = ({ name, size = 15, style = {} }) => (
  <i
    className={`ti ti-${name}`}
    style={{ fontSize: `${size}px`, ...style }}
  />
);

const EyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeClosed = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20
      c-7 0-10-7-10-7a19.79 19.79 0 0 1 2.1-3.6">
    </path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// ALERT
// ─────────────────────────────────────────────────────────────

const AlertBanner = ({ type, text }) => {
  if (!text) return null;

  return (
    <div className={`mr-alert ${type}`}>
      <Icon
        name={type === "success" ? "circle-check" : "alert-circle"}
        size={16}
      />
      {text}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// INPUT FIELD
// ─────────────────────────────────────────────────────────────

const InputField = ({
  label,
  type = "text",
  value,
  placeholder,
  inputRef,
  onChange,
  full = false,
}) => {

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={full ? "mr-full" : ""}>
      <label className="mr-label">{label} *</label>

      <div className="mr-input-wrapper">

        <input
          ref={inputRef}
          type={
            isPassword
              ? showPassword ? "text" : "password"
              : type
          }
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`mr-input ${isPassword ? "mr-password" : ""}`}
          style={isPassword ? { paddingRight: "50px" } : {}}
        />

        {isPassword && (
          <button
            type="button"
            className="mr-password-toggle"
            onMouseEnter={() => setShowPassword(true)}
            onMouseLeave={() => setShowPassword(false)}
          >
            {showPassword ? <EyeOpen /> : <EyeClosed />}
          </button>
        )}

      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

const MedicalReg = () => {

  const navigate = useNavigate();

  // Refs

  const medicalRef = useRef();
  const ownerRef = useRef();
  const contactRef = useRef();
  const licnoRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();

  // States

  const [medicalname, setMedicalName] = useState("");
  const [ownername, setOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [licno, setLicNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [statusMsg, setStatusMsg] = useState({
    type: "",
    text: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─────────────────────────────────────

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {

    try {

      const { data } = await axios.get(
        "https://medicine-finder-1-zwuu.onrender.com/isUser"
      );

      if (
        !data.usertype ||
        data.usertype === "nouser" ||
        data.usertype !== "admin"
      ) {
        navigate("/auth_error", { replace: true });
      }

    } catch (error) {

      navigate("/auth_error", { replace: true });

    }
  };

  // ─────────────────────────────────────

  const showError = (text, ref) => {

    setStatusMsg({
      type: "danger",
      text,
    });

    ref?.current?.focus();
  };

  const validate = () => {

    if (!medicalname) {
      showError("Please enter medical name.", medicalRef);
      return false;
    }

    if (!ownername) {
      showError("Please enter owner name.", ownerRef);
      return false;
    }

    if (!contact) {
      showError("Please enter contact number.", contactRef);
      return false;
    }

    if (!licno) {
      showError("Please enter licence number.", licnoRef);
      return false;
    }

    if (!address) {
      showError("Please enter address.", addressRef);
      return false;
    }

    if (!email) {
      showError("Please enter email.", emailRef);
      return false;
    }

    if (!password) {
      showError("Please enter password.", passwordRef);
      return false;
    }

    if (!confirmpassword) {
      showError("Please confirm password.", confirmRef);
      return false;
    }

    if (password !== confirmpassword) {
      showError("Passwords do not match.", confirmRef);
      return false;
    }

    return true;
  };

  // ─────────────────────────────────────

  const handleSubmit = async () => {

    if (!validate()) return;

    setIsSubmitting(true);

    try {

      const { data } = await axios.post(
        "https://medicine-finder-1-zwuu.onrender.com/getmedicalreg",
        {
          medicalname,
          ownername,
          address,
          contact,
          licno,
          email,
          password,
        }
      );

      if (data.success === true) {

        setStatusMsg({
          type: "success",
          text: "Medical store registered successfully!",
        });

        setMedicalName("");
        setOwnerName("");
        setAddress("");
        setContact("");
        setLicNo("");
        setEmail("");
        setPassword("");
        setConfirmpassword("");

      } else {

        setStatusMsg({
          type: "danger",
          text: data.Message,
        });

      }

    } catch (error) {

      setStatusMsg({
        type: "danger",
        text: "Something went wrong.",
      });

    } finally {

      setIsSubmitting(false);

      setTimeout(() => {
        setStatusMsg({
          type: "",
          text: "",
        });
      }, 3000);
    }
  };

  const clearMsg = () => {
    setStatusMsg({
      type: "",
      text: "",
    });
  };

  // ─────────────────────────────────────

  return (
    <>
      <style>{PAGE_CSS}</style>

      <AdminNavbar />

      <div className="mr-page">

        <div className="mr-card">

          {/* LEFT SIDE */}

          <div className="mr-sidebar">

            <div>

              <button
                className="mr-back-btn"
                onClick={() => navigate(-1)}
              >
                <Icon name="arrow-left" />
                Back
              </button>

              <div style={{ marginTop: "40px" }}>

                <div className="mr-logo-box">
                  <Icon
                    name="building-hospital"
                    size={34}
                    style={{ color: "#fff" }}
                  />
                </div>

                <h2>Medical Registration</h2>

                <p>
                  Securely onboard and manage licensed medical
                  stores with protected admin verification and
                  professional healthcare management.
                </p>

                <div className="mr-checklist">

                  <div className="mr-check">
                    <Icon name="check" />
                    Medical store verification
                  </div>

                  <div className="mr-check">
                    <Icon name="check" />
                    Licence management system
                  </div>

                  <div className="mr-check">
                    <Icon name="check" />
                    Owner & pharmacy records
                  </div>

                  <div className="mr-check">
                    <Icon name="check" />
                    Secure credential protection
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="mr-form-panel">

            <div className="mr-form-head">

              <div className="mr-tag">
                <Icon name="plus" size={13} />
                New Medical Store
              </div>

              <h4>Create Medical Account</h4>

              <p>
                Enter all required medical store details carefully
                to complete registration.
              </p>

            </div>

            <AlertBanner
              type={statusMsg.type}
              text={statusMsg.text}
            />

            <div className="mr-grid">

              <InputField
                label="Medical Name"
                value={medicalname}
                inputRef={medicalRef}
                placeholder="e.g. City Wellness Pharma"
                onChange={(e) => {
                  setMedicalName(e.target.value);
                  clearMsg();
                }}
              />

              <InputField
                label="Owner Name"
                value={ownername}
                inputRef={ownerRef}
                placeholder="Full legal owner name"
                onChange={(e) => {
                  setOwnerName(e.target.value);
                  clearMsg();
                }}
              />

              <InputField
                label="Contact Number"
                type="tel"
                value={contact}
                inputRef={contactRef}
                placeholder="+91 XXXXX XXXXX"
                onChange={(e) => {
                  setContact(e.target.value);
                  clearMsg();
                }}
              />

              <InputField
                label="Licence Number"
                value={licno}
                inputRef={licnoRef}
                placeholder="DL-XXXX-XXXX"
                onChange={(e) => {
                  setLicNo(e.target.value);
                  clearMsg();
                }}
              />

              <InputField
                label="Address"
                value={address}
                inputRef={addressRef}
                placeholder="Street, Area, City, Pincode"
                onChange={(e) => {
                  setAddress(e.target.value);
                  clearMsg();
                }}
                full
              />

              <InputField
                label="Email Address"
                type="email"
                value={email}
                inputRef={emailRef}
                placeholder="store@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearMsg();
                }}
                full
              />

              <div className="mr-divider mr-full"></div>

              <InputField
                label="Password"
                type="password"
                value={password}
                inputRef={passwordRef}
                placeholder="••••••••"
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearMsg();
                }}
              />

              <InputField
                label="Confirm Password"
                type="password"
                value={confirmpassword}
                inputRef={confirmRef}
                placeholder="••••••••"
                onChange={(e) => {
                  setConfirmpassword(e.target.value);
                  clearMsg();
                }}
              />

              <div className="mr-full">

                <button
                  className="mr-submit-btn"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >

                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm"></span>
                      Registering...
                    </>
                  ) : (
                    <>
                      <Icon name="user-plus" size={17} />
                      Register Medical Store
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default MedicalReg;