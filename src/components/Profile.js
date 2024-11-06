import { useState } from 'react';
import '../styles/Profile.module.css';

export default function UserProfile() {
    const [userType, setUserType] = useState('customer'); // Default to 'customer'
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        licenseNumber: '',
        aadhar: '',
        regNumber: '' // Only for owner
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userType, ...formData })
            });
            const message = await response.text();
            console.log(message);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className="container">
            <h1>User Profile</h1>

            {/* User Type Selection */}
            <div className="user-type-selection">
                <label>
                    <input
                        type="radio"
                        name="userType"
                        value="customer"
                        checked={userType === 'customer'}
                        onChange={() => setUserType('customer')}
                    />
                    Customer (Rent Cars)
                </label>
                <label>
                    <input
                        type="radio"
                        name="userType"
                        value="owner"
                        checked={userType === 'owner'}
                        onChange={() => setUserType('owner')}
                    />
                    Owner (List Cars)
                </label>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Driving License Number</label>
                    <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Aadhar Number</label>
                    <input
                        type="text"
                        name="aadhar"
                        value={formData.aadhar}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Additional field for Owner */}
                {userType === 'owner' && (
                    <div className="form-group">
                        <label>Vehicle Registration Number</label>
                        <input
                            type="text"
                            name="regNumber"
                            value={formData.regNumber}
                            onChange={handleInputChange}
                            required={userType === 'owner'}
                        />
                    </div>
                )}

                <button type="submit">Submit</button>
            </form>

            {/* Styling */}
            <style jsx>{`
                .container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    background: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    text-align: center;
                    color: #333;
                }
                .user-type-selection {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-bottom: 20px;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                label {
                    display: block;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                input[type="text"],
                input[type="email"],
                input[type="password"],
                input[type="tel"] {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                }
                button {
                    display: block;
                    width: 100%;
                    padding: 10px;
                    font-size: 16px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #45a049;
                }
            `}</style>
        </div>
    );
}