import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

// ─── STYLES ───────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .mnav-root {
    position: sticky;
    top: 0;
    z-index: 1050;
    width: 100%;
    font-family: 'Inter', sans-serif;
  }

  /* ── TOP BAR ── */
  .mnav-bar {
    background: #0c1428;
    border-bottom: 1px solid rgba(20,184,166,0.18);
    height: 62px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    gap: 0;
  }

  /* ── BRAND ── */
  .mnav-brand {
    display: flex;
    align-items: center;
    gap: 11px;
    text-decoration: none;
    flex-shrink: 0;
  }

  .mnav-brand-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, #14b8a6, #0f766e);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    flex-shrink: 0;
    box-shadow: 0 0 0 1px rgba(20,184,166,0.3), 0 4px 12px rgba(20,184,166,0.2);
  }

  .mnav-brand-name {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .mnav-brand-tag {
    font-size: 10px;
    font-weight: 600;
    color: #14b8a6;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1;
    margin-top: 3px;
  }

  /* ── NAV LINKS (desktop) ── */
  .mnav-links {
    display: flex;
    align-items: center;
    gap: 2px;
    margin: 0 auto;
    padding: 5px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
  }

  .mnav-link {
    position: relative;
    font-size: 13px;
    font-weight: 600;
    color: #7a8fa8;
    padding: 7px 18px;
    border-radius: 8px;
    text-decoration: none;
    transition: color 0.18s;
    white-space: nowrap;
    border: 1px solid transparent;
  }

  .mnav-link::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 16px;
    height: 2px;
    border-radius: 2px;
    background: #14b8a6;
    transition: transform 0.2s ease;
  }

  .mnav-link:hover {
    color: #e2e8f0;
  }

  .mnav-link:hover::after {
    transform: translateX(-50%) scaleX(1);
  }

  .mnav-link.active {
    color: #fff;
    background: rgba(20,184,166,0.15);
    border-color: rgba(20,184,166,0.25);
  }

  .mnav-link.active::after {
    transform: translateX(-50%) scaleX(1);
  }

  /* ── RIGHT PANEL ── */
  .mnav-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  /* ── AVATAR DROPDOWN ── */
  .mnav-avatar-wrap {
    position: relative;
  }

  .mnav-avatar-btn {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(20,184,166,0.1);
    border: 1px solid rgba(20,184,166,0.28);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s;
  }

  .mnav-avatar-btn:hover,
  .mnav-avatar-btn[data-open="true"] {
    background: rgba(20,184,166,0.2);
    border-color: #14b8a6;
  }

  .mnav-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background: #111e36;
    border: 1px solid rgba(20,184,166,0.2);
    border-radius: 14px;
    padding: 6px;
    min-width: 200px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    animation: mnav-drop-in 0.15s ease;
    z-index: 200;
  }

  @keyframes mnav-drop-in {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .mnav-dd-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    text-decoration: none;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    transition: background 0.15s, color 0.15s;
  }

  .mnav-dd-item:hover {
    background: rgba(20,184,166,0.12);
    color: #e2e8f0;
  }

  .mnav-dd-item.danger {
    color: #f87171;
  }

  .mnav-dd-item.danger:hover {
    background: rgba(248,113,113,0.1);
    color: #fca5a5;
  }

  .mnav-dd-divider {
    height: 1px;
    background: rgba(20,184,166,0.12);
    margin: 4px 0;
  }

  .mnav-dd-icon {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  /* ── HAMBURGER ── */
  .mnav-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 4.5px;
    width: 36px;
    height: 36px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 9px;
    padding: 8px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .mnav-hamburger span {
    display: block;
    height: 1.5px;
    background: #94a3b8;
    border-radius: 2px;
    transition: transform 0.22s ease, opacity 0.22s ease, width 0.22s ease;
    transform-origin: center;
  }

  .mnav-hamburger[data-open="true"] span:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
    background: #14b8a6;
  }
  .mnav-hamburger[data-open="true"] span:nth-child(2) {
    opacity: 0;
  }
  .mnav-hamburger[data-open="true"] span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
    background: #14b8a6;
  }

  /* ── MOBILE DRAWER ── */
  .mnav-drawer {
    background: #0c1428;
    border-top: 1px solid rgba(20,184,166,0.12);
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .mnav-drawer[data-open="true"] {
    max-height: 400px;
  }

  .mnav-drawer-inner {
    padding: 12px 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .mnav-drawer-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #7a8fa8;
    text-decoration: none;
    border: 1px solid transparent;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .mnav-drawer-link:hover {
    background: rgba(255,255,255,0.04);
    color: #e2e8f0;
  }

  .mnav-drawer-link.active {
    background: rgba(20,184,166,0.12);
    border-color: rgba(20,184,166,0.25);
    color: #fff;
  }

  .mnav-drawer-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
  }

  .mnav-drawer-link.active .mnav-drawer-icon {
    background: rgba(20,184,166,0.2);
  }

  .mnav-drawer-divider {
    height: 1px;
    background: rgba(20,184,166,0.1);
    margin: 4px 0;
  }

  .mnav-drawer-action {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #7a8fa8;
    background: none;
    border: 1px solid transparent;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: background 0.15s, color 0.15s;
  }

  .mnav-drawer-action:hover {
    background: rgba(255,255,255,0.04);
    color: #e2e8f0;
  }

  .mnav-drawer-action.danger {
    color: #f87171;
  }

  .mnav-drawer-action.danger:hover {
    background: rgba(248,113,113,0.08);
  }

  /* ── LOGOUT MODAL ── */
  .mnav-modal-bg {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: mnav-fade-in 0.15s ease;
  }

  @keyframes mnav-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .mnav-modal {
    background: #111e36;
    border: 1px solid rgba(20,184,166,0.2);
    border-radius: 20px;
    padding: 28px;
    max-width: 360px;
    width: 100%;
    animation: mnav-modal-in 0.18s ease;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  }

  @keyframes mnav-modal-in {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .mnav-modal-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(248,113,113,0.12);
    border: 1px solid rgba(248,113,113,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 16px;
  }

  .mnav-modal-title {
    font-size: 16px;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0 0 8px;
  }

  .mnav-modal-body {
    font-size: 13px;
    color: #64748b;
    margin: 0 0 22px;
    line-height: 1.6;
  }

  .mnav-modal-actions {
    display: flex;
    gap: 10px;
  }

  .mnav-modal-cancel {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    cursor: pointer;
    transition: background 0.15s;
  }

  .mnav-modal-cancel:hover {
    background: rgba(255,255,255,0.09);
    color: #e2e8f0;
  }

  .mnav-modal-confirm {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    background: #ef4444;
    border: 1px solid rgba(239,68,68,0.4);
    cursor: pointer;
    transition: background 0.15s;
  }

  .mnav-modal-confirm:hover {
    background: #dc2626;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .mnav-links { display: none; }
    .mnav-hamburger { display: flex; }
    .mnav-avatar-wrap { display: none; }
    .mnav-bar { padding: 0 16px; }
  }

  @media (min-width: 769px) {
    .mnav-drawer { display: none; }
  }
`;

const NAV_ITEMS = [
  { to: "/medicalhome", label: "Home", icon: "🏠" },
  { to: "/insertmedicine", label: "Add Medicine", icon: "➕" },
  { to: "/showmedicine", label: "Medicines", icon: "💊" },
];

const MedicalNavbar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  
const confirmLogout = async () => {
  try {
    await axios.get("http://localhost:5000/logout");

    setShowLogoutModal(false);

    window.location.replace("/login");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      <style>{CSS}</style>

      <nav className="mnav-root">
        {/* ── TOP BAR ── */}
        <div className="mnav-bar">

          {/* Brand */}
          <Link to="/medicalhome" className="mnav-brand">
            <div className="mnav-brand-icon">🧪</div>
            <div>
              <div className="mnav-brand-name">Medicine Finder</div>
              <div className="mnav-brand-tag">Inventory System</div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="mnav-links">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  "mnav-link" + (isActive ? " active" : "")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right panel */}
          <div className="mnav-right">
            {/* Avatar dropdown (desktop) */}
            <div className="mnav-avatar-wrap" ref={dropdownRef}>
              <button
                className="mnav-avatar-btn"
                data-open={dropdownOpen}
                onClick={() => setDropdownOpen((v) => !v)}
                aria-label="Account menu"
              >
                🩺
              </button>

              {dropdownOpen && (
                <div className="mnav-dropdown">
                  <Link
                    to="/updatemedicalpassword"
                    className="mnav-dd-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="mnav-dd-icon">🔐</div>
                    Change password
                  </Link>
                  <div className="mnav-dd-divider" />
                  <button
                    className="mnav-dd-item danger"
                    onClick={() => { setDropdownOpen(false); setShowLogoutModal(true); }}
                  >
                    <div className="mnav-dd-icon">🚪</div>
                    Log out
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger (mobile) */}
            <button
              className="mnav-hamburger"
              data-open={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ── */}
        <div className="mnav-drawer" data-open={drawerOpen}>
          <div className="mnav-drawer-inner">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  "mnav-drawer-link" + (isActive ? " active" : "")
                }
                onClick={() => setDrawerOpen(false)}
              >
                <div className="mnav-drawer-icon">{item.icon}</div>
                {item.label}
              </NavLink>
            ))}

            <div className="mnav-drawer-divider" />

            <button
              className="mnav-drawer-action"
              onClick={() => { setDrawerOpen(false); navigate("/updatemedicalpassword"); }}
            >
              <div className="mnav-drawer-icon">🔐</div>
              Change password
            </button>

            <button
              className="mnav-drawer-action danger"
              onClick={() => { setDrawerOpen(false); setShowLogoutModal(true); }}
            >
              <div className="mnav-drawer-icon">🚪</div>
              Log out
            </button>
          </div>
        </div>
      </nav>

      {/* ── LOGOUT MODAL ── */}
      {showLogoutModal && (
        <div className="mnav-modal-bg" onClick={() => setShowLogoutModal(false)}>
          <div className="mnav-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mnav-modal-icon">🚪</div>
            <h2 className="mnav-modal-title">Log out?</h2>
            <p className="mnav-modal-body">
              You'll be returned to the login screen. Any unsaved changes will be lost.
            </p>
            <div className="mnav-modal-actions">
              <button className="mnav-modal-cancel" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="mnav-modal-confirm" onClick={confirmLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MedicalNavbar;