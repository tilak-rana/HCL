import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const CRCDashboardNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/crc-dashboard">
          CRC Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/manage-participants">
                Manage Participants
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/health-data">
                Health Data
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reports">
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-danger" href="/logout">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CRCDashboardNavbar;
