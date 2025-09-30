import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { request, loading, error } = useApi();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await request("get", "/auth/user/profile");
        setProfile(data);
      } catch (err) {}
    };
    fetchProfile();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Welcome {user?.name}</h1>
          <p className="dashboard-subtitle">Here's what's happening with your account today.</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigate("/profile")}
          >
            View Profile
          </button>
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Quick Stats</h2>
            </div>
            <div className="card-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">👤</div>
                  <div className="stat-info">
                    <span className="stat-value">1</span>
                    <span className="stat-label">Profile Views</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">🔐</div>
                  <div className="stat-info">
                    <span className="stat-value">100%</span>
                    <span className="stat-label">Security</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <span className="stat-value">5.0</span>
                    <span className="stat-label">Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="card-content">
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">✅</div>
                  <div className="activity-content">
                    <p className="activity-text">Successfully logged in</p>
                    <span className="activity-time">Just now</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">🔑</div>
                  <div className="activity-content">
                    <p className="activity-text">Account created</p>
                    <span className="activity-time">2 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h2>Profile Information</h2>
            </div>
            <div className="card-content">
              {profile && (
                <div className="profile-preview">
                  <div className="preview-item">
                    <span className="preview-label">Name:</span>
                    <span className="preview-value">{profile.user?.name}</span>
                  </div>
                  <div className="preview-item">
                    <span className="preview-label">Email:</span>
                    <span className="preview-value">{profile.user?.email}</span>
                  </div>
                  <div className="preview-item">
                    <span className="preview-label">Status:</span>
                    <span className="preview-value status-active">Active</span>
                  </div>
                </div>
              )}
              <button 
                className="btn btn-primary btn-full"
                onClick={() => navigate("/profile")}
              >
                Complete Your Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
