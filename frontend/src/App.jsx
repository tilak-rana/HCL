import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./FormHandle/LoginPage.jsx";
import SigninPage from "./FormHandle/SignupPage.jsx";
import CRCDashboard from "./CRC-DashBoard/CRCDashboard.jsx";
<<<<<<< HEAD
import PIDashboard from "./PI-Dashboard/Dashboard.jsx";
=======
>>>>>>> acd167ddc86d7ecbbda28d6b8ae6fdc2ec3a74a2
import ManageParticipant from "./CRC-DashBoard/ManageParticipant.jsx";
import HealthDataForm from "./CRC-DashBoard/HealthDataForm.jsx";
import ParticipantInfo from "./Participant-DashBoard/ParticipantInfo.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/CRCDashboard" element={<CRCDashboard />} />
<<<<<<< HEAD
        <Route path="/PIDashboard" element={<PIDashboard />} />
=======
>>>>>>> acd167ddc86d7ecbbda28d6b8ae6fdc2ec3a74a2
        <Route path="/manage-participants" element={<ManageParticipant />} />
        <Route path="/health-data" element={<HealthDataForm />} />
        <Route path="/participant-dashboard" element={<ParticipantInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
