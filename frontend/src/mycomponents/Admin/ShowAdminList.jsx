import axios from "axios";
import { useEffect, useState } from "react";
import AdminNavbar from "./AdmNav";
import { useNavigate } from "react-router-dom";

// ──────────────────────────────────────────────────────────────
// ULTRA-PREMIUM ASYMMETRIC SYSTEM DIRECTORY ARCHITECTURE
// ──────────────────────────────────────────────────────────────

const UNIQUE_LAYOUT_CSS = `
  :root {
    --bg-canvas: #f8fafc;
    --surface-card: #ffffff;
    --border-clean: #e2e8f0;
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --primary-indigo: #4f46e5;
    --primary-indigo-light: #eef2ff;
    --success-emerald: #10b981;
  }

  .directory-workspace {
    min-height: 100vh;
    background-color: var(--bg-canvas);
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: var(--text-primary);
  }

  .split-screen-layout {
    display: grid;
    grid-template-columns: 380px 1fr;
    min-height: calc(100vh - 70px); /* Accounted for navbar height offset */
    background: var(--bg-canvas);
  }

  /* ───────── MASTER COLUMN (LEFT) ───────── */
  .master-pane {
    background: #ffffff;
    border-right: 1px solid var(--border-clean);
    display: flex;
    flex-direction: column;
    height: calc(100vh - 70px);
    position: sticky;
    top: 70px;
  }

  .pane-header {
    padding: 32px 24px 20px 24px;
    border-bottom: 1px solid #f1f5f9;
  }

  .directory-badge {
    display: inline-block;
    background: var(--primary-indigo-light);
    color: var(--primary-indigo);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 6px 14px;
    border-radius: 99px;
    margin-bottom: 14px;
  }

  .pane-header h2 {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 6px 0;
  }

  .pane-header p {
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.5;
  }

  .list-counter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 24px;
    background: #fafafa;
    border-bottom: 1px solid var(--border-clean);
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .scrollable-list-box {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }

  /* ───────── INTERACTIVE LIST ITEMS ───────── */
  .custom-list-item {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    margin-bottom: 8px;
    border-radius: 12px;
    cursor: pointer;
    background: transparent;
    border: 1px solid transparent;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  .custom-list-item:hover {
    background: #f8fafc;
    border-color: #e2e8f0;
  }

  .custom-list-item.is-selected {
    background: #ffffff;
    border-color: var(--border-clean);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
  }

  /* Active Indicator Ribbon Accent */
  .custom-list-item.is-selected::before {
    content: '';
    position: absolute;
    left: 0;
    top: 14px;
    bottom: 14px;
    width: 4px;
    background: var(--primary-indigo);
    border-radius: 0 4px 4px 0;
  }

  .item-avatar {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: #f1f5f9;
    color: var(--text-primary);
    font-weight: 700;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
    transition: all 0.2s;
  }

  .is-selected .item-avatar {
    background: var(--primary-indigo);
    color: #ffffff;
  }

  .item-meta {
    flex: 1;
    min-width: 0;
  }

  .item-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-role {
    font-size: 12px;
    color: var(--text-secondary);
  }

  /* ───────── DETAIL PANE (RIGHT) ───────── */
  .detail-pane {
    padding: 40px;
    overflow-y: auto;
    height: calc(100vh - 70px);
  }

  .detail-card-wrapper {
    max-width: 800px;
    margin: 0 auto;
    background: var(--surface-card);
    border: 1px solid var(--border-clean);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 12px 30px rgba(15,23,42,0.03);
  }

  /* Dynamic Profile Geometric Hero Banner */
  .profile-hero-banner {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    padding: 48px;
    position: relative;
    color: #ffffff;
  }

  .profile-hero-banner::after {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background: radial-gradient(circle at top right, rgba(79, 70, 229, 0.15), transparent 60%);
  }

  .hero-flex-container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .large-profile-avatar {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    font-size: 32px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .hero-meta-data h1 {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 8px 0;
  }

  .status-pill-container {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.08);
    padding: 6px 14px;
    border-radius: 99px;
    width: max-content;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .pulse-indicator {
    width: 8px;
    height: 8px;
    background-color: var(--success-emerald);
    border-radius: 50%;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
  }

  /* Identity Details Presentation Grid */
  .detail-body-content {
    padding: 40px;
  }

  .section-label-header {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--text-secondary);
    margin-bottom: 24px;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 10px;
  }

  .info-asymmetric-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .info-tile-block {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 20px;
    border-radius: 16px;
    transition: border-color 0.2s;
  }

  .info-tile-block:hover {
    border-color: #cbd5e1;
  }

  .tile-meta-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  .tile-main-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    word-break: break-all;
  }

  .span-full-width {
    grid-column: span 2;
  }

  /* Action Operational Bar */
  .operational-footer-bar {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #f1f5f9;
    display: flex;
    justify-content: flex-end;
  }

  .action-trigger-btn {
    background: var(--primary-indigo);
    color: #ffffff;
    border: none;
    font-size: 13px;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .action-trigger-btn:hover {
    background: #4338ca;
  }

  /* ───────── EMPTY & LOADING RE-LAYOUT ───────── */
  .centered-state-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 20px;
    height: 100%;
  }

  .isolated-dashed-box {
    border: 2px dashed #cbd5e1;
    border-radius: 20px;
    background: transparent;
  }

  /* Custom Clean Scrollbars for Left Pane */
  .scrollable-list-box::-webkit-scrollbar {
    width: 5px;
  }
  .scrollable-list-box::-webkit-scrollbar-track {
    background: transparent;
  }
  .scrollable-list-box::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }
  .scrollable-list-box::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Responsive Design Breakers */
  @media (max-width: 1024px) {
    .split-screen-layout {
      grid-template-columns: 1fr;
    }
    .master-pane {
      height: auto;
      position: relative;
      top: 0;
      border-right: none;
      border-bottom: 1px solid var(--border-clean);
    }
    .scrollable-list-box {
      max-height: 300px;
    }
    .detail-pane {
      height: auto;
      padding: 24px;
    }
  }

  @media (max-width: 640px) {
    .info-asymmetric-grid {
      grid-template-columns: 1fr;
    }
    .span-full-width {
      grid-column: span 1;
    }
    .detail-body-content {
      padding: 24px;
    }
    .profile-hero-banner {
      padding: 32px 24px;
    }
    .hero-flex-container {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }
`;

