import React from "react";
import MyNavbar from "./GeneralNavbar";

const About = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .ma-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(34, 197, 94, 0.1), transparent 35%),
            radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.1), transparent 35%),
            linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          font-family: 'Inter', sans-serif;
          color: #0f172a;
          padding-bottom: 90px;
        }

        /* Hero Header */
        .ma-hero {
          text-align: center;
          padding: 90px 22px 60px;
          max-width: 900px;
          margin: 0 auto;
        }

        .ma-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: #f3e8ff;
          color: #6b21a8;
          border: 1px solid #e9d5ff;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 22px;
        }

        .ma-title {
          font-size: clamp(2.2rem, 5.5vw, 4rem);
          font-weight: 900;
          letter-spacing: -1.5px;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .ma-title span {
          background: linear-gradient(135deg, #2563eb, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ma-subtitle {
          font-size: 17px;
          color: #475569;
          line-height: 28px;
          max-width: 700px;
          margin: 0 auto;
          font-weight: 500;
        }

        /* Mission Container */
        .ma-container {
          max-width: 1140px;
          margin: 40px auto 0;
          padding: 0 22px;
        }

        .ma-mission-block {
          background: white;
          border-radius: 32px;
          padding: 50px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.05);
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 50px;
          align-items: center;
        }

        .ma-mission-left h3 {
          font-size: 28px;
          font-weight: 900;
          margin-bottom: 18px;
          letter-spacing: -0.5px;
        }

        .ma-mission-left p {
          color: #475569;
          font-size: 16px;
          line-height: 28px;
          margin-bottom: 16px;
        }

        .ma-quote-box {
          background: #f8fafc;
          border-left: 4px solid #16a34a;
          padding: 24px;
          border-radius: 0 20px 20px 0;
        }

        .ma-quote-text {
          font-style: italic;
          color: #334155;
          font-size: 15px;
          line-height: 24px;
          font-weight: 500;
        }

        /* Tech Stack Section */
        .ma-tech-box {
          margin-top: 24px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .ma-tech-badge {
          background: #f1f5f9;
          color: #334155;
          padding: 6px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid #e2e8f0;
        }

        /* Team Section */
        .ma-section-title {
          text-align: center;
          font-size: 32px;
          font-weight: 900;
          margin: 90px 0 45px;
          letter-spacing: -0.8px;
        }

        .ma-team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          max-width: 800px;
          margin: 0 auto;
        }

        .ma-team-card {
          background: white;
          border-radius: 24px;
          padding: 35px 24px;
          text-align: center;
          border: 1px solid #e2e8f0;
          box-shadow: 0 15px 40px rgba(15, 23, 42, 0.04);
          transition: transform 0.25s ease;
        }

        .ma-team-card:hover {
          transform: translateY(-5px);
          border-color: #cbd5e1;
        }

        .ma-avatar-placeholder {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e0f2fe, #dcfce7);
          color: #0f172a;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-weight: 800;
        }

        .ma-team-name {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .ma-team-role {
          font-size: 13px;
          font-weight: 700;
          color: #16a34a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        /* Process Info System */
        .ma-process-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .ma-process-card {
          background: white;
          border-radius: 28px;
          padding: 40px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 45px rgba(15, 23, 42, 0.04);
        }

        .ma-process-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .ma-process-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .ma-process-header h4 {
          font-size: 20px;
          font-weight: 800;
        }

        .ma-steps {
          list-style: none;
        }

        .ma-step-item {
          display: flex;
          gap: 14px;
          margin-bottom: 18px;
          font-size: 15px;
          line-height: 24px;
          color: #475569;
          font-weight: 500;
        }

        .ma-step-num {
          width: 24px;
          height: 24px;
          background: #f1f5f9;
          color: #0f172a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Footer Connection Card */
        .ma-footer-card {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: 28px;
          padding: 45px;
          color: white;
          margin-top: 80px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ma-f-title {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .ma-f-text {
          font-size: 15px;
          opacity: 0.8;
          max-width: 500px;
          margin: 0 auto 28px;
          line-height: 24px;
        }

        .ma-contact-details {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .ma-c-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 600;
        }

        .ma-c-item a {
          color: #38bdf8;
          text-decoration: none;
          font-weight: 700;
        }

        .ma-c-item a:hover {
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .ma-mission-block {
            grid-template-columns: 1fr;
            padding: 32px;
            gap: 30px;
          }
          .ma-process-grid, .ma-team-grid {
            grid-template-columns: 1fr;
          }
          .ma-contact-details {
            flex-direction: column;
            gap: 16px;
            align-items: center;
          }
        }
      `}</style>

      <div className="ma-page">
        <MyNavbar />

        {/* Header Block */}
        <header className="ma-hero">
          <div className="ma-badge">✨ About Our Project</div>
          <h1 className="ma-title">
            Making Healthcare Accessible <br />
            <span>One Click At A Time</span>
          </h1>
          <p className="ma-subtitle">
            Medical Finder is a smart digital initiative engineered to bridge the gap between local 
            pharmacies and consumers through real-time inventory tracking and database connectivity.
          </p>
        </header>

        <main className="ma-container">
          {/* Mission & Story */}
          <section className="ma-mission-block">
            <div className="ma-mission-left">
              <h3>Our Story & Mission</h3>
              <p>
                During medical emergencies or routine healthcare requirements, individuals frequently face the exhaustion of shifting from one local pharmacy to another searching for specific medicines. Delays in obtaining essential prescriptions can lead to critical health complications.
              </p>
              <p>
                Our mission is to eliminate this friction entirely. By bringing decentralized medical inventories onto a unified cloud network, we empower families to check stock availability instantaneously from the comfort of their homes.
              </p>
              
              <div className="ma-tech-box">
                <span className="ma-tech-badge">⚙️ Powered by MERN Stack</span>
                <span className="ma-tech-badge">🌐 MongoDB</span>
                <span className="ma-tech-badge">⚡ Express.js</span>
                <span className="ma-tech-badge">⚛️ React.js</span>
                <span className="ma-tech-badge">🟢 Node.js</span>
              </div>
            </div>
            
            <div className="ma-quote-box">
              <p className="ma-quote-text">
                "Our core objective is to save valuable time and eliminate search frustration for patients, ensuring that the right medicine reaches the right individual without unnecessary delays."
              </p>
              <div style={{ marginTop: "14px", fontSize: "13px", fontWeight: "800", color: "#16a34a" }}>
                — Medical Finder Management
              </div>
            </div>
          </section>

          {/* Leadership & Developer Team Section */}
          <h2 className="ma-section-title">Meet the Founders & Creators</h2>
          <section className="ma-team-grid">
            {/* Founder Card */}
            <div className="ma-team-card">
              <div className="ma-avatar-placeholder">👤</div>
              <div className="ma-team-name">Vikram Singh</div>
              <div className="ma-team-role">Founder & Visionary</div>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "22px" }}>
                Oversees project strategy, resource optimization, and localized pharmacy integrations to ensure consistent data verification across the platform.
              </p>
            </div>

            {/* Developer Card */}
            <div className="ma-team-card">
              <div className="ma-avatar-placeholder">💻</div>
              <div className="ma-team-name">Aditya Jain</div>
              <div className="ma-team-role">Full-Stack Developer</div>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "22px" }}>
                Designed and developed the entire database schema, RESTful APIs, and responsive UI components using an end-to-end MERN stack architecture.
              </p>
            </div>
          </section>

          {/* How It Works Systems */}
          <h2 className="ma-section-title">How Does It Work?</h2>
          <section className="ma-process-grid">
            {/* Left Box: For Users */}
            <div className="ma-process-card">
              <div className="ma-process-header">
                <div className="ma-process-icon" style={{ background: "#e0f2fe", color: "#0369a1" }}>👥</div>
                <h4>For General Public / Users</h4>
              </div>
              <ul className="ma-steps">
                <li className="ma-step-item">
                  <span className="ma-step-num">1</span>
                  <span>Enter the required medicine name inside the global search terminal.</span>
                </li>
                <li className="ma-step-item">
                  <span className="ma-step-num">2</span>
                  <span>The system runs aggregated lookups and maps out nearby medical stores with live inventory matches.</span>
                </li>
                <li className="ma-step-item">
                  <span className="ma-step-num">3</span>
                  <span>Instantly access pricing, current stock quantities, pharmacy contact details, and precise location routing.</span>
                </li>
              </ul>
            </div>

            {/* Right Box: For Medical Stores */}
            <div className="ma-process-card">
              <div className="ma-process-header">
                <div className="ma-process-icon" style={{ background: "#dcfce7", color: "#15803d" }}>🏪</div>
                <h4>For Medical Store Owners</h4>
              </div>
              <ul className="ma-steps">
                <li className="ma-step-item">
                  <span className="ma-step-num">1</span>
                  <span>Create a vendor account and safely register your pharmacy store on our official network portal.</span>
                </li>
                <li className="ma-step-item">
                  <span className="ma-step-num">2</span>
                  <span>Efficiently manage, update, or add your medical stock variables directly from a simple owner's dashboard.</span>
                </li>
                <li className="ma-step-item">
                  <span className="ma-step-num">3</span>
                  <span>Attract targeted digital foot traffic from local customers actively looking for available items in your area.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Connect & Support Section Card */}
          <section className="ma-footer-card">
            <div className="ma-f-title">Have Questions or Want to Partner?</div>
            <p className="ma-f-text">
              If you are a licensed pharmacy operator or want to enquire about system integrations, please feel free to reach out to our official desk.
            </p>
            
            <div className="ma-contact-details">
              <div className="ma-c-item">
                <span>📞 Contact Support:</span>
                <a href="tel:7339708591">+91 7339708591</a>
              </div>
              <div className="ma-c-item">
                <span>✉️ Official Email:</span>
                <a href="mailto:aj4890275@gmail.com">aj4890275@gmail.com</a>
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );
};

export default About;