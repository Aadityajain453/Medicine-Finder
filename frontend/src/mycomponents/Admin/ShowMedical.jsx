import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdmNav";

// ─── Styles ───────────────────────────────────────────────────────────────────
const PAGE_CSS = `
  .sm-page {
    background: #f1f5f9;
    min-height: 100vh;
    font-family: 'DM Sans', system-ui, sans-serif;
    display: flex;
    flex-direction: column;
  }

  /* ── Two-column layout ── */
  .sm-body {
    display: grid;
    grid-template-columns: 280px 1fr;
    flex: 1;
    min-height: calc(100vh - 60px);
  }

  /* ── Left sidebar ── */
  .sm-sidebar {
    background: #0f172a;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .sm-sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 0 4px;
  }
  .sm-sidebar-title {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    color: rgba(255,255,255,0.3);
    margin: 0;
  }
  .sm-count-pill {
    font-size: 11px;
    color: rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.07);
    padding: 2px 8px;
    border-radius: 10px;
  }
  .sm-store-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.12s, border-color 0.12s;
    border: 0.5px solid transparent;
    margin-bottom: 4px;
  }
  .sm-store-item:hover { background: rgba(255,255,255,0.06); }
  .sm-store-item.active {
    background: rgba(20,184,166,0.1);
    border-color: rgba(20,184,166,0.22);
  }
  .sm-store-avatar {
    width: 36px;
    height: 36px;
    border-radius: 9px;
    background: #1e293b;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: #64748b;
    flex-shrink: 0;
    transition: background 0.12s, color 0.12s;
  }
  .sm-store-item.active .sm-store-avatar {
    background: #14b8a6;
    color: #fff;
  }
  .sm-store-meta { flex: 1; overflow: hidden; }
  .sm-store-name {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.12s;
    margin: 0 0 2px;
  }
  .sm-store-item.active .sm-store-name { color: #fff; }
  .sm-store-owner {
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
  .sm-store-arrow {
    font-size: 14px;
    color: #14b8a6;
    opacity: 0;
    transition: opacity 0.12s;
    flex-shrink: 0;
  }
  .sm-store-item.active .sm-store-arrow { opacity: 1; }
  .sm-empty-sidebar {
    text-align: center;
    color: rgba(255,255,255,0.25);
    font-size: 13px;
    padding: 40px 0;
  }

  /* ── Right main panel ── */
  .sm-main {
    display: flex;
    flex-direction: column;
    background: #f8fafc;
    overflow: hidden;
  }
  .sm-main-header {
    background: #fff;
    border-bottom: 0.5px solid #e2e8f0;
    padding: 16px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  .sm-main-header h3 {
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 2px;
  }
  .sm-main-header p { font-size: 12px; color: #94a3b8; margin: 0; }
  .sm-active-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f0fdf4;
    border: 0.5px solid #bbf7d0;
    color: #166534;
    font-size: 11px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 20px;
  }
  .sm-active-pill .dot {
    width: 6px;
    height: 6px;
    background: #22c55e;
    border-radius: 50%;
  }

  /* ── Detail content ── */
  .sm-content {
    flex: 1;
    padding: 24px 28px;
    overflow-y: auto;
  }
  .sm-hero {
    background: #0f172a;
    border-radius: 14px;
    padding: 22px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }
  .sm-hero-avatar {
    width: 58px;
    height: 58px;
    border-radius: 14px;
    background: #14b8a6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }
  .sm-hero-name {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 5px;
    letter-spacing: -0.3px;
  }
  .sm-hero-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    margin: 0;
  }
  .sm-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 12px;
  }
  .sm-detail-full { grid-column: 1 / -1; }
  .sm-detail-box {
    background: #fff;
    border: 0.5px solid #e2e8f0;
    border-radius: 10px;
    padding: 14px 16px;
  }
  .sm-detail-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #94a3b8;
    margin: 0 0 5px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .sm-detail-label i { font-size: 13px; }
  .sm-detail-value {
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
    word-break: break-word;
  }

  /* ── Empty state ── */
  .sm-empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 48px;
    color: #94a3b8;
  }
  .sm-empty-icon {
    width: 64px;
    height: 64px;
    background: #f1f5f9;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }
  .sm-empty h5 { font-size: 15px; font-weight: 600; color: #0f172a; margin: 0 0 6px; }
  .sm-empty p  { font-size: 13px; margin: 0; }

  /* ── Action bar ── */
  .sm-action-bar {
    background: #fff;
    border-top: 0.5px solid #e2e8f0;
    padding: 14px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  .sm-status {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    color: #64748b;
  }
  .sm-status .dot {
    width: 7px;
    height: 7px;
    background: #22c55e;
    border-radius: 50%;
  }
  .sm-btn-row { display: flex; gap: 8px; }
  .sm-btn-edit {
    background: #0f172a;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 9px 20px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s;
    font-family: inherit;
  }
  .sm-btn-edit:hover { background: #1e293b; }
  .sm-btn-del {
    background: #fef2f2;
    color: #dc2626;
    border: 0.5px solid #fecaca;
    border-radius: 8px;
    padding: 9px 20px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s;
    font-family: inherit;
  }
  .sm-btn-del:hover { background: #fee2e2; }

  /* ── Loading ── */
  .sm-loading {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #94a3b8;
    font-size: 13px;
  }

  /* ── Scrollbar ── */
  .sm-sidebar::-webkit-scrollbar,
  .sm-content::-webkit-scrollbar { width: 4px; }
  .sm-sidebar::-webkit-scrollbar-track { background: transparent; }
  .sm-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
  .sm-content::-webkit-scrollbar-track { background: #f1f5f9; }
  .sm-content::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

  @media (max-width: 900px) {
    .sm-body { grid-template-columns: 1fr; }
    .sm-sidebar { max-height: 240px; }
    .sm-detail-grid { grid-template-columns: 1fr; }
    .sm-detail-full { grid-column: 1; }
  }
`;

