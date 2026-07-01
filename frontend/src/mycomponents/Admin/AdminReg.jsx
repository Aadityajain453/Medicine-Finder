import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AdminNavbar from "./AdmNav";
import { useNavigate } from "react-router-dom";

// ──────────────────────────────────────────────────────────────
// PREMIUM ENTERPRISE ADMIN REGISTRATION PAGE (MODERN & MINIMAL)
// ──────────────────────────────────────────────────────────────

const PAGE_CSS = `
  :root {
    --bg-main: #f8fafc;
    --surface: #ffffff;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --primary: #4f46e5;
    --primary-hover: #4338ca;
    --border-color: #e2e8f0;
    --error: #ef4444;
    --success: #10b981;
  }

  .admin-page {
    min-height: 100vh;
    background-color: var(--bg-main);
    font-family: 'Inter', sans-serif;
    padding: 40px 20px;
    color: var(--text-main);
  }

  .admin-container {
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ───────── HEADER SECTION ───────── */
  .portal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 24px;
    margin-bottom: 32px;
    gap: 20px;
  }

  .portal-title h1 {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }

  .portal-title p {
    color: var(--text-muted);
    font-size: 14px;
  }

  .security-badge {
    background: #eef2ff;
    color: var(--primary);
    border: 1px solid #e0e7ff;
    padding: 8px 16px;
    border-radius: 99px;
    font-size: 13px;
    font-weight: 600;
  }

  /* ───────── TWO-COLUMN SPLIT LAYOUT ───────── */
  .portal-grid {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 40px;
  }

  /* Left Sidebar Info */
  .sidebar-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .info-panel-card {
    background: #0f172a;
    color: #ffffff;
    padding: 28px;
    border-radius: 20px;
  }

  .info-panel-card h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .info-panel-card p {
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.6;
  }

  .metrics-card {
    background: var(--surface);
    border: 1px solid var(--border-color);
    padding: 24px;
    border-radius: 20px;
  }

  .metrics-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  .metric-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 13px;
    border-bottom: 1px dashed var(--border-color);
  }

  .metric-row:last-child {
    border-bottom: none;
  }

  .metric-val {
    font-weight: 700;
    color: var(--text-main);
  }

  /* Right Main Form Panel */
  .form-panel {
    background: var(--surface);
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  }

  .form-header {
    margin-bottom: 32px;
  }

  .form-header h2 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .form-header p {
    font-size: 14px;
    color: var(--text-muted);
  }

  /* Form Internal Grid */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .span-two {
    grid-column: span 2;
  }

  /* Input Elements */
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .input-group label {
    font-size: 13px;
    font-weight: 600;
    color: #334155;
  }

  .admin-input {
    height: 48px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    padding: 0 16px;
    font-size: 14px;
    font-family: inherit;
    transition: all 0.2s ease;
    outline: none;
  }

  .admin-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }

  .submit-btn {
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 10px;
    background: var(--primary);
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    cursor:pointer;
    transition: background 0.2s ease;
    margin-top: 12px;
  }

  .submit-btn:hover {
    background: var(--primary-hover);
  }

  /* Status Display Alert Boxes */
  .status-box {
    margin-top: 20px;
    padding: 14px;
    border-radius: 10px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
  }

  .status-success {
    background: #ecfdf5;
    color: #065f46;
    border: 1px solid #a7f3d0;
  }

  .status-error {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }

  /* Responsive Adaptation */
  @media(max-width: 900px) {
    .portal-grid {
      grid-template-columns: 1fr;
    }
    .sidebar-info {
      flex-direction: row;
    }
    .info-panel-card, .metrics-card {
      flex: 1;
    }
  }

  @media(max-width: 600px) {
    .sidebar-info {
      flex-direction: column;
    }
    .form-grid {
      grid-template-columns: 1fr;
    }
    .span-two {
      grid-column: span 1;
    }
    .portal-header {
      flex-direction: column;
      align-items: flex-start;
    }
    .form-panel {
      padding: 24px;
    }
  }
`;

