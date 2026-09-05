import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MedicalNavbar from "./MedicalNavbar";

const TYPE_COLORS = {
    Tablet:    { bg: "#dbeafe", color: "#1d4ed8" },
    Capsule:   { bg: "#ede9fe", color: "#6d28d9" },
    Syrup:     { bg: "#fef3c7", color: "#92400e" },
    Injection: { bg: "#fee2e2", color: "#b91c1c" },
    Drops:     { bg: "#dcfce7", color: "#166534" },
    Cream:     { bg: "#fce7f3", color: "#9d174d" },
    Inhaler:   { bg: "#e0f2fe", color: "#0369a1" },
    Other:     { bg: "#f1f5f9", color: "#475569" },
};

const getTypeStyle = (type) => TYPE_COLORS[type] || TYPE_COLORS["Other"];

const TYPES = ["All", "Tablet", "Capsule", "Syrup", "Injection", "Drops", "Cream", "Inhaler"];

const SIDEBAR_CSS = `
  .sidebar-wrap {
    flex-shrink: 0;
    background: #0f172a;
    display: flex;
    flex-direction: column;
    transition: width 0.28s cubic-bezier(0.4,0,0.2,1);
    overflow: hidden;
    position: relative;
  }
  .sidebar-wrap.open   { width: 210px; }
  .sidebar-wrap.closed { width: 52px; }

  .sidebar-toggle-btn {
    position: absolute;
    top: 14px;
    right: 10px;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, border-color 0.15s;
    z-index: 10;
  }
  .sidebar-toggle-btn:hover {
    background: rgba(20,184,166,0.18);
    border-color: rgba(20,184,166,0.45);
  }
  .sidebar-toggle-btn svg {
    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
  }
  .sidebar-wrap.closed .sidebar-toggle-btn svg {
    transform: rotate(180deg);
  }

  .sidebar-section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    white-space: nowrap;
    opacity: 1;
    transition: opacity 0.18s;
    padding: 54px 0 10px 18px;
  }
  .sidebar-wrap.closed .sidebar-section-label { opacity: 0; }

  .sidebar-btn-wrap { position: relative; }

  .sidebar-btn {
    width: calc(100% - 16px);
    margin: 0 8px 3px;
    text-align: left;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 9px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 9px;
    transition: background 0.15s, border-color 0.15s;
    box-sizing: border-box;
  }
  .sidebar-btn:hover  { background: rgba(255,255,255,0.05); }
  .sidebar-btn.active {
    background: rgba(37,99,235,0.22);
    border-color: rgba(37,99,235,0.45);
  }

  .sidebar-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .sidebar-btn-text {
    font-size: 13px;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    transition: opacity 0.18s, max-width 0.28s;
    max-width: 120px;
    overflow: hidden;
  }
  .sidebar-wrap.closed .sidebar-btn-text {
    opacity: 0;
    max-width: 0;
    pointer-events: none;
  }

  .sidebar-count {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 20px;
    white-space: nowrap;
    transition: opacity 0.18s;
    flex-shrink: 0;
  }
  .sidebar-wrap.closed .sidebar-count {
    opacity: 0;
    pointer-events: none;
  }

  /* Tooltip shown only when sidebar is collapsed */
  .sidebar-tooltip {
    position: absolute;
    left: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
    background: #1e293b;
    border: 1px solid rgba(20,184,166,0.25);
    color: #e2e8f0;
    font-size: 12px;
    font-weight: 600;
    padding: 5px 11px;
    border-radius: 8px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
    z-index: 200;
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
  }
  .sidebar-wrap.closed .sidebar-btn-wrap:hover .sidebar-tooltip { opacity: 1; }
`;

