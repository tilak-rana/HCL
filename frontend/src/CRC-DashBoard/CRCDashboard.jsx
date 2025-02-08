import VisitScheduling from "./VisitScheduling.jsx";
import CRCDashboardNavbar from "./CRCDashboardNavbar.jsx";
const CRCDashboard = () => {
  return (
    <>
      <div className="container-fluid mt-4">
        <CRCDashboardNavbar />
        <VisitScheduling />
      </div>
    </>
  );
};

export default CRCDashboard;
