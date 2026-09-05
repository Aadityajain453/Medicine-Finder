import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from './AdmNav';

// ─── Styles ───────────────────────────────────────────────────────────────────
const PAGE_CSS = `
  .um-page {
    background: #f1f5f9;
    min-height: 100vh;
    padding: 40px 24px;
    font-family: 'DM Sans', system-ui, sans-serif;
  }
  .um-card {
    max-width: 960px;
    margin: 0 auto;
    background: #fff;
    border-radius: 20px;
    border: 0.5px solid #e2e8f0;
    display: grid;
    grid-template-columns: 260px 1fr;
    overflow: hidden;
  }

  /* ── Sidebar ── */
  .um-sidebar {
    background: #0f172a;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .um-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: rgba(255,255,255,0.5);
    font-size: 13px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    margin-bottom: 32px;
    transition: color 0.15s;
  }
  .um-back-btn:hover { color: #fff; }
  .um-logo-box {
    width: 52px;
    height: 52px;
    background: #14b8a6;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .um-sidebar h2 {
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 10px;
    letter-spacing: -0.3px;
  }
  .um-sidebar p {
    color: rgba(255,255,255,0.45);
    font-size: 13px;
    line-height: 1.6;
    margin: 0;
  }
  .um-badges { margin-top: 32px; }
  .um-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.05);
    border: 0.5px solid rgba(255,255,255,0.08);
    border-radius: 99px;
    padding: 7px 14px;
    margin-bottom: 8px;
  }
  .um-badge .dot {
    width: 6px;
    height: 6px;
    background: #4ade80;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .um-badge span { font-size: 12px; color: rgba(255,255,255,0.55); }

  /* ── Form ── */
  .um-form { padding: 32px 36px; }
  .um-form-head { margin-bottom: 20px; }
  .um-form-head h4 {
    font-size: 17px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 4px;
  }
  .um-form-head p { font-size: 12px; color: #94a3b8; margin: 0; }

  .um-alert {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 11px 14px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .um-alert.success { background: #f0fdf4; border: 0.5px solid #bbf7d0; color: #166534; }
  .um-alert.danger  { background: #fef2f2; border: 0.5px solid #fecaca; color: #991b1b; }
  .um-alert.warning { background: #fffbeb; border: 0.5px solid #fde68a; color: #92400e; }

  .um-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .um-full { grid-column: 1 / -1; }

  .um-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #64748b;
    display: block;
    margin-bottom: 6px;
  }
  .um-input {
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
    font-family: inherit;
  }
  .um-input:focus {
    background: #fff;
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20,184,166,0.12);
  }
  .um-input[readonly] {
    background: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
  }
  textarea.um-input { resize: vertical; min-height: 84px; }

  .um-submit-btn {
    width: 100%;
    padding: 13px;
    background: #0f172a;
    color: #fff;
    border: none;
    border-radius: 11px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
    transition: background 0.15s, opacity 0.15s;
    font-family: inherit;
  }
  .um-submit-btn:hover:not(:disabled) { background: #1e293b; }
  .um-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  @media (max-width: 768px) {
    .um-card { grid-template-columns: 1fr; }
    .um-grid { grid-template-columns: 1fr; }
    .um-full { grid-column: 1; }
    .um-form { padding: 24px 20px; }
    .um-sidebar { padding: 24px 20px; }
  }
`;

// ─── Icon helper ──────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, style = {} }) => (
  <i
    className={`ti ti-${name}`}
    style={{ fontSize: `${size}px`, ...style }}
    aria-hidden="true"
  />
);

