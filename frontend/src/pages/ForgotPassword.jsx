import { useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import "./Auth.css";

const ForgotPassword = () => {
  const { request, loading, error } = useApi();
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request("post", "/auth/forgot-password", { email });
      setIsEmailSent(true);
    } catch (err) {
      console.error("Forgot password error:", err);
    }
  };

  if (isEmailSent) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Check Your Email</h1>
            <p className="auth-subtitle">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>
          
          <div className="success-message">
            <div className="success-icon">📧</div>
            <p>Please check your email and click the link to reset your password.</p>
            <p className="success-note">
              If you don't see the email, check your spam folder.
            </p>
          </div>
          
          <div className="auth-footer">
            <div className="auth-links">
              <Link to="/login" className="auth-link">
                Back to Login
              </Link>
              <button 
                className="auth-link-btn" 
                onClick={() => setIsEmailSent(false)}
              >
                Try Different Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Forgot Password?</h1>
          <p className="auth-subtitle">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <div className="auth-links">
            <Link to="/login" className="auth-link">
              Back to Login
            </Link>
            <Link to="/register" className="auth-link">
              Create Account
            </Link>
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
