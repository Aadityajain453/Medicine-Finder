import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MyNavbar from "./GeneralNavbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .mh-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, rgba(14, 165, 233, 0.12), transparent 40%),
            radial-gradient(circle at bottom left, rgba(34, 197, 94, 0.12), transparent 40%),
            linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f0fdf4 100%);
          font-family: 'Inter', sans-serif;
          color: #0f172a;
          overflow-x: hidden;
        }

        /* Hero Section */
        .mh-hero {
          position: relative;
          padding: 120px 22px 140px;
          text-align: center;
          max-width: 1200px;
          margin: 0 auto;
          z-index: 2;
        }

        .mh-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: #e0f2fe;
          color: #0369a1;
          border: 1px solid #bae6fd;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .mh-title {
          font-size: clamp(2.5rem, 6.5vw, 4.8rem);
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -1.8px;
          color: #0f172a;
          margin-bottom: 24px;
        }

        .mh-title span {
          background: linear-gradient(135deg, #2563eb, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .mh-subtitle {
          max-width: 680px;
          margin: 0 auto 42px;
          color: #475569;
          font-size: 18px;
          line-height: 32px;
          font-weight: 500;
        }

        /* Premium Buttons */
        .mh-btn-group {
          display: flex;
          justify-content: center;
          gap: 18px;
        }

        .mh-btn-primary {
          padding: 18px 36px;
          font-size: 16px;
          font-weight: 800;
          border-radius: 18px;
          border: none;
          background: linear-gradient(135deg, #2563eb, #16a34a);
          color: white;
          cursor: pointer;
          box-shadow: 0 15px 35px rgba(37, 99, 235, 0.3);
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mh-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.45);
        }

        .mh-btn-secondary {
          padding: 18px 36px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 18px;
          border: 1px solid #cbd5e1;
          background: rgba(255, 255, 255, 0.8);
          color: #334155;
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mh-btn-secondary:hover {
          background: #ffffff;
          border-color: #94a3b8;
          transform: translateY(-1px);
        }

        /* Stats Section */
        .mh-stats-container {
          max-width: 1100px;
          margin: -40px auto 80px;
          padding: 0 22px;
          position: relative;
          z-index: 5;
        }

        .mh-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #e2e8f0;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.7);
        }

        .mh-stat-card {
          background: rgba(255, 255, 255, 0.9);
          padding: 35px 24px;
          text-align: center;
          backdrop-filter: blur(12px);
        }

        .mh-stat-num {
          font-size: 38px;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 6px;
          background: linear-gradient(135deg, #1e40af, #15803d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .mh-stat-label {
          font-size: 13px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        /* Features Section */
        .mh-features {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 22px 100px;
        }

        .mh-sec-tag {
          text-align: center;
          color: #16a34a;
          font-weight: 900;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
        }

        .mh-sec-title {
          text-align: center;
          font-size: 36px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -1px;
          margin-bottom: 55px;
        }

        .mh-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }

        .mh-card {
          background: white;
          padding: 40px 32px;
          border-radius: 28px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          position: relative;
        }

        .mh-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px rgba(15, 23, 42, 0.08);
          border-color: #dbeafe;
        }

        .mh-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 24px;
        }

        .mh-card-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .mh-card-text {
          font-size: 15px;
          line-height: 25px;
          color: #475569;
          font-weight: 500;
        }

        /* Bottom CTA Banner */
        .mh-cta-section {
          max-width: 1200px;
          margin: 0 auto 100px;
          padding: 0 22px;
        }

        .mh-cta-box {
          background: linear-gradient(135deg, #1e3a8a 0%, #064e3b 100%);
          border-radius: 32px;
          padding: 60px 40px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(15, 23, 42, 0.15);
        }

        .mh-cta-box::before {
          content: "";
          position: absolute;
          width: 250px;
          height: 250px;
          background: rgba(34, 197, 94, 0.15);
          border-radius: 50%;
          top: -90px;
          right: -50px;
          filter: blur(40px);
        }

        .mh-cta-title {
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 14px;
          letter-spacing: -0.5px;
        }

        .mh-cta-text {
          font-size: 16px;
          max-width: 540px;
          margin: 0 auto 32px;
          opacity: 0.85;
          line-height: 26px;
        }

        .mh-cta-btn {
          padding: 16px 36px;
          font-size: 15px;
          font-weight: 800;
          border-radius: 14px;
          border: none;
          background: #ffffff;
          color: #1e3a8a;
          cursor: pointer;
          transition: 0.22s ease;
        }

        .mh-cta-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
        }

        /* Footer Section */
        .mh-footer {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #eff6ff 100%);
          border-top: 1px solid #dbeafe;
          padding: 60px 22px 25px;
        }

        .mh-footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .mh-footer-box {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid #e2e8f0;
          border-radius: 30px;
          padding: 40px;
          box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
        }

        .mh-footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 35px;
          align-items: start;
        }

        .mh-footer-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
        }

        .mh-footer-logo {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          background: linear-gradient(135deg, #2563eb, #16a34a);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          box-shadow: 0 12px 28px rgba(37, 99, 235, 0.25);
        }

        .mh-footer-title {
          font-size: 24px;
          font-weight: 900;
          color: #0f172a;
          margin: 0;
        }

        .mh-footer-subtitle {
          font-size: 14px;
          color: #64748b;
          margin: 3px 0 0;
          font-weight: 600;
        }

        .mh-footer-text {
          color: #475569;
          font-size: 15px;
          line-height: 26px;
          font-weight: 500;
          max-width: 430px;
        }

        .mh-footer-heading {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 18px;
        }

        .mh-footer-link {
          display: block;
          color: #475569;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 12px;
          text-decoration: none;
          transition: 0.25s ease;
        }

        .mh-footer-link:hover {
          color: #16a34a;
          transform: translateX(4px);
        }

        .mh-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
          color: #475569;
          font-size: 15px;
          font-weight: 600;
        }

        .mh-contact-icon {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: #ecfdf5;
          color: #16a34a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mh-footer-bottom {
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .mh-footer-copy {
          color: #64748b;
          font-size: 14px;
          font-weight: 600;
          margin: 0;
        }

        .mh-footer-made {
          color: #0f172a;
          font-size: 14px;
          font-weight: 800;
          margin: 0;
        }

        /* Responsive Fixes */
        @media (max-width: 768px) {
          .mh-hero {
            padding: 80px 16px 100px;
          }

          .mh-btn-group {
            flex-direction: column;
            gap: 14px;
          }

          .mh-btn-primary,
          .mh-btn-secondary {
            width: 100%;
          }

          .mh-stats-grid {
            grid-template-columns: 1fr;
          }

          .mh-stat-card {
            border-bottom: 1px solid #e2e8f0;
          }

          .mh-stat-card:last-child {
            border-bottom: none;
          }

          .mh-cta-box {
            padding: 45px 20px;
          }

          .mh-footer-box {
            padding: 28px 22px;
          }

          .mh-footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .mh-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="mh-page">
        <MyNavbar />

        {/* Hero Area */}
        <section className="mh-hero">
          <div className="mh-badge">
            <span>⚡</span> Smart Healthcare Solution
          </div>

          <h1 className="mh-title">
            Your Digital Bridge To <br />
            <span>Lifesaving Medicines</span>
          </h1>

          <p className="mh-subtitle">
            Ghar baithe check karein ki kaunsi medicine kis medical store par available hai.
            Real-time stock status, sahi daam, aur pharmacy details sab kuch ek click me.
          </p>

          <div className="mh-btn-group">
            <button className="mh-btn-primary" onClick={() => navigate("/search")}>
              Search Medicines Now 🔍
            </button>

            <button className="mh-btn-secondary" onClick={() => navigate("/register-store")}>
              Register Your Medical Store
            </button>
          </div>
        </section>

        {/* Live Counter Section */}
        <div className="mh-stats-container">
          <div className="mh-stats-grid">
            <div className="mh-stat-card">
              <div className="mh-stat-num">15,000+</div>
              <div className="mh-stat-label">Medicines Available</div>
            </div>

            <div className="mh-stat-card">
              <div className="mh-stat-num">450+</div>
              <div className="mh-stat-label">Verified Pharmacies</div>
            </div>

            <div className="mh-stat-card">
              <div className="mh-stat-num">24/7</div>
              <div className="mh-stat-label">Stock Updates</div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <section className="mh-features">
          <div className="mh-sec-tag">Features</div>

          <h2 className="mh-sec-title">Everything You Need In One Place</h2>

          <div className="mh-grid">
            <div className="mh-card">
              <div
                className="mh-icon-wrap"
                style={{ background: "#e0f2fe", color: "#0284c7" }}
              >
                🔍
              </div>

              <h3 className="mh-card-title">Instant Search</h3>

              <p className="mh-card-text">
                Fuzzy and regex search features se medicine ka naam type karte hi accurate live results paayein.
              </p>
            </div>

            <div className="mh-card">
              <div
                className="mh-icon-wrap"
                style={{ background: "#fef08a", color: "#a16207" }}
              >
                📊
              </div>

              <h3 className="mh-card-title">Live Stock Alerts</h3>

              <p className="mh-card-text">
                Medicine 'In Stock' hai, 'Low Stock' hai ya 'Out of Stock', card par instantly check karein.
              </p>
            </div>

            <div className="mh-card">
              <div
                className="mh-icon-wrap"
                style={{ background: "#dcfce7", color: "#16a34a" }}
              >
                🏪
              </div>

              <h3 className="mh-card-title">Store Connectivity</h3>

              <p className="mh-card-text">
                Medical owner ka naam, accurate contact details aur address directly map access ke sath payein.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="mh-cta-section">
          <div className="mh-cta-box">
            <h2 className="mh-cta-title">Are you a Medical Store Owner?</h2>

            <p className="mh-cta-text">
              Apne store ki medicines ko humari registry par list karein aur apne local area ke
              thousands of customers tak direct apni sales badhayein.
            </p>

            <button className="mh-cta-btn" onClick={() => navigate("/register-store")}>
              Get Started for Free
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mh-footer">
          <div className="mh-footer-container">
            <div className="mh-footer-box">
              <div className="mh-footer-grid">
                {/* Brand Info */}
                <div>
                  <div className="mh-footer-brand">
                    <div className="mh-footer-logo">💊</div>

                    <div>
                      <h3 className="mh-footer-title">Medicine Finder</h3>
                      <p className="mh-footer-subtitle">Smart Healthcare Solution</p>
                    </div>
                  </div>

                  <p className="mh-footer-text">
                    Medicine Finder helps users search available medicines, check stock
                    status, and connect with nearby verified medical stores easily.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="mh-footer-heading">Quick Links</h4>

                  <Link to="/" className="mh-footer-link">Home</Link>
                  <Link to="/search" className="mh-footer-link">Search Medicines</Link>
                  <Link to="/login" className="mh-footer-link">Login</Link>
                  <Link to="/register-store" className="mh-footer-link">Register Store</Link>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="mh-footer-heading">Developer Contact</h4>

                  <div className="mh-contact-item">
                    <span className="mh-contact-icon">👤</span>
                    <span>Aditya Jain</span>
                  </div>

                  <div className="mh-contact-item">
                    <span className="mh-contact-icon">📧</span>
                    <span>aj4890275@gmail.com</span>
                  </div>

                  <div className="mh-contact-item">
                    <span className="mh-contact-icon">📞</span>
                    <span>7339708591</span>
                  </div>
                </div>
              </div>

              <div className="mh-footer-bottom">
                <p className="mh-footer-copy">
                  © 2026 Medicine Finder. All rights reserved.
                </p>

                <p className="mh-footer-made">
                  Developed by Aditya Jain
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;