const ShowAdminList = () => {
  const navigate = useNavigate();

  const [adminlist, setAdminList] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    displayAdminData();
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

  const displayAdminData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/showAdminsDetails");
      setAdminList(response.data);

      if (response.data.length > 0) {
        setSelectedAdmin(response.data[0]);
      }
    } catch (error) {
      console.log("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{UNIQUE_LAYOUT_CSS}</style>
      <AdminNavbar />

      <div className="directory-workspace">
        <div className="split-screen-layout">
          
          {/* LEFT SIDE: MASTER INDEX LISTING PANE */}
          <aside className="master-pane">
            <div className="pane-header">
              <span className="directory-badge">Records Directory</span>
              <h2>Administrators</h2>
              <p>Review system operators and execution clearance variables.</p>
            </div>

            <div className="list-counter-bar">
              <span>System Registry Indices</span>
              <span>{adminlist.length} Accounts</span>
            </div>

            <div className="scrollable-list-box">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border spinner-border-sm text-secondary"></div>
                  <p className="text-muted small mt-2">Parsing secure records...</p>
                </div>
              ) : adminlist.length === 0 ? (
                <div className="centered-state-container">
                  <span style={{ fontSize: "24px" }}>📂</span>
                  <h6 className="mt-2 fw-bold text-dark">Directory Void</h6>
                  <p className="text-muted small">No administrative nodes discovered.</p>
                </div>
              ) : (
                adminlist.map((admin) => (
                  <div
                    key={admin.Email}
                    onClick={() => setSelectedAdmin(admin)}
                    className={`custom-list-item ${
                      selectedAdmin?.Email === admin.Email ? "is-selected" : ""
                    }`}
                  >
                    <div className="item-avatar">
                      {admin.Name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="item-meta">
                      <div className="item-name">{admin.Name}</div>
                      <div className="item-role">System Security Node</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>

          {/* RIGHT SIDE: PROFILE CANVAS VIEWER PANE */}
          <main className="detail-pane">
            {selectedAdmin ? (
              <div className="detail-card-wrapper">
                
                {/* CINEMATIC PROFILE BANNER */}
                <div className="profile-hero-banner">
                  <div className="hero-flex-container">
                    <div className="large-profile-avatar">
                      {selectedAdmin.Name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="hero-meta-data">
                      <h1>{selectedAdmin.Name}</h1>
                      <div className="status-pill-container">
                        <div className="pulse-indicator"></div>
                        <span>Security Verified Clearance</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* INFORMATION PRESENTATION TILES */}
                <div className="detail-body-content">
                  <div className="section-label-header">Cryptographic & Contact Properties</div>
                  
                  <div className="info-asymmetric-grid">
                    <div className="info-tile-block">
                      <div className="tile-meta-label">
                        <span>✉️</span> Email
                      </div>
                      <div className="tile-main-value">{selectedAdmin.Email}</div>
                    </div>

                    <div className="info-tile-block">
                      <div className="tile-meta-label">
                        <span>📞</span> Contact Number
                      </div>
                      <div className="tile-main-value">{selectedAdmin.Contact}</div>
                    </div>

                    <div className="info-tile-block span-full-width">
                      <div className="tile-meta-label">
                        <span>📍</span> Registered Address
                      </div>
                      <div className="tile-main-value" style={{ wordBreak: "normal" }}>
                        {selectedAdmin.Address}
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION ACTION TRIGGER BAR */}
                  <div className="operational-footer-bar">
                    <button
                      className="action-trigger-btn"
                      onClick={() => navigate("/adminreg")}
                    >
                      Register New Admin
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="centered-state-container isolated-dashed-box h-100">
                <div>
                  <span style={{ fontSize: "40px" }}>🛡️</span>
                  <h4 className="fw-bold mt-3 text-dark">Data Stream Suspended</h4>
                  <p className="text-muted small">
                    Isolate an identity index pattern node within the directory map to read active data profiles.
                  </p>
                </div>
              </div>
            )}
          </main>

        </div>
      </div>
    </>
  );
};

export default ShowAdminList;