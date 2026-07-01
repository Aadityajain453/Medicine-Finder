import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicalNavbar from "./MedicalNavbar";
import pharmacy from "../Assets/medical3.jpg";
import inventory from "../Assets/medical1.jpg";
import medicine from "../Assets/medical2.jpg";

import { motion } from "framer-motion";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip
} from "recharts";

const MedicalHome = () => {

    const navigate = useNavigate();

    const [photo, setPhoto] = useState("");
    const [medical, setMedical] = useState(null);
    const [loading, setLoading] = useState(true);

    const stockData = [
        { name: "In Stock", value: 70 },
        { name: "Low Stock", value: 20 },
        { name: "Out Stock", value: 10 }
    ];

    // ─────────────────────────────────────────
    // CHECK USER + LOAD PROFILE
    // ─────────────────────────────────────────


    const handlePhotoUpload = async (e) => {

        const formData = new FormData();

        formData.append("file", e.target.files[0]);
        formData.append("Email", medical.Email);

        await axios.post(
            "http://localhost:5000/uploadfile",
            formData
        );

        window.location.reload();
    };

    const deletePhoto = async () => {

        await axios.post(
            "http://localhost:5000/delete_admin_photo",
            {
                Email: medical.Email
            }
        );

        setPhoto("");
    };


    useEffect(() => {

        const initializeDashboard = async () => {

            try {

                const authResponse = await axios.get(
                    "http://localhost:5000/isUser"
                );

                const userType =
                    authResponse?.data?.usertype;

                if (
                    userType === "nouser" ||
                    userType !== "medical"
                ) {

                    navigate("/auth_error", {
                        replace: true
                    });

                    return;
                }

                const profileResponse = await axios.get(
                    "http://localhost:5000/showMedicalProfile"
                );

                setMedical(profileResponse?.data);

                const photoResponse = await axios.post(
                    "http://localhost:5000/get_profile_photo",
                    {
                        eml: profileResponse.data.Email
                    }
                );

                if (photoResponse.data) {
                    setPhoto(photoResponse.data.filename);
                }

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        initializeDashboard();

    }, [navigate]);

    // ─────────────────────────────────────────
    // LOADING SCREEN
    // ─────────────────────────────────────────
    if (loading) {

        return (
            <>
                <MedicalNavbar />

                <div
                    className="d-flex justify-content-center align-items-center flex-column"
                    style={{
                        minHeight: "100vh",
                        background: "#f8fafc"
                    }}
                >

                    <div
                        className="spinner-border text-primary"
                        style={{
                            width: "3rem",
                            height: "3rem"
                        }}
                    />

                    <h5
                        className="mt-3 fw-bold"
                        style={{
                            color: "#0f172a",
                            fontSize: "16px"
                        }}
                    >
                        Loading Dashboard...
                    </h5>

                </div>
            </>
        );
    }

    return (
        <>
            <MedicalNavbar />

            <div
                style={{
                    minHeight: "100vh",
                    background:
                        "linear-gradient(to bottom right,#f8fafc,#ffffff,#eef4ff)",
                    paddingBottom: "50px"
                }}
            >

                <div className="container py-4">

                    {/* HERO SECTION */}

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-4 overflow-hidden"
                        style={{
                            borderRadius: "28px",
                            height: "340px",
                            position: "relative"
                        }}
                    >

                        <motion.img
                            src={pharmacy}
                            alt=""
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.05 }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(to right, rgba(15,23,42,.85), rgba(15,23,42,.35))",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                padding: "40px",
                                color: "white"
                            }}
                        >
                            <h1 className="fw-bold">
                                Welcome {medical?.Medicalname}
                            </h1>

                            <div className="d-flex gap-3 mt-3">
                                <span
                                    style={{
                                        background: "#22c55e",
                                        padding: "8px 15px",
                                        borderRadius: "30px",
                                        fontSize: "13px",
                                        fontWeight: "600"
                                    }}
                                >
                                    ✔ Verified Store
                                </span>

                                <span
                                    style={{
                                        background: "#2563eb",
                                        padding: "8px 15px",
                                        borderRadius: "30px",
                                        fontSize: "13px",
                                        fontWeight: "600"
                                    }}
                                >
                                    💊 Inventory Active
                                </span>
                            </div>

                            <p
                                style={{
                                    fontSize: "16px",
                                    maxWidth: "600px",
                                    lineHeight: "1.8",
                                    marginTop: "15px"
                                }}
                            >
                                Manage medicines, monitor stock levels,
                                update pricing and grow your pharmacy
                                business with real-time insights.
                            </p>
                        </div>

                    </motion.div>

                    <div className="row g-3 mb-4">

                        <div className="col-md-4">
                            <div
                                className="bg-white text-center p-4"
                                style={{
                                    borderRadius: "20px",
                                    boxShadow: "0 10px 25px rgba(0,0,0,.08)"
                                }}
                            >
                                <h2 className="fw-bold text-primary">
                                    1284
                                </h2>

                                <p className="mb-0">
                                    Medicines
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div
                                className="bg-white text-center p-4"
                                style={{
                                    borderRadius: "20px",
                                    boxShadow: "0 10px 25px rgba(0,0,0,.08)"
                                }}
                            >
                                <h2 className="fw-bold text-success">
                                    532
                                </h2>

                                <p className="mb-0">
                                    Orders
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div
                                className="bg-white text-center p-4"
                                style={{
                                    borderRadius: "20px",
                                    boxShadow: "0 10px 25px rgba(0,0,0,.08)"
                                }}
                            >
                                <h2 className="fw-bold text-warning">
                                    89
                                </h2>

                                <p className="mb-0">
                                    Customers
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="row g-3 mb-4">

                        <div className="col-md-3">
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => navigate("/insertmedicine")}
                                style={{
                                    height: "60px",
                                    borderRadius: "16px",
                                    fontWeight: "700"
                                }}
                            >
                                ➕ Add Medicine
                            </button>
                        </div>

                        <div className="col-md-3">
                            <button
                                className="btn btn-success w-100"
                                onClick={() => navigate("/showmedicine")}
                                style={{
                                    height: "60px",
                                    borderRadius: "16px",
                                    fontWeight: "700"
                                }}
                            >
                                💊 Show Medicines
                            </button>
                        </div>

                        <div className="col-md-3">
                            <button
                                className="btn btn-warning w-100"
                                style={{
                                    height: "60px",
                                    borderRadius: "16px",
                                    fontWeight: "700"
                                }}
                            >
                                📦 Inventory
                            </button>
                        </div>

                        <div className="col-md-3">
                            <button
                                className="btn btn-dark w-100"
                                style={{
                                    height: "60px",
                                    borderRadius: "16px",
                                    fontWeight: "700"
                                }}
                                onClick={() => navigate("/updatemedicalpassword")}
                            >
                                🔐 Password
                            </button>
                        </div>

                    </div>



                    {/* MAIN SECTION */}

                    <div className="row g-4">

                        {/* PROFILE CARD */}

                        <div className="col-lg-4">

                            <motion.div
                                className="bg-white h-100"
                                style={{
                                    borderRadius: "24px",
                                    overflow: "hidden",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
                                }}
                            >
                                {/* TOP */}

                                <div
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#2563eb,#60a5fa)",
                                        padding: "30px 20px",
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                >

                                    {
                                        photo ? (
                                            <img
                                                src={`http://localhost:5000/public/photos/${photo}`}
                                                alt="Profile"
                                                style={{
                                                    width: "85px",
                                                    height: "85px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                    border: "3px solid white"
                                                }}
                                            />
                                        ) : (
                                            medical?.Medicalname
                                                ?.charAt(0)
                                                ?.toUpperCase()
                                        )
                                    }

                                    <div className="mt-3">

                                        <input
                                            type="file"
                                            id="profilePhoto"
                                            hidden
                                            onChange={handlePhotoUpload}
                                        />

                                        <button
                                            className="btn btn-light btn-sm me-2"
                                            onClick={() =>
                                                document
                                                    .getElementById("profilePhoto")
                                                    .click()
                                            }
                                        >
                                            Edit Photo
                                        </button>

                                        {
                                            photo && (
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={deletePhoto}
                                                >
                                                    Delete Photo
                                                </button>
                                            )
                                        }

                                    </div>

                                    <h3
                                        className="fw-bold"
                                        style={{
                                            fontSize: "1.3rem"
                                        }}
                                    >
                                        {medical?.Medicalname}
                                    </h3>

                                    <p
                                        style={{
                                            color:
                                                "rgba(255,255,255,0.85)",
                                            fontSize: "12px",
                                            marginBottom: 0
                                        }}
                                    >
                                        Authorized Medical Store
                                    </p>

                                </div>

                                {/* BODY */}

                                <div className="p-4">

                                    {
                                        [
                                            {
                                                label: "Owner Name",
                                                value:
                                                    medical?.OwnerName
                                            },
                                            {
                                                label: "Email",
                                                value:
                                                    medical?.Email
                                            },
                                            {
                                                label: "Contact",
                                                value:
                                                    medical?.Contact
                                            },
                                            {
                                                label: "Licence",
                                                value:
                                                    medical?.LicenceNumber
                                            },
                                            {
                                                label: "Address",
                                                value:
                                                    medical?.Address
                                            }
                                        ].map((item, index) => (

                                            <div
                                                key={index}
                                                className="mb-4"
                                            >

                                                <p
                                                    style={{
                                                        fontSize: "11px",
                                                        color: "#94a3b8",
                                                        fontWeight: "700",
                                                        textTransform:
                                                            "uppercase",
                                                        marginBottom:
                                                            "6px"
                                                    }}
                                                >
                                                    {item.label}
                                                </p>

                                                <h6
                                                    style={{
                                                        fontWeight:
                                                            "700",
                                                        color:
                                                            "#0f172a",
                                                        fontSize: "13px",
                                                        marginBottom: 0,
                                                        lineHeight: "1.6"
                                                    }}
                                                >
                                                    {item.value}
                                                </h6>

                                            </div>
                                        ))
                                    }

                                </div>

                            </motion.div>

                        </div>

                        {/* RIGHT SIDE */}

                        <div className="col-lg-8">

                            {/* STATS */}

                            <motion.div
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.2 }}
                            ></motion.div>


                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="bg-white p-4 mb-4"
                            >
                                <h5 className="fw-bold">
                                    Inventory Overview
                                </h5>

                                <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                >
                                    <PieChart>
                                        <Pie
                                            data={stockData}
                                            dataKey="value"
                                            outerRadius={100}
                                        >
                                            <Cell fill="#2563eb" />
                                            <Cell fill="#f59e0b" />
                                            <Cell fill="#ef4444" />
                                        </Pie>

                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </motion.div>

                            {/* ACTION CARDS */}

                            <div className="row g-4">

                                {
                                    [
                                        {
                                            title: "Medicines",
                                            description:
                                                "Manage medicine records and details.",
                                            icon: "💊",
                                            bg: "#eff6ff",
                                            color: "#2563eb"
                                        },
                                        {
                                            title: "Stock Records",
                                            description:
                                                "Track medicine stock and pricing.",
                                            icon: "📦",
                                            bg: "#ecfeff",
                                            color: "#0891b2"
                                        },
                                        {
                                            title: "Store Profile",
                                            description:
                                                "View your medical store information.",
                                            icon: "🏥",
                                            bg: "#f5f3ff",
                                            color: "#7c3aed"
                                        },
                                        {
                                            title: "Analytics",
                                            description:
                                                "Monitor reports and performance.",
                                            icon: "📊",
                                            bg: "#fff7ed",
                                            color: "#ea580c"
                                        }
                                    ].map((card, index) => (

                                        <div
                                            className="col-md-6"
                                            key={index}
                                        >

                                            <motion.div style={{
                                                borderRadius: "24px",
                                                padding: "26px",
                                                border: "1px solid #e2e8f0",
                                                boxShadow: "0 10px 25px rgba(148,163,184,0.08)",
                                                cursor: "pointer"
                                            }}
                                                whileHover={{
                                                    y: -10,
                                                    scale: 1.03
                                                }}
                                                whileTap={{
                                                    scale: 0.98
                                                }}
                                                className="bg-white h-100 position-relative overflow-hidden"
                                            >
                                                {/* TOP ICON */}

                                                <div
                                                    className="d-flex justify-content-center align-items-center mb-4"
                                                    style={{
                                                        width: "72px",
                                                        height: "72px",
                                                        borderRadius: "20px",
                                                        background: card.bg,
                                                        fontSize: "32px"
                                                    }}
                                                >
                                                    {card.icon}
                                                </div>

                                                {/* TITLE */}

                                                <h4
                                                    className="fw-bold"
                                                    style={{
                                                        color: "#0f172a",
                                                        fontSize: "1.1rem",
                                                        marginBottom: "12px"
                                                    }}
                                                >
                                                    {card.title}
                                                </h4>

                                                {/* DESCRIPTION */}

                                                <p
                                                    style={{
                                                        color: "#64748b",
                                                        lineHeight: "1.8",
                                                        fontSize: "13px",
                                                        marginBottom: "24px"
                                                    }}
                                                >
                                                    {card.description}
                                                </p>

                                                {/* BUTTON */}

                                                <button
                                                    className="btn fw-semibold"
                                                    style={{
                                                        background: card.bg,
                                                        color: card.color,
                                                        borderRadius: "12px",
                                                        padding: "10px 18px",
                                                        border: "none",
                                                        fontSize: "13px"
                                                    }}
                                                >
                                                    Open Module →
                                                </button>

                                                {/* BACKGROUND GLOW */}

                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "-30px",
                                                        right: "-30px",
                                                        width: "120px",
                                                        height: "120px",
                                                        borderRadius: "50%",
                                                        background: card.bg,
                                                        opacity: "0.5"
                                                    }}
                                                />

                                            </motion.div>

                                        </div>
                                    ))
                                }

                            </div>

                        </div>

                    </div>

                    <div className="row mt-4">

                        <motion.div
                            className="col-md-6"
                            whileHover={{
                                scale: 1.03
                            }}
                            transition={{
                                duration: 0.3
                            }}
                        >
                            <img
                                src={inventory}
                                alt=""
                                style={{
                                    width: "100%",
                                    height: "250px",
                                    objectFit: "cover",
                                    borderRadius: "22px"
                                }}
                            />
                        </motion.div>

                        <motion.div
                            className="col-md-6"
                            whileHover={{
                                scale: 1.03
                            }}
                            transition={{
                                duration: 0.3
                            }}
                        >
                            <img
                                src={medicine}
                                alt=""
                                style={{
                                    width: "100%",
                                    height: "250px",
                                    objectFit: "cover",
                                    borderRadius: "22px"
                                }}
                            />
                        </motion.div>

                    </div>
                </div>

            </div >
        </>
    );
};

export default MedicalHome;