import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import MyNavbar from "./GeneralNavbar";

const Search = () => {
  const [Medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchAllMedicines = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://medicine-finder-1-zwuu.onrender.com/showandsearchmedicines"
      );

      setMedicines(response.data);
    } catch (error) {
      console.log("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchMedicine = useCallback(async () => {
    if (search.trim() === "") {
      setSearched(false);
      fetchAllMedicines();
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await axios.post(
        "https://medicine-finder-1-zwuu.onrender.com/searchmedicines",
        {
          search: search.trim(),
        }
      );

      setMedicines(response.data);
    } catch (error) {
      console.log("Error searching medicines:", error);
    } finally {
      setLoading(false);
    }
  }, [search, fetchAllMedicines]);

  // Debounce Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearchMedicine();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, handleSearchMedicine]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchMedicine();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      setSearched(false);
      fetchAllMedicines();
    }
  };

  const typeColors = {
    Tablet: { bg: "#dcfce7", text: "#166534", dot: "#22c55e" },
    Syrup: { bg: "#dbeafe", text: "#1d4ed8", dot: "#3b82f6" },
    Capsule: { bg: "#fce7f3", text: "#be185d", dot: "#ec4899" },
    Injection: { bg: "#ffedd5", text: "#c2410c", dot: "#f97316" },
    Cream: { bg: "#f3e8ff", text: "#7e22ce", dot: "#a855f7" },
    Drop: { bg: "#cffafe", text: "#0e7490", dot: "#06b6d4" },
  };

  const getTypeStyle = (type) =>
    typeColors[type] || {
      bg: "#f1f5f9",
      text: "#334155",
      dot: "#64748b",
    };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
        }

        .mf-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(34, 197, 94, 0.13), transparent 34%),
            radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.14), transparent 34%),
            linear-gradient(135deg, #f8fafc 0%, #ecfdf5 45%, #eff6ff 100%);
          font-family: 'Inter', sans-serif;
          padding-bottom: 70px;
        }

        .mf-hero {
          position: relative;
          overflow: hidden;
          padding: 72px 20px 115px;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #ecfdf5 45%, #eff6ff 100%);
          border-bottom: 1px solid #dbeafe;
        }
        
        .mf-hero::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          background: rgba(34, 197, 94, 0.16);
          border-radius: 50%;
          top: -170px;
          right: -130px;
          filter: blur(65px);
        }
        
        .mf-hero::after {
          content: "";
          position: absolute;
          width: 340px;
          height: 340px;
          background: rgba(59, 130, 246, 0.14);
          border-radius: 50%;
          left: -120px;
          bottom: -150px;
          filter: blur(65px);
        }

        .mf-hero-content {
          position: relative;
          z-index: 2;
          max-width: 980px;
          margin: auto;
        }
        
        .mf-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 9px 18px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 22px;
        }

        .mf-title {
          font-size: clamp(2.35rem, 6vw, 5rem);
          line-height: 1.05;
          color: #0f172a;
          font-weight: 900;
          letter-spacing: -1.6px;
          margin-bottom: 20px;
        }

        .mf-title span {
          background: linear-gradient(135deg, #16a34a, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .mf-subtitle {
          max-width: 720px;
          margin: 0 auto 38px;
          color: #475569;
          font-size: 17px;
          line-height: 30px;
        }
        
        .mf-search-card {
          max-width: 800px;
          margin: auto;
          padding: 12px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid #dbeafe;
          backdrop-filter: blur(18px);
          box-shadow: 0 22px 55px rgba(15, 23, 42, 0.10);
        }

        .mf-search-box {
          display: flex;
          gap: 12px;
          padding: 10px;
          background: white;
          border-radius: 22px;
        }

        .mf-input-wrap {
          flex: 1;
          position: relative;
        }

        .mf-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          font-size: 19px;
        }

        .mf-input {
          width: 100%;
          height: 58px;
          border: none;
          outline: none;
          border-radius: 18px;
          background: #f8fafc;
          padding: 0 18px 0 52px;
          color: #0f172a;
          font-size: 16px;
          font-weight: 600;
          transition: 0.25s ease;
        }

        .mf-input:focus {
          background: #eef6ff;
          box-shadow: inset 0 0 0 2px #3b82f6;
        }

        .mf-btn {
          min-width: 145px;
          border: none;
          border-radius: 18px;
          background: linear-gradient(135deg, #2563eb, #16a34a);
          color: white;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.35);
          transition: 0.25s ease;
        }

        .mf-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 36px rgba(37, 99, 235, 0.45);
        }

        .mf-stats {
          margin-top: 18px;
          color: #166534;
          font-weight: 800;
        }

        .mf-content {
          max-width: 1240px;
          margin: -50px auto 0;
          padding: 0 22px;
          position: relative;
          z-index: 5;
        }

        .mf-section-heading {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 34px 0 24px;
          padding: 18px 22px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);
        }

        .mf-section-heading h2 {
          color: #0f172a;
          font-size: 24px;
          font-weight: 900;
          margin: 0;
          white-space: nowrap;
        }

        .mf-line {
          flex: 1;
          height: 1px;
          background: #cbd5e1;
        }

        .mf-count {
          padding: 6px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, #2563eb, #16a34a);
          color: white;
          font-weight: 900;
          font-size: 13px;
        }

        .mf-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 28px;
        }

        .mf-card {
          overflow: hidden;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 20px 55px rgba(15, 23, 42, 0.12);
          transition: 0.28s ease;
          animation: fadeUp 0.45s ease both;
        }

        .mf-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 70px rgba(15, 23, 42, 0.18);
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mf-card-top {
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          background: linear-gradient(135deg, #f0fdf4, #eff6ff);
          border-bottom: 1px solid #dbeafe;
        }

        .mf-card-name {
          color: #0f172a;
          font-size: 23px;
          font-weight: 900;
          line-height: 1.25;
          margin-bottom: 13px;
        }

        .mf-type {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.5px;
        }

        .mf-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .mf-qty {
          min-width: 88px;
          padding: 10px 12px;
          border-radius: 18px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.22);
        }

        .mf-qty-number {
          display: block;
          font-size: 28px;
          font-weight: 900;
          line-height: 1;
        }

        .mf-qty-label {
          display: block;
          margin-top: 5px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.7px;
        }

        .mf-card-body {
          padding: 22px 24px 24px;
        }

        .mf-row {
          display: flex;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px dashed #dbeafe;
        }

        .mf-row:last-child {
          border-bottom: none;
        }

        .mf-label {
          width: 105px;
          flex-shrink: 0;
          color: #64748b;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .mf-value {
          flex: 1;
          color: #0f172a;
          font-size: 14px;
          font-weight: 600;
          line-height: 22px;
        }

        .mf-price {
          color: #2563eb;
          font-size: 17px;
          font-weight: 900;
        }

        .mf-store-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 20px 0 12px;
          color: #0f172a;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .mf-store-title::before,
        .mf-store-title::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #cbd5e1;
        }

        .mf-store-card {
          padding: 15px;
          border-radius: 18px;
          background: linear-gradient(135deg, #f8fafc, #eef6ff);
          border: 1px solid #dbeafe;
          margin-bottom: 12px;
          transition: 0.22s ease;
        }

        .mf-store-card:hover {
          transform: translateX(4px);
          background: #eff6ff;
        }

        .mf-store-name {
          color: #0f172a;
          font-size: 15px;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .mf-store-detail {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #475569;
          font-size: 13px;
          font-weight: 600;
          margin-top: 5px;
        }

        .mf-loading,
        .mf-empty {
          text-align: center;
          padding: 90px 20px;
          background: rgba(255, 255, 255, 0.88);
          border-radius: 28px;
          box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
        }

        .mf-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #dbeafe;
          border-top-color: #2563eb;
          border-radius: 50%;
          margin: 0 auto 18px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .mf-empty-icon {
          font-size: 58px;
          margin-bottom: 16px;
        }

        .mf-empty h3 {
          color: #0f172a;
          font-size: 25px;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .mf-empty p {
          color: #64748b;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .mf-hero {
            padding: 55px 16px 95px;
          }

          .mf-search-box {
            flex-direction: column;
          }

          .mf-btn {
            width: 100%;
            height: 54px;
          }

          .mf-section-heading {
            flex-direction: column;
            align-items: flex-start;
          }

          .mf-line {
            width: 100%;
          }

          .mf-card-top {
            flex-direction: column;
          }

          .mf-qty {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .mf-row {
            flex-direction: column;
            gap: 5px;
          }

          .mf-label {
            width: auto;
          }
        }
      `}</style>

      <MyNavbar />

      <div className="mf-page">
        <section className="mf-hero">
          <div className="mf-hero-content">
            <div className="mf-badge">
              <span>💊</span> Trusted Medicine Finder
            </div>

            <h1 className="mf-title">
              Find Available Medicines <br />
              <span>Near Your Medical Store</span>
            </h1>

            <p className="mf-subtitle">
              Search medicines instantly, check stock quantity, price, and see
              the medical store where the medicine is available.
            </p>

            <div className="mf-search-card">
              <div className="mf-search-box">
                <div className="mf-input-wrap">
                  <span className="mf-search-icon">🔍</span>

                  <input
                    className="mf-input"
                    type="text"
                    placeholder="Search medicine name... e.g. dolo, paracetamol"
                    value={search}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <button
                  className="mf-btn"
                  onClick={handleSearchMedicine}
                >
                  Search
                </button>
              </div>
            </div>

            {Medicines.length > 0 && (
              <p className="mf-stats">
                Showing {Medicines.length} available medicine
                {Medicines.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </section>

        <main className="mf-content">
          {loading ? (
            <div className="mf-loading">
              <div className="mf-spinner"></div>
              <strong>Fetching medicines...</strong>
            </div>
          ) : Medicines.length === 0 ? (
            <div className="mf-empty">
              <div className="mf-empty-icon">🔬</div>

              <h3>
                {searched ? "No medicine found" : "Start your search"}
              </h3>

              <p>
                {searched
                  ? "Koi medicine nahi mili. Dusra medicine name try karo."
                  : "Search bar me medicine ka naam likho aur result cards yaha show honge."}
              </p>
            </div>
          ) : (
            <>
              <div className="mf-section-heading">
                <h2>Available Medicines</h2>
                <div className="mf-line"></div>
                <span className="mf-count">{Medicines.length}</span>
              </div>

              <div className="mf-grid">
                {Medicines.map((medicine) => {
                  const typeStyle = getTypeStyle(medicine.MedicineType);

                  return (
                    <div className="mf-card" key={medicine._id}>
                      <div className="mf-card-top">
                        <div>
                          <div className="mf-card-name">
                            {medicine.MedicineName}
                          </div>

                          <span
                            className="mf-type"
                            style={{
                              background: typeStyle.bg,
                              color: typeStyle.text,
                            }}
                          >
                            <span
                              className="mf-dot"
                              style={{ background: typeStyle.dot }}
                            ></span>

                            {medicine.MedicineType}
                          </span>
                        </div>
                      </div>

                      <div className="mf-card-body">
                        <div className="mf-row">
                          <span className="mf-label">Company</span>

                          <span className="mf-value">
                            {medicine.MedicineCompany}
                          </span>
                        </div>

                        <div className="mf-row">
                          <span className="mf-label">License No.</span>

                          <span className="mf-value">
                            {medicine.LicenseNumber}
                          </span>
                        </div>

                        <div className="mf-row">
                          <span className="mf-label">Unit Price</span>

                          <span className="mf-value mf-price">
                            ₹{medicine.UnitPrice}
                          </span>
                        </div>

                        <div className="mf-row">
                          <span className="mf-label">Description</span>

                          <span className="mf-value">
                            {medicine.Description}
                          </span>
                        </div>

                        {medicine.medical &&
                        medicine.medical.length > 0 ? (
                          <>
                            <div className="mf-store-title">
                              Available At
                            </div>

                            {medicine.medical.map((store, index) => (
                              <div
                                className="mf-store-card"
                                key={index}
                              >
                                <div className="mf-store-name">
                                  🏪 {store.Medicalname}
                                </div>

                                <div className="mf-store-detail">
                                  <span>👤</span> {store.OwnerName}
                                </div>

                                <div className="mf-store-detail">
                                  <span>📞</span> {store.Contact}
                                </div>

                                <div className="mf-store-detail">
                                  <span>📍</span> {store.Address}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div
                            className="mf-store-title"
                            style={{ color: "#94a3b8" }}
                          >
                            Store info not linked
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Search;