const AdminReg = () => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const addressRef = useRef();
  const contactRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confpassRef = useRef();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [login, setLogin] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/isUser");
      const data = response.data;

      if (data.usertype === "nouser" || data.usertype !== "admin") {
        navigate("/auth_error", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdminRegistration = async () => {
    if (name === "") {
      setLogin("Please fill the name");
      nameRef.current.focus();
    } else if (contact === "") {
      setLogin("Please fill the contact number");
      contactRef.current.focus();
    } else if (address === "") {
      setLogin("Please fill the address");
      addressRef.current.focus();
    } else if (email === "") {
      setLogin("Please fill the email address");
      emailRef.current.focus();
    } else if (password === "") {
      setLogin("Please fill the password");
      passwordRef.current.focus();
    } else if (confirmpassword === "") {
      setLogin("Please confirm your password");
      confpassRef.current.focus();
    } else if (confirmpassword !== password) {
      setLogin("Passwords do not match");
      confpassRef.current.focus();
    } else {
      try {
        const response = await axios.post("http://localhost:5000/getadminreg", {
          name,
          address,
          contact,
          email,
          password,
        });

        const result = response.data;

        if (result.success === false) {
          setLogin(result.Message);
        } else if (result.success === true) {
          setLogin("Admin registered successfully");
          setName("");
          setAddress("");
          setContact("");
          setEmail("");
          setPassword("");
          setConfirmpassword("");
        }

        setTimeout(() => {
          setLogin("");
        }, 3000);
      } catch (error) {
        console.log(error);
        setLogin("Something went wrong");
      }
    }
  };

  return (
    <>
      <style>{PAGE_CSS}</style>
      <AdminNavbar />

      <div className="admin-page">
        <div className="admin-container">
          
          {/* PORTAL TOP HEADER */}
          <header className="portal-header">
            <div className="portal-title">
              <h1>Admin Management</h1>
              <p>Register and provision secure system administrator privileges.</p>
            </div>
            <div className="security-badge">
              Enterprise Access Guard Enabled
            </div>
          </header>

          {/* TWO-COLUMN LAYOUT STRUCTURE */}
          <main className="portal-grid">
            
            {/* SIDEBAR ASYMMETRIC CONTENT BLOCK */}
            <section className="sidebar-info">
              <div className="info-panel-card">
                <h3>Privilege Scope</h3>
                <p>
                  Newly registered accounts inherit structural administrative rights over 
                  the core data engine, verification features, and internal records logs.
                </p>
              </div>

              <div className="metrics-card">
                <div className="metrics-title">Current Directory Metrics</div>
                <div className="metric-row">
                  <span>Active Administrators</span>
                  <span className="metric-val">24</span>
                </div>
                <div className="metric-row">
                  <span>Integrity Status</span>
                  <span className="metric-val" style={{ color: "var(--success)" }}>Optimal</span>
                </div>
              </div>
            </section>

            {/* MAIN DATA FORM PANEL */}
            <section className="form-panel">
              <div className="form-header">
                <h2>Account Credentials</h2>
                <p>Provide verified details to allocate credentials securely.</p>
              </div>

              <div className="form-grid">
                <InputBox
                  label="Full Name"
                  value={name}
                  inputRef={nameRef}
                  placeholder="e.g., John Doe"
                  onChange={(e) => { setName(e.target.value); setLogin(""); }}
                />

                <InputBox
                  label="Contact Number"
                  value={contact}
                  inputRef={contactRef}
                  placeholder="e.g., +1234567890"
                  onChange={(e) => { setContact(e.target.value); setLogin(""); }}
                />

                <InputBox
                  label="Email Address"
                  type="email"
                  value={email}
                  inputRef={emailRef}
                  placeholder="username@domain.com"
                  onChange={(e) => { setEmail(e.target.value); setLogin(""); }}
                  isFullWidth={true} // Spans email nicely across the space if desired
                />

                <InputBox
                  label="Physical Location / Address"
                  value={address}
                  inputRef={addressRef}
                  placeholder="Primary corporate location details"
                  onChange={(e) => { setAddress(e.target.value); setLogin(""); }}
                  isFullWidth={true}
                />

                <InputBox
                  label="Access Password"
                  type="password"
                  value={password}
                  inputRef={passwordRef}
                  placeholder="••••••••"
                  onChange={(e) => { setPassword(e.target.value); setLogin(""); }}
                />

                <InputBox
                  label="Verify Access Password"
                  type="password"
                  value={confirmpassword}
                  inputRef={confpassRef}
                  placeholder="••••••••"
                  onChange={(e) => { setConfirmpassword(e.target.value); setLogin(""); }}
                />

                <div className="span-two">
                  <button onClick={handleAdminRegistration} className="submit-btn">
                    Register Account
                  </button>
                </div>
              </div>

              {login && (
                <div
                  className={
                    login.includes("fill") ||
                    login.includes("match") ||
                    login.includes("already") ||
                    login.includes("wrong") ||
                    login.includes("Something")
                      ? "status-box status-error"
                      : "status-box status-success"
                  }
                >
                  {login}
                </div>
              )}
            </section>

          </main>
        </div>
      </div>
    </>
  );
};

const InputBox = ({
  label,
  type = "text",
  value,
  inputRef,
  placeholder,
  onChange,
  isFullWidth = false,
}) => {
  return (
    <div className={isFullWidth ? "span-two" : ""}>
      <div className="input-group">
        <label>{label}</label>
        <input
          className="admin-input"
          type={type}
          value={value}
          ref={inputRef}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AdminReg;