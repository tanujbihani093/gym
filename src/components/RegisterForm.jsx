import { useState } from 'react';
import './RegisterForm.css';

export default function RegisterForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedPlan: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      description: 'Perfect for beginners',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 59,
      description: 'For dedicated athletes',
      featured: true,
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 99,
      description: 'The ultimate experience',
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.selectedPlan) {
      newErrors.selectedPlan = 'Please select a subscription plan';
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

  const handlePlanSelect = (planId) => {
    setFormData((prev) => ({
      ...prev,
      selectedPlan: planId,
    }));
    if (errors.selectedPlan) {
      setErrors((prev) => ({
        ...prev,
        selectedPlan: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          selectedPlan: '',
        });
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  const selectedPlanData = plans.find((p) => p.id === formData.selectedPlan);

  return (
    <div className="register-modal-overlay" onClick={onClose}>
      <div className="register-modal" onClick={(e) => e.stopPropagation()}>
        <button className="register-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="register-container">
          <div className="register-form-section">
            <h2 className="register-title">Join APEX GYM</h2>
            <p className="register-subtitle">Begin your fitness journey today</p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <button
                  type="submit"
                  className="register-submit-btn"
                >
                  <i className="fas fa-bolt"></i> Continue to Payment
                </button>
              </form>
            ) : (
              <div className="success-message">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Registration Successful!</h3>
                <p>Welcome to APEX GYM, {formData.firstName}!</p>
                <p>Prepare to transform your body and elevate your life.</p>
              </div>
            )}
          </div>

          <div className="register-plan-section">
            <h3 className="plan-section-title">Select Your Plan</h3>
            {errors.selectedPlan && <span className="error-message">{errors.selectedPlan}</span>}

            <div className="plan-cards">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`plan-card ${formData.selectedPlan === plan.id ? 'selected' : ''} ${
                    plan.featured ? 'featured' : ''
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.featured && <div className="plan-badge">Most Popular</div>}
                  <div className="plan-header">
                    <h4 className="plan-name">{plan.name}</h4>
                    <div className="plan-price">
                      <span className="price-amount">${plan.price}</span>
                      <span className="price-period">/month</span>
                    </div>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                  <div
                    className={`plan-selector ${
                      formData.selectedPlan === plan.id ? 'checked' : ''
                    }`}
                  >
                    <i
                      className={`fas ${
                        formData.selectedPlan === plan.id ? 'fa-check-circle' : 'fa-circle'
                      }`}
                    ></i>
                  </div>
                </div>
              ))}
            </div>

            {selectedPlanData && (
              <div className="selected-plan-summary">
                <div className="summary-item">
                  <span>Plan:</span>
                  <strong>{selectedPlanData.name}</strong>
                </div>
                <div className="summary-item">
                  <span>Monthly Cost:</span>
                  <strong className="cost">${selectedPlanData.price}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
