
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [occupation, setOccupation] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handlesubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const url = "http://localhost:3000/api/auth/register";
            const response = await axios.post(url, {
                firstName: first_name,
                lastName: last_name,
                email,
                password,
                location,
                occupation,
                description
            });

            console.log("Register Response:", response.data);
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || "Register failed");
        }
    };

    return (
        <>
            <form
                method="post"
                id="reg"
                className="row g-3 justify-content-center mt-5"
                onSubmit={handlesubmit}
            >

                <div className="col-md-6">
                    <label className="form-label">first name</label>
                    <input
                        className="form-control"
                        id="Fname"
                        name="first_name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className="col-md-5">
                    <label className="form-label">last name</label>
                    <input
                        className="form-control"
                        id="Lname"
                        name="last_name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className="col-md-6">
                    <label>email</label>
                    <input
                        type="email"
                        id="em"
                        className="form-control"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="col-md-5">
                    <label>password</label>
                    <input
                        type="password"
                        id="pass"
                        className="form-control"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">location</label>
                    <input
                        className="form-control"
                        name="location"
                        id="exampleFormControlInput1"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div className="col-md-5">
                    <label className="form-label">occupation</label>
                    <input
                        className="form-control"
                        id="exampleFormControlInput2"
                        name="occupation"
                        onChange={(e) => setOccupation(e.target.value)}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        id="exampleFormControlTextarea1"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="col-md-5"></div>

                <div className="col-md-5">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        id="register"
                        style={{ width: "500px" }}
                    >
                        Register
                    </button>
                </div>

                {error && (
                    <p id="error" className="text-danger">
                        {error}
                    </p>
                )}

            </form>
        </>
    );
}

export default RegisterForm;
