import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicalNavbar from "./MedicalNavbar";

const MedicineReg = () => {

    const navigate = useNavigate();

    // ─────────────────────────────
    // REFS
    // ─────────────────────────────
    const medicinenmRef = useRef();
    const meditypRef = useRef();
    const mediccompRef = useRef();
    const licnoRef = useRef();
    const unitprRef = useRef();
    const descriRef = useRef();

    // ─────────────────────────────
    // STATES
    // ─────────────────────────────
    const [medicinename, setMedicineName] = useState("");
    const [medicinetype, setMedicineType] = useState("");
    const [medicinecompany, setMedicineCompany] = useState("");
    const [licensenumber, setLicenseNumber] = useState("");
    const [unitprice, setUnitPrice] = useState("");
    const [description, setDescription] = useState("");

    const [register, setRegister] = useState("");
    const [loading, setLoading] = useState(true);

    // ─────────────────────────────
    // AUTH CHECK
    // ─────────────────────────────
    useEffect(() => {

        const checkUser = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:5000/isUser"
                );

                const data = response.data;

                if (
                    data.usertype === "nouser" ||
                    data.usertype !== "medical"
                ) {

                    navigate("/auth_error", {
                        replace: true
                    });
                }

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        checkUser();

    }, [navigate]);

    // ─────────────────────────────
    // REGISTER MEDICINE
    // ─────────────────────────────
    const handleMedicineReg = async () => {

        if (medicinename === "") {

            alert("Please enter medicine name");
            medicinenmRef.current.focus();
        }

        else if (medicinetype === "") {

            alert("Please enter medicine type");
            meditypRef.current.focus();
        }

        else if (medicinecompany === "") {

            alert("Please enter medicine company");
            mediccompRef.current.focus();
        }

        else if (licensenumber === "") {

            alert("Please enter license number");
            licnoRef.current.focus();
        }

        else if (unitprice === "") {

            alert("Please enter unit price");
            unitprRef.current.focus();
        }

        else if (description === "") {

            alert("Please enter description");
            descriRef.current.focus();
        }

        else {

            try {

                const response = await axios.post(
                    "http://localhost:5000/getmedicinereg",
                    {
                        medicinename,
                        medicinetype,
                        medicinecompany,
                        licensenumber,
                        unitprice,
                        description
                    }
                );

                const MedicineData = response.data;

                if (MedicineData.Data === "Data Saved") {

                    setRegister(
                        "Medicine registered successfully"
                    );

                    setMedicineName("");
                    setMedicineType("");
                    setMedicineCompany("");
                    setLicenseNumber("");
                    setUnitPrice("");
                    setDescription("");

                    setTimeout(() => {
                        setRegister("");
                    }, 3000);
                }

            } catch (error) {

                console.log(error);
            }
        }
    };

    // ─────────────────────────────
    // LOADING
    // ─────────────────────────────
    if (loading) {

        return (
            <>
                <MedicalNavbar />

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        minHeight: "100vh",
                        background: "#f4f7fb"
                    }}
                >

                    <div className="text-center">

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
                                color: "#0f172a"
                            }}
                        >
                            Loading...
                        </h5>

                    </div>

                </div>
            </>
        );
    }

    // ─────────────────────────────
    // INPUT STYLE
    // ─────────────────────────────
    const inputStyle = {
        borderRadius: "14px",
        border: "1px solid #dbe4f0",
        background: "#ffffff",
        padding: "14px 16px",
        fontSize: "14px",
        boxShadow: "none"
    };

    return (
        <>
            <MedicalNavbar />

            <div
                style={{
                    minHeight: "100vh",
                    background: "#f4f7fb",
                    padding: "35px 0"
                }}
            >

                <div className="container">

                    {/* ───────────────────────────── */}
                    {/* HEADER */}
                    {/* ───────────────────────────── */}

                    <div
                        className="mb-4"
                        style={{
                            background: "#ffffff",
                            borderRadius: "24px",
                            padding: "28px",
                            border: "1px solid #e2e8f0",
                            boxShadow:
                                "0 10px 30px rgba(15,23,42,0.05)"
                        }}
                    >

                        <div className="row align-items-center">

                            <div className="col-lg-8">

                                <div
                                    className="mb-3 d-inline-flex align-items-center gap-2"
                                    style={{
                                        background: "#eff6ff",
                                        color: "#2563eb",
                                        padding: "8px 14px",
                                        borderRadius: "30px",
                                        fontSize: "13px",
                                        fontWeight: "600"
                                    }}
                                >
                                    💊 Inventory Management
                                </div>

                                <h1
                                    style={{
                                        fontSize: "2rem",
                                        fontWeight: "800",
                                        color: "#0f172a",
                                        marginBottom: "10px"
                                    }}
                                >
                                    Register Medicine
                                </h1>

                                <p
                                    style={{
                                        color: "#64748b",
                                        marginBottom: 0,
                                        fontSize: "15px"
                                    }}
                                >
                                    Add medicine details professionally
                                    and manage inventory records easily.
                                </p>

                            </div>

                            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">

                                <div
                                    className="d-inline-flex align-items-center justify-content-center"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        borderRadius: "24px",
                                        background:
                                            "linear-gradient(135deg,#2563eb,#06b6d4)",
                                        color: "#fff",
                                        fontSize: "36px",
                                        boxShadow:
                                            "0 15px 35px rgba(37,99,235,0.2)"
                                    }}
                                >
                                    💊
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="row g-4">

                        {/* ───────────────────────────── */}
                        {/* FORM SECTION */}
                        {/* ───────────────────────────── */}

                        <div className="col-lg-8">

                            <div
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "24px",
                                    padding: "32px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow:
                                        "0 10px 30px rgba(15,23,42,0.05)"
                                }}
                            >

                                <div className="mb-4">

                                    <h3
                                        style={{
                                            fontWeight: "700",
                                            color: "#0f172a",
                                            marginBottom: "8px"
                                        }}
                                    >
                                        Medicine Information
                                    </h3>

                                    <p
                                        style={{
                                            color: "#64748b",
                                            marginBottom: 0,
                                            fontSize: "14px"
                                        }}
                                    >
                                        Fill all medicine details carefully.
                                    </p>

                                </div>

                                <div className="row g-4">

                                    {/* NAME */}

                                    <div className="col-md-6">

                                        <label className="fw-semibold mb-2">
                                            Medicine Name
                                        </label>

                                        <input
                                            ref={medicinenmRef}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter medicine name"
                                            value={medicinename}
                                            onChange={(e) => {
                                                setMedicineName(
                                                    e.target.value
                                                );

                                                setRegister("");
                                            }}
                                            style={inputStyle}
                                        />

                                    </div>

                                    {/* TYPE */}

                                    <div className="col-md-6">

                                        <label className="fw-semibold mb-2">
                                            Medicine Type
                                        </label>

                                        <input
                                            ref={meditypRef}
                                            type="text"
                                            className="form-control"
                                            placeholder="Tablet / Syrup"
                                            value={medicinetype}
                                            onChange={(e) => {
                                                setMedicineType(
                                                    e.target.value
                                                );

                                                setRegister("");
                                            }}
                                            style={inputStyle}
                                        />

                                    </div>

                                    {/* COMPANY */}

                                    <div className="col-md-6">

                                        <label className="fw-semibold mb-2">
                                            Company Name
                                        </label>

                                        <input
                                            ref={mediccompRef}
                                            type="text"
                                            className="form-control"
                                            placeholder="Company name"
                                            value={medicinecompany}
                                            onChange={(e) => {
                                                setMedicineCompany(
                                                    e.target.value
                                                );

                                                setRegister("");
                                            }}
                                            style={inputStyle}
                                        />

                                    </div>

                                    {/* LICENSE */}

                                    <div className="col-md-6">

                                        <label className="fw-semibold mb-2">
                                            License Number
                                        </label>

                                        <input
                                            ref={licnoRef}
                                            type="text"
                                            className="form-control"
                                            placeholder="License number"
                                            value={licensenumber}
                                            onChange={(e) => {
                                                setLicenseNumber(
                                                    e.target.value
                                                );

                                                setRegister("");
                                            }}
                                            style={inputStyle}
                                        />

                                    </div>

                                    {/* PRICE */}

                                    <div className="col-md-6">

                                        <label className="fw-semibold mb-2">
                                            Unit Price
                                        </label>

                                        <input
                                            ref={unitprRef}
                                            type="text"
                                            className="form-control"
                                            placeholder="₹ Enter price"
                                            value={unitprice}
                                            onChange={(e) => {
                                                setUnitPrice(
                                                    e.target.value
                                                );

                                                setRegister("");
                                            }}
                                            style={inputStyle}
                                        />

                                    </div>

                                    {/* DESCRIPTION */}

                                    <div className="col-md-6">

                                        <label className="fw-semibold mb-2">
                                            Description
                                        </label>

                                        <input
                                            ref={descriRef}
                                            type="text"
                                            className="form-control"
                                            placeholder="Short description"
                                            value={description}
                                            onChange={(e) => {
                                                setDescription(
                                                    e.target.value
                                                );

                                                setRegister("");
                                            }}
                                            style={inputStyle}
                                        />

                                    </div>

                                </div>

                                {/* BUTTON */}

                                <button
                                    onClick={handleMedicineReg}
                                    className="btn w-100 mt-4"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#2563eb,#0ea5e9)",
                                        border: "none",
                                        color: "#fff",
                                        fontWeight: "700",
                                        padding: "15px",
                                        borderRadius: "16px",
                                        fontSize: "15px",
                                        boxShadow:
                                            "0 12px 25px rgba(37,99,235,0.18)"
                                    }}
                                >
                                    Save Medicine
                                </button>

                                {/* SUCCESS */}

                                {
                                    register && (

                                        <div
                                            className="mt-4 text-center"
                                            style={{
                                                background: "#dcfce7",
                                                color: "#166534",
                                                padding: "14px",
                                                borderRadius: "14px",
                                                fontWeight: "700",
                                                fontSize: "14px"
                                            }}
                                        >
                                            {register}
                                        </div>
                                    )
                                }

                            </div>

                        </div>

                        {/* ───────────────────────────── */}
                        {/* SIDE PANEL */}
                        {/* ───────────────────────────── */}

                        <div className="col-lg-4">

                            <div
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "24px",
                                    padding: "28px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow:
                                        "0 10px 30px rgba(15,23,42,0.05)",
                                    height: "100%"
                                }}
                            >

                                <h4
                                    style={{
                                        fontWeight: "700",
                                        color: "#0f172a",
                                        marginBottom: "25px"
                                    }}
                                >
                                    Live Preview
                                </h4>

                                <div
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#2563eb,#06b6d4)",
                                        borderRadius: "22px",
                                        padding: "24px",
                                        color: "#fff"
                                    }}
                                >

                                    <div
                                        className="d-flex justify-content-between align-items-center mb-4"
                                    >

                                        <div>

                                            <small
                                                style={{
                                                    opacity: 0.8
                                                }}
                                            >
                                                MEDICINE
                                            </small>

                                            <h3
                                                style={{
                                                    fontWeight: "800",
                                                    marginTop: "5px"
                                                }}
                                            >
                                                {
                                                    medicinename ||
                                                    "Paracetamol"
                                                }
                                            </h3>

                                        </div>

                                        <div
                                            style={{
                                                fontSize: "34px"
                                            }}
                                        >
                                            💊
                                        </div>

                                    </div>

                                    <div className="mb-3">

                                        <small
                                            style={{
                                                opacity: 0.8
                                            }}
                                        >
                                            Company
                                        </small>

                                        <h6 className="mt-1 fw-bold">
                                            {
                                                medicinecompany ||
                                                "Cipla"
                                            }
                                        </h6>

                                    </div>

                                    <div className="row">

                                        <div className="col-6">

                                            <small
                                                style={{
                                                    opacity: 0.8
                                                }}
                                            >
                                                Type
                                            </small>

                                            <h6 className="mt-1 fw-bold">
                                                {
                                                    medicinetype ||
                                                    "Tablet"
                                                }
                                            </h6>

                                        </div>

                                        <div className="col-6">

                                            <small
                                                style={{
                                                    opacity: 0.8
                                                }}
                                            >
                                                Price
                                            </small>

                                            <h6 className="mt-1 fw-bold">
                                                ₹
                                                {
                                                    unitprice ||
                                                    "20"
                                                }
                                            </h6>

                                        </div>

                                    </div>

                                    <hr
                                        style={{
                                            borderColor:
                                                "rgba(255,255,255,0.2)"
                                        }}
                                    />

                                    <small
                                        style={{
                                            opacity: 0.8
                                        }}
                                    >
                                        License No.
                                    </small>

                                    <h6 className="mt-1 fw-bold">
                                        {
                                            licensenumber ||
                                            "LIC-2026"
                                        }
                                    </h6>

                                </div>

                                <div
                                    className="mt-4"
                                    style={{
                                        background: "#f8fafc",
                                        borderRadius: "18px",
                                        padding: "18px",
                                        border:
                                            "1px solid #e2e8f0"
                                    }}
                                >

                                    <small
                                        style={{
                                            color: "#64748b",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Description
                                    </small>

                                    <p
                                        className="mt-2 mb-0"
                                        style={{
                                            color: "#0f172a",
                                            fontSize: "14px",
                                            lineHeight: "24px"
                                        }}
                                    >
                                        {
                                            description ||
                                            "Medicine description preview will appear here."
                                        }
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default MedicineReg;