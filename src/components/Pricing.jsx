export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 29,
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
      name: 'Pro',
      price: 59,
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
      name: 'Elite',
      price: 99,
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

  return (
    <section id="pricing">
      <div className="ctn">
        <div className="ph">
          <span className="tg">Membership Plans</span>
          <h2 className="st2">INVEST IN<br /><em>YOURSELF.</em></h2>
        </div>
        <div className="pg">
          {plans.map((plan, idx) => (
            <div key={idx} className={`pl rx ${plan.featured ? 'ft' : ''}`}>
              <div className="plglow"></div>
              {plan.badge && <div className="plbadge">{plan.badge}</div>}
              <div className="pln">{plan.name}</div>
              <div className="plp"><span className="pa">${plan.price}</span><span className="pm">/month</span></div>
              <div className="pld">{plan.description}</div>
              <div className="pdiv"></div>
              <div className="plf">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className={`pf2 ${!feature.included ? 'no' : ''}`}>
                    <i className={`fas ${feature.included ? 'fa-check' : 'fa-xmark'}`}></i> {feature.text}
                  </div>
                ))}
              </div>
              <button className={plan.buttonClass}>{plan.buttonText} {plan.buttonClass === 'br' ? <i className="fas fa-bolt"></i> : <i className="fas fa-arrow-right"></i>}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
