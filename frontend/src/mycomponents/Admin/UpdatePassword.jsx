import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdmNav";

const UpdatePassword = () => {
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmnewpassword, setConfirmNewPassword] = useState("");
    const [results, setResults] = useState("");
    const [error, setError] = useState("");
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [strength, setStrength] = useState(0);
    const navigate = useNavigate();
    const resultTimer = useRef(null);

    useEffect(() => {
        const checkUser = async () => {
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
        };

        checkUser();

        return () => clearTimeout(resultTimer.current);
    }, [navigate]);
    

    const calcStrength = (val) => {
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;
        return score;
    };

    const handleNewPasswordChange = (e) => {
        const val = e.target.value;
        setNewPassword(val);
        setStrength(val ? calcStrength(val) : 0);
    };

    const strengthMeta = [
        { label: "Weak", color: "#e53e3e", width: "25%" },
        { label: "Fair", color: "#dd6b20", width: "50%" },
        { label: "Good", color: "#38a169", width: "75%" },
        { label: "Strong", color: "#2b6cb0", width: "100%" },
    ];
    const sm = strength > 0 ? strengthMeta[strength - 1] : null;

    const passwordsMatch =
        confirmnewpassword && newpassword === confirmnewpassword;
    const passwordsMismatch =
        confirmnewpassword && newpassword !== confirmnewpassword;

    const handleChangePassword = async () => {
        setError("");
        if (!oldpassword.trim()) {
            setError("Please enter your current password.");
            return;
        }
        if (!newpassword.trim()) {
            setError("Please enter a new password.");
            return;
        }
        if (!confirmnewpassword.trim()) {
            setError("Please confirm your new password.");
            return;
        }
        if (newpassword !== confirmnewpassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "https://medicine-finder-1-zwuu.onrender.com/changePasswordAdmin",
                { oldpassword, newpassword, confirmnewpassword }
            );
            const result = response.data;

            if (result.msg === "successful") {
                setResults("Password updated successfully!");
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
                setStrength(0);
                resultTimer.current = setTimeout(() => setResults(""), 4000);
            }
            else if (result.msg === "old password incorrect") {
                setError("Current password is incorrect.");
            }
            else if (result.msg === "New password and confirm password do not match") {
                setError("Confirm password does not match.");
            }
            else if (result.msg === "Please fill all fields") {
                setError("Please fill all fields.");
            }
            else if (result.msg === "session out") {
                alert("Session expired");
                navigate("/login", { replace: true });
            }
            else {
                setError(result.msg || "Unable to update password.");
            }
        } catch (err) {
            console.log(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setStrength(0);
        setError("");
        setResults("");
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .up-root {
          min-height: 100vh;
          background: #f0f2f5;
          font-family: 'Sora', sans-serif;
        }

        .up-body {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 3rem 1rem 4rem;
        }

        .up-wrapper {
          width: 100%;
          max-width: 460px;
        }

        .up-header {
          margin-bottom: 2rem;
        }

        .up-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #1a1a2e;
          color: #a5b4fc;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 14px;
        }

        .up-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #818cf8;
        }

        .up-title {
          font-size: 26px;
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 6px;
          letter-spacing: -0.5px;
        }

        .up-subtitle {
          font-size: 13.5px;
          color: #64748b;
          margin: 0;
          line-height: 1.6;
        }

        .up-card {
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }

        .up-card-inner {
          padding: 2rem;
        }

        .up-section-label {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94a3b8;
          margin: 0 0 14px;
        }

        .up-divider {
          border: none;
          border-top: 1px solid #f1f5f9;
          margin: 1.5rem 0;
        }

        .up-field {
          margin-bottom: 1rem;
        }

        .up-field:last-of-type {
          margin-bottom: 0;
        }

        .up-label {
          display: block;
          font-size: 12.5px;
          font-weight: 500;
          color: #475569;
          margin-bottom: 7px;
        }

        .up-input-wrap {
          position: relative;
        }

        .up-input-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .up-input {
          width: 100%;
          box-sizing: border-box;
          height: 44px;
          padding: 0 42px 0 40px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Sora', sans-serif;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
        }

        .up-input:focus {
          border-color: #818cf8;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(129,140,248,0.12);
        }

        .up-input.is-success {
          border-color: #34d399;
          background: #f0fdf4;
        }

        .up-input.is-error {
          border-color: #f87171;
          background: #fef2f2;
        }

        .up-eye-btn {
          position: absolute;
          right: 11px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
        }

        .up-eye-btn:hover {
          color: #475569;
          background: #f1f5f9;
        }

        .up-strength-bar {
          margin-top: 8px;
        }

        .up-strength-track {
          height: 3px;
          background: #e2e8f0;
          border-radius: 2px;
          overflow: hidden;
        }

        .up-strength-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.35s ease, background-color 0.35s ease;
        }

        .up-strength-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 5px;
        }

        .up-strength-hint {
          font-size: 11px;
          color: #94a3b8;
        }

        .up-strength-label {
          font-size: 11px;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
          transition: color 0.3s;
        }

        .up-match-msg {
          font-size: 11.5px;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .up-error-box {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 11px 14px;
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin-bottom: 1.25rem;
          animation: slideIn 0.2s ease;
        }

        .up-error-text {
          font-size: 13px;
          color: #b91c1c;
          line-height: 1.5;
        }

        .up-success-box {
          background: #f0fdf4;
          border: 1px solid #86efac;
          border-radius: 10px;
          padding: 11px 14px;
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 1.25rem;
          animation: slideIn 0.2s ease;
        }

        .up-success-text {
          font-size: 13px;
          color: #15803d;
          font-weight: 500;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .up-actions {
          display: flex;
          gap: 10px;
          margin-top: 1.5rem;
        }

        .up-btn-primary {
          flex: 1;
          height: 44px;
          background: #1a1a2e;
          color: #e0e7ff;
          border: none;
          border-radius: 10px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.15s, transform 0.1s;
          letter-spacing: 0.01em;
        }

        .up-btn-primary:hover:not(:disabled) {
          background: #2d2d5e;
        }

        .up-btn-primary:active:not(:disabled) {
          transform: scale(0.98);
        }

        .up-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .up-btn-secondary {
          height: 44px;
          padding: 0 20px;
          background: transparent;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 400;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, color 0.15s;
        }

        .up-btn-secondary:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
          color: #334155;
        }

        .up-footer-hint {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          padding: 14px 2rem;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
        }

        .up-footer-hint p {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
          line-height: 1.6;
        }

        .up-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(224,231,255,0.3);
          border-top-color: #e0e7ff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

            <div className="up-root">
                <AdminNavbar />

                <div className="up-body">
                    <div className="up-wrapper">

                        <div className="up-header">
                            <div className="up-badge">
                                <span className="up-badge-dot"></span>
                                Admin settings
                            </div>
                            <h1 className="up-title">Update password</h1>
                            <p className="up-subtitle">
                                Choose a strong password to keep your admin account secure.
                            </p>
                        </div>

                        <div className="up-card">
                            <div className="up-card-inner">

                                {error && (
                                    <div className="up-error-box">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        <span className="up-error-text">{error}</span>
                                    </div>
                                )}

                                {results && (
                                    <div className="up-success-box">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                        <span className="up-success-text">{results}</span>
                                    </div>
                                )}

                                <p className="up-section-label">Current</p>

                                <div className="up-field">
                                    <label className="up-label" htmlFor="pass1">Current password</label>
                                    <div className="up-input-wrap">
                                        <span className="up-input-icon">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </span>
                                        <input
                                            className="up-input"
                                            type={showOld ? "text" : "password"}
                                            id="pass1"
                                            value={oldpassword}
                                            placeholder="Enter current password"
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="up-eye-btn"
                                            onClick={() => setShowOld(!showOld)}
                                            aria-label={showOld ? "Hide password" : "Show password"}
                                        >
                                            {showOld ? (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                                                </svg>
                                            ) : (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <hr className="up-divider" />
                                <p className="up-section-label">New</p>

                                <div className="up-field">
                                    <label className="up-label" htmlFor="pass2">New password</label>
                                    <div className="up-input-wrap">
                                        <span className="up-input-icon">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                                            </svg>
                                        </span>
                                        <input
                                            className="up-input"
                                            type={showNew ? "text" : "password"}
                                            id="pass2"
                                            value={newpassword}
                                            placeholder="Create a new password"
                                            onChange={handleNewPasswordChange}
                                        />
                                        <button
                                            type="button"
                                            className="up-eye-btn"
                                            onClick={() => setShowNew(!showNew)}
                                            aria-label={showNew ? "Hide password" : "Show password"}
                                        >
                                            {showNew ? (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                                                </svg>
                                            ) : (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>

                                    {newpassword && (
                                        <div className="up-strength-bar">
                                            <div className="up-strength-track">
                                                <div
                                                    className="up-strength-fill"
                                                    style={{ width: sm?.width || "0%", backgroundColor: sm?.color || "#e2e8f0" }}
                                                />
                                            </div>
                                            <div className="up-strength-row">
                                                <span className="up-strength-hint">Min 8 chars, uppercase, number, symbol</span>
                                                {sm && (
                                                    <span className="up-strength-label" style={{ color: sm.color }}>
                                                        {sm.label}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="up-field">
                                    <label className="up-label" htmlFor="pass3">Confirm new password</label>
                                    <div className="up-input-wrap">
                                        <span className="up-input-icon">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                        </span>
                                        <input
                                            className={`up-input ${passwordsMatch ? "is-success" : passwordsMismatch ? "is-error" : ""}`}
                                            type={showConfirm ? "text" : "password"}
                                            id="pass3"
                                            value={confirmnewpassword}
                                            placeholder="Re-enter new password"
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="up-eye-btn"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            aria-label={showConfirm ? "Hide password" : "Show password"}
                                        >
                                            {showConfirm ? (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                                                </svg>
                                            ) : (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>

                                    {confirmnewpassword && (
                                        <p className="up-match-msg" style={{ color: passwordsMatch ? "#16a34a" : "#dc2626" }}>
                                            {passwordsMatch ? (
                                                <>
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                    Passwords match
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                    Passwords do not match
                                                </>
                                            )}
                                        </p>
                                    )}
                                </div>

                                <div className="up-actions">
                                    <button
                                        className="up-btn-primary"
                                        onClick={handleChangePassword}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="up-spinner" />
                                        ) : (
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                                            </svg>
                                        )}
                                        {loading ? "Updating…" : "Update password"}
                                    </button>
                                    <button className="up-btn-secondary" onClick={handleReset}>
                                        Reset
                                    </button>
                                </div>
                            </div>

                            <div className="up-footer-hint">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <p>Use at least 8 characters. Include uppercase letters, numbers, and symbols for a stronger password.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatePassword;