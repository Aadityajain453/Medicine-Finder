import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdmNav";

// ─── Styles ───────────────────────────────────────────────────────────────────
const PAGE_CSS = `
  .dm-page {
    background: #f1f5f9;
    min-height: 100vh;
    padding: 40px 24px;
    font-family: 'DM Sans', system-ui, sans-serif;
  }
  .dm-card {
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
  .dm-sidebar {
    background: #0f172a;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
  }
  .dm-back-btn {
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
    font-family: inherit;
  }
  .dm-back-btn:hover { color: #fff; }
  .dm-logo-box {
    width: 52px;
    height: 52px;
    background: #dc2626;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .dm-sidebar h2 {
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 10px;
    letter-spacing: -0.3px;
  }
  .dm-sidebar p {
    color: rgba(255,255,255,0.45);
    font-size: 13px;
    line-height: 1.6;
    margin: 0;
  }
  .dm-warn-box {
    margin-top: 28px;
    background: rgba(220,38,38,0.1);
    border: 0.5px solid rgba(220,38,38,0.22);
    border-radius: 12px;
    padding: 14px 16px;
  }
  .dm-warn-box strong {
    display: block;
    font-size: 12px;
    color: #fca5a5;
    margin-bottom: 5px;
  }
  .dm-warn-box p {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    line-height: 1.6;
    margin: 0;
  }

  /* ── Main panel ── */
  .dm-main { padding: 32px 36px; }
  .dm-head { margin-bottom: 20px; }
  .dm-head h4 {
    font-size: 17px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 4px;
  }
  .dm-head p { font-size: 12px; color: #94a3b8; margin: 0; }

  /* ── Alert ── */
  .dm-alert {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 11px 14px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .dm-alert.success { background: #f0fdf4; border: 0.5px solid #bbf7d0; color: #166534; }
  .dm-alert.danger  { background: #fef2f2; border: 0.5px solid #fecaca; color: #991b1b; }

  /* ── Details grid ── */
  .dm-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }
  .dm-full { grid-column: 1 / -1; }
  .dm-detail {
    background: #f8fafc;
    border: 0.5px solid #e2e8f0;
    border-radius: 10px;
    padding: 14px 16px;
  }
  .dm-detail span {
    display: block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #94a3b8;
    margin-bottom: 5px;
  }
  .dm-detail strong {
    font-size: 13px;
    color: #0f172a;
    font-weight: 600;
    word-break: break-word;
  }

  /* ── Danger notice ── */
  .dm-danger-notice {
    background: #fef2f2;
    border: 0.5px solid #fecaca;
    border-radius: 10px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 20px;
  }
  .dm-danger-notice span { font-size: 13px; color: #991b1b; font-weight: 500; }

  /* ── Loading ── */
  .dm-loading {
    text-align: center;
    padding: 48px 0;
    color: #94a3b8;
    font-size: 14px;
  }

  /* ── Action buttons ── */
  .dm-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .dm-cancel-btn {
    background: #f1f5f9;
    border: 0.5px solid #e2e8f0;
    color: #475569;
    border-radius: 10px;
    padding: 12px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    transition: background 0.15s;
    font-family: inherit;
  }
  .dm-cancel-btn:hover { background: #e2e8f0; }
  .dm-delete-btn {
    background: #dc2626;
    border: none;
    color: #fff;
    border-radius: 10px;
    padding: 12px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    transition: background 0.15s, opacity 0.15s;
    font-family: inherit;
  }
  .dm-delete-btn:hover:not(:disabled) { background: #b91c1c; }
  .dm-delete-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  @media (max-width: 768px) {
    .dm-card { grid-template-columns: 1fr; }
    .dm-grid { grid-template-columns: 1fr; }
    .dm-full { grid-column: 1; }
    .dm-main { padding: 24px 20px; }
    .dm-sidebar { padding: 24px 20px; }
    .dm-actions { grid-template-columns: 1fr; }
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, style = {} }) => (
  <i className={`ti ti-${name}`} style={{ fontSize: `${size}px`, ...style }} aria-hidden="true" />
);

const AlertBanner = ({ type, text }) => {
  if (!text) return null;
  const iconMap = { success: "circle-check", danger: "circle-x" };
  return (
    <div className={`dm-alert ${type}`}>
      <Icon name={iconMap[type] ?? "info-circle"} size={15} />
      {text}
    </div>
  );
};

const DetailBox = ({ label, value, full = false }) => (
  <div className={`dm-detail${full ? " dm-full" : ""}`}>
    <span>{label}</span>
    <strong>{value ?? "—"}</strong>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const DeleteMedical = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medical,    setMedical]    = useState(null);
  const [statusMsg,  setStatusMsg]  = useState({ type: "", text: "" });
  const [isLoading,  setIsLoading]  = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

 useEffect(() => {
  verifyAndLoad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

  // ── Auth + data fetch ──
  const verifyAndLoad = async () => {
    try {
      const { data } = await axios.get("https://medicine-finder-1-zwuu.onrender.com/isUser");
      if (!data.usertype || data.usertype === "nouser" || data.usertype !== "admin") {
        navigate("/auth_error", { replace: true });
        return;
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      navigate("/auth_error", { replace: true });
      return;
    }

    try {
      const { data } = await axios.post("https://medicine-finder-1-zwuu.onrender.com/showmedicaldata", { id });
      if (data) {
        setMedical(data);
      } else {
        setStatusMsg({ type: "danger", text: "No medical store found." });
      }
    } catch (err) {
      console.error("Failed to load store data:", err);
      setStatusMsg({ type: "danger", text: "Failed to load medical store data." });
    } finally {
      setIsLoading(false);
    }
  };

  // ── Delete handler ──
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this medical store?"
    );
    if (!confirmed) return;

    setIsDeleting(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const { data } = await axios.post("https://medicine-finder-1-zwuu.onrender.com/deletemedicalstore", { id });

      if (data.mesg === "Data deleted") {
        setStatusMsg({ type: "success", text: "Medical store deleted successfully." });
        setTimeout(() => navigate("/showmedical", { replace: true }), 1500);
      } else {
        setStatusMsg({ type: "danger", text: "Unable to delete this medical store." });
      }
    } catch (err) {
      console.error("Delete failed:", err);
      setStatusMsg({ type: "danger", text: "Something went wrong. Please try again." });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <style>{PAGE_CSS}</style>
      <AdminNavbar />

      <div className="dm-page">
        <div className="dm-card">

          {/* ── Sidebar ── */}
          <div className="dm-sidebar">
            <div>
              <button className="dm-back-btn" onClick={() => navigate(-1)}>
                <Icon name="arrow-left" size={14} /> Back
              </button>

              <div className="dm-logo-box">
                <Icon name="alert-triangle" size={24} style={{ color: "#fff" }} />
              </div>

              <h2>Delete store</h2>
              <p>
                This action permanently removes the medical store record
                from your directory.
              </p>

              <div className="dm-warn-box">
                <strong>Important</strong>
                <p>Review all details carefully before confirming. This cannot be undone.</p>
              </div>
            </div>
          </div>

          {/* ── Main panel ── */}
          <div className="dm-main">
            <div className="dm-head">
              <h4>Confirm deletion</h4>
              <p>Review the store information below before proceeding.</p>
            </div>

            <AlertBanner type={statusMsg.type} text={statusMsg.text} />

            {isLoading ? (
              <div className="dm-loading">
                <div className="spinner-border spinner-border-sm text-secondary mb-2" />
                <p>Loading store data…</p>
              </div>
            ) : medical ? (
              <>
                <div className="dm-grid">
                  <DetailBox label="Medical name"   value={medical.Medicalname}   />
                  <DetailBox label="Owner name"     value={medical.OwnerName}     />
                  <DetailBox label="Contact"        value={medical.Contact}       />
                  <DetailBox label="Licence number" value={medical.LicenceNumber} />
                  <DetailBox label="Email"          value={medical.Email}   full  />
                  <DetailBox label="Address"        value={medical.Address} full  />
                </div>

                <div className="dm-danger-notice">
                  <Icon name="info-circle" size={15} style={{ color: "#dc2626", flexShrink: 0 }} />
                  <span>Once deleted, this data cannot be recovered.</span>
                </div>

                <div className="dm-actions">
                  <button className="dm-cancel-btn" onClick={() => navigate("/showmedical")}>
                    <Icon name="x" size={15} /> Cancel
                  </button>
                  <button className="dm-delete-btn" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting
                      ? <span className="spinner-border spinner-border-sm" />
                      : <Icon name="trash" size={15} />
                    }
                    {isDeleting ? "Deleting…" : "Delete store"}
                  </button>
                </div>
              </>
            ) : (
              <p style={{ color: "#dc2626", fontSize: "13px" }}>No record available.</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default DeleteMedical;