import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const { request, loading, error } = useApi();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    location: "",
    website: "",
    phone: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await request("get", "/auth/user/profile");
        setProfile(data);
        setEditForm(prev => ({
          ...prev,
          name: data.user?.name || user?.name || "",
          email: data.user?.email || user?.email || "",
          bio: data.user?.bio || "",
          location: data.user?.location || "",
          website: data.user?.website || "",
          phone: data.user?.phone || ""
        }));
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Here you would typically call an update profile API
      console.log("Saving profile:", editForm);
      setIsEditing(false);
      // Show success message
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || "",
      email: user?.email || "",
      bio: "",
      location: "",
      website: "",
      phone: ""
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            <span className="avatar-text">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <div className="avatar-status online"></div>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{user?.name || "User"}</h1>
          <p className="profile-email">{user?.email}</p>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">1</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">Connections</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">156</span>
              <span className="stat-label">Views</span>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-card">
            <div className="card-header">
              <h2>About</h2>
              {isEditing && (
                <button className="btn btn-small btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              )}
            </div>
            <div className="card-content">
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={editForm.bio}
                      onChange={handleEditChange}
                      className="form-textarea"
                      placeholder="Tell us about yourself..."
                      rows="4"
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      className="form-input"
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      name="website"
                      value={editForm.website}
                      onChange={handleEditChange}
                      className="form-input"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditChange}
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              ) : (
                <div className="profile-details">
                  <div className="detail-item">
                    <span className="detail-label">Bio</span>
                    <p className="detail-value">
                      {profile?.user?.bio || "No bio available. Click 'Edit Profile' to add one."}
                    </p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <p className="detail-value">
                      {profile?.user?.location || "Not specified"}
                    </p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Website</span>
                    <p className="detail-value">
                      {profile?.user?.website ? (
                        <a href={profile.user.website} target="_blank" rel="noopener noreferrer">
                          {profile.user.website}
                        </a>
                      ) : (
                        "Not specified"
                      )}
                    </p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone</span>
                    <p className="detail-value">
                      {profile?.user?.phone || "Not specified"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="profile-card">
            <div className="card-header">
              <h2>Activity</h2>
            </div>
            <div className="card-content">
              <div className="activity-timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <p className="timeline-text">Profile created</p>
                    <span className="timeline-time">Just now</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <p className="timeline-text">First login</p>
                    <span className="timeline-time">2 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="card-header">
              <h2>Quick Stats</h2>
            </div>
            <div className="card-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-info">
                    <span className="stat-title">Profile Views</span>
                    <span className="stat-value">156</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <span className="stat-title">Connections</span>
                    <span className="stat-value">24</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <span className="stat-title">Rating</span>
                    <span className="stat-value">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <div className="card-header">
              <h2>Skills</h2>
            </div>
            <div className="card-content">
              <div className="skills-list">
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">React</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">CSS</span>
                <span className="skill-tag">HTML</span>
              </div>
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

export default Profile;
