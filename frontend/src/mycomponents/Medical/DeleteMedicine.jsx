import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MedicalNavbar from "./MedicalNavbar";

const DeleteMedicine = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [medicinename, setMedicineName] = useState("");
    const [medicinetype, setMedicineType] = useState("");
    const [medicinecompany, setMedicineCompany] = useState("");
    const [licensenumber, setLicenseNumber] = useState("");
    const [unitprice, setUnitPrice] = useState("");
    const [description, setDescription] = useState("");
    const [register, setRegister] = useState("");

    useEffect(
        () => {
            checkUser();
            displayDataForDelete();
        },
        []
    );

    const checkUser = async () => {
        try {
            const response = await axios.get('https://medicine-finder-1-zwuu.onrender.com/isUser');

            const data = response.data;
            console.log(data);
            if (data.usertype === "nouser") {
                navigate("/auth_error", { replace: true });
            }
            else if (data.usertype !== "medical") {
                navigate("/auth_error", { replace: true });
            }

        } catch (error) {
            console.log(error);
        }
    }

    const displayDataForDelete = async () => {
        try {
            const response = await axios.post('https://medicine-finder-1-zwuu.onrender.com/getmedicinedata', { id });

            let result = response.data;
            console.log(result);
            if (result) {
                setMedicineName(result.MedicineName);
                setMedicineType(result.MedicineType);
                setMedicineCompany(result.MedicineCompany);
                setLicenseNumber(result.LicenseNumber);
                setUnitPrice(result.UnitPrice);
                setDescription(result.Description);
            }


        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteMedicine = async () => {
        let ConfirmDelete = window.confirm("Are you sure you want to permanently delete this medicine?");
        if (ConfirmDelete == true) {

            try {
                const response = await axios.post('https://medicine-finder-1-zwuu.onrender.com/deletemedicinedata', {
                    id
                });

                let result = response.data;
                console.log(result);

                setRegister("Medicine deleted successfully");

                setMedicineName('');
                setMedicineType('');
                setMedicineCompany('');
                setLicenseNumber('');
                setUnitPrice('');
                setDescription('');



                setTimeout(() => {
                    navigate('/showmedicine', { replace: true });
                }, 2500);


            } catch (error) {
                console.log(error)
                setRegister("Something went wrong");
            }
        }
        else {
            setRegister("Delete cancelled. Your data is safe.");
            setTimeout(() => {
                setRegister('');
            }, 2500);
        }
    }
    return (
        <>
        <MedicalNavbar/>
            <div
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #f8fafc, #e0f2fe)",
                    padding: "40px 12px",
                }}
            >
                <div className="container">
                    <div
                        className="mx-auto"
                        style={{
                            maxWidth: "850px",
                            background: "#ffffff",
                            borderRadius: "28px",
                            boxShadow: "0 25px 60px rgba(15, 23, 42, 0.12)",
                            border: "1px solid #e2e8f0",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            className="text-center text-white p-4"
                            style={{
                                background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
                            }}
                        >
                            <div className="fs-1 mb-2">🛡️</div>
                            <h2 className="fw-bold mb-1">Delete Medicine</h2>
                            <p className="mb-0 opacity-75">
                                Please review medicine details before deleting permanently
                            </p>
                        </div>

                        <div className="p-4 p-md-5">
                            {register && (
                                <div
                                    className={`alert text-center fw-semibold ${register.includes("successfully")
                                            ? "alert-success"
                                            : register.includes("cancelled")
                                                ? "alert-warning"
                                                : "alert-danger"
                                        }`}
                                >
                                    {register}
                                </div>
                            )}

                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-secondary">
                                        Medicine Name
                                    </label>
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        value={medicinename}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-secondary">
                                        Medicine Type
                                    </label>
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        value={medicinetype}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-secondary">
                                        Medicine Company
                                    </label>
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        value={medicinecompany}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-secondary">
                                        License Number
                                    </label>
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        value={licensenumber}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-secondary">
                                        Unit Price
                                    </label>
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        value={`₹ ${unitprice}`}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-secondary">
                                        Description
                                    </label>
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        value={description}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div
                                className="mt-5 p-4 rounded-4"
                                style={{
                                    background: "#fff7ed",
                                    border: "1px solid #fed7aa",
                                }}
                            >
                                <h5 className="fw-bold text-danger mb-2">⚠ Warning</h5>
                                <p className="mb-0 text-secondary">
                                    This action will permanently delete this medicine record from your
                                    Medicine Finder system.
                                </p>
                            </div>

                            <div className="mt-5 d-flex flex-column flex-sm-row gap-3 justify-content-center">
                                <button
                                    onClick={handleDeleteMedicine}
                                    className="btn btn-danger btn-lg px-5 fw-bold rounded-pill"
                                >
                                    Delete Medicine
                                </button>

                                <button
                                    onClick={() => navigate("/showmedicine")}
                                    className="btn btn-outline-primary btn-lg px-5 fw-bold rounded-pill"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DeleteMedicine;