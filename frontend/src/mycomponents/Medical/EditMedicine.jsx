import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MedicalNavbar from "./MedicalNavbar";
import "./EditMedicine.css";

const EditMedicine = () => {

    const { id } = useParams();
    const navigate = useNavigate();

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
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const medicineNameRef = useRef(null);

    // ─────────────────────────────
    // CHECK USER
    // ─────────────────────────────

    const checkUser = useCallback(async () => {

        try {

            const response = await axios.get(
                "https://medicine-finder-1-zwuu.onrender.com/isUser"
            );

            const data = response.data;

            console.log(data);

            if (
                data.usertype === "nouser" ||
                data.usertype !== "medical"
            ) {

                navigate("/auth_error", {
                    replace: true
                });

                return false;
            }

            return true;

        } catch (error) {

            console.log(
                "Authentication Error:",
                error
            );

            navigate("/auth_error", {
                replace: true
            });

            return false;
        }

    }, [navigate]);

    // ─────────────────────────────
    // LOAD MEDICINE
    // ─────────────────────────────

    const loadMedicineForEdit = useCallback(async () => {

        try {

            setLoading(true);

            const response = await axios.post(
                "https://medicine-finder-1-zwuu.onrender.com/showEditMedicine",
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
                "Load Medicine Error:",
                error
            );

            setNotFound(true);

        } finally {

            setLoading(false);
        }

    }, [id]);

    // ─────────────────────────────
    // INITIAL LOAD
    // ─────────────────────────────

    useEffect(() => {

        const initializePage = async () => {

            const isAuthenticated =
                await checkUser();

            if (isAuthenticated) {
                await loadMedicineForEdit();
            }
        };

        initializePage();

    }, [checkUser, loadMedicineForEdit]);

    // ─────────────────────────────
    // VALIDATION
    // ─────────────────────────────

    const validateForm = () => {

        const newErrors = {};

        const name = medicinename.trim();
        const type = medicinetype.trim();
        const company = medicinecompany.trim();
        const license = licensenumber.trim();
        const price = String(unitprice).trim();
        const desc = description.trim();

        // Medicine Name
        if (!name) {

            newErrors.medicinename =
                "Medicine name is required.";

        } else if (name.length < 2) {

            newErrors.medicinename =
                "Medicine name must contain at least 2 characters.";

        } else if (name.length > 100) {

            newErrors.medicinename =
                "Medicine name cannot exceed 100 characters.";

        } else if (
            !/^[A-Za-z0-9][A-Za-z0-9 .()+'/-]*$/.test(name)
        ) {

            newErrors.medicinename =
                "Medicine name contains invalid characters.";
        }

        // Medicine Type
        if (!type) {

            newErrors.medicinetype =
                "Medicine type is required.";

        } else if (type.length < 2) {

            newErrors.medicinetype =
                "Medicine type must contain at least 2 characters.";

        } else if (type.length > 50) {

            newErrors.medicinetype =
                "Medicine type cannot exceed 50 characters.";

        } else if (
            !/^[A-Za-z][A-Za-z0-9 .()/-]*$/.test(type)
        ) {

            newErrors.medicinetype =
                "Medicine type contains invalid characters.";
        }

        // Company
        if (!company) {

            newErrors.medicinecompany =
                "Medicine company is required.";

        } else if (company.length < 2) {

            newErrors.medicinecompany =
                "Company name must contain at least 2 characters.";

        } else if (company.length > 100) {

            newErrors.medicinecompany =
                "Company name cannot exceed 100 characters.";

        } else if (
            !/^[A-Za-z0-9][A-Za-z0-9 .&'()/-]*$/.test(company)
        ) {

            newErrors.medicinecompany =
                "Company name contains invalid characters.";
        }

        // License
        if (!license) {

            newErrors.licensenumber =
                "License number is required.";

        } else if (license.length < 3) {

            newErrors.licensenumber =
                "License number is too short.";

        } else if (license.length > 50) {

            newErrors.licensenumber =
                "License number cannot exceed 50 characters.";

        } else if (
            !/^[A-Za-z0-9][A-Za-z0-9./_-]*$/.test(license)
        ) {

            newErrors.licensenumber =
                "License number contains invalid characters.";
        }

        // Price
        if (!price) {

            newErrors.unitprice =
                "Unit price is required.";

        } else if (
            !/^\d+(\.\d{1,2})?$/.test(price)
        ) {

            newErrors.unitprice =
                "Enter a valid price. Example: 125 or 125.50.";

        } else {

            const numericPrice =
                Number(price);

            if (numericPrice <= 0) {

                newErrors.unitprice =
                    "Unit price must be greater than 0.";

            } else if (
                numericPrice > 1000000
            ) {

                newErrors.unitprice =
                    "Unit price cannot exceed ₹10,00,000.";
            }
        }

        // Description
        if (!desc) {

            newErrors.description =
                "Description is required.";

        } else if (desc.length < 5) {

            newErrors.description =
                "Description must contain at least 5 characters.";

        } else if (desc.length > 200) {

            newErrors.description =
                "Description cannot exceed 200 characters.";
        }

        setErrors(newErrors);

        // Focus first invalid field
        if (Object.keys(newErrors).length > 0) {

            setTimeout(() => {

                if (
                    newErrors.medicinename &&
                    medicineNameRef.current
                ) {
                    medicineNameRef.current.focus();
                }

            }, 0);

            return false;
        }

        return true;
    };

    // ─────────────────────────────
    // FIELD ERROR CLEAR
    // ─────────────────────────────

    const clearFieldError = (field) => {

        setErrors((previous) => {

            const updated = {
                ...previous
            };

            delete updated[field];

            return updated;
        });

        setRegister("");
    };

    // ─────────────────────────────
    // UPDATE MEDICINE
    // ─────────────────────────────

    const handleEditMedicine = async () => {

        if (saving) {
            return;
        }

        setRegister("");

        const isValid =
            validateForm();

        if (!isValid) {
            return;
        }

        try {

            setSaving(true);

            const response = await axios.post(
                "https://medicine-finder-1-zwuu.onrender.com/editandupdatemedicines",
                {
                    medicinename: medicinename.trim(),
                    medicinetype: medicinetype.trim(),
                    medicinecompany: medicinecompany.trim(),
                    licensenumber: licensenumber.trim(),
                    unitprice: String(unitprice).trim(),
                    description: description.trim(),
                    id
                }
            );

            const result = response.data;

            console.log(result);

            if (
                result.message === "Data updated"
            ) {

                setRegister(
                    "Data updated successfully."
                );

                setTimeout(() => {

                    navigate(
                        "/showmedicine",
                        {
                            replace: true
                        }
                    );

                }, 1200);

            } else if (
                result.message === "Data not updated"
            ) {

                setRegister(
                    "Data was not updated. Please try again."
                );

                setSaving(false);

            } else {

                setRegister(
                    result.Message ||
                    result.message ||
                    "Something went wrong while updating medicine."
                );

                setSaving(false);
            }

        } catch (error) {

            console.log(
                "Update Medicine Error:",
                error
            );

            const backendMessage =
                error?.response?.data?.Message ||
                error?.response?.data?.message;

            setRegister(
                backendMessage ||
                "Something went wrong. Medicine could not be updated."
            );

            setSaving(false);
        }
    };

    // ─────────────────────────────
    // LOADING
    // ─────────────────────────────

    if (loading) {

        return (
            <>
                <MedicalNavbar />

                <div className="em-loading-page">

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

                        <h5 className="em-loading-title">
                            Loading medicine details...
                        </h5>

                    </div>

                </div>
            </>
        );
    }

    // ─────────────────────────────
    // NOT FOUND
    // ─────────────────────────────

    if (notFound) {

        return (
            <>
                <MedicalNavbar />

                <div className="em-page">

                    <div className="container">

                        <div className="em-not-found">

                            <div className="em-not-found-icon">
                                🔍
                            </div>

                            <h2>
                                Medicine Not Found
                            </h2>

                            <p>
                                The medicine you are trying to
                                edit could not be found.
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
                                className="em-primary-btn"
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

            <div className="em-page">

                <div className="container">

                    <div className="em-card">

                        {/* HEADER */}

                        <div className="em-header">

                            <div className="em-header-top">

                                <div>

                                    <div className="em-badge">
                                        ✏️ EDIT MODE
                                    </div>

                                    <h2>
                                        Update Medicine
                                    </h2>

                                    <p>
                                        Modify medicine information
                                        and save the updated record.
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/showmedicine"
                                        )
                                    }
                                    disabled={saving}
                                    className="em-back-btn"
                                >
                                    ← Back
                                </button>

                            </div>

                        </div>

                        {/* CONTENT */}

                        <div className="em-content">

                            {register && (

                                <div
                                    className={`em-message ${
                                        register.includes(
                                            "successfully"
                                        )
                                            ? "em-success"
                                            : "em-danger"
                                    }`}
                                >
                                    {register.includes(
                                        "successfully"
                                    )
                                        ? "✓ "
                                        : "⚠ "}

                                    {register}
                                </div>

                            )}

                            <div className="em-section-title">
                                <span>📋</span>
                                Medicine Information
                            </div>

                            <div className="em-form-grid">

                                {/* NAME */}

                                <div className="em-field">

                                    <label>
                                        Medicine Name
                                        <span>*</span>
                                    </label>

                                    <input
                                        ref={
                                            medicineNameRef
                                        }
                                        type="text"
                                        value={
                                            medicinename
                                        }
                                        placeholder="Enter medicine name"
                                        maxLength={100}
                                        className={
                                            errors.medicinename
                                                ? "em-input em-input-error"
                                                : "em-input"
                                        }
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
                                        <div className="em-error">
                                            {errors.medicinename}
                                        </div>
                                    )}

                                </div>

                                {/* TYPE */}

                                <div className="em-field">

                                    <label>
                                        Medicine Type
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            medicinetype
                                        }
                                        placeholder="e.g. Tablet, Syrup, Capsule"
                                        maxLength={50}
                                        className={
                                            errors.medicinetype
                                                ? "em-input em-input-error"
                                                : "em-input"
                                        }
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
                                        <div className="em-error">
                                            {errors.medicinetype}
                                        </div>
                                    )}

                                </div>

                                {/* COMPANY */}

                                <div className="em-field">

                                    <label>
                                        Medicine Company
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            medicinecompany
                                        }
                                        placeholder="Enter company name"
                                        maxLength={100}
                                        className={
                                            errors.medicinecompany
                                                ? "em-input em-input-error"
                                                : "em-input"
                                        }
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
                                        <div className="em-error">
                                            {errors.medicinecompany}
                                        </div>
                                    )}

                                </div>

                                {/* LICENSE */}

                                <div className="em-field">

                                    <label>
                                        License Number
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            licensenumber
                                        }
                                        placeholder="Enter license number"
                                        maxLength={50}
                                        className={
                                            errors.licensenumber
                                                ? "em-input em-input-error"
                                                : "em-input"
                                        }
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
                                        <div className="em-error">
                                            {errors.licensenumber}
                                        </div>
                                    )}

                                </div>

                                {/* PRICE */}

                                <div className="em-field">

                                    <label>
                                        Unit Price
                                        <span>*</span>
                                    </label>

                                    <div className="em-price-wrapper">

                                        <span>
                                            ₹
                                        </span>

                                        <input
                                            type="text"
                                            value={
                                                unitprice
                                            }
                                            placeholder="Enter unit price"
                                            maxLength={10}
                                            inputMode="decimal"
                                            className={
                                                errors.unitprice
                                                    ? "em-input em-price-input em-input-error"
                                                    : "em-input em-price-input"
                                            }
                                            onChange={(e) => {

                                                setUnitPrice(
                                                    e.target.value
                                                );

                                                clearFieldError(
                                                    "unitprice"
                                                );
                                            }}
                                        />

                                    </div>

                                    {errors.unitprice && (
                                        <div className="em-error">
                                            {errors.unitprice}
                                        </div>
                                    )}

                                </div>

                                {/* DESCRIPTION */}

                                <div className="em-field em-full">

                                    <label>
                                        Description
                                        <span>*</span>
                                    </label>

                                    <textarea
                                        value={
                                            description
                                        }
                                        placeholder="Enter medicine description"
                                        maxLength={200}
                                        rows={4}
                                        className={
                                            errors.description
                                                ? "em-input em-textarea em-input-error"
                                                : "em-input em-textarea"
                                        }
                                        onChange={(e) => {

                                            setDescription(
                                                e.target.value
                                            );

                                            clearFieldError(
                                                "description"
                                            );
                                        }}
                                    />

                                    <div className="em-description-bottom">

                                        {errors.description ? (
                                            <div className="em-error">
                                                {errors.description}
                                            </div>
                                        ) : (
                                            <span />
                                        )}

                                        <span>
                                            {description.length}/200
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* NOTICE */}

                            <div className="em-notice">

                                <div className="em-notice-icon">
                                    💡
                                </div>

                                <div>
                                    <strong>
                                        Before saving
                                    </strong>

                                    <p>
                                        Please verify all medicine
                                        details carefully. Updated
                                        information will replace the
                                        existing record.
                                    </p>
                                </div>

                            </div>

                            {/* ACTIONS */}

                            <div className="em-actions">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/showmedicine"
                                        )
                                    }
                                    disabled={saving}
                                    className="em-cancel-btn"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleEditMedicine
                                    }
                                    disabled={saving}
                                    className="em-save-btn"
                                >

                                    {saving ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            />

                                            Saving Changes...
                                        </>
                                    ) : (
                                        <>
                                            ✓ Confirm & Save Changes
                                        </>
                                    )}

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default EditMedicine;