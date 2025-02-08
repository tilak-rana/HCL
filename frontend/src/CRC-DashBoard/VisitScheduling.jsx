import { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const VisitScheduling = () => {
  const [criteria, setCriteria] = useState({
    ageMin: "",
    ageMax: "",
    weightMin: "",
    weightMax: "",
    heartRateMin: "",
  });

  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);

  // Simulating fetching participants from an API
  useEffect(() => {
    const fetchParticipants = async () => {
      // Replace this with an actual API call
      const mockParticipants = [
        { id: 1, name: "John Doe", age: 25, weight: 85, heartRate: 125 },
        { id: 2, name: "Jane Smith", age: 32, weight: 70, heartRate: 110 },
        { id: 3, name: "Alex Johnson", age: 28, weight: 88, heartRate: 130 },
      ];
      setParticipants(mockParticipants);
    };
    fetchParticipants();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const filterParticipants = () => {
    const filtered = participants.filter((participant) => {
      return (
        participant.age >= criteria.ageMin &&
        participant.age <= criteria.ageMax &&
        participant.weight >= criteria.weightMin &&
        participant.weight <= criteria.weightMax &&
        participant.heartRate >= criteria.heartRateMin
      );
    });
    setFilteredParticipants(filtered);
  };

  const scheduleVisit = (participant) => {
    alert(`Visit scheduled for ${participant.name}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Visit Scheduling</h2>
      <form className="p-4 border rounded bg-light">
        <h4>Set Criteria</h4>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Age Range (Min)</label>
            <input
              type="number"
              className="form-control"
              name="ageMin"
              value={criteria.ageMin}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Age Range (Max)</label>
            <input
              type="number"
              className="form-control"
              name="ageMax"
              value={criteria.ageMax}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Weight Range (Min)</label>
            <input
              type="number"
              className="form-control"
              name="weightMin"
              value={criteria.weightMin}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Weight Range (Max)</label>
            <input
              type="number"
              className="form-control"
              name="weightMax"
              value={criteria.weightMax}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Heart Rate (Min)</label>
            <input
              type="number"
              className="form-control"
              name="heartRateMin"
              value={criteria.heartRateMin}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={filterParticipants}
        >
          Filter and Schedule Visits
        </button>
      </form>

      <div className="mt-4">
        <h3 className="text-center text-success">Filtered Participants</h3>
        {filteredParticipants.length > 0 ? (
          <div className="row">
            {filteredParticipants.map((participant) => (
              <div key={participant.id} className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{participant.name}</h5>
                    <p className="card-text">Age: {participant.age}</p>
                    <p className="card-text">Weight: {participant.weight} kg</p>
                    <p className="card-text">
                      Heart Rate: {participant.heartRate} bpm
                    </p>
                    <button
                      className="btn btn-success"
                      onClick={() => scheduleVisit(participant)}
                    >
                      Schedule Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No participants match the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default VisitScheduling;
