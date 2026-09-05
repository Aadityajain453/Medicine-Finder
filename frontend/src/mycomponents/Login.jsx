import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyNavbar from "./GeneralNavbar";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, setLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passRef = useRef();

  const getPasswordStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (password.length === 0) {
      return { label: "", width: "0%", color: "#e2e8f0" };
    }

    if (score <= 1) {
      return { label: "Weak Security", width: "33%", color: "#ef4444" };
    }

    if (score <= 3) {
      return { label: "Moderate Security", width: "66%", color: "#f59e0b" };
    }

    return { label: "Highly Secure", width: "100%", color: "#10b981" };
  };

  const strength = getPasswordStrength();

  const handleLoginSystem = async () => {
    if (email.trim() === "") {
      setLogin("Please enter your registered email address.");
      setTimeout(() => {
        emailRef.current.focus();
      }, 0);
      return;
    }

    if (password.trim() === "") {
      setLogin("Please enter your account password.");
      setTimeout(() => {
        passRef.current.focus();
      }, 0);
      return;
    }

    try {
      setLoading(true);
      setLogin("");

      const response = await axios.post("https://medicine-finder-1-zwuu.onrender.com/check_login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      const result = response.data;
      console.log(result);

      if (result.msg === "Not found") {
        setLogin("Invalid email or password authentication credentials.");
      } else {
        const ut = result.usertype;

        if (ut === "admin") {

          toast.success("Admin Login Successful!", {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
          });

          setTimeout(() => {
            navigate("/adminhome", { replace: true });
          }, 1000);

        } else if (ut === "medical") {

          toast.success("Medical Login Successful!", {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
          });

          setTimeout(() => {
            navigate("/medicalhome", { replace: true });
          }, 1000);

        } else {
          setLogin("Access suspended. Please contact your system administrator.");
        }
      }
    } catch (error) {
      console.log(error);
      setLogin("Network or server connection error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: calc(100vh - 70px);
          background-color: #f8fafc;
          background-image: 
            radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(14, 116, 144, 0.05) 0px, transparent 50%);
          padding: 60px 20px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-shell {
          width: 100%;
          max-width: 1140px;
          border-radius: 24px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.06);
        }

        .login-left {
          background: linear-gradient(145deg, #0f172a 0%, #1e293b 100%);
          padding: 56px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .login-left::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 90% 10%, rgba(16, 185, 129, 0.12) 0%, transparent 40%);
          pointer-events: none;
        }

        .login-brand-group {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }

        .login-logo-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .login-brand-name {
          color: #ffffff;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .login-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          background: rgba(16, 185, 129, 0.1);
          color: #34d399;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.3px;
          border: 1px solid rgba(16, 185, 129, 0.2);
          margin-bottom: 24px;
        }

        .login-title {
          color: #ffffff;
          font-size: clamp(32px, 4vw, 44px);
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: -1px;
          margin-bottom: 16px;
        }

        .login-title span {
          color: #10b981;
        }

        .login-desc {
          color: #94a3b8;
          font-size: 16px;
          line-height: 26px;
          max-width: 460px;
          margin-bottom: 40px;
        }

        .login-mini-grid {
          margin-top: auto;
        }

        .mini-card {
          padding: 20px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.25s ease;
        }

        .mini-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .mini-icon {
          font-size: 20px;
          margin-bottom: 8px;
        }

        .mini-title {
          font-weight: 600;
          font-size: 14px;
          color: #f1f5f9;
          margin-bottom: 2px;
        }

        .mini-text {
          color: #64748b;
          font-size: 13px;
          margin: 0;
        }

        .login-right {
          background: #ffffff;
          padding: 56px;
          display: flex;
          align-items: center;
        }

        .login-form-box {
          width: 100%;
          max-width: 420px;
          margin: auto;
        }

        .login-form-title {
          color: #0f172a;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-bottom: 6px;
        }

        .login-form-subtitle {
          color: #64748b;
          font-size: 15px;
          margin-bottom: 32px;
        }

        .login-alert {
          background: #fef2f2;
          color: #991b1b;
          padding: 14px 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid #fee2e2;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .login-field {
          margin-bottom: 20px;
        }

        .login-label {
          color: #334155;
          font-size: 14px;
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
        }

        .login-input-wrap {
          height: 50px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 0 16px;
          transition: all 0.2s ease;
        }

        .login-input-wrap:focus-within {
          background: #ffffff;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .login-input-icon {
          color: #94a3b8;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .login-input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          color: #0f172a;
          font-weight: 500;
        }

        .login-input::placeholder {
          color: #94a3b8;
        }

        .login-eye-btn {
          border: none;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          transition: color 0.2s ease;
          flex-shrink: 0;
        }

        .login-eye-btn:hover {
          color: #0f172a;
        }

        .strength-box {
          margin-top: 10px;
        }

        .strength-track {
          height: 4px;
          background: #f1f5f9;
          border-radius: 2px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .strength-text {
          margin-top: 6px;
          font-size: 12px;
          font-weight: 600;
          text-align: right;
        }

        .login-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 4px 0 24px;
        }

        .login-meta-text {
          color: #64748b;
          font-size: 13px;
          font-weight: 500;
        }

        .login-secure-indicator {
          color: #10b981;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .login-submit-btn {
          width: 100%;
          height: 50px;
          border: none;
          border-radius: 10px;
          background: #10b981;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .login-submit-btn:hover:not(:disabled) {
          background: #059669;
        }

        .login-submit-btn:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .login-note {
          margin-top: 28px;
          padding: 14px;
          background: #f8fafc;
          border-radius: 10px;
          border: 1px solid #f1f5f9;
          text-align: center;
        }

        .login-note p {
          margin: 0;
          color: #64748b;
          font-size: 13px;
          line-height: 20px;
          font-weight: 500;
        }

        @media (max-width: 991px) {
          .login-page {
            padding: 30px 16px;
          }

          .login-shell {
            border-radius: 16px;
          }

          .login-left {
            padding: 40px 32px;
          }

          .login-right {
            padding: 48px 32px;
          }
        }

        @media (max-width: 575px) {
          .login-left {
            padding: 32px 20px;
          }

          .login-right {
            padding: 36px 20px;
          }

          .login-title {
            font-size: 28px;
          }
        }
      `}</style>

      <MyNavbar />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <div className="login-page">
        <div className="container">
          <div className="login-shell">
            <div className="row g-0">
              {/* LEFT BRANDING SIDE */}
              <div className="col-lg-6 login-left">
                <div>
                  <div className="login-brand-group">
                    <div className="login-logo-box">💊</div>
                    <span className="login-brand-name">Medicine Finder</span>
                  </div>

                  <div className="login-badge">
                    <span>🛡️</span> Enterprise Grade Security
                  </div>

                  <h1 className="login-title">
                    Centralized <br />
                    <span>Inventory Gateway</span>
                  </h1>

                  <p className="login-desc">
                    Authenticate to manage commercial medicine channels, track stock lifecycles, and handle master administrator configurations securely.
                  </p>
                </div>

                <div className="row g-3 login-mini-grid">
                  <div className="col-sm-6">
                    <MiniCard icon="👨‍💼" title="Admin Control" text="System governance" />
                  </div>
                  <div className="col-sm-6">
                    <MiniCard icon="🏥" title="Medical Hub" text="Stock & store records" />
                  </div>
                  <div className="col-sm-6">
                    <MiniCard icon="🔑" title="Role Protection" text="Granular access rules" />
                  </div>
                  <div className="col-sm-6">
                    <MiniCard icon="⚡" title="Realtime Data" text="Instant state syncing" />
                  </div>
                </div>
              </div>

              {/* RIGHT FORM SIDE */}
              <div className="col-lg-6 login-right">
                <div className="login-form-box">
                  <h2 className="login-form-title">Account Sign In</h2>
                  <p className="login-form-subtitle">
                    Provide credentials allocated by system administrators
                  </p>

                  {login && (
                    <div className="login-alert">
                      <span>⚠️</span> {login}
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="login-field">
                    <label className="login-label">Email Address</label>
                    <div className="login-input-wrap">
                      <span className="login-input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <input
                        className="login-input"
                        type="email"
                        placeholder="name@medicaldomain.com"
                        value={email}
                        ref={emailRef}
                        onChange={(event) => setEmail(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") handleLoginSystem();
                        }}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="login-field">
                    <label className="login-label">Security Password</label>
                    <div className="login-input-wrap">
                      <span className="login-input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                      <input
                        className="login-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={password}
                        ref={passRef}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") handleLoginSystem();
                        }}
                      />
                      <button
                        className="login-eye-btn"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {password && (
                      <div className="strength-box">
                        <div className="strength-track">
                          <div
                            className="strength-fill"
                            style={{
                              width: strength.width,
                              background: strength.color,
                            }}
                          ></div>
                        </div>
                        <div className="strength-text" style={{ color: strength.color }}>
                          {strength.label}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="login-meta">
                    <span className="login-meta-text">Authorized access paths</span>
                    <span className="login-secure-indicator">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      SSL Encrypted
                    </span>
                  </div>

                  <button
                    className="login-submit-btn"
                    onClick={handleLoginSystem}
                    type="button"
                    disabled={loading}
                  >
                    {loading ? "Verifying Credentials..." : "Access Dashboard"}
                  </button>

                  <div className="login-note">
                    <p>
                      Access is audited. Unauthorized authentication requests will be flagged for evaluation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MiniCard = ({ icon, title, text }) => {
  return (
    <div className="mini-card">
      <div className="mini-icon">{icon}</div>
      <div className="mini-title">{title}</div>
      <p className="mini-text">{text}</p>
    </div>
  );
};

export default Login;