import { useState, useEffect } from 'react';

export default function EditProfile() {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        address: '',
        licenseNumber: '',
        aadhar: '',
    });
    const [initialEmail, setInitialEmail] = useState('');

    // Fetch user data on component load
    useEffect(() => {
        const fetchUserData = async () => {
            const email = localStorage.getItem('email');
            const userType = localStorage.getItem('userType');

            if (!email || !userType) return;

            try {
                const response = await fetch(`/api/getUserProfile?email=${email}&userType=${userType}`);
                const data = await response.json();

                setFormData({
                    fname: data.fname,
                    lname: data.lname,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    licenseNumber: data.licenseNumber,
                    aadhar: data.aadhar,
                });

                setInitialEmail(data.email); // Store initial email
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission to update profile
    // Handle form submission to update profile
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = localStorage.getItem('email');
        const userType = localStorage.getItem('userType');

        if (!email || !userType) {
            alert('Missing email or user type');
            return;
        }

        try {
            const response = await fetch(`/api/updateUserProfile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData, // Spread the formData
                    email, // Include email
                    userType, // Include userType
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            alert('Profile updated successfully');

            // Check if email has changed, and update localStorage if needed
            if (formData.email !== initialEmail) {
                localStorage.setItem('email', formData.email);
                setInitialEmail(formData.email); // Update initial email to new email
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile');
        }
    };


    return (
        <div className="container">
            <h1>Edit Profile</h1>

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

                <button type="submit">Update Profile</button>
            </form>

            <style jsx>{`
                .container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    background: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin-top: 40px;
                    margin-bottom: 40px;
                }
                h1 {
                    text-align: center;
                    color: #333;
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
