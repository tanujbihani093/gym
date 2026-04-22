import { useState } from 'react';
import './LoginForm.css';

export default function LoginForm({ isOpen, onClose, onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Mock login process - extract name from email for display
      const nameMatch = formData.email.split('@')[0];
      const userName = nameMatch.charAt(0).toUpperCase() + nameMatch.slice(1).replace(/[0-9]/g, '');
      
      if (onLogin) {
        onLogin(userName || 'User');
      }

      setFormData({ email: '', password: '' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="login-container">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Log in to your APEX account</p>

          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="login-email">Email Address</label>
              <input
                type="email"
                id="login-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message" style={{color:'#ff3333', fontSize:'0.85rem', marginTop:'0.25rem', display:'block'}}>{errors.email}</span>}
            </div>

            <div className="login-form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message" style={{color:'#ff3333', fontSize:'0.85rem', marginTop:'0.25rem', display:'block'}}>{errors.password}</span>}
            </div>

            <button type="submit" className="login-submit-btn">
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
