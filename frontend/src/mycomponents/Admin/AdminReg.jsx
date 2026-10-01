import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkUser = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://medicine-finder-1-zwuu.onrender.com/isUser"
      );

      const data = response.data;

      if (data.usertype === "nouser" || data.usertype !== "admin") {
        navigate("/auth_error", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleAdminRegistration = async () => {

    // Remove unnecessary spaces
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedContact = contact.trim();

    // -------------------------------
    // NAME VALIDATION
    // -------------------------------

    if (trimmedName === "") {
      setLogin("Please enter the full name");
      nameRef.current.focus();
      return;
    }

    if (trimmedName.length < 2) {
      setLogin("Name must contain at least 2 characters");
      nameRef.current.focus();
      return;
    }

    const nameRegex = /^[A-Za-z][A-Za-z .'-]*$/;

    if (!nameRegex.test(trimmedName)) {
      setLogin(
        "Name can contain only letters, spaces, dots, hyphens and apostrophes"
      );
      nameRef.current.focus();
      return;
    }

    // -------------------------------
    // CONTACT VALIDATION
    // -------------------------------

    if (trimmedContact === "") {
      setLogin("Please enter the contact number");
      contactRef.current.focus();
      return;
    }

    const contactRegex = /^[6-9][0-9]{9}$/;

    if (!contactRegex.test(trimmedContact)) {
      setLogin("Please enter a valid 10-digit Indian mobile number");
      contactRef.current.focus();
      return;
    }


    // -------------------------------
    // EMAIL VALIDATION
    // -------------------------------

    if (trimmedEmail === "") {
      setLogin("Please enter the email address");
      emailRef.current.focus();
      return;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(trimmedEmail)) {
      setLogin("Please enter a valid email address");
      emailRef.current.focus();
      return;
    }

    // -------------------------------
    // ADDRESS VALIDATION
    // -------------------------------

    if (trimmedAddress === "") {
      setLogin("Please enter the address");
      addressRef.current.focus();
      return;
    }

    if (trimmedAddress.length < 5) {
      setLogin("Address must contain at least 5 characters");
      addressRef.current.focus();
      return;
    }

    if (trimmedAddress.length > 200) {
      setLogin("Address cannot exceed 200 characters");
      addressRef.current.focus();
      return;
    }


    // -------------------------------
    // PASSWORD VALIDATION
    // -------------------------------

    if (password === "") {
      setLogin("Please enter the password");
      passwordRef.current.focus();
      return;
    }

    if (password.length < 8) {
      setLogin("Password must contain at least 8 characters");
      passwordRef.current.focus();
      return;
    }

    if (password.length > 50) {
      setLogin("Password cannot exceed 50 characters");
      passwordRef.current.focus();
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setLogin("Password must contain at least one uppercase letter");
      passwordRef.current.focus();
      return;
    }

    if (!/[a-z]/.test(password)) {
      setLogin("Password must contain at least one lowercase letter");
      passwordRef.current.focus();
      return;
    }

    if (!/[0-9]/.test(password)) {
      setLogin("Password must contain at least one number");
      passwordRef.current.focus();
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~+=;'']/g.test(password)) {
      setLogin("Password must contain at least one special character");
      passwordRef.current.focus();
      return;
    }

    // -------------------------------
    // CONFIRM PASSWORD
    // -------------------------------

    if (confirmpassword === "") {
      setLogin("Please confirm your password");
      confpassRef.current.focus();
      return;
    }

    if (confirmpassword !== password) {
      setLogin("Passwords do not match");
      confpassRef.current.focus();
      return;
    }

    // -------------------------------
    // API REQUEST
    // -------------------------------

    try {

      setIsSubmitting(true);

      const response = await axios.post(
        "https://medicine-finder-1-zwuu.onrender.com/getadminreg",
        {
          name: trimmedName,
          address: trimmedAddress,
          contact: trimmedContact,
          email: trimmedEmail,
          password,
        }
      );

      const result = response.data;

      if (result.success === false) {

        setLogin(
          result.Message || "Unable to register admin"
        );

      } else if (result.success === true) {

        setLogin("Admin registered successfully");

        // Clear form
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

      console.error(
        "Admin registration error:",
        error
      );

      if (error.response?.data?.Message) {
        setLogin(error.response.data.Message);
      } else {
        setLogin("Something went wrong. Please try again.");
      }

    } finally {

      setIsSubmitting(false);

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
                  maxLength={50}
                  onChange={(e) => {
                    setName(e.target.value);
                    setLogin("");
                  }}
                />

                <InputBox
                  label="Contact Number"
                  value={contact}
                  inputRef={contactRef}
                  placeholder="e.g., 9876543210"
                  maxLength={10}
                  inputMode="numeric"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    setContact(value);
                    setLogin("");
                  }}
                />

                <InputBox
                  label="Email Address"
                  type="email"
                  value={email}
                  inputRef={emailRef}
                  placeholder="username@domain.com"
                  maxLength={100}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLogin("");
                  }}
                  isFullWidth={true}
                />

                <InputBox
                  label="Physical Location / Address"
                  value={address}
                  inputRef={addressRef}
                  placeholder="Primary corporate location details"
                  maxLength={200}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setLogin("");
                  }}
                  isFullWidth={true}
                />

                <InputBox
                  label="Access Password"
                  type="password"
                  value={password}
                  inputRef={passwordRef}
                  placeholder="••••••••"
                  maxLength={50}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLogin("");
                  }}
                />
                <InputBox
                  label="Verify Access Password"
                  type="password"
                  value={confirmpassword}
                  inputRef={confpassRef}
                  placeholder="••••••••"
                  maxLength={50}
                  onChange={(e) => {
                    setConfirmpassword(e.target.value);
                    setLogin("");
                  }}
                />

                <div className="span-two">
                  <button
                    onClick={handleAdminRegistration}
                    className="submit-btn"
                    disabled={isSubmitting}
                    style={{
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {isSubmitting ? "Registering..." : "Register Account"}
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
  maxLength,
  inputMode,
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
          maxLength={maxLength}
          inputMode={inputMode}
        />

      </div>

    </div>
  );
};
export default AdminReg;