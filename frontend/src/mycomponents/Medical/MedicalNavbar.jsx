import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const NAV_ITEMS = [
  {
    to: "/medicalhome",
    label: "Home",
    icon: "🏠",
  },
  {
    to: "/insertmedicine",
    label: "Add Medicine",
    icon: "➕",
  },
  {
    to: "/showmedicine",
    label: "Medicines",
    icon: "💊",
  },
];

const MedicalNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setDrawerOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Prevent body scrolling when mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const handleNavigation = (path) => {
    setDrawerOpen(false);
    setDropdownOpen(false);
    navigate(path);
  };

  const handleLogoutClick = () => {
    setDrawerOpen(false);
    setDropdownOpen(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    if (logoutLoading) {
      return;
    }

    try {
      setLogoutLoading(true);

      await axios.get(
        "https://medicine-finder-1-zwuu.onrender.com/logout"
      );

      setShowLogoutModal(false);

      // Show success toast
      setShowLogoutToast(true);

      // Give toast enough time to be visible
      setTimeout(() => {
        window.location.replace("/login");
      }, 1800);

    } catch (err) {
      console.log(err);
      setLogoutLoading(false);
    }
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <style>{`
                /* ==============================
                   MEDICAL NAVBAR
                ============================== */

                .mnav-root,
                .mnav-root * {
                    box-sizing: border-box;
                }

                .mnav-root {
                    width: 100%;
                    position: sticky;
                    top: 0;
                    z-index: 1050;
                    font-family: Arial, sans-serif;
                }



                                  /* ==============================
                    LOGOUT SUCCESS TOAST
                  ============================== */

                  .mnav-toast {
                      position: fixed;
                      top: 78px;
                      right: 20px;
                      z-index: 3000;

                      min-width: 290px;
                      max-width: 380px;

                      background: #ffffff;
                      border: 1px solid #bbf7d0;
                      border-left: 5px solid #16a34a;

                      border-radius: 12px;

                      padding: 14px 16px;

                      display: flex;
                      align-items: center;
                      gap: 12px;

                      box-shadow:
                          0 12px 35px rgba(15, 23, 42, 0.18);

                      animation: mnavToastIn 0.3s ease;
                  }

                  .mnav-toast-icon {
                      width: 36px;
                      height: 36px;
                      min-width: 36px;

                      border-radius: 50%;

                      background: #dcfce7;
                      color: #15803d;

                      display: flex;
                      align-items: center;
                      justify-content: center;

                      font-size: 18px;
                      font-weight: 800;
                  }

                  .mnav-toast-content {
                      min-width: 0;
                  }

                  .mnav-toast-title {
                      color: #166534;
                      font-size: 14px;
                      font-weight: 800;
                      margin-bottom: 2px;
                  }

                  .mnav-toast-text {
                      color: #64748b;
                      font-size: 12px;
                      line-height: 1.4;
                  }

                  @keyframes mnavToastIn {
                      from {
                          opacity: 0;
                          transform: translateX(30px);
                      }

                      to {
                          opacity: 1;
                          transform: translateX(0);
                      }
                  }

                  @media (max-width: 500px) {

                      .mnav-toast {
                          top: 70px;
                          left: 12px;
                          right: 12px;
                          min-width: auto;
                          width: auto;
                      }
                  }



                /* ==============================
                   NAVBAR
                ============================== */

                .mnav-bar {
                    width: 100%;
                    min-height: 62px;
                    background: #0c1428;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 0 24px;
                    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
                }

                /* ==============================
                   BRAND
                ============================== */

                .mnav-brand {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    min-width: 0;
                    flex-shrink: 0;
                    text-decoration: none;
                    color: white;
                    cursor: pointer;
                }

                .mnav-brand-icon {
                    width: 40px;
                    height: 40px;
                    min-width: 40px;
                    border-radius: 10px;
                    background: #0ea5e9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    box-shadow: 0 4px 12px rgba(14, 165, 233, 0.25);
                }

                .mnav-brand-text {
                    min-width: 0;
                    line-height: 1.1;
                }

                .mnav-brand-name {
                    color: white;
                    font-size: 18px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .mnav-brand-tag {
                    color: #94a3b8;
                    font-size: 10px;
                    margin-top: 3px;
                    white-space: nowrap;
                }

                /* ==============================
                   DESKTOP NAV LINKS
                ============================== */

                .mnav-links {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-left: 12px;
                }

                .mnav-link {
                    min-height: 40px;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 0 13px;
                    border-radius: 8px;
                    color: #cbd5e1;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                }

                .mnav-link:hover {
                    color: white;
                    background: rgba(255, 255, 255, 0.08);
                }

                .mnav-link.active {
                    color: white;
                    background: #0ea5e9;
                    box-shadow: 0 4px 10px rgba(14, 165, 233, 0.2);
                }

                .mnav-link-icon {
                    font-size: 16px;
                    line-height: 1;
                }

                /* ==============================
                   RIGHT SIDE
                ============================== */

                .mnav-right {
                    margin-left: auto;
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                }

                /* ==============================
                   AVATAR
                ============================== */

                .mnav-profile {
                    position: relative;
                }

                .mnav-avatar-btn {
                    width: 40px;
                    height: 40px;
                    border: none;
                    border-radius: 50%;
                    background: #1e293b;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 19px;
                    transition: 0.2s ease;
                }

                .mnav-avatar-btn:hover {
                    background: #263449;
                    transform: translateY(-1px);
                }

                /* ==============================
                   DESKTOP DROPDOWN
                ============================== */

                .mnav-dropdown {
                    position: absolute;
                    top: calc(100% + 10px);
                    right: 0;
                    width: 205px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
                    padding: 7px;
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                }

                .mnav-dropdown-item {
                    width: 100%;
                    min-height: 44px;
                    border: none;
                    background: transparent;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 0 12px;
                    color: #1e293b;
                    font-size: 14px;
                    cursor: pointer;
                    text-align: left;
                    transition: 0.2s ease;
                }

                .mnav-dropdown-item:hover {
                    background: #f1f5f9;
                }

                .mnav-dropdown-item.logout {
                    color: #dc2626;
                }

                .mnav-dropdown-item.logout:hover {
                    background: #fef2f2;
                }

                /* ==============================
                   HAMBURGER
                ============================== */

                .mnav-menu-btn {
                    display: none;
                    width: 40px;
                    height: 40px;
                    min-width: 40px;
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 9px;
                    background: #17223a;
                    color: white;
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
                    font-size: 21px;
                    transition: 0.2s ease;
                }

                .mnav-menu-btn:hover {
                    background: #24324e;
                }

                /* ==============================
                   MOBILE DRAWER
                ============================== */

                .mnav-drawer {
                    display: none;
                    width: 100%;
                    background: #101a31;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
                }

                .mnav-drawer-inner {
                    padding: 10px 14px 14px;
                }

                .mnav-mobile-link {
                    width: 100%;
                    min-height: 52px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 0 14px;
                    margin-bottom: 5px;
                    border-radius: 9px;
                    color: #cbd5e1;
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 600;
                    transition: 0.2s ease;
                }

                .mnav-mobile-link:hover {
                    background: rgba(255, 255, 255, 0.07);
                    color: white;
                }

                .mnav-mobile-link.active {
                    background: #0ea5e9;
                    color: white;
                }

                .mnav-mobile-icon {
                    width: 24px;
                    text-align: center;
                    font-size: 18px;
                }

                .mnav-mobile-divider {
                    height: 1px;
                    background: rgba(255, 255, 255, 0.1);
                    margin: 8px 0;
                }

                .mnav-mobile-action {
                    width: 100%;
                    min-height: 52px;
                    border: none;
                    background: transparent;
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 0 14px;
                    color: #cbd5e1;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    text-align: left;
                }

                .mnav-mobile-action:hover {
                    background: rgba(255, 255, 255, 0.07);
                    color: white;
                }

                .mnav-mobile-action.logout {
                    color: #fca5a5;
                }

                .mnav-mobile-action.logout:hover {
                    background: rgba(220, 38, 38, 0.1);
                }

                /* ==============================
                   LOGOUT MODAL
                ============================== */

                .mnav-modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 2000;
                    background: rgba(0, 0, 0, 0.58);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }

                .mnav-modal {
                    width: 100%;
                    max-width: 400px;
                    background: white;
                    border-radius: 16px;
                    padding: 25px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    text-align: center;
                }

                .mnav-modal-icon {
                    width: 52px;
                    height: 52px;
                    margin: 0 auto 14px;
                    border-radius: 50%;
                    background: #fef2f2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                }

                .mnav-modal-title {
                    margin: 0 0 8px;
                    color: #0f172a;
                    font-size: 20px;
                    font-weight: 700;
                }

                .mnav-modal-text {
                    margin: 0 0 22px;
                    color: #64748b;
                    font-size: 14px;
                    line-height: 1.5;
                }

                .mnav-modal-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                }

                .mnav-modal-btn {
                    min-height: 42px;
                    padding: 0 18px;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                }

                .mnav-modal-cancel {
                    background: #e2e8f0;
                    color: #334155;
                }

                .mnav-modal-cancel:hover {
                    background: #cbd5e1;
                }

                .mnav-modal-confirm {
                    background: #dc2626;
                    color: white;
                }

                .mnav-modal-confirm:hover {
                    background: #b91c1c;
                }

                .mnav-modal-confirm:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                /* ==============================
                   TABLET
                ============================== */

                @media (max-width: 900px) {
                    .mnav-bar {
                        padding: 0 18px;
                        gap: 14px;
                    }

                    .mnav-links {
                        gap: 2px;
                        margin-left: 4px;
                    }

                    .mnav-link {
                        padding: 0 9px;
                        font-size: 13px;
                    }

                    .mnav-link-icon {
                        font-size: 15px;
                    }
                }

                /* ==============================
                   MOBILE
                ============================== */

                @media (max-width: 768px) {
                    .mnav-bar {
                        min-height: 60px;
                        padding: 0 14px;
                        gap: 10px;
                    }

                    .mnav-links {
                        display: none;
                    }

                    .mnav-profile {
                        display: none;
                    }

                    .mnav-menu-btn {
                        display: flex;
                    }

                    .mnav-drawer {
                        display: block;
                    }

                    .mnav-brand {
                        flex: 1;
                        min-width: 0;
                    }

                    .mnav-brand-name {
                        font-size: 17px;
                    }

                    .mnav-brand-tag {
                        font-size: 9px;
                    }

                    .mnav-right {
                        margin-left: 0;
                    }
                }

                /* ==============================
                   SMALL MOBILE
                ============================== */

                @media (max-width: 400px) {
                    .mnav-bar {
                        padding: 0 10px;
                    }

                    .mnav-brand-icon {
                        width: 36px;
                        height: 36px;
                        min-width: 36px;
                        font-size: 18px;
                    }

                    .mnav-brand-name {
                        font-size: 15px;
                    }

                    .mnav-brand-tag {
                        font-size: 8px;
                    }

                    .mnav-menu-btn {
                        width: 38px;
                        height: 38px;
                        min-width: 38px;
                    }

                    .mnav-drawer-inner {
                        padding-left: 10px;
                        padding-right: 10px;
                    }

                    .mnav-modal {
                        padding: 20px 16px;
                    }

                    .mnav-modal-actions {
                        flex-direction: column-reverse;
                    }

                    .mnav-modal-btn {
                        width: 100%;
                    }
                }

                /* ==============================
                   VERY SMALL DEVICES
                ============================== */

                @media (max-width: 340px) {
                    .mnav-brand-tag {
                        display: none;
                    }

                    .mnav-brand-name {
                        font-size: 14px;
                    }
                }
            `}</style>

      <nav className="mnav-root">
        {/* ==============================
                    TOP NAVBAR
                ============================== */}
        <div className="mnav-bar">

          {/* Brand */}
          <div
            className="mnav-brand"
            onClick={() => handleNavigation("/medicalhome")}
          >
            <div className="mnav-brand-icon">
              💊
            </div>

            <div className="mnav-brand-text">
              <div className="mnav-brand-name">
                Medicine Finder
              </div>

              <div className="mnav-brand-tag">
                Medical Store Panel
              </div>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="mnav-links">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `mnav-link ${isActive ? "active" : ""
                  }`
                }
              >
                <span className="mnav-link-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="mnav-right">

            {/* Desktop Profile */}
            <div
              className="mnav-profile"
              ref={dropdownRef}
            >
              <button
                type="button"
                className="mnav-avatar-btn"
                onClick={() =>
                  setDropdownOpen(
                    !dropdownOpen
                  )
                }
                aria-label="Open account menu"
                aria-expanded={dropdownOpen}
              >
                👤
              </button>

              {dropdownOpen && (
                <div className="mnav-dropdown">

                  <button
                    type="button"
                    className="mnav-dropdown-item"
                    onClick={() =>
                      handleNavigation(
                        "/medicalchangepassword"
                      )
                    }
                  >
                    🔐
                    <span>
                      Change Password
                    </span>
                  </button>

                  <button
                    type="button"
                    className="mnav-dropdown-item logout"
                    onClick={handleLogoutClick}
                  >
                    🚪
                    <span>
                      Log Out
                    </span>
                  </button>

                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="mnav-menu-btn"
              onClick={() =>
                setDrawerOpen(!drawerOpen)
              }
              aria-label={
                drawerOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* ==============================
                    MOBILE DRAWER
                ============================== */}
        {drawerOpen && (
          <div className="mnav-drawer">
            <div className="mnav-drawer-inner">

              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `mnav-mobile-link ${isActive
                      ? "active"
                      : ""
                    }`
                  }
                >
                  <span className="mnav-mobile-icon">
                    {item.icon}
                  </span>

                  <span>
                    {item.label}
                  </span>
                </NavLink>
              ))}

              <div className="mnav-mobile-divider"></div>

              <button
                type="button"
                className="mnav-mobile-action"
                onClick={() =>
                  handleNavigation(
                    "/medicalchangepassword"
                  )
                }
              >
                <span className="mnav-mobile-icon">
                  🔐
                </span>

                <span>
                  Change Password
                </span>
              </button>

              <button
                type="button"
                className="mnav-mobile-action logout"
                onClick={handleLogoutClick}
              >
                <span className="mnav-mobile-icon">
                  🚪
                </span>

                <span>
                  Log Out
                </span>
              </button>

            </div>
          </div>
        )}
      </nav>




      {/* ==============================
    LOGOUT SUCCESS TOAST
================================ */}

      {showLogoutToast && (
        <div className="mnav-toast">

          <div className="mnav-toast-icon">
            ✓
          </div>

          <div className="mnav-toast-content">

            <div className="mnav-toast-title">
              Logout Successful
            </div>

            <div className="mnav-toast-text">
              You have been successfully logged out.
            </div>

          </div>

        </div>
      )}



      {/* ==============================
                LOGOUT MODAL
            ============================== */}
      {showLogoutModal && (
        <div
          className="mnav-modal-overlay"
          onClick={closeLogoutModal}
        >
          <div
            className="mnav-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="mnav-modal-icon">
              🚪
            </div>

            <h3 className="mnav-modal-title">
              Logout
            </h3>

            <p className="mnav-modal-text">
              Are you sure you want to logout
              from your medical account?
            </p>

            <div className="mnav-modal-actions">

              <button
                type="button"
                className="mnav-modal-btn mnav-modal-cancel"
                onClick={closeLogoutModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="mnav-modal-btn mnav-modal-confirm"
                onClick={confirmLogout}
                disabled={logoutLoading}
              >
                {logoutLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />

                    Logging out...
                  </>
                ) : (
                  "Yes, Logout"
                )}
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MedicalNavbar;