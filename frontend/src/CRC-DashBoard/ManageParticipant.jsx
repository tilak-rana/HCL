import ParticipantRegistration from "../CRC-DashBoard/ParticipantRegistration.jsx";
import AddressInfoForm from "./AddressInfoForm.jsx";
import SocioEconomicForm from "./SocioEconomicForm.jsx";
import CulturalEthnicForm from "./CulturalEthnicForm.jsx";

const ManageParticipant = () => {
  return (
    <>
      <div className="container-fluid">
        <h2 className="mt-3 text-center fw-bold">Manage Participants</h2>
        <div className="row">
          <div className="col-md-6">
            <ParticipantRegistration />
          </div>
          <div className="col-md-6">
            <CulturalEthnicForm />
          </div>
        </div>
        <div className="row">
          <div className="row">
            <div className="col-md-6">
              <AddressInfoForm />
            </div>
            <div className="col-md-6">
              <SocioEconomicForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageParticipant;
