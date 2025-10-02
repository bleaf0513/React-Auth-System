import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Homepage.css";

const Homepage = () => {
  const { user } = useAuth();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Secure Authentication
              <span className="gradient-text"> Made Simple</span>
            </h1>
            <p className="hero-subtitle">
              Experience the future of user authentication with our modern, secure, 
              and beautifully designed authentication system. Built with the latest 
              technologies and best practices.
            </p>
            <div className="hero-actions">
              {user ? (
                <div className="user-welcome">
                  <p className="welcome-text">Welcome back, <strong>{user.name}</strong>!</p>
                  <div className="welcome-actions">
                    <Link to="/dashboard" className="btn btn-primary">
                      Go to Dashboard
                    </Link>
                    <Link to="/profile" className="btn btn-secondary">
                      View Profile
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="auth-actions">
                  <Link to="/register" className="btn btn-primary">
                    Get Started Free
                  </Link>
                  <Link to="/login" className="btn btn-outline">
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="card card-1">
                <div className="card-icon">🔐</div>
                <h3>Secure</h3>
                <p>Bank-level security</p>
              </div>
              <div className="card card-2">
                <div className="card-icon">⚡</div>
                <h3>Fast</h3>
                <p>Lightning quick</p>
              </div>
              <div className="card card-3">
                <div className="card-icon">🎨</div>
                <h3>Beautiful</h3>
                <p>Modern design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Auth System?</h2>
            <p className="section-subtitle">
              Built with modern technologies and best practices for security and user experience
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">Enterprise Security</h3>
              <p className="feature-description">
                JWT-based authentication with bcrypt password hashing and secure session management.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Responsive Design</h3>
              <p className="feature-description">
                Beautiful, mobile-first design that works perfectly on all devices and screen sizes.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Optimized performance with modern React and Node.js for the best user experience.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">Modern UI/UX</h3>
              <p className="feature-description">
                Stunning glass-morphism effects, smooth animations, and intuitive user interface.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3 className="feature-title">Easy Integration</h3>
              <p className="feature-description">
                Simple API endpoints and well-documented code for easy integration into your projects.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Analytics Ready</h3>
              <p className="feature-description">
                Built-in user analytics and activity tracking for better insights and user management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50ms</div>
              <div className="stat-label">Response Time</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join thousands of developers who trust our authentication system
            </p>
            {!user && (
              <div className="cta-actions">
                <Link to="/register" className="btn btn-primary btn-large">
                  Create Free Account
                </Link>
                <Link to="/login" className="btn btn-outline btn-large">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