// ─── Field accessor helpers ───────────────────────────────────────────────────
const field = (obj, keys, fallback = "—") =>
  keys.map(k => obj?.[k]).find(v => v != null) ?? fallback;

const getMedicalName   = m => field(m, ["Medicalname",    "medicalname"],    "No name");
const getOwnerName     = m => field(m, ["OwnerName",      "ownername"],      "No owner");
const getContact       = m => field(m, ["Contact",        "contact"],        "No contact");
const getLicenceNumber = m => field(m, ["LicenceNumber",  "licno"],          "No licence");
const getEmail         = m => field(m, ["Email",          "email"],          "No email");
const getAddress       = m => field(m, ["Address",        "address"],        "No address");

// ─── Sub-components ───────────────────────────────────────────────────────────
const Icon = ({ name, size = 14, style = {} }) => (
  <i className={`ti ti-${name}`} style={{ fontSize: `${size}px`, ...style }} aria-hidden="true" />
);

const DetailBox = ({ icon, label, value, full = false }) => (
  <div className={`sm-detail-box${full ? " sm-detail-full" : ""}`}>
    <p className="sm-detail-label">
      <Icon name={icon} />
      {label}
    </p>
    <p className="sm-detail-value">{value}</p>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const ShowMedical = () => {
  const navigate = useNavigate();

  const [medicalList,     setMedicalList]     = useState([]);
  const [selectedMedical, setSelectedMedical] = useState(null);
  const [loading,         setLoading]         = useState(true);

  useEffect(() => {
    verifyAndLoad();
  }, []);

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
      const { data } = await axios.get("https://medicine-finder-1-zwuu.onrender.com/showmedical");
      setMedicalList(data);
      if (data.length > 0) setSelectedMedical(data[0]);
    } catch (err) {
      console.error("Failed to fetch medical list:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectedEmail = getEmail(selectedMedical);

  return (
    <>
      <style>{PAGE_CSS}</style>
      <AdminNavbar />

      <div className="sm-page">
        <div className="sm-body">

          {/* ── Sidebar ── */}
          <div className="sm-sidebar">
            <div className="sm-sidebar-header">
              <p className="sm-sidebar-title">Medical stores</p>
              <span className="sm-count-pill">{medicalList.length} records</span>
            </div>

            {loading ? (
              <div className="sm-empty-sidebar">Loading…</div>
            ) : medicalList.length === 0 ? (
              <div className="sm-empty-sidebar">No stores found.</div>
            ) : (
              medicalList.map(m => {
                const email    = getEmail(m);
                const isActive = selectedEmail === email;
                return (
                  <div
                    key={m._id ?? email}
                    className={`sm-store-item${isActive ? " active" : ""}`}
                    onClick={() => setSelectedMedical(m)}
                  >
                    <div className="sm-store-avatar">
                      {getMedicalName(m).charAt(0).toUpperCase()}
                    </div>
                    <div className="sm-store-meta">
                      <p className="sm-store-name">{getMedicalName(m)}</p>
                      <p className="sm-store-owner">{getOwnerName(m)}</p>
                    </div>
                    <Icon name="chevron-right" size={14} style={{ color: "#14b8a6", opacity: isActive ? 1 : 0, flexShrink: 0, transition: "opacity 0.12s" }} />
                  </div>
                );
              })
            )}
          </div>

          {/* ── Main panel ── */}
          <div className="sm-main">
            <div className="sm-main-header">
              <div>
                <h3>Medical directory</h3>
                <p>Select a store from the list to view full details.</p>
              </div>
              {selectedMedical && (
                <div className="sm-active-pill">
                  <div className="dot" />
                  Active store
                </div>
              )}
            </div>

            {loading ? (
              <div className="sm-loading">
                <div className="spinner-border spinner-border-sm text-secondary" />
                Loading stores…
              </div>
            ) : !selectedMedical ? (
              <div className="sm-empty">
                <div className="sm-empty-icon">
                  <Icon name="building-hospital" size={28} style={{ color: "#94a3b8" }} />
                </div>
                <h5>No store selected</h5>
                <p>Select a medical store from the sidebar to view its details.</p>
              </div>
            ) : (
              <>
                <div className="sm-content">
                  {/* Hero strip */}
                  <div className="sm-hero">
                    <div className="sm-hero-avatar">
                      {getMedicalName(selectedMedical).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="sm-hero-name">{getMedicalName(selectedMedical)}</p>
                      <p className="sm-hero-sub">
                        Verified &nbsp;·&nbsp; Licensed store &nbsp;·&nbsp; {getLicenceNumber(selectedMedical)}
                      </p>
                    </div>
                  </div>

                  {/* Detail grid */}
                  <div className="sm-detail-grid">
                    <DetailBox icon="user"         label="Owner name"     value={getOwnerName(selectedMedical)}     />
                    <DetailBox icon="phone"        label="Contact"        value={getContact(selectedMedical)}       />
                    <DetailBox icon="shield-check" label="Licence number" value={getLicenceNumber(selectedMedical)} />
                    <DetailBox icon="mail"         label="Email"          value={getEmail(selectedMedical)}         />
                    <DetailBox icon="map-pin"      label="Address"        value={getAddress(selectedMedical)} full  />
                  </div>
                </div>

                {/* Action bar */}
                <div className="sm-action-bar">
                  <div className="sm-status">
                    <div className="dot" />
                    Account active
                  </div>
                  <div className="sm-btn-row">
                    <button
                      className="sm-btn-edit"
                      onClick={() => navigate(`/editmedical/${getEmail(selectedMedical)}`)}
                    >
                      <Icon name="edit" size={14} /> Update
                    </button>
                    <button
                      className="sm-btn-del"
                      onClick={() => navigate(`/deletemedical/${getEmail(selectedMedical)}`)}
                    >
                      <Icon name="trash" size={14} /> Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default ShowMedical;