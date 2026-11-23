
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function LoginForm({ setUser }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPasssword] = useState("");
    const [error, setError] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const url = "http://localhost:3000/api/auth/login";

            const response = await axios.post(url, { email, password });

            console.log("Login Response:", response.data);
            const user = response.data.user;
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            alert(response.data.message);
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || "login failed");
        }
    };

    return (
        <form
            id="log"
            className="mt-5 mx-auto"
            onSubmit={handlesubmit}
        >

            <div>
                <label htmlFor="email">email</label>

                <input
                    id="email"
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password">password</label>

                <input
                    id="password"
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    onChange={(e) => setPasssword(e.target.value)}
                />
            </div>

            {error && (
                <p id="error" className="text-danger">
                    {error}
                </p>
            )}

            <div>
                <button
                    id="login"
                    type="submit"
                    className="btn btn-primary d-block mx-auto"
                    style={{ width: "300px" }}
                >
                    Login
                </button>
            </div>

        </form>
    );
}

export default LoginForm;
