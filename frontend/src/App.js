import 'bootstrap/dist/css/bootstrap.css';
import AdminReg from './mycomponents/Admin/AdminReg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './mycomponents/GeneralNavbar';
import ShowAdminList from './mycomponents/Admin/ShowAdminList';
import MedicalReg from './mycomponents/Admin/MedicalReg';
import ShowMedical from './mycomponents/Admin/ShowMedical';
import UpdateMedical from './mycomponents/Admin/EditMedical';
import DeleteMedical from './mycomponents/Admin/DeleteMedical';
import MedicineReg from './mycomponents/Medical/MedicineReg';
import ShowMedicines from './mycomponents/Medical/ShowMedicines';
import EditMedicine from './mycomponents/Medical/EditMedicine';
import DeleteMedicine from './mycomponents/Medical/DeleteMedicine';
import AdminNavbar from './mycomponents/Admin/AdmNav';
import MedicalNavbar from './mycomponents/Medical/MedicalNavbar';
import Home from './mycomponents/HomePage';
import Login from './mycomponents/Login';
import AdminHome from './mycomponents/Admin/AdminHome';
import MedicalHome from './mycomponents/Medical/MedicalHome';
import AuthError from './mycomponents/AuthError';

import './mycomponents/Style.css';
import UpdatePassword from './mycomponents/Admin/UpdatePassword';
import UpdateMedicalPassw from './mycomponents/Medical/UpdateMedicalPassword';
import Search from './mycomponents/Search';
import About from './mycomponents/About';
import Contact from './mycomponents/Contact';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <Router>

      {/* <AdminNavbar/> */}
      {/* <MedicalNavbar/> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/auth_error' element={<AuthError />} />
        <Route path='/search' element={<Search />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />


        <Route path='/adminhome' element={<AdminHome />} />

        <Route path='/adminreg' element={<AdminReg />} />
        <Route path='/showadmin' element={<ShowAdminList />} />
        <Route path='/medicalreg' element={<MedicalReg />} />
        <Route path='/showmedical' element={<ShowMedical />} />
        <Route path='/editmedical/:id' element={<UpdateMedical />} />
        <Route path='/deletemedical/:id' element={<DeleteMedical />} />
        <Route path='/insertmedicine' element={<MedicineReg />} />
        <Route path='/showmedicine' element={<ShowMedicines />} />
        <Route path='/medicalhome' element={<MedicalHome />} />
        <Route path='/editmedicine/:id' element={<EditMedicine />} />
        <Route path='/deletemedicine/:id' element={<DeleteMedicine />} />
        <Route path='/updatepassword' element={<UpdatePassword />} />
        <Route path='/updatemedicalpassword' element={<UpdateMedicalPassw />} />


      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        theme="colored"
      />

    </Router>

  );
}

export default App;
