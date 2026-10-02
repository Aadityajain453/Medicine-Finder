import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicalNavbar from "./MedicalNavbar";
import "./MedicineReg.css";

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
    const [saving, setSaving] = useState(false);

    // ─────────────────────────────
    // VALIDATION ERRORS
    // ─────────────────────────────
    const [errors, setErrors] = useState({
        medicinename: "",
        medicinetype: "",
        medicinecompany: "",
        licensenumber: "",
        unitprice: "",
        description: ""
    });

    // ─────────────────────────────
    // AUTH CHECK
    // ─────────────────────────────
    useEffect(() => {

        const checkUser = async () => {

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
    // VALIDATE MEDICINE FORM
    // ─────────────────────────────
    const validateForm = () => {

        const newErrors = {
            medicinename: "",
            medicinetype: "",
            medicinecompany: "",
            licensenumber: "",
            unitprice: "",
            description: ""
        };

        let isValid = true;
        let firstErrorRef = null;

        // ─────────────────────────
        // MEDICINE NAME
        // ─────────────────────────

        const medicineNameValue = medicinename.trim();

        if (!medicineNameValue) {

            newErrors.medicinename =
                "Medicine name is required";

            firstErrorRef = medicinenmRef;
            isValid = false;

        } else if (medicineNameValue.length < 2) {

            newErrors.medicinename =
                "Medicine name must be at least 2 characters";

            firstErrorRef = medicinenmRef;
            isValid = false;

        } else if (medicineNameValue.length > 100) {

            newErrors.medicinename =
                "Medicine name cannot exceed 100 characters";

            firstErrorRef = medicinenmRef;
            isValid = false;

        } else if (
            !/^[A-Za-z0-9][A-Za-z0-9 .()+'/-]*$/.test(
                medicineNameValue
            )
        ) {

            newErrors.medicinename =
                "Medicine name contains invalid characters";

            firstErrorRef = medicinenmRef;
            isValid = false;
        }

        // ─────────────────────────
        // MEDICINE TYPE
        // ─────────────────────────

        const medicineTypeValue = medicinetype.trim();

        if (!medicineTypeValue) {

            newErrors.medicinetype =
                "Medicine type is required";

            if (!firstErrorRef) {
                firstErrorRef = meditypRef;
            }

            isValid = false;

        } else if (medicineTypeValue.length < 2) {

            newErrors.medicinetype =
                "Medicine type must be at least 2 characters";

            if (!firstErrorRef) {
                firstErrorRef = meditypRef;
            }

            isValid = false;

        } else if (medicineTypeValue.length > 50) {

            newErrors.medicinetype =
                "Medicine type cannot exceed 50 characters";

            if (!firstErrorRef) {
                firstErrorRef = meditypRef;
            }

            isValid = false;

        } else if (
            !/^[A-Za-z][A-Za-z0-9 .()/-]*$/.test(
                medicineTypeValue
            )
        ) {

            newErrors.medicinetype =
                "Please enter a valid medicine type";

            if (!firstErrorRef) {
                firstErrorRef = meditypRef;
            }

            isValid = false;
        }

        // ─────────────────────────
        // COMPANY NAME
        // ─────────────────────────

        const companyValue = medicinecompany.trim();

        if (!companyValue) {

            newErrors.medicinecompany =
                "Company name is required";

            if (!firstErrorRef) {
                firstErrorRef = mediccompRef;
            }

            isValid = false;

        } else if (companyValue.length < 2) {

            newErrors.medicinecompany =
                "Company name must be at least 2 characters";

            if (!firstErrorRef) {
                firstErrorRef = mediccompRef;
            }

            isValid = false;

        } else if (companyValue.length > 100) {

            newErrors.medicinecompany =
                "Company name cannot exceed 100 characters";

            if (!firstErrorRef) {
                firstErrorRef = mediccompRef;
            }

            isValid = false;

        } else if (
            !/^[A-Za-z0-9][A-Za-z0-9 .&'()/-]*$/.test(
                companyValue
            )
        ) {

            newErrors.medicinecompany =
                "Company name contains invalid characters";

            if (!firstErrorRef) {
                firstErrorRef = mediccompRef;
            }

            isValid = false;
        }

        // ─────────────────────────
        // LICENSE NUMBER
        // ─────────────────────────

        const licenseValue = licensenumber.trim();

        if (!licenseValue) {

            newErrors.licensenumber =
                "License number is required";

            if (!firstErrorRef) {
                firstErrorRef = licnoRef;
            }

            isValid = false;

        } else if (licenseValue.length < 3) {

            newErrors.licensenumber =
                "License number must be at least 3 characters";

            if (!firstErrorRef) {
                firstErrorRef = licnoRef;
            }

            isValid = false;

        } else if (licenseValue.length > 50) {

            newErrors.licensenumber =
                "License number cannot exceed 50 characters";

            if (!firstErrorRef) {
                firstErrorRef = licnoRef;
            }

            isValid = false;

        } else if (
            !/^[A-Za-z0-9][A-Za-z0-9./_-]*$/.test(
                licenseValue
            )
        ) {

            newErrors.licensenumber =
                "Please enter a valid license number";

            if (!firstErrorRef) {
                firstErrorRef = licnoRef;
            }

            isValid = false;
        }

        // ─────────────────────────
        // UNIT PRICE
        // ─────────────────────────

        const priceValue = unitprice.trim();

        if (!priceValue) {

            newErrors.unitprice =
                "Unit price is required";

            if (!firstErrorRef) {
                firstErrorRef = unitprRef;
            }

            isValid = false;

        } else if (!/^\d+(\.\d{1,2})?$/.test(priceValue)) {

            newErrors.unitprice =
                "Enter a valid price (e.g. 20 or 20.50)";

            if (!firstErrorRef) {
                firstErrorRef = unitprRef;
            }

            isValid = false;

        } else if (Number(priceValue) <= 0) {

            newErrors.unitprice =
                "Unit price must be greater than 0";

            if (!firstErrorRef) {
                firstErrorRef = unitprRef;
            }

            isValid = false;

        } else if (Number(priceValue) > 1000000) {

            newErrors.unitprice =
                "Unit price cannot exceed ₹10,00,000";

            if (!firstErrorRef) {
                firstErrorRef = unitprRef;
            }

            isValid = false;
        }

        // ─────────────────────────
        // DESCRIPTION
        // ─────────────────────────

        const descriptionValue = description.trim();

        if (!descriptionValue) {

            newErrors.description =
                "Description is required";

            if (!firstErrorRef) {
                firstErrorRef = descriRef;
            }

            isValid = false;

        } else if (descriptionValue.length < 5) {

            newErrors.description =
                "Description must be at least 5 characters";

            if (!firstErrorRef) {
                firstErrorRef = descriRef;
            }

            isValid = false;

        } else if (descriptionValue.length > 200) {

            newErrors.description =
                "Description cannot exceed 200 characters";

            if (!firstErrorRef) {
                firstErrorRef = descriRef;
            }

            isValid = false;
        }

        setErrors(newErrors);

        // Focus first invalid field
        if (!isValid && firstErrorRef?.current) {

            firstErrorRef.current.focus();
        }

        return isValid;
    };

    // ─────────────────────────────
    // REGISTER MEDICINE
    // ─────────────────────────────
    const handleMedicineReg = async () => {

        if (saving) return;

        setRegister("");

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        try {

            setSaving(true);

            const response = await axios.post(
                "https://medicine-finder-1-zwuu.onrender.com/getmedicinereg",
                {
                    medicinename: medicinename.trim(),
                    medicinetype: medicinetype.trim(),
                    medicinecompany: medicinecompany.trim(),
                    licensenumber: licensenumber.trim(),
                    unitprice: unitprice.trim(),
                    description: description.trim()
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

                setErrors({
                    medicinename: "",
                    medicinetype: "",
                    medicinecompany: "",
                    licensenumber: "",
                    unitprice: "",
                    description: ""
                });

                setTimeout(() => {
                    setRegister("");
                }, 3000);
            }

        } catch (error) {

            console.log(error);

            /*
             * If backend sends a duplicate/error message,
             * show it instead of silently failing.
             */
            const backendMessage =
                error?.response?.data?.Message ||
                error?.response?.data?.message;

            if (backendMessage) {

                setRegister(backendMessage);

            } else {

                setRegister(
                    "Something went wrong. Please try again."
                );
            }

        } finally {

            setSaving(false);
        }
    };

    // ─────────────────────────────
    // CLEAR FIELD ERROR WHILE TYPING
    // ─────────────────────────────
    const clearFieldError = (field) => {

        setErrors((prev) => ({
            ...prev,
            [field]: ""
        }));

        setRegister("");
    };

    // ─────────────────────────────
    // LOADING
    // ─────────────────────────────
    if (loading) {

        return (
            <>
                <MedicalNavbar />

                <div className="mr-loading-page">

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

                        <h5 className="mr-loading-title">
                            Loading...
                        </h5>

                    </div>

                </div>
            </>
        );
    }

    return (
        <>
            <MedicalNavbar />

            <div className="mr-page">

                <div className="container-fluid mr-container">

                    {/* ───────────────────────────── */}
                    {/* HEADER */}
                    {/* ───────────────────────────── */}

                    <div className="mr-header">

                        <div className="row align-items-center">

                            <div className="col-lg-8">

                                <div className="mr-badge">
                                    💊 Inventory Management
                                </div>

                                <h1 className="mr-main-title">
                                    Register Medicine
                                </h1>

                                <p className="mr-main-description">
                                    Add medicine details professionally
                                    and manage inventory records easily.
                                </p>

                            </div>

                            <div className="col-lg-4">

                                <div className="mr-header-icon-wrapper">

                                    <div className="mr-header-icon">
                                        💊
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ───────────────────────────── */}
                    {/* MAIN CONTENT */}
                    {/* ───────────────────────────── */}

                    <div className="row g-4">

                        {/* FORM */}
                        <div className="col-lg-8">

                            <div className="mr-form-card">

                                <div className="mr-section-heading">

                                    <h3>
                                        Medicine Information
                                    </h3>

                                    <p>
                                        Fill all medicine details carefully.
                                    </p>

                                </div>

                                <div className="row g-4">

                                    {/* NAME */}
                                    <div className="col-md-6">

                                        <label className="mr-label">
                                            Medicine Name
                                        </label>

                                        <input
                                            ref={medicinenmRef}
                                            type="text"
                                            className={`form-control mr-input ${
                                                errors.medicinename
                                                    ? "mr-input-error"
                                                    : ""
                                            }`}
                                            placeholder="Enter medicine name"
                                            value={medicinename}
                                            maxLength={100}
                                            onChange={(e) => {
                                                setMedicineName(
                                                    e.target.value
                                                );
                                                clearFieldError(
                                                    "medicinename"
                                                );
                                            }}
                                        />

                                        {errors.medicinename && (
                                            <div className="mr-error">
                                                {errors.medicinename}
                                            </div>
                                        )}

                                    </div>

                                    {/* TYPE */}
                                    <div className="col-md-6">

                                        <label className="mr-label">
                                            Medicine Type
                                        </label>

                                        <input
                                            ref={meditypRef}
                                            type="text"
                                            className={`form-control mr-input ${
                                                errors.medicinetype
                                                    ? "mr-input-error"
                                                    : ""
                                            }`}
                                            placeholder="Tablet / Syrup"
                                            value={medicinetype}
                                            maxLength={50}
                                            onChange={(e) => {
                                                setMedicineType(
                                                    e.target.value
                                                );
                                                clearFieldError(
                                                    "medicinetype"
                                                );
                                            }}
                                        />

                                        {errors.medicinetype && (
                                            <div className="mr-error">
                                                {errors.medicinetype}
                                            </div>
                                        )}

                                    </div>

                                    {/* COMPANY */}
                                    <div className="col-md-6">

                                        <label className="mr-label">
                                            Company Name
                                        </label>

                                        <input
                                            ref={mediccompRef}
                                            type="text"
                                            className={`form-control mr-input ${
                                                errors.medicinecompany
                                                    ? "mr-input-error"
                                                    : ""
                                            }`}
                                            placeholder="Company name"
                                            value={medicinecompany}
                                            maxLength={100}
                                            onChange={(e) => {
                                                setMedicineCompany(
                                                    e.target.value
                                                );
                                                clearFieldError(
                                                    "medicinecompany"
                                                );
                                            }}
                                        />

                                        {errors.medicinecompany && (
                                            <div className="mr-error">
                                                {errors.medicinecompany}
                                            </div>
                                        )}

                                    </div>

                                    {/* LICENSE */}
                                    <div className="col-md-6">

                                        <label className="mr-label">
                                            License Number
                                        </label>

                                        <input
                                            ref={licnoRef}
                                            type="text"
                                            className={`form-control mr-input ${
                                                errors.licensenumber
                                                    ? "mr-input-error"
                                                    : ""
                                            }`}
                                            placeholder="License number"
                                            value={licensenumber}
                                            maxLength={50}
                                            onChange={(e) => {
                                                setLicenseNumber(
                                                    e.target.value
                                                );
                                                clearFieldError(
                                                    "licensenumber"
                                                );
                                            }}
                                        />

                                        {errors.licensenumber && (
                                            <div className="mr-error">
                                                {errors.licensenumber}
                                            </div>
                                        )}

                                    </div>

                                    {/* PRICE */}
                                    <div className="col-md-6">

                                        <label className="mr-label">
                                            Unit Price
                                        </label>

                                        <input
                                            ref={unitprRef}
                                            type="text"
                                            className={`form-control mr-input ${
                                                errors.unitprice
                                                    ? "mr-input-error"
                                                    : ""
                                            }`}
                                            placeholder="₹ Enter price"
                                            value={unitprice}
                                            inputMode="decimal"
                                            maxLength={20}
                                            onChange={(e) => {
                                                setUnitPrice(
                                                    e.target.value
                                                );
                                                clearFieldError(
                                                    "unitprice"
                                                );
                                            }}
                                        />

                                        {errors.unitprice && (
                                            <div className="mr-error">
                                                {errors.unitprice}
                                            </div>
                                        )}

                                    </div>

                                    {/* DESCRIPTION */}
                                    <div className="col-md-6">

                                        <label className="mr-label">
                                            Description
                                        </label>

                                        <input
                                            ref={descriRef}
                                            type="text"
                                            className={`form-control mr-input ${
                                                errors.description
                                                    ? "mr-input-error"
                                                    : ""
                                            }`}
                                            placeholder="Short description"
                                            value={description}
                                            maxLength={200}
                                            onChange={(e) => {
                                                setDescription(
                                                    e.target.value
                                                );
                                                clearFieldError(
                                                    "description"
                                                );
                                            }}
                                        />

                                        {errors.description && (
                                            <div className="mr-error">
                                                {errors.description}
                                            </div>
                                        )}

                                    </div>

                                </div>

                                {/* BUTTON */}
                                <button
                                    type="button"
                                    onClick={handleMedicineReg}
                                    disabled={saving}
                                    className="mr-save-btn"
                                >

                                    {saving ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            />

                                            Saving Medicine...
                                        </>
                                    ) : (
                                        "Save Medicine"
                                    )}

                                </button>

                                {/* SUCCESS / API MESSAGE */}
                                {register && (

                                    <div
                                        className={`mr-success-message ${
                                            register.toLowerCase().includes(
                                                "success"
                                            )
                                                ? ""
                                                : "mr-api-error"
                                        }`}
                                    >
                                        {register}
                                    </div>

                                )}

                            </div>

                        </div>

                        {/* SIDE PANEL */}
                        <div className="col-lg-4">

                            <div className="mr-preview-card">

                                <h4 className="mr-preview-title">
                                    Live Preview
                                </h4>

                                {/* MEDICINE PREVIEW */}
                                <div className="mr-medicine-preview">

                                    <div className="mr-preview-top">

                                        <div className="mr-preview-name-area">

                                            <small>
                                                MEDICINE
                                            </small>

                                            <h3>
                                                {
                                                    medicinename ||
                                                    "Paracetamol"
                                                }
                                            </h3>

                                        </div>

                                        <div className="mr-preview-icon">
                                            💊
                                        </div>

                                    </div>

                                    <div className="mr-preview-company">

                                        <small>
                                            Company
                                        </small>

                                        <h6>
                                            {
                                                medicinecompany ||
                                                "Cipla"
                                            }
                                        </h6>

                                    </div>

                                    <div className="row">

                                        <div className="col-6">

                                            <small>
                                                Type
                                            </small>

                                            <h6>
                                                {
                                                    medicinetype ||
                                                    "Tablet"
                                                }
                                            </h6>

                                        </div>

                                        <div className="col-6">

                                            <small>
                                                Price
                                            </small>

                                            <h6>
                                                ₹{unitprice || "20"}
                                            </h6>

                                        </div>

                                    </div>

                                    <hr />

                                    <small>
                                        License No.
                                    </small>

                                    <h6 className="mr-license">
                                        {
                                            licensenumber ||
                                            "LIC-2026"
                                        }
                                    </h6>

                                </div>

                                {/* DESCRIPTION */}
                                <div className="mr-description-preview">

                                    <small>
                                        Description
                                    </small>

                                    <p>
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