// ─── Alert banner ─────────────────────────────────────────────────────────────
const AlertBanner = ({ type, text }) => {
  if (!text) return null;
  const iconMap = { success: "circle-check", danger: "circle-x", warning: "alert-triangle" };
  return (
    <div className={`um-alert ${type}`}>
      <Icon name={iconMap[type] ?? "info-circle"} size={15} />
      {text}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const UpdateMedical = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicalname, setMedicalName] = useState("");
  const [ownername,   setOwnerName]   = useState("");
  const [address,     setAddress]     = useState("");
  const [contact,     setContact]     = useState("");
  const [licno,       setLicNo]       = useState("");
  const [email,       setEmail]       = useState("");
  const [statusMsg,   setStatusMsg]   = useState({ type: "", text: "" });
  const [originalData, setOriginalData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    verifyUser();
    fetchMedicalData();
  }, []);

  // ── Auth check ──
  const verifyUser = async () => {
    try {
      const { data } = await axios.get("https://medicine-finder-1-zwuu.onrender.com/isUser");
      if (!data.usertype || data.usertype === "nouser" || data.usertype !== "admin") {
        navigate("/auth_error", { replace: true });
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      navigate("/auth_error", { replace: true });
    }
  };

  // ── Fetch existing data ──
  const fetchMedicalData = async () => {
    try {
      const { data } = await axios.post("https://medicine-finder-1-zwuu.onrender.com/editmedicaldata", { id });
      if (data) {
        setMedicalName(data.Medicalname);
        setOwnerName(data.OwnerName);
        setAddress(data.Address);
        setContact(data.Contact);
        setLicNo(data.LicenceNumber);
        setEmail(data.Email);
        setOriginalData({
          medicalname: data.Medicalname,
          ownername:   data.OwnerName,
          address:     data.Address,
          contact:     data.Contact,
          licno:       data.LicenceNumber,
        });
      }
    } catch (err) {
      console.error("Failed to fetch medical data:", err);
      setStatusMsg({ type: "danger", text: "Failed to load store data. Please try again." });
    }
  };

  // ── Submit ──
  const handleUpdate = async () => {
    const unchanged =
      medicalname === originalData.medicalname &&
      ownername   === originalData.ownername   &&
      address     === originalData.address     &&
      contact     === originalData.contact     &&
      licno       === originalData.licno;

    if (unchanged) {
      setStatusMsg({ type: "warning", text: "No changes detected. Please update at least one field." });
      setTimeout(() => setStatusMsg({ type: "", text: "" }), 3000);
      return;
    }

    setIsSubmitting(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const response = await axios.post("https://medicine-finder-1-zwuu.onrender.com/updatemedical", {
        medicalname, ownername, address, contact, licno, id,
      });

      if (response.status === 200) {
        setStatusMsg({ type: "success", text: "Profile updated successfully! Redirecting…" });
        setTimeout(() => navigate("/showmedical"), 2000);
      }
    } catch (err) {
      console.error("Update failed:", err);
      setStatusMsg({ type: "danger", text: "Update failed. Please check your inputs and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{PAGE_CSS}</style>
      <AdminNavbar />

      <div className="um-page">
        <div className="um-card">

          {/* ── Sidebar ── */}
          <div className="um-sidebar">
            <div>
              <button className="um-back-btn" onClick={() => navigate(-1)}>
                <Icon name="arrow-left" size={14} /> Back
              </button>

              <div className="um-logo-box">
                <Icon name="pill" size={26} style={{ color: "#fff" }} />
              </div>

              <h2>Update profile</h2>
              <p>
                Maintain accurate store records for proper medicine distribution
                and licensing compliance.
              </p>
            </div>

            <div className="um-badges">
              <div className="um-badge">
                <div className="dot" />
                <span>Data encrypted</span>
              </div>
              <div className="um-badge">
                <div className="dot" />
                <span>Auto-sync enabled</span>
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="um-form">
            <div className="um-form-head">
              <h4>Store configuration</h4>
              <p>Update your pharmacy details below. Fields marked with * are required.</p>
            </div>

            <AlertBanner type={statusMsg.type} text={statusMsg.text} />

            <div className="um-grid">

              <div>
                <label className="um-label">Medical name *</label>
                <input
                  className="um-input"
                  type="text"
                  value={medicalname}
                  onChange={e => setMedicalName(e.target.value)}
                  placeholder="e.g. City Wellness Pharma"
                />
              </div>

              <div>
                <label className="um-label">Owner name *</label>
                <input
                  className="um-input"
                  type="text"
                  value={ownername}
                  onChange={e => setOwnerName(e.target.value)}
                  placeholder="Full legal name"
                />
              </div>

              <div>
                <label className="um-label">Contact</label>
                <input
                  className="um-input"
                  type="tel"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="um-label">Licence number</label>
                <input
                  className="um-input"
                  type="text"
                  value={licno}
                  onChange={e => setLicNo(e.target.value)}
                  placeholder="DL-XXXX-XXXX"
                />
              </div>

              <div className="um-full">
                <label className="um-label">Email (read only)</label>
                <input
                  className="um-input"
                  type="email"
                  value={email}
                  readOnly
                />
              </div>

              <div className="um-full">
                <label className="um-label">Address</label>
                <textarea
                  className="um-input"
                  rows={3}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Street, Landmark, City, Pincode"
                />
              </div>

            </div>

            <button
              className="um-submit-btn"
              onClick={handleUpdate}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? <span className="spinner-border spinner-border-sm" />
                : <Icon name="device-floppy" size={16} />
              }
              Confirm &amp; save changes
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default UpdateMedical;