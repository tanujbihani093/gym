import { useState } from 'react';
import './RegisterForm.css';

export default function RegisterForm({ isOpen, onClose, onRegistrationComplete }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedPlan: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 999,
      description: 'Perfect for beginners',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 1999,
      description: 'For dedicated athletes',
      featured: true,
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 3499,
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
      newErrors.phone = 'Please enter a valid 10-digit phone number';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            // Placeholder: Replace with your actual Web3Forms Access Key
            access_key: 'YOUR_ACCESS_KEY_HERE',
            subject: 'New Registration on APEX GYM',
            from_name: 'APEX GYM Website',
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            selectedPlan: formData.selectedPlan,
          }),
        });

        const result = await response.json();

        if (response.status === 200) {
          setIsSubmitted(true);

          // Notify parent of registration completion with name and plan
          if (onRegistrationComplete) {
            onRegistrationComplete(formData.firstName, formData.selectedPlan);
          }

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
          }, 2500);
        } else {
          // Handle API errors
          setSubmitError(result.message || 'Something went wrong. Please try again later.');
        }
      } catch (error) {
        setSubmitError('Failed to submit form. Please check your internet connection.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  const selectedPlanData = plans.find((p) => p.id === formData.selectedPlan);

  const formatPrice = (price) => {
    return '₹' + price.toLocaleString('en-IN');
  };

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
                    placeholder="+91 98765 43210"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                {submitError && (
                  <div className="form-group">
                    <span className="error-message" style={{ display: 'block', padding: '0.5rem', background: 'rgba(255,0,0,0.1)', border: '1px solid #ff3333', borderRadius: '4px' }}>
                      <i className="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }}></i>
                      {submitError}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className="register-submit-btn"
                  disabled={isSubmitting}
                  style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  {isSubmitting ? (
                    <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                  ) : (
                    <><i className="fas fa-bolt"></i> Complete Registration</>
                  )}
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
                      <span className="price-amount">{formatPrice(plan.price)}</span>
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
                  <strong className="cost">{formatPrice(selectedPlanData.price)}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
