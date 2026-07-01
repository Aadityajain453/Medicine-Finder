import React, { useState } from "react";
import axios from "axios"; // Make sure to run: npm install axios
import MyNavbar from "./GeneralNavbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    subject: "",
    message: "",
  });

  // UI Flow Status Management States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState({ success: false, error: false, msg: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  // Client side inline validation validator logic
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) errors.name = "Name field is required.";
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid structure email address.";
    }
    if (!formData.subject.trim()) errors.subject = "Subject field focus cannot be empty.";
    if (!formData.message.trim()) {
      errors.message = "Message details specification required.";
    } else if (formData.message.trim().length < 15) {
      errors.message = "Message statement must be at least 15 characters long.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Real-time clearing of warning signals upon text input interaction
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiResponse({ success: false, error: false, msg: "" });

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Dynamic network payload submission to Express backend API point
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      
      if (response.status === 201 || response.data.success) {
        setApiResponse({
          success: true,
          error: false,
          msg: "Message package successfully saved and processed! Our technical desk will connect shortly.",
        });
        setFormData({ name: "", email: "", role: "User", subject: "", message: "" });
      }
    } catch (err) {
      console.error("API Gateway Communication Error:", err);
      setApiResponse({
        success: false,
        error: true,
        msg: err.response?.data?.message || "Failed to establish database pipeline connection. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .co-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(34, 197, 94, 0.1), transparent 35%),
            radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.1), transparent 35%),
            linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          font-family: 'Inter', sans-serif;
          color: #0f172a;
          padding-bottom: 90px;
        }

        .co-hero {
          text-align: center;
          padding: 90px 22px 50px;
          max-width: 900px;
          margin: 0 auto;
        }

        .co-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: #dcfce7;
          color: #16a34a;
          border: 1px solid #bbf7d0;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 22px;
        }

        .co-title {
          font-size: clamp(2.2rem, 5.5vw, 4rem);
          font-weight: 900;
          letter-spacing: -1.5px;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .co-title span {
          background: linear-gradient(135deg, #22c55e, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .co-subtitle {
          font-size: 17px;
          color: #475569;
          line-height: 28px;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 500;
        }

        .co-container {
          max-width: 1140px;
          margin: 30px auto 0;
          padding: 0 22px;
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 40px;
        }

        .co-info-panel {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .co-info-card {
          background: white;
          border-radius: 24px;
          padding: 30px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 15px 40px rgba(15, 23, 42, 0.03);
        }

        .co-card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .co-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .co-info-card h4 {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
        }

        .co-info-card p {
          color: #475569;
          font-size: 15px;
          line-height: 24px;
          font-weight: 500;
        }

        .co-info-card a {
          color: #16a34a;
          text-decoration: none;
          font-weight: 700;
        }

        .co-info-card a:hover {
          text-decoration: underline;
        }

        .co-form-block {
          background: white;
          border-radius: 32px;
          padding: 45px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.05);
        }

        .co-form-group {
          margin-bottom: 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .co-form-group label {
          font-size: 14px;
          font-weight: 700;
          color: #334155;
        }

        .co-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1px solid #cbd5e1;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #0f172a;
          transition: all 0.2s ease;
          background: #f8fafc;
        }

        .co-input:focus {
          outline: none;
          border-color: #22c55e;
          background: white;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
        }

        .co-input-error {
          border-color: #ef4444 !important;
          background-color: #fef2f2;
        }

        .co-error-text {
          font-size: 12px;
          color: #ef4444;
          font-weight: 600;
          margin-top: -2px;
        }

        .co-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 18px center;
          background-size: 16px;
          padding-right: 45px;
        }

        .co-btn {
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 10px 25px rgba(34, 197, 94, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .co-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(34, 197, 94, 0.4);
        }

        .co-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          background: #94a3b8;
          box-shadow: none;
        }

        .co-alert {
          padding: 16px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .co-alert-success {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
        }

        .co-alert-error {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          color: #991b1b;
        }

        @media (max-width: 900px) {
          .co-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .co-form-block {
            padding: 30px;
          }
        }
      `}</style>

      <div className="co-page">
        <MyNavbar />

        <header className="co-hero">
          <div className="co-badge">💬 Contact Desk</div>
          <h1 className="co-title">
            Get In Touch With <br />
            <span>Our Technical Team</span>
          </h1>
          <p className="co-subtitle">
            Have questions about store registrations, medicine tracking updates, or system data? Send us a message below.
          </p>
        </header>

        <main className="co-container">
          <section className="co-info-panel">
            <div className="co-info-card">
              <div className="co-card-header">
                <div className="co-icon-wrapper" style={{ color: "#2563eb" }}>📞</div>
                <h4>Direct Phone Line</h4>
              </div>
              <p>For instant assistance regarding portal access queries or setup errors, call our desk:</p>
              <p style={{ marginTop: "10px" }}>
                <a href="tel:7339708591">+91 7339708591</a>
              </p>
            </div>

            <div className="co-info-card">
              <div className="co-card-header">
                <div className="co-icon-wrapper" style={{ color: "#16a34a" }}>✉️</div>
                <h4>Electronic Mailing</h4>
              </div>
              <p>Send your corporate proposals, database setup requests, or extended integration help queries to:</p>
              <p style={{ marginTop: "10px" }}>
                <a href="mailto:aj4890275@gmail.com">aj4890275@gmail.com</a>
              </p>
            </div>

            <div className="co-info-card">
              <div className="co-card-header">
                <div className="co-icon-wrapper" style={{ color: "#ca8a04" }}>⏰</div>
                <h4>Service Windows</h4>
              </div>
              <p style={{ marginBottom: "4px" }}><strong>Monday — Saturday:</strong> 09:00 AM – 07:00 PM</p>
              <p><strong>Sunday:</strong> Emergency Operations System Only</p>
            </div>
          </section>

          <section className="co-form-block">
            {/* Dynamic Server Alert Notifications */}
            {apiResponse.success && (
              <div className="co-alert co-alert-success">
                <span>✅</span> {apiResponse.msg}
              </div>
            )}
            {apiResponse.error && (
              <div className="co-alert co-alert-error">
                <span>⚠️</span> {apiResponse.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="co-form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    className={`co-input ${fieldErrors.name ? "co-input-error" : ""}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {fieldErrors.name && <span className="co-error-text">{fieldErrors.name}</span>}
                </div>

                <div className="co-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@domain.com"
                    className={`co-input ${fieldErrors.email ? "co-input-error" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {fieldErrors.email && <span className="co-error-text">{fieldErrors.email}</span>}
                </div>
              </div>

              <div className="co-form-group">
                <label htmlFor="role">Account Association Type</label>
                <select
                  id="role"
                  name="role"
                  className="co-input co-select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="User">General Public / Patient Member</option>
                  <option value="Medical Store Owner">Licensed Medical Store Operator</option>
                  <option value="Developer/Partner">Enterprise Partner / Developer</option>
                </select>
              </div>

              <div className="co-form-group">
                <label htmlFor="subject">Inquiry Subject Focus</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="e.g., Pharmacy data verification issue"
                  className={`co-input ${fieldErrors.subject ? "co-input-error" : ""}`}
                  value={formData.subject}
                  onChange={handleChange}
                />
                {fieldErrors.subject && <span className="co-error-text">{fieldErrors.subject}</span>}
              </div>

              <div className="co-form-group">
                <label htmlFor="message">Elaborated Message Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Describe your inquiry framework in detail (Min 15 characters)..."
                  className={`co-input ${fieldErrors.message ? "co-input-error" : ""}`}
                  style={{ resize: "none" }}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {fieldErrors.message && <span className="co-error-text">{fieldErrors.message}</span>}
              </div>

              <button type="submit" className="co-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: "16px", height: "16px", borderWidth: "2px" }}></span>
                    Processing Delivery...
                  </>
                ) : (
                  <>
                    <span>📨</span> Dispatch Secured Message
                  </>
                )}
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default Contact;