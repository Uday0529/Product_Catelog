import { useState } from "react";
import { registerUser } from "../services/authApi";

function Register({ onRegister, onGoToLogin }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await registerUser({
                name,
                email,
                password
            });

            alert("Registration successful! Please login.");

            onRegister();

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Registration failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    PC
                </div>

                <h1 className="auth-title">
                    Create Account
                </h1>

                <p className="auth-subtitle">
                    Start managing your product catalog
                </p>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="auth-label">
                            Name
                        </label>

                        <input
                            type="text"
                            className="auth-input"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Your name"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="auth-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="auth-input"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="auth-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="auth-input"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                <div className="auth-footer">

                    Already have an account?

                    <button
                        type="button"
                        className="auth-link"
                        onClick={onGoToLogin}
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Register;