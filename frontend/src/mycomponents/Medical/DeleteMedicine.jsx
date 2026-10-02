import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MedicalNavbar from "./MedicalNavbar";
import "./DeleteMedicine.css";

const DeleteMedicine = () => {

    const navigate = useNavigate();
    const { id } = useParams();

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
    const [deleting, setDeleting] = useState(false);
    const [notFound, setNotFound] = useState(false);

    // ─────────────────────────────
    // CHECK USER + FETCH MEDICINE
    // ─────────────────────────────

    useEffect(() => {

        const loadMedicine = async () => {

            try {

                setLoading(true);

                // Check logged-in user
                const userResponse = await axios.get(
                    "https://medicine-finder-1-zwuu.onrender.com/isUser"
                );

                const userData = userResponse.data;

                if (
                    userData.usertype === "nouser" ||
                    userData.usertype !== "medical"
                ) {

                    navigate("/auth_error", {
                        replace: true
                    });

                    return;
                }

                // Fetch medicine details
                const response = await axios.post(
                    "https://medicine-finder-1-zwuu.onrender.com/getmedicinedata",
                    { id }
                );

                const result = response.data;

                console.log(result);

                if (
                    !result ||
                    !result.MedicineName
                ) {

                    setNotFound(true);
                    return;
                }

                setMedicineName(
                    result.MedicineName || ""
                );

                setMedicineType(
                    result.MedicineType || ""
                );

                setMedicineCompany(
                    result.MedicineCompany || ""
                );

                setLicenseNumber(
                    result.LicenseNumber || ""
                );

                setUnitPrice(
                    result.UnitPrice || ""
                );

                setDescription(
                    result.Description || ""
                );

            } catch (error) {

                console.log(
                    "Delete Medicine Error:",
                    error
                );

                setNotFound(true);

            } finally {

                setLoading(false);
            }
        };

        loadMedicine();

    }, [id, navigate]);

    // ─────────────────────────────
    // DELETE MEDICINE
    // ─────────────────────────────

    const handleDeleteMedicine = async () => {

        if (deleting) {
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to permanently delete "${medicinename}"?`
        );

        if (!confirmDelete) {

            setRegister(
                "Delete cancelled. Your data is safe."
            );

            setTimeout(() => {
                setRegister("");
            }, 2500);

            return;
        }

        try {

            setDeleting(true);
            setRegister("");

            const response = await axios.post(
                "https://medicine-finder-1-zwuu.onrender.com/deletemedicinedata",
                {
                    id
                }
            );

            const result = response.data;

            console.log(result);

            setRegister(
                "Medicine deleted successfully"
            );

            // Clear fields
            setMedicineName("");
            setMedicineType("");
            setMedicineCompany("");
            setLicenseNumber("");
            setUnitPrice("");
            setDescription("");

            // Redirect after success
            setTimeout(() => {

                navigate(
                    "/showmedicine",
                    {
                        replace: true
                    }
                );

            }, 2000);

        } catch (error) {

            console.log(
                "Delete Error:",
                error
            );

            const backendMessage =
                error?.response?.data?.Message ||
                error?.response?.data?.message;

            setRegister(
                backendMessage ||
                "Something went wrong. Medicine could not be deleted."
            );

            setDeleting(false);
        }
    };

    // ─────────────────────────────
    // LOADING
    // ─────────────────────────────

    if (loading) {

        return (
            <>
                <MedicalNavbar />

                <div className="dm-loading-page">

                    <div className="text-center">

                        <div
                            className="spinner-border text-primary"
                            style={{
                                width: "3rem",
                                height: "3rem"
                            }}
                            role="status"
                            aria-label="Loading"
                        />

                        <h5 className="dm-loading-title">
                            Loading medicine details...
                        </h5>

                    </div>

                </div>
            </>
        );
    }

    // ─────────────────────────────
    // MEDICINE NOT FOUND
    // ─────────────────────────────

    if (notFound) {

        return (
            <>
                <MedicalNavbar />

                <div className="dm-page">

                    <div className="container">

                        <div className="dm-not-found">

                            <div className="dm-not-found-icon">
                                🔍
                            </div>

                            <h2>
                                Medicine Not Found
                            </h2>

                            <p>
                                The medicine you are trying to
                                delete could not be found.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/showmedicine",
                                        {
                                            replace: true
                                        }
                                    )
                                }
                                className="dm-primary-btn"
                            >
                                Back to Medicines
                            </button>

                        </div>

                    </div>

                </div>
            </>
        );
    }

    // ─────────────────────────────
    // MAIN UI
    // ─────────────────────────────

    return (
        <>
            <MedicalNavbar />

            <div className="dm-page">

                <div className="container">

                    <div className="dm-card">

                        {/* ───────────────────────────── */}
                        {/* HEADER */}
                        {/* ───────────────────────────── */}

                        <div className="dm-header">

                            <div className="dm-header-icon">
                                🛡️
                            </div>

                            <h2>
                                Delete Medicine
                            </h2>

                            <p>
                                Please review medicine details
                                before deleting permanently.
                            </p>

                        </div>

                        {/* ───────────────────────────── */}
                        {/* CONTENT */}
                        {/* ───────────────────────────── */}

                        <div className="dm-content">

                            {/* MESSAGE */}

                            {register && (

                                <div
                                    className={`dm-message ${
                                        register.includes(
                                            "successfully"
                                        )
                                            ? "dm-success"
                                            : register.includes(
                                                "cancelled"
                                            )
                                                ? "dm-warning"
                                                : "dm-danger"
                                    }`}
                                >
                                    {register.includes(
                                        "successfully"
                                    )
                                        ? "✓ "
                                        : register.includes(
                                            "cancelled"
                                        )
                                            ? "ℹ "
                                            : "⚠ "
                                    }

                                    {register}
                                </div>

                            )}

                            {/* ───────────────────────────── */}
                            {/* MEDICINE DETAILS */}
                            {/* ───────────────────────────── */}

                            <div className="dm-details-grid">

                                {/* MEDICINE NAME */}

                                <div className="dm-field">

                                    <label>
                                        Medicine Name
                                    </label>

                                    <input
                                        type="text"
                                        value={medicinename}
                                        readOnly
                                    />

                                </div>

                                {/* TYPE */}

                                <div className="dm-field">

                                    <label>
                                        Medicine Type
                                    </label>

                                    <input
                                        type="text"
                                        value={medicinetype}
                                        readOnly
                                    />

                                </div>

                                {/* COMPANY */}

                                <div className="dm-field">

                                    <label>
                                        Medicine Company
                                    </label>

                                    <input
                                        type="text"
                                        value={medicinecompany}
                                        readOnly
                                    />

                                </div>

                                {/* LICENSE */}

                                <div className="dm-field">

                                    <label>
                                        License Number
                                    </label>

                                    <input
                                        type="text"
                                        value={licensenumber}
                                        readOnly
                                    />

                                </div>

                                {/* PRICE */}

                                <div className="dm-field">

                                    <label>
                                        Unit Price
                                    </label>

                                    <input
                                        type="text"
                                        value={`₹ ${unitprice}`}
                                        readOnly
                                    />

                                </div>

                                {/* DESCRIPTION */}

                                <div className="dm-field">

                                    <label>
                                        Description
                                    </label>

                                    <input
                                        type="text"
                                        value={description}
                                        readOnly
                                    />

                                </div>

                            </div>

                            {/* ───────────────────────────── */}
                            {/* WARNING */}
                            {/* ───────────────────────────── */}

                            <div className="dm-warning-box">

                                <div className="dm-warning-title">
                                    ⚠ Warning
                                </div>

                                <p>
                                    This action will permanently
                                    delete this medicine record
                                    from your Medicine Finder
                                    system.
                                </p>

                                <small>
                                    This action cannot be undone.
                                </small>

                            </div>

                            {/* ───────────────────────────── */}
                            {/* BUTTONS */}
                            {/* ───────────────────────────── */}

                            <div className="dm-actions">

                                <button
                                    type="button"
                                    onClick={
                                        handleDeleteMedicine
                                    }
                                    disabled={deleting}
                                    className="dm-delete-btn"
                                >

                                    {deleting ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            />

                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            🗑️ Delete Medicine
                                        </>
                                    )}

                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/showmedicine"
                                        )
                                    }
                                    disabled={deleting}
                                    className="dm-cancel-btn"
                                >
                                    ← Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default DeleteMedicine;