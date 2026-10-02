import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MedicalNavbar from "./MedicalNavbar";

const TYPE_COLORS = {
    Tablet: { bg: "#dbeafe", color: "#1d4ed8" },
    Capsule: { bg: "#ede9fe", color: "#6d28d9" },
    Syrup: { bg: "#fef3c7", color: "#92400e" },
    Injection: { bg: "#fee2e2", color: "#b91c1c" },
    Drops: { bg: "#dcfce7", color: "#166534" },
    Cream: { bg: "#fce7f3", color: "#9d174d" },
    Inhaler: { bg: "#e0f2fe", color: "#0369a1" },
    Other: { bg: "#f1f5f9", color: "#475569" },
};

const getTypeStyle = (type) =>
    TYPE_COLORS[type] || TYPE_COLORS["Other"];

const TYPES = [
    "All",
    "Tablet",
    "Capsule",
    "Syrup",
    "Injection",
    "Drops",
    "Cream",
    "Inhaler",
];

const SHOW_MEDICINES_CSS = `
    .sm-page,
    .sm-page * {
        box-sizing: border-box;
    }

    .sm-page {
        min-height: 100vh;
        background: #f1f5f9;
        overflow-x: hidden;
    }

    /* =========================================
       HEADER
    ========================================= */

    .sm-header {
        background: linear-gradient(
            120deg,
            #0f172a 0%,
            #1e3a8a 100%
        );
        padding: 20px 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 14px;
    }

    .sm-header-left {
        display: flex;
        align-items: center;
        gap: 14px;
        min-width: 0;
    }

    .sm-header-icon {
        width: 42px;
        height: 42px;
        min-width: 42px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
    }

    .sm-header-title {
        color: white;
        font-weight: 800;
        font-size: 1.25rem;
        margin: 0;
        line-height: 1.3;
    }

    .sm-header-subtitle {
        color: rgba(255, 255, 255, 0.55);
        font-size: 12px;
        margin: 2px 0 0;
    }

    .sm-header-right {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    .sm-stat {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 105px;
    }

    .sm-stat-icon {
        font-size: 16px;
    }

    .sm-stat-label {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.5);
        line-height: 1;
    }

    .sm-stat-value {
        font-size: 15px;
        font-weight: 700;
        color: white;
        line-height: 1.3;
    }

    .sm-add-btn {
        background: linear-gradient(
            135deg,
            #14b8a6,
            #2563eb
        );
        border: none;
        border-radius: 12px;
        padding: 9px 18px;
        font-size: 13px;
        box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
        text-decoration: none;
        color: white;
        font-weight: 700;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .sm-add-btn:hover {
        color: white;
        opacity: 0.95;
    }

    /* =========================================
       BODY
    ========================================= */

    .sm-body {
        display: flex;
        min-height: calc(100vh - 108px);
    }

    /* =========================================
       SIDEBAR
    ========================================= */

    .sidebar-wrap {
        flex-shrink: 0;
        background: #0f172a;
        display: flex;
        flex-direction: column;
        transition: width 0.28s
            cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        position: relative;
    }

    .sidebar-wrap.open {
        width: 210px;
    }

    .sidebar-wrap.closed {
        width: 52px;
    }

    .sidebar-toggle-btn {
        position: absolute;
        top: 14px;
        right: 10px;
        width: 28px;
        height: 28px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
            background 0.15s,
            border-color 0.15s;
        z-index: 10;
    }

    .sidebar-toggle-btn:hover {
        background: rgba(20, 184, 166, 0.18);
        border-color: rgba(20, 184, 166, 0.45);
    }

    .sidebar-toggle-btn svg {
        transition: transform 0.28s
            cubic-bezier(0.4, 0, 0.2, 1);
    }

    .sidebar-wrap.closed
        .sidebar-toggle-btn
        svg {
        transform: rotate(180deg);
    }

    .sidebar-section-label {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1px;
        color: rgba(255, 255, 255, 0.3);
        text-transform: uppercase;
        white-space: nowrap;
        opacity: 1;
        transition: opacity 0.18s;
        padding: 54px 0 10px 18px;
    }

    .sidebar-wrap.closed
        .sidebar-section-label {
        opacity: 0;
    }

    .sidebar-btn-wrap {
        position: relative;
    }

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
        transition:
            background 0.15s,
            border-color 0.15s;
    }

    .sidebar-btn:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .sidebar-btn.active {
        background: rgba(37, 99, 235, 0.22);
        border-color: rgba(37, 99, 235, 0.45);
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
        transition:
            opacity 0.18s,
            max-width 0.28s;
        max-width: 120px;
        overflow: hidden;
    }

    .sidebar-wrap.closed
        .sidebar-btn-text {
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

    .sidebar-wrap.closed
        .sidebar-count {
        opacity: 0;
        pointer-events: none;
    }

    .sidebar-tooltip {
        position: absolute;
        left: calc(100% + 10px);
        top: 50%;
        transform: translateY(-50%);
        background: #1e293b;
        border: 1px solid rgba(20, 184, 166, 0.25);
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
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    }

    .sidebar-wrap.closed
        .sidebar-btn-wrap:hover
        .sidebar-tooltip {
        opacity: 1;
    }

    /* =========================================
       MAIN
    ========================================= */

    .sm-main {
        flex: 1;
        padding: 20px 24px;
        min-width: 0;
        overflow: hidden;
    }

    /* =========================================
       SEARCH
    ========================================= */

    .sm-search-wrap {
        margin-bottom: 16px;
        position: relative;
    }

    .sm-search-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        color: #94a3b8;
        pointer-events: none;
    }

    .sm-search {
        width: 100%;
        height: 44px;
        padding: 10px 60px 10px 40px;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        background: white;
        font-size: 14px;
        color: #0f172a;
        outline: none;
        box-shadow: 0 1px 4px rgba(15, 23, 42, 0.06);
    }

    .sm-search:focus {
        border-color: #2563eb;
    }

    .sm-clear-btn {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: #f1f5f9;
        border: none;
        border-radius: 6px;
        font-size: 12px;
        color: #64748b;
        padding: 4px 8px;
        cursor: pointer;
    }

    /* =========================================
       RESULT COUNT
    ========================================= */

    .sm-result-count {
        margin-bottom: 10px;
    }

    .sm-result-count p {
        font-size: 13px;
        color: #64748b;
        margin: 0;
        line-height: 1.5;
    }

    /* =========================================
       DESKTOP TABLE
    ========================================= */

    .sm-table-container {
        background: white;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
    }

    .sm-table-header,
    .sm-table-row {
        display: grid;
        grid-template-columns:
            2fr
            1fr
            1.5fr
            1.5fr
            0.8fr
            2fr
            1.2fr;
    }

    .sm-table-header {
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
        padding: 0 20px;
    }

    .sm-table-header-cell {
        padding: 12px 6px;
        font-size: 11px;
        font-weight: 700;
        color: #94a3b8;
        letter-spacing: 0.6px;
        text-transform: uppercase;
    }

    .sm-table-header-cell.center {
        text-align: center;
    }

    .sm-table-row {
        align-items: center;
        padding: 0 20px;
        transition: background 0.15s;
    }

    .sm-table-cell {
        padding: 14px 6px;
        min-width: 0;
    }

    .sm-medicine-name {
        font-weight: 700;
        font-size: 15px;
        color: #0f172a;
        overflow-wrap: anywhere;
    }

    .sm-company {
        font-size: 13px;
        color: #334155;
        overflow-wrap: anywhere;
    }

    .sm-type-badge {
        font-size: 13px;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 20px;
        white-space: nowrap;
        display: inline-block;
    }

    .sm-license {
        font-family: monospace;
        font-size: 13px;
        color: #475569;
        background: #f1f5f9;
        padding: 3px 8px;
        border-radius: 6px;
        display: inline-block;
        overflow-wrap: anywhere;
    }

    .sm-price {
        font-weight: 700;
        font-size: 13px;
        color: #16a34a;
        white-space: nowrap;
    }

    .sm-description {
        font-size: 12px;
        color: #64748b;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 180px;
    }

    .sm-actions {
        display: flex;
        gap: 6px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .sm-edit-btn,
    .sm-delete-btn {
        font-size: 13px;
        font-weight: 700;
        padding: 6px 12px;
        border-radius: 8px;
        text-decoration: none;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .sm-edit-btn {
        background: #dbeafe;
        color: #1d4ed8;
    }

    .sm-edit-btn:hover {
        color: #1d4ed8;
        background: #bfdbfe;
    }

    .sm-delete-btn {
        background: #fee2e2;
        color: #b91c1c;
    }

    .sm-delete-btn:hover {
        color: #b91c1c;
        background: #fecaca;
    }

    /* =========================================
       MOBILE CARDS
    ========================================= */

    .sm-mobile-list {
        display: none;
    }

    .sm-mobile-card {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        padding: 16px;
        margin-bottom: 12px;
        box-shadow: 0 3px 14px rgba(15, 23, 42, 0.05);
    }

    .sm-mobile-card:last-child {
        margin-bottom: 0;
    }

    .sm-mobile-card-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 14px;
    }

    .sm-mobile-medicine-name {
        font-size: 16px;
        font-weight: 800;
        color: #0f172a;
        line-height: 1.35;
        overflow-wrap: anywhere;
    }

    .sm-mobile-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 14px;
    }

    .sm-mobile-info-item {
        background: #f8fafc;
        border-radius: 9px;
        padding: 9px 10px;
        min-width: 0;
    }

    .sm-mobile-info-label {
        font-size: 10px;
        font-weight: 700;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        margin-bottom: 4px;
    }

    .sm-mobile-info-value {
        font-size: 12px;
        color: #334155;
        overflow-wrap: anywhere;
        line-height: 1.4;
    }

    .sm-mobile-price {
        color: #16a34a;
        font-weight: 800;
        font-size: 14px;
    }

    .sm-mobile-description {
        background: #f8fafc;
        border-radius: 9px;
        padding: 10px;
        margin-bottom: 14px;
    }

    .sm-mobile-description-text {
        font-size: 12px;
        color: #64748b;
        line-height: 1.5;
        overflow-wrap: anywhere;
    }

    .sm-mobile-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
    }

    .sm-mobile-action {
        min-height: 42px;
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 700;
        text-decoration: none;
    }

    /* =========================================
       EMPTY STATE
    ========================================= */

    .sm-empty {
        padding: 60px 20px;
        text-align: center;
    }

    .sm-empty-icon {
        font-size: 48px;
        margin-bottom: 12px;
    }

    .sm-empty-title {
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 6px;
    }

    .sm-empty-text {
        color: #64748b;
        font-size: 14px;
        margin: 0;
        line-height: 1.5;
    }

    /* =========================================
       TABLET
    ========================================= */

    @media (max-width: 1100px) {
        .sm-header {
            padding: 18px 20px;
        }

        .sm-main {
            padding: 18px;
        }

        .sidebar-wrap.open {
            width: 185px;
        }

        .sm-table-header,
        .sm-table-row {
            grid-template-columns:
                1.7fr
                0.9fr
                1.3fr
                1.3fr
                0.8fr
                1.5fr
                1.3fr;
        }

        .sm-table-header,
        .sm-table-row {
            padding-left: 14px;
            padding-right: 14px;
        }

        .sm-table-cell {
            padding-left: 4px;
            padding-right: 4px;
        }

        .sm-description {
            max-width: 130px;
        }

        .sm-edit-btn,
        .sm-delete-btn {
            padding: 5px 8px;
            font-size: 12px;
        }
    }

    /* =========================================
       MOBILE
    ========================================= */

    @media (max-width: 768px) {
        .sm-header {
            padding: 16px 14px;
            display: block;
        }

        .sm-header-left {
            margin-bottom: 14px;
        }

        .sm-header-title {
            font-size: 1.1rem;
        }

        .sm-header-right {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            width: 100%;
        }

        .sm-stat {
            min-width: 0;
            width: 100%;
            padding: 9px 11px;
        }

        .sm-add-btn {
            grid-column: 1 / -1;
            width: 100%;
            min-height: 42px;
        }

        .sm-body {
            display: block;
            min-height: auto;
        }

        /* Mobile filter bar */
        .sidebar-wrap,
        .sidebar-wrap.open,
        .sidebar-wrap.closed {
            width: 100%;
            height: auto;
            min-height: auto;
            display: block;
            overflow: visible;
            background: #0f172a;
        }

        .sidebar-toggle-btn {
            display: none;
        }

        .sidebar-section-label {
            display: block;
            opacity: 1;
            padding: 12px 14px 7px;
        }

        .sidebar-wrap.closed
            .sidebar-section-label {
            opacity: 1;
        }

        .sidebar-wrap
            > div:last-child {
            display: flex !important;
            flex-direction: row !important;
            gap: 7px;
            overflow-x: auto;
            padding: 0 10px 12px !important;
            scrollbar-width: thin;
        }

        .sidebar-btn-wrap {
            flex-shrink: 0;
        }

        .sidebar-btn {
            width: auto;
            min-width: max-content;
            margin: 0;
            min-height: 38px;
            padding: 7px 11px;
            gap: 7px;
        }

        .sidebar-btn-text,
        .sidebar-wrap.closed
            .sidebar-btn-text {
            opacity: 1;
            max-width: 120px;
            pointer-events: auto;
        }

        .sidebar-count,
        .sidebar-wrap.closed
            .sidebar-count {
            opacity: 1;
            pointer-events: auto;
        }

        .sidebar-tooltip {
            display: none;
        }

        .sm-main {
            padding: 14px;
            overflow: visible;
        }

        .sm-search {
            height: 46px;
            font-size: 14px;
        }

        .sm-result-count {
            margin-bottom: 12px;
        }

        /* Hide desktop table */
        .sm-table-container {
            display: none;
        }

        /* Show mobile cards */
        .sm-mobile-list {
            display: block;
        }
    }

    /* =========================================
       SMALL MOBILE
    ========================================= */

    @media (max-width: 480px) {
        .sm-header-left {
            gap: 10px;
        }

        .sm-header-icon {
            width: 38px;
            height: 38px;
            min-width: 38px;
            font-size: 19px;
        }

        .sm-header-title {
            font-size: 1rem;
        }

        .sm-header-subtitle {
            font-size: 11px;
        }

        .sm-header-right {
            grid-template-columns: 1fr 1fr;
        }

        .sm-stat {
            padding: 8px 9px;
        }

        .sm-stat-icon {
            font-size: 14px;
        }

        .sm-stat-label {
            font-size: 10px;
        }

        .sm-stat-value {
            font-size: 14px;
        }

        .sm-main {
            padding: 12px 10px;
        }

        .sm-mobile-card {
            padding: 14px;
        }

        .sm-mobile-info {
            grid-template-columns: 1fr;
            gap: 7px;
        }

        .sm-mobile-actions {
            grid-template-columns: 1fr 1fr;
        }
    }

    /* =========================================
       VERY SMALL MOBILE
    ========================================= */

    @media (max-width: 340px) {
        .sm-header-right {
            grid-template-columns: 1fr;
        }

        .sm-add-btn {
            grid-column: auto;
        }

        .sm-mobile-actions {
            grid-template-columns: 1fr;
        }
    }
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
                const response = await axios.get(
                    "https://medicine-finder-1-zwuu.onrender.com/isUser"
                );

                const data = response.data;

                if (
                    data.usertype === "nouser" ||
                    data.usertype !== "medical"
                ) {
                    navigate("/auth_error", {
                        replace: true,
                    });
                    return;
                }

                const medicineResponse = await axios.get(
                    "https://medicine-finder-1-zwuu.onrender.com/getMedicinesData"
                );

                setMedicineList(
                    medicineResponse.data || []
                );
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
        const matchType =
            activeType === "All" ||
            m.MedicineType === activeType;

        const q = search.toLowerCase().trim();

        const matchSearch =
            !q ||
            m.MedicineName
                ?.toLowerCase()
                .includes(q) ||
            m.MedicineCompany
                ?.toLowerCase()
                .includes(q) ||
            m.LicenseNumber
                ?.toLowerCase()
                .includes(q);

        return matchType && matchSearch;
    });

    const typeCounts = TYPES.reduce(
        (acc, type) => {
            acc[type] =
                type === "All"
                    ? medicinelist.length
                    : medicinelist.filter(
                          (m) =>
                              m.MedicineType === type
                      ).length;

            return acc;
        },
        {}
    );

    if (loading) {
        return (
            <>
                <MedicalNavbar />

                <div
                    style={{
                        minHeight: "100vh",
                        background: "#f8fafc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <div
                            className="spinner-border text-primary"
                            style={{
                                width: "2.5rem",
                                height: "2.5rem",
                            }}
                        />

                        <p
                            style={{
                                marginTop: "12px",
                                color: "#64748b",
                                fontWeight: 600,
                            }}
                        >
                            Loading medicines…
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style>{SHOW_MEDICINES_CSS}</style>

            <MedicalNavbar />

            <div className="sm-page">

                {/* =====================================
                    HEADER
                ===================================== */}
                <div className="sm-header">

                    <div className="sm-header-left">
                        <div className="sm-header-icon">
                            💊
                        </div>

                        <div>
                            <h1 className="sm-header-title">
                                Medicine Stock List
                            </h1>

                            <p className="sm-header-subtitle">
                                {medicinelist.length} medicines
                                registered
                            </p>
                        </div>
                    </div>

                    <div className="sm-header-right">

                        <div className="sm-stat">
                            <span className="sm-stat-icon">
                                💊
                            </span>

                            <div>
                                <div className="sm-stat-label">
                                    Total
                                </div>

                                <div className="sm-stat-value">
                                    {medicinelist.length}
                                </div>
                            </div>
                        </div>

                        <div className="sm-stat">
                            <span className="sm-stat-icon">
                                📦
                            </span>

                            <div>
                                <div className="sm-stat-label">
                                    Status
                                </div>

                                <div className="sm-stat-value">
                                    Active
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/insertmedicine"
                            className="sm-add-btn"
                        >
                            + Add Medicine
                        </Link>
                    </div>
                </div>

                {/* =====================================
                    BODY
                ===================================== */}
                <div className="sm-body">

                    {/* =================================
                        SIDEBAR / FILTER
                    ================================= */}
                    <aside
                        className={`sidebar-wrap ${
                            sidebarOpen
                                ? "open"
                                : "closed"
                        }`}
                    >

                        <button
                            type="button"
                            className="sidebar-toggle-btn"
                            onClick={() =>
                                setSidebarOpen(
                                    (value) => !value
                                )
                            }
                            aria-label={
                                sidebarOpen
                                    ? "Collapse filter sidebar"
                                    : "Expand filter sidebar"
                            }
                        >
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 13 13"
                                fill="none"
                            >
                                <path
                                    d="M8.5 2L4.5 6.5L8.5 11"
                                    stroke="#94a3b8"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <div className="sidebar-section-label">
                            Filter by type
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                paddingBottom: "16px",
                            }}
                        >
                            {TYPES.map((type) => {
                                const isActive =
                                    activeType === type;

                                const count =
                                    typeCounts[type] || 0;

                                const ts =
                                    type !== "All"
                                        ? getTypeStyle(type)
                                        : null;

                                return (
                                    <div
                                        key={type}
                                        className="sidebar-btn-wrap"
                                    >
                                        <button
                                            type="button"
                                            className={`sidebar-btn ${
                                                isActive
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setActiveType(
                                                    type
                                                )
                                            }
                                        >
                                            <span
                                                className="sidebar-dot"
                                                style={{
                                                    background:
                                                        type ===
                                                        "All"
                                                            ? isActive
                                                                ? "#3b82f6"
                                                                : "rgba(255,255,255,0.22)"
                                                            : ts?.color,
                                                }}
                                            />

                                            <span
                                                className="sidebar-btn-text"
                                                style={{
                                                    fontWeight:
                                                        isActive
                                                            ? 700
                                                            : 400,

                                                    color: isActive
                                                        ? "white"
                                                        : "rgba(255,255,255,0.6)",
                                                }}
                                            >
                                                {type}
                                            </span>

                                            {count > 0 && (
                                                <span
                                                    className="sidebar-count"
                                                    style={{
                                                        background:
                                                            isActive
                                                                ? "rgba(37,99,235,0.4)"
                                                                : "rgba(255,255,255,0.08)",

                                                        color: isActive
                                                            ? "white"
                                                            : "rgba(255,255,255,0.35)",
                                                    }}
                                                >
                                                    {count}
                                                </span>
                                            )}
                                        </button>

                                        <div className="sidebar-tooltip">
                                            {type}
                                            {count > 0
                                                ? ` · ${count}`
                                                : ""}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    {/* =================================
                        MAIN CONTENT
                    ================================= */}
                    <main className="sm-main">

                        {/* Search */}
                        <div className="sm-search-wrap">

                            <span className="sm-search-icon">
                                🔍
                            </span>

                            <input
                                type="text"
                                className="sm-search"
                                placeholder="Search by name, company, or license…"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                            {search && (
                                <button
                                    type="button"
                                    className="sm-clear-btn"
                                    onClick={() =>
                                        setSearch("")
                                    }
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Result count */}
                        <div className="sm-result-count">
                            <p>
                                Showing{" "}
                                <strong
                                    style={{
                                        color: "#0f172a",
                                    }}
                                >
                                    {filtered.length}
                                </strong>{" "}
                                of {medicinelist.length} medicines

                                {activeType !== "All" && (
                                    <>
                                        {" "}
                                        ·{" "}
                                        <span
                                            style={{
                                                color: "#2563eb",
                                            }}
                                        >
                                            {activeType}
                                        </span>
                                    </>
                                )}

                                {search && (
                                    <>
                                        {" "}
                                        matching{" "}
                                        <span
                                            style={{
                                                color: "#2563eb",
                                            }}
                                        >
                                            "{search}"
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>

                        {/* =================================
                            DESKTOP TABLE
                        ================================= */}
                        <div className="sm-table-container">

                            <div className="sm-table-header">

                                {[
                                    "Medicine",
                                    "Type",
                                    "Company",
                                    "License",
                                    "Price",
                                    "Description",
                                    "Actions",
                                ].map((heading, index) => (
                                    <div
                                        key={heading}
                                        className={`sm-table-header-cell ${
                                            index === 6
                                                ? "center"
                                                : ""
                                        }`}
                                    >
                                        {heading}
                                    </div>
                                ))}
                            </div>

                            {filtered.length === 0 ? (
                                <div className="sm-empty">

                                    <div className="sm-empty-icon">
                                        💊
                                    </div>

                                    <h4 className="sm-empty-title">
                                        No medicines found
                                    </h4>

                                    <p className="sm-empty-text">
                                        {search ||
                                        activeType !==
                                            "All"
                                            ? "Try adjusting your filters or search term."
                                            : "Add your first medicine to get started."}
                                    </p>
                                </div>
                            ) : (
                                filtered.map(
                                    (
                                        medicine,
                                        index
                                    ) => {
                                        const ts =
                                            getTypeStyle(
                                                medicine.MedicineType
                                            );

                                        const isEven =
                                            index % 2 ===
                                            0;

                                        return (
                                            <div
                                                key={
                                                    medicine._id
                                                }
                                                className="sm-table-row"
                                                style={{
                                                    background:
                                                        isEven
                                                            ? "white"
                                                            : "#f8fafc",

                                                    borderBottom:
                                                        index !==
                                                        filtered.length -
                                                            1
                                                            ? "1px solid #f1f5f9"
                                                            : "none",
                                                }}
                                                onMouseEnter={(
                                                    e
                                                ) => {
                                                    e.currentTarget.style.background =
                                                        "#eff6ff";
                                                }}
                                                onMouseLeave={(
                                                    e
                                                ) => {
                                                    e.currentTarget.style.background =
                                                        isEven
                                                            ? "white"
                                                            : "#f8fafc";
                                                }}
                                            >
                                                <div className="sm-table-cell">
                                                    <div className="sm-medicine-name">
                                                        {
                                                            medicine.MedicineName
                                                        }
                                                    </div>
                                                </div>

                                                <div className="sm-table-cell">
                                                    <span
                                                        className="sm-type-badge"
                                                        style={{
                                                            background:
                                                                ts.bg,
                                                            color:
                                                                ts.color,
                                                        }}
                                                    >
                                                        {
                                                            medicine.MedicineType
                                                        }
                                                    </span>
                                                </div>

                                                <div className="sm-table-cell">
                                                    <div className="sm-company">
                                                        {
                                                            medicine.MedicineCompany
                                                        }
                                                    </div>
                                                </div>

                                                <div className="sm-table-cell">
                                                    <span className="sm-license">
                                                        {
                                                            medicine.LicenseNumber
                                                        }
                                                    </span>
                                                </div>

                                                <div className="sm-table-cell">
                                                    <div className="sm-price">
                                                        ₹
                                                        {
                                                            medicine.UnitPrice
                                                        }
                                                    </div>
                                                </div>

                                                <div className="sm-table-cell">
                                                    <div
                                                        className="sm-description"
                                                        title={
                                                            medicine.Description
                                                        }
                                                    >
                                                        {medicine.Description ||
                                                            "—"}
                                                    </div>
                                                </div>

                                                <div className="sm-table-cell">
                                                    <div className="sm-actions">

                                                        <Link
                                                            to={
                                                                "/editmedicine/" +
                                                                medicine._id
                                                            }
                                                            className="sm-edit-btn"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <Link
                                                            to={
                                                                "/deletemedicine/" +
                                                                medicine._id
                                                            }
                                                            className="sm-delete-btn"
                                                        >
                                                            Delete
                                                        </Link>

                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )
                            )}
                        </div>

                        {/* =================================
                            MOBILE CARDS
                        ================================= */}
                        <div className="sm-mobile-list">

                            {filtered.length === 0 ? (
                                <div className="sm-table-container">
                                    <div className="sm-empty">
                                        <div className="sm-empty-icon">
                                            💊
                                        </div>

                                        <h4 className="sm-empty-title">
                                            No medicines found
                                        </h4>

                                        <p className="sm-empty-text">
                                            {search ||
                                            activeType !==
                                                "All"
                                                ? "Try adjusting your filters or search term."
                                                : "Add your first medicine to get started."}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                filtered.map(
                                    (medicine) => {
                                        const ts =
                                            getTypeStyle(
                                                medicine.MedicineType
                                            );

                                        return (
                                            <div
                                                key={
                                                    medicine._id
                                                }
                                                className="sm-mobile-card"
                                            >
                                                {/* Card top */}
                                                <div className="sm-mobile-card-top">

                                                    <div className="sm-mobile-medicine-name">
                                                        {
                                                            medicine.MedicineName
                                                        }
                                                    </div>

                                                    <span
                                                        className="sm-type-badge"
                                                        style={{
                                                            background:
                                                                ts.bg,
                                                            color:
                                                                ts.color,
                                                        }}
                                                    >
                                                        {
                                                            medicine.MedicineType
                                                        }
                                                    </span>
                                                </div>

                                                {/* Information */}
                                                <div className="sm-mobile-info">

                                                    <div className="sm-mobile-info-item">
                                                        <div className="sm-mobile-info-label">
                                                            Company
                                                        </div>

                                                        <div className="sm-mobile-info-value">
                                                            {
                                                                medicine.MedicineCompany ||
                                                                "—"
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="sm-mobile-info-item">
                                                        <div className="sm-mobile-info-label">
                                                            Price
                                                        </div>

                                                        <div className="sm-mobile-price">
                                                            ₹
                                                            {
                                                                medicine.UnitPrice
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="sm-mobile-info-item">
                                                        <div className="sm-mobile-info-label">
                                                            License
                                                        </div>

                                                        <div className="sm-mobile-info-value">
                                                            {
                                                                medicine.LicenseNumber ||
                                                                "—"
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="sm-mobile-info-item">
                                                        <div className="sm-mobile-info-label">
                                                            Type
                                                        </div>

                                                        <div className="sm-mobile-info-value">
                                                            {
                                                                medicine.MedicineType ||
                                                                "Other"
                                                            }
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* Description */}
                                                <div className="sm-mobile-description">

                                                    <div className="sm-mobile-info-label">
                                                        Description
                                                    </div>

                                                    <div className="sm-mobile-description-text">
                                                        {
                                                            medicine.Description ||
                                                            "No description available."
                                                        }
                                                    </div>

                                                </div>

                                                {/* Actions */}
                                                <div className="sm-mobile-actions">

                                                    <Link
                                                        to={
                                                            "/editmedicine/" +
                                                            medicine._id
                                                        }
                                                        className="sm-mobile-action sm-edit-btn"
                                                    >
                                                        ✏️ Edit
                                                    </Link>

                                                    <Link
                                                        to={
                                                            "/deletemedicine/" +
                                                            medicine._id
                                                        }
                                                        className="sm-mobile-action sm-delete-btn"
                                                    >
                                                        🗑️ Delete
                                                    </Link>

                                                </div>
                                            </div>
                                        );
                                    }
                                )
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default ShowMedicines;