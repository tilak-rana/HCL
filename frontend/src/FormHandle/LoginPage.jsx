import { useState } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // For navigation

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
         ...formData,
         [name]: value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // Dummy API call for demonstration
      const response = await axios.post("http://localhost:8000/api/user/login", formData);
      const { role } = response.data;  // Assuming response contains user role

      if (role === "CRC") {
        navigate("/crc-dashboard");
      } else if (role === "PI") {
        navigate("/pi-dashboard");
      } else if (role === "RA") {
        navigate("/ra-dashboard");
      } else if (role === "Participant") {
        navigate("/participant-dashboard");
      } else {
        setErrorMessage("Invalid role detected.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="container-flux d-flex justify-content-center align-items-center vh-100 bg-black">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="form-control"
              required
            />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
