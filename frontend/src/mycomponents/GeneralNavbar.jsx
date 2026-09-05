
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link, useLocation } from "react-router-dom"; // 1. Added useLocation hook

function MyNavbar() {
  const location = useLocation(); // 2. Get the current active path

  // Helper function to check if the path is active
  const isActive = (path) => location.pathname === path;

  // Dynamic style function for standard links
  const getNavLinkStyle = (path) => ({
    color: isActive(path) ? "#22c55e" : "#cbd5e1",
    background: isActive(path) ? "rgba(34, 197, 94, 0.12)" : "transparent",
    border: isActive(path) ? "1px solid rgba(34, 197, 94, 0.25)" : "1px solid transparent",
    borderRadius: "12px",
    transition: "all 0.25s ease",
    fontWeight: "600",
    fontSize: "15px",
    letterSpacing: "0.2px",
  });

  const handleHover = (e, path) => {
    // Hover logic doesn't override active link styling background completely
    e.currentTarget.style.background = isActive(path)
      ? "rgba(34, 197, 94, 0.2)"
      : "rgba(255, 255, 255, 0.08)";
    e.currentTarget.style.color = isActive(path) ? "#22c55e" : "#ffffff";
    e.currentTarget.style.transform = "translateY(-1px)";
  };

  const handleLeave = (e, path) => {
    e.currentTarget.style.background = isActive(path)
      ? "rgba(34, 197, 94, 0.12)"
      : "transparent";
    e.currentTarget.style.color = isActive(path) ? "#22c55e" : "#cbd5e1";
    e.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="py-3"
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.25)",
        zIndex: 999,
      }}
    >
      <Container fluid className="px-3 px-md-5">
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold d-flex align-items-center gap-3 text-white"
          style={{ textDecoration: "none" }}
        >
          <span
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "#ffffff",
              fontWeight: "900",
              fontSize: "22px",
              boxShadow: "0 8px 24px rgba(34, 197, 94, 0.35)",
            }}
          >
            💊
          </span>

          <span className="d-flex flex-column lh-sm">
            <span
              style={{
                fontSize: "22px",
                fontWeight: "800",
                background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.3px",
              }}
            >
              Medicine Finder
            </span>
            <small
              style={{
                color: "#94a3b8",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                marginTop: "1px",
              }}
            >
              Smart Medical Portal
            </small>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="medicineNavbar"
          style={{
            backgroundColor: "#ffffff",
            border: "none",
            borderRadius: "12px",
            padding: "6px 10px",
            boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)",
          }}
        />

        <Navbar.Collapse id="medicineNavbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-1 mt-4 mt-lg-0">
            <Nav.Link
              as={Link}
              to="/"
              className="px-3 py-2"
              style={getNavLinkStyle("/")}
              onMouseEnter={(e) => handleHover(e, "/")}
              onMouseLeave={(e) => handleLeave(e, "/")}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/search"
              className="px-3 py-2"
              style={getNavLinkStyle("/search")}
              onMouseEnter={(e) => handleHover(e, "/search")}
              onMouseLeave={(e) => handleLeave(e, "/search")}
            >
              Search Medicine
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/about"
              className="px-3 py-2"
              style={getNavLinkStyle("/about")}
              onMouseEnter={(e) => handleHover(e, "/about")}
              onMouseLeave={(e) => handleLeave(e, "/about")}
            >
              About
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/contact"
              className="px-3 py-2"
              style={getNavLinkStyle("/contact")}
              onMouseEnter={(e) => handleHover(e, "/contact")}
              onMouseLeave={(e) => handleLeave(e, "/contact")}
            >
              Contact
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/login"
              className="fw-bold px-4 py-2 ms-lg-3 text-center"
              style={{
                background: isActive("/login")
                  ? "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
                  : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                color: "#ffffff",
                borderRadius: "24px",
                boxShadow: isActive("/login")
                  ? "0 4px 12px rgba(34, 197, 94, 0.2)"
                  : "0 8px 20px rgba(34, 197, 94, 0.3)",
                transition: "all 0.25s ease",
                border: isActive("/login") ? "1px solid #22c55e" : "1px solid rgba(255, 255, 255, 0.1)",
                fontSize: "14px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1.5px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(34, 197, 94, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = isActive("/login")
                  ? "0 4px 12px rgba(34, 197, 94, 0.2)"
                  : "0 8px 20px rgba(34, 197, 94, 0.3)";
              }}
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;