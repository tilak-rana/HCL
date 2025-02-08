import { useState } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "", // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/user/register", formData);
            if (response) {
                console.log("Signup successful:", response.data);
                alert("Account created successfully!");
            }
        } catch (err) {
            console.error("Error:", err);
        }

        setFormData({
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            role: "",
        });
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-black">
            <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <h2 className="text-center text-primary mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className="form-control" 
                            placeholder="Enter your name" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="form-control" 
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="form-control" 
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirm_password" 
                            value={formData.confirm_password} 
                            onChange={handleChange} 
                            className="form-control" 
                            placeholder="Confirm your password" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange} 
                            className="form-select" 
                            required
                        >
                            <option selected>Select a Role</option>
                            <option value="CRC">Clinical Research Coordinator (CRC)</option>
                            <option value="PI">Principal Investigator (PI)</option>
                            <option value="RA">Regulatory Authority (RA)</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