const ShowMedicines = () => {
    const navigate = useNavigate();
    const [medicinelist, setMedicineList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeType, setActiveType] = useState("All");
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const initializePage = async () => {
            try {
                const response = await axios.get("https://medicine-finder-1-zwuu.onrender.com/isUser");
                const data = response.data;
                if (data.usertype === "nouser" || data.usertype !== "medical") {
                    navigate("/auth_error", { replace: true });
                    return;
                }
                const medicineResponse = await axios.get("https://medicine-finder-1-zwuu.onrender.com/getMedicinesData");
                setMedicineList(medicineResponse.data || []);
            } catch (error) {
                console.log(error);
                alert("Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        initializePage();
    }, [navigate]);

    const filtered = medicinelist.filter((m) => {
        const matchType = activeType === "All" || m.MedicineType === activeType;
        const q = search.toLowerCase();
        const matchSearch =
            !q ||
            m.MedicineName?.toLowerCase().includes(q) ||
            m.MedicineCompany?.toLowerCase().includes(q) ||
            m.LicenseNumber?.toLowerCase().includes(q);
        return matchType && matchSearch;
    });

    const typeCounts = TYPES.reduce((acc, t) => {
        acc[t] = t === "All"
            ? medicinelist.length
            : medicinelist.filter((m) => m.MedicineType === t).length;
        return acc;
    }, {});

    if (loading) {
        return (
            <>
                <MedicalNavbar />
                <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ textAlign: "center" }}>
                        <div className="spinner-border text-primary" style={{ width: "2.5rem", height: "2.5rem" }} />
                        <p style={{ marginTop: "12px", color: "#64748b", fontWeight: 600 }}>Loading medicines…</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style>{SIDEBAR_CSS}</style>
            <MedicalNavbar />

            <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>

                {/* ── HEADER ── */}
                <div style={{
                    background: "linear-gradient(120deg, #0f172a 0%, #1e3a8a 100%)",
                    padding: "20px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "12px",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{
                            width: "42px", height: "42px", borderRadius: "12px",
                            background: "rgba(255,255,255,0.1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "22px",
                        }}>💊</div>
                        <div>
                            <h1 style={{ color: "white", fontWeight: 800, fontSize: "1.25rem", margin: 0 }}>
                                Medicine Stock List
                            </h1>
                            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", margin: 0 }}>
                                {medicinelist.length} medicines registered
                            </p>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        {[
                            { label: "Total", value: medicinelist.length, icon: "💊" },
                            { label: "Status", value: "Active", icon: "📦" },
                        ].map((s) => (
                            <div key={s.label} style={{
                                background: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: "12px",
                                padding: "8px 16px",
                                display: "flex", alignItems: "center", gap: "8px",
                            }}>
                                <span style={{ fontSize: "16px" }}>{s.icon}</span>
                                <div>
                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", lineHeight: 1 }}>{s.label}</div>
                                    <div style={{ fontSize: "15px", fontWeight: 700, color: "white", lineHeight: 1.3 }}>{s.value}</div>
                                </div>
                            </div>
                        ))}
                        <Link
                            to="/insertmedicine"
                            className="btn text-white fw-bold"
                            style={{
                                background: "linear-gradient(135deg,#14b8a6,#2563eb)",
                                border: "none", borderRadius: "12px",
                                padding: "9px 18px", fontSize: "13px",
                                boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
                            }}
                        >
                            + Add Medicine
                        </Link>
                    </div>
                </div>

                {/* ── BODY ── */}
                <div style={{ display: "flex", minHeight: "calc(100vh - 108px)" }}>

                    {/* ── COLLAPSIBLE SIDEBAR ── */}
                    <aside className={`sidebar-wrap ${sidebarOpen ? "open" : "closed"}`}>

                        {/* Toggle chevron button */}
                        <button
                            className="sidebar-toggle-btn"
                            onClick={() => setSidebarOpen((v) => !v)}
                            aria-label={sidebarOpen ? "Collapse filter sidebar" : "Expand filter sidebar"}
                        >
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                <path
                                    d="M8.5 2L4.5 6.5L8.5 11"
                                    stroke="#94a3b8"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <div className="sidebar-section-label">Filter by type</div>

                        <div style={{ display: "flex", flexDirection: "column", paddingBottom: "16px" }}>
                            {TYPES.map((type) => {
                                const isActive = activeType === type;
                                const count = typeCounts[type] || 0;
                                const ts = type !== "All" ? getTypeStyle(type) : null;

                                return (
                                    <div key={type} className="sidebar-btn-wrap">
                                        <button
                                            className={`sidebar-btn${isActive ? " active" : ""}`}
                                            onClick={() => setActiveType(type)}
                                        >
                                            <span
                                                className="sidebar-dot"
                                                style={{
                                                    background: type === "All"
                                                        ? (isActive ? "#3b82f6" : "rgba(255,255,255,0.22)")
                                                        : ts?.color,
                                                }}
                                            />
                                            <span
                                                className="sidebar-btn-text"
                                                style={{
                                                    fontWeight: isActive ? 700 : 400,
                                                    color: isActive ? "white" : "rgba(255,255,255,0.6)",
                                                }}
                                            >
                                                {type}
                                            </span>
                                            {count > 0 && (
                                                <span
                                                    className="sidebar-count"
                                                    style={{
                                                        background: isActive ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.08)",
                                                        color: isActive ? "white" : "rgba(255,255,255,0.35)",
                                                    }}
                                                >
                                                    {count}
                                                </span>
                                            )}
                                        </button>
                                        {/* Tooltip visible only when collapsed */}
                                        <div className="sidebar-tooltip">
                                            {type}{count > 0 ? ` · ${count}` : ""}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    {/* ── MAIN ── */}
                    <main style={{ flex: 1, padding: "20px 24px", overflow: "hidden", minWidth: 0 }}>

                        {/* Search */}
                        <div style={{ marginBottom: "16px", position: "relative" }}>
                            <span style={{
                                position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                                fontSize: "16px", color: "#94a3b8", pointerEvents: "none",
                            }}>🔍</span>
                            <input
                                type="text"
                                placeholder="Search by name, company, or license…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    width: "100%", padding: "10px 14px 10px 40px",
                                    border: "1px solid #e2e8f0", borderRadius: "12px",
                                    background: "white", fontSize: "14px", color: "#0f172a",
                                    outline: "none", boxSizing: "border-box",
                                    boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
                                }}
                                onFocus={e => e.target.style.borderColor = "#2563eb"}
                                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    style={{
                                        position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                                        background: "#f1f5f9", border: "none", borderRadius: "6px",
                                        fontSize: "12px", color: "#64748b", padding: "2px 8px", cursor: "pointer",
                                    }}
                                >clear</button>
                            )}
                        </div>

                        {/* Result count */}
                        <div style={{ marginBottom: "10px" }}>
                            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                                Showing <strong style={{ color: "#0f172a" }}>{filtered.length}</strong> of {medicinelist.length} medicines
                                {activeType !== "All" && <> · <span style={{ color: "#2563eb" }}>{activeType}</span></>}
                                {search && <> matching <span style={{ color: "#2563eb" }}>"{search}"</span></>}
                            </p>
                        </div>

                        {/* Table */}
                        <div style={{
                            background: "white", borderRadius: "16px",
                            border: "1px solid #e2e8f0", overflow: "hidden",
                            boxShadow: "0 4px 20px rgba(15,23,42,0.05)",
                        }}>
                            {/* Header row */}
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "2fr 1fr 1.5fr 1.5fr 0.8fr 2fr 1.2fr",
                                background: "#f8fafc",
                                borderBottom: "1px solid #e2e8f0",
                                padding: "0 20px",
                            }}>
                                {["Medicine", "Type", "Company", "License", "Price", "Description", "Actions"].map((h, i) => (
                                    <div key={h} style={{
                                        padding: "12px 6px", fontSize: "11px", fontWeight: 700,
                                        color: "#94a3b8", letterSpacing: "0.6px", textTransform: "uppercase",
                                        textAlign: i === 6 ? "center" : "left",
                                    }}>{h}</div>
                                ))}
                            </div>

                            {/* Empty */}
                            {filtered.length === 0 ? (
                                <div style={{ padding: "60px 20px", textAlign: "center" }}>
                                    <div style={{ fontSize: "48px", marginBottom: "12px" }}>💊</div>
                                    <h4 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>No medicines found</h4>
                                    <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
                                        {search || activeType !== "All"
                                            ? "Try adjusting your filters or search term."
                                            : "Add your first medicine to get started."}
                                    </p>
                                </div>
                            ) : (
                                filtered.map((medicine, index) => {
                                    const ts = getTypeStyle(medicine.MedicineType);
                                    const isEven = index % 2 === 0;
                                    return (
                                        <div
                                            key={medicine._id}
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "2fr 1fr 1.5fr 1.5fr 0.8fr 2fr 1.2fr",
                                                alignItems: "center",
                                                padding: "0 20px",
                                                background: isEven ? "white" : "#f8fafc",
                                                borderBottom: index !== filtered.length - 1 ? "1px solid #f1f5f9" : "none",
                                                transition: "background 0.15s",
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                                            onMouseLeave={e => e.currentTarget.style.background = isEven ? "white" : "#f8fafc"}
                                        >
                                            <div style={{ padding: "14px 6px", fontWeight: 700, fontSize: "15px", color: "#0f172a" }}>
                                                {medicine.MedicineName}
                                            </div>
                                            <div style={{ padding: "14px 6px" }}>
                                                <span style={{
                                                    background: ts.bg, color: ts.color,
                                                    fontSize: "13px", fontWeight: 700,
                                                    padding: "4px 10px", borderRadius: "20px",
                                                    whiteSpace: "nowrap",
                                                }}>{medicine.MedicineType}</span>
                                            </div>
                                            <div style={{ padding: "14px 6px", fontSize: "13px", color: "#334155" }}>
                                                {medicine.MedicineCompany}
                                            </div>
                                            <div style={{ padding: "14px 6px" }}>
                                                <span style={{
                                                    fontFamily: "monospace", fontSize: "13px",
                                                    color: "#475569", background: "#f1f5f9",
                                                    padding: "3px 8px", borderRadius: "6px",
                                                }}>{medicine.LicenseNumber}</span>
                                            </div>
                                            <div style={{ padding: "14px 6px", fontWeight: 700, fontSize: "13px", color: "#16a34a" }}>
                                                ₹{medicine.UnitPrice}
                                            </div>
                                            <div style={{
                                                padding: "14px 6px", fontSize: "12px", color: "#64748b",
                                                overflow: "hidden", textOverflow: "ellipsis",
                                                whiteSpace: "nowrap", maxWidth: "180px",
                                            }} title={medicine.Description}>
                                                {medicine.Description || "—"}
                                            </div>
                                            <div style={{ padding: "14px 6px", display: "flex", gap: "6px", justifyContent: "center" }}>
                                                <Link to={"/editmedicine/" + medicine._id} style={{
                                                    background: "#dbeafe", color: "#1d4ed8",
                                                    fontSize: "13px", fontWeight: 700,
                                                    padding: "6px 12px", borderRadius: "8px",
                                                    textDecoration: "none", whiteSpace: "nowrap",
                                                }}>Edit</Link>
                                                <Link to={"/deletemedicine/" + medicine._id} style={{
                                                    background: "#fee2e2", color: "#b91c1c",
                                                    fontSize: "13px", fontWeight: 700,
                                                    padding: "6px 12px", borderRadius: "8px",
                                                    textDecoration: "none", whiteSpace: "nowrap",
                                                }}>Delete</Link>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default ShowMedicines;