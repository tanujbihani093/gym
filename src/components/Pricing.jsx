export default function Pricing({ onOpenRegister, isLoggedIn, loggedInUserPlan }) {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '₹999',
      description: 'Perfect for beginners looking to build a consistent fitness habit.',
      features: [
        { text: 'Access to gym floor', included: true },
        { text: 'Locker room access', included: true },
        { text: '2 group classes/week', included: true },
        { text: 'Basic fitness assessment', included: true },
        { text: 'Personal coaching', included: false },
        { text: 'Recovery suite', included: false },
      ],
      badge: null,
      buttonClass: 'bg',
      buttonText: 'Get Started',
      featured: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₹1,999',
      description: 'For dedicated athletes ready to take their training to the next level.',
      features: [
        { text: 'Full gym access 24/7', included: true },
        { text: 'Unlimited group classes', included: true },
        { text: '4 PT sessions/month', included: true },
        { text: 'Nutrition guidance', included: true },
        { text: 'Recovery suite access', included: true },
        { text: 'VIP lounge', included: false },
      ],
      badge: 'Most Popular',
      buttonClass: 'br',
      buttonText: 'Join Pro',
      featured: true,
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '₹3,499',
      description: 'The ultimate experience. Everything included, no limits, no compromises.',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Unlimited PT sessions', included: true },
        { text: 'VIP lounge access', included: true },
        { text: 'Priority booking', included: true },
        { text: '1-on-1 nutrition plan', included: true },
        { text: '24/7 concierge', included: true },
      ],
      badge: null,
      buttonClass: 'bg',
      buttonText: 'Go Elite',
      featured: false,
    },
  ];

  const handlePlanClick = (e) => {
    e.preventDefault();
    if (onOpenRegister) onOpenRegister();
  };

  return (
    <section id="pricing">
      <div className="ctn">
        <div className="ph">
          <span className="tg">Membership Plans</span>
          <h2 className="st2">INVEST IN<br /><em>YOURSELF.</em></h2>
        </div>
        <div className="pg">
          {plans.map((plan, idx) => {
            const isUserPlan = isLoggedIn && loggedInUserPlan === plan.id;
            const isOtherPlan = isLoggedIn && loggedInUserPlan !== plan.id && loggedInUserPlan !== '';

            return (
            <div key={idx} className={`pl rx ${plan.featured ? 'ft' : ''}`} style={isOtherPlan ? { opacity: 0.7, transform: 'scale(0.95)' } : {}}>
              <div className="plglow"></div>
              {plan.badge && !isOtherPlan && <div className="plbadge">{plan.badge}</div>}
              {isUserPlan && <div className="plbadge" style={{ background: '#4caf50', color: 'white' }}>Your Plan</div>}
              <div className="pln">{plan.name}</div>
              
              {!isOtherPlan ? (
                <>
                  <div className="plp"><span className="pa">{plan.price}</span><span className="pm">/month</span></div>
                  <div className="pld">{plan.description}</div>
                  <div className="pdiv"></div>
                  <div className="plf">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className={`pf2 ${!feature.included ? 'no' : ''}`}>
                        <i className={`fas ${feature.included ? 'fa-check' : 'fa-xmark'}`}></i> {feature.text}
                      </div>
                    ))}
                  </div>
                  {isUserPlan ? (
                    <span className={plan.buttonClass} style={{ cursor: 'default', opacity: 0.85, marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                      <i className="fas fa-check-circle"></i> Active Plan
                    </span>
                  ) : (
                    <button
                      className={plan.buttonClass}
                      id={`pricing-${plan.name.toLowerCase()}-btn`}
                      onClick={handlePlanClick}
                    >
                      {plan.buttonText} {plan.buttonClass === 'br' ? <i className="fas fa-bolt"></i> : <i className="fas fa-arrow-right"></i>}
                    </button>
                  )}
                </>
              ) : (
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'center' }}>
                  <p style={{ color: 'var(--text-light)', textAlign: 'center', fontStyle: 'italic' }}>Want more features?</p>
                  <button className="bg" style={{ marginTop: 'auto', width: '100%' }}>
                    More Offers <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              )}
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}
