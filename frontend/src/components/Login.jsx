import { useState } from "react";
import { loginUser } from "../services/authApi";

function Login({ onLogin, onGoToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await loginUser({
                email,
                password
            });

            localStorage.setItem("token", data.token);

            onLogin();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Invalid email or password"
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
                    Welcome Back
                </h1>

                <p className="auth-subtitle">
                    Login to manage your product catalog
                </p>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

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
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

                <div className="auth-footer">

                    Don't have an account?

                    <button
                        type="button"
                        className="auth-link"
                        onClick={onGoToRegister}
                    >
                        Create account
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Login;