import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

// ─── Inline CSS injected once ─────────────────────────────────────────────────
const NAVBAR_CSS = `
  .adm-navbar {
    background: #0f172a !important;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
    padding: 0 !important;
    height: 60px;
  }
  .adm-navbar .navbar-toggler {
    border: 0.5px solid rgba(255,255,255,0.15);
    padding: 4px 8px;
    border-radius: 8px;
  }
  .adm-navbar .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255,255,255,0.7)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
  .adm-nav-link {
    color: rgba(255,255,255,0.6) !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    padding: 7px 13px !important;
    border-radius: 8px !important;
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    transition: color 0.15s, background 0.15s !important;
    white-space: nowrap;
    text-decoration: none !important;
  }
  .adm-nav-link:hover {
    color: #fff !important;
    background: rgba(255,255,255,0.07) !important;
  }
 .adm-nav-link.active {
  color: #ffffff !important;
  background: #14b8a6 !important;
  font-weight: 600 !important;
}
  .adm-dropdown .dropdown-toggle {
    color: rgba(255,255,255,0.6) !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    padding: 7px 13px !important;
    border-radius: 8px !important;
    background: transparent !important;
    border: none !important;
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    transition: color 0.15s, background 0.15s !important;
  }
  .adm-dropdown .dropdown-toggle::after { display: none !important; }
  .adm-dropdown .dropdown-toggle:hover,
  .adm-dropdown.show .dropdown-toggle {
    color: #fff !important;
    background: rgba(255,255,255,0.07) !important;
  }
  .adm-dropdown .dropdown-menu {
    background: #fff;
    border: 0.5px solid #e2e8f0;
    border-radius: 10px;
    padding: 4px;
    min-width: 180px;
    margin-top: 6px !important;
    box-shadow: 0 4px 20px rgba(15,23,42,0.12);
  }
  .adm-dropdown .dropdown-item {
    font-size: 13px;
    color: #334155;
    padding: 9px 12px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    gap: 9px;
    transition: background 0.1s;
  }
  .adm-dropdown .dropdown-item:hover {
    background: #f1f5f9;
    color: #0f172a;
  }
  .adm-dropdown .dropdown-item.text-danger {
    color: #dc2626 !important;
  }
  .adm-dropdown .dropdown-item.text-danger:hover {
    background: #fef2f2;
    color: #b91c1c !important;
  }
  .adm-dropdown .dropdown-divider {
    border-color: #f1f5f9;
    margin: 3px 0;
  }
  .adm-nav-sep {
    width: 0.5px;
    height: 20px;
    background: rgba(255,255,255,0.1);
    margin: 0 4px;
    align-self: center;
  }
  .adm-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #1e293b;
    border: 1.5px solid rgba(20,184,166,0.35);
    color: #14b8a6;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.15s;
  }
  .adm-avatar:hover { border-color: rgba(20,184,166,0.7); }

  @media (max-width: 1199px) {
    .adm-navbar { height: auto; padding: 12px 0 !important; }
    .adm-nav-link, .adm-dropdown .dropdown-toggle { width: 100%; }
    .adm-nav-sep { display: none; }
    .adm-dropdown .dropdown-menu { position: static !important; box-shadow: none; border: none; background: rgba(255,255,255,0.04); border-radius: 8px; }
    .adm-dropdown .dropdown-item { color: rgba(255,255,255,0.7); }
    .adm-dropdown .dropdown-item:hover { background: rgba(255,255,255,0.07); color: #fff; }
  }
`;

// ─── Icon helper ──────────────────────────────────────────────────────────────
const Icon = ({ name, style }) => (
  <i className={`ti ti-${name}`} style={{ fontSize: "15px", ...style }} aria-hidden="true" />
);

// ─── Component ────────────────────────────────────────────────────────────────
function AdminNavbar({ adminName = "Admin" }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {

      await axios.get("http://localhost:5000/logout");

      toast.success("Logged out successfully!", {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
          });

      setTimeout(() => {
        window.location.replace("/search");
      }, 800);
    }
  };

  const navLinkStyle = ({ isActive }) =>
    `adm-nav-link${isActive ? " active" : ""}`;

  const initial = adminName.charAt(0).toUpperCase();

  return (
    <>
      {/* Inject styles once */}
      <style>{NAVBAR_CSS}</style>

      <Navbar expand="xl" sticky="top" className="adm-navbar">
        <Container fluid className="px-4 h-100 align-items-center">

          {/* ── Brand ── */}
          <Navbar.Brand
            as={Link}
            to="/adminhome"
            className="d-flex align-items-center gap-2 me-4 text-decoration-none"
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9px",
                background: "#14b8a6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.3px",
                flexShrink: 0,
              }}
            >
              AB
            </div>
            <span style={{ color: "#fff", fontSize: "15px", fontWeight: 600, letterSpacing: "-0.2px" }}>
              Admin<span style={{ color: "#14b8a6" }}>Block</span>
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="adminNavbar" />

          <Navbar.Collapse id="adminNavbar">
            <Nav className="ms-auto align-items-xl-center gap-xl-1 py-2 py-xl-0">

              {/* Home */}
              <NavLink
                to="/adminhome"
                className={({ isActive }) =>
                  isActive ? "adm-nav-link adm-home-active" : "adm-nav-link"
                }
              >
                <Icon name="home" className="" />
                Home
              </NavLink>

              <div className="adm-nav-sep d-none d-xl-block" />

              {/* Admin dropdown */}
              <NavDropdown
                className="adm-dropdown"
                title={
                  <span className="d-flex align-items-center gap-2">
                    <Icon name="user-cog" />
                    Admin
                    <Icon name="chevron-down" style={{ fontSize: "13px", opacity: 0.5 }} />
                  </span>
                }
                id="admin-dropdown"
              >
                <NavDropdown.Item as={Link} to="/adminreg">
                  <Icon name="user-plus" />
                  Register admin
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/showadmin">
                  <Icon name="users" />
                  Show admins
                </NavDropdown.Item>
              </NavDropdown>

              {/* Medical dropdown */}
              <NavDropdown
                className="adm-dropdown"
                title={
                  <span className="d-flex align-items-center gap-2">
                    <Icon name="building-hospital" />
                    Medical
                    <Icon name="chevron-down" style={{ fontSize: "13px", opacity: 0.5 }} />
                  </span>
                }
                id="medical-dropdown"
              >
                <NavDropdown.Item as={Link} to="/medicalreg">
                  <Icon name="plus" />
                  Register medical
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/showmedical">
                  <Icon name="list" />
                  Manage medicals
                </NavDropdown.Item>
              </NavDropdown>

              <div className="adm-nav-sep d-none d-xl-block" />

              {/* Account dropdown */}
              <NavDropdown
                className="adm-dropdown"
                align="end"
                title={
                  <span className="d-flex align-items-center gap-2">
                    <Icon name="settings" />
                    Account
                    <Icon name="chevron-down" style={{ fontSize: "13px", opacity: 0.5 }} />
                  </span>
                }
                id="account-dropdown"
              >
                <NavDropdown.Item as={Link} to="/updatepassword">
                  <Icon name="lock" />
                  Update password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  <Icon name="logout" style={{ color: "#dc2626" }} />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>

              {/* Avatar */}
              <div className="adm-avatar d-none d-xl-flex ms-2" title={adminName}>
                {initial}
              </div>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;