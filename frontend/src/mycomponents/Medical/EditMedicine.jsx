import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MedicalNavbar from "./MedicalNavbar";

const EditMedicine = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [medicinename, setMedicineName] = useState("");
    const [medicinetype, setMedicineType] = useState("");
    const [medicinecompany, setMedicineCompany] = useState("");
    const [licensenumber, setLicenseNumber] = useState("");
    const [unitprice, setUnitPrice] = useState("");
    const [description, setDescription] = useState("");
    const [register, setRegister] = useState("");


    const checkUser = useCallback(async () => {
        try {
            const response = await axios.get(
                'https://medicine-finder-1-zwuu.onrender.com/isUser'
            );

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
    }, [navigate]);

    const loadMedicineForEdit = useCallback(async () => {
        try {
            const response = await axios.post(
                'https://medicine-finder-1-zwuu.onrender.com/showEditMedicine',
                { id }
            );

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
    }, [id]);

    useEffect(() => {
        checkUser();
        loadMedicineForEdit();
    }, [checkUser, loadMedicineForEdit]);


    const handleEditMedicine = async () => {
        try {
            const Response = await axios.post('https://medicine-finder-1-zwuu.onrender.com/editandupdatemedicines', {
                medicinename, medicinetype, medicinecompany, licensenumber, unitprice, description, id
            });

            let result = Response.data;

            console.log(result.message);

            if (result.message === 'Data updated') {
                setRegister('Data updated successfully');
                setTimeout(() => {
                    setRegister("")
                }, 3000);

                navigate('/showmedicine', { replace: true });

            }
            else if (result.message === 'Data not updated') {
                setRegister('Data is not updated');
            }

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <MedicalNavbar />
            <div
                className="container-fluid py-5"
                style={{
                    minHeight: "100vh",
                    background: "#f8fafc",
                    fontFamily: "Inter, Arial, sans-serif",
                }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">

                            <div
                                className="p-4 p-md-5 shadow-lg"
                                style={{
                                    borderRadius: "32px",
                                    background: "#ffffff",
                                    border: "1px solid #e5e7eb",
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                                    <div>
                                        <span
                                            className="fw-bold px-3 py-2"
                                            style={{
                                                background: "#fef3c7",
                                                color: "#92400e",
                                                borderRadius: "30px",
                                                fontSize: "14px",
                                            }}
                                        >
                                            Edit Mode
                                        </span>

                                        <h2 className="fw-bold mt-3 mb-1" style={{ color: "#111827" }}>
                                            Update Medicine Details
                                        </h2>

                                        <p className="text-secondary mb-0">
                                            Modify medicine information and save updated record.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => navigate("/showmedicine")}
                                        className="btn fw-bold"
                                        style={{
                                            background: "#f1f5f9",
                                            color: "#334155",
                                            borderRadius: "14px",
                                            padding: "11px 22px",
                                        }}
                                    >
                                        Back
                                    </button>
                                </div>

                                <div className="row g-4 mt-2">

                                    <div className="col-md-6">
                                        <label className="fw-bold mb-2">Medicine Name</label>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={medicinename}
                                            placeholder="Medicine name"
                                            onChange={(e) => {
                                                setMedicineName(e.target.value);
                                                setRegister("");
                                            }}
                                            style={{
                                                borderRadius: "14px",
                                                border: "1px solid #dbe3ef",
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="fw-bold mb-2">Medicine Type</label>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={medicinetype}
                                            placeholder="Medicine type"
                                            onChange={(e) => {
                                                setMedicineType(e.target.value);
                                                setRegister("");
                                            }}
                                            style={{
                                                borderRadius: "14px",
                                                border: "1px solid #dbe3ef",
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="fw-bold mb-2">Medicine Company</label>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={medicinecompany}
                                            placeholder="Medicine company"
                                            onChange={(e) => {
                                                setMedicineCompany(e.target.value);
                                                setRegister("");
                                            }}
                                            style={{
                                                borderRadius: "14px",
                                                border: "1px solid #dbe3ef",
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="fw-bold mb-2">License Number</label>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={licensenumber}
                                            placeholder="License number"
                                            onChange={(e) => {
                                                setLicenseNumber(e.target.value);
                                                setRegister("");
                                            }}
                                            style={{
                                                borderRadius: "14px",
                                                border: "1px solid #dbe3ef",
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="fw-bold mb-2">Unit Price</label>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={unitprice}
                                            placeholder="Unit price"
                                            onChange={(e) => {
                                                setUnitPrice(e.target.value);
                                                setRegister("");
                                            }}
                                            style={{
                                                borderRadius: "14px",
                                                border: "1px solid #dbe3ef",
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="fw-bold mb-2">Description</label>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={description}
                                            placeholder="Description"
                                            onChange={(e) => {
                                                setDescription(e.target.value);
                                                setRegister("");
                                            }}
                                            style={{
                                                borderRadius: "14px",
                                                border: "1px solid #dbe3ef",
                                            }}
                                        />
                                    </div>

                                </div>

                                <div className="d-flex justify-content-end gap-3 flex-wrap mt-5">
                                    <button
                                        onClick={() => navigate("/showmedicine")}
                                        className="btn fw-bold"
                                        style={{
                                            background: "#e5e7eb",
                                            color: "#374151",
                                            borderRadius: "14px",
                                            padding: "13px 28px",
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleEditMedicine}
                                        className="btn fw-bold text-white"
                                        style={{
                                            background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                                            border: "none",
                                            borderRadius: "14px",
                                            padding: "13px 32px",
                                            boxShadow: "0 12px 30px rgba(234,88,12,0.28)",
                                        }}
                                    >
                                        Confirm & Save Changes
                                    </button>
                                </div>

                                {register && (
                                    <div
                                        className="alert alert-success text-center fw-bold mt-4 mb-0"
                                        style={{ borderRadius: "14px" }}
                                    >
                                        {register}
                                    </div>
                                )}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default EditMedicine;