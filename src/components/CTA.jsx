export default function CTA({ onOpenRegister }) {
  const handleStartJourney = (e) => {
    e.preventDefault();
    if (onOpenRegister) onOpenRegister();
  };

  return (
    <div className="fc">
      <div className="fcbg"></div>
      <div className="fcc">
        <h2 className="fct">YOUR FUTURE<br />STARTS <em>TODAY.</em></h2>
        <p className="fcs">Stop waiting for the perfect moment. The perfect moment is now. Join APEX and discover what you're truly capable of.</p>
        <div className="fcb">
          <button className="br" id="cta-start-btn" onClick={handleStartJourney}><i className="fas fa-bolt"></i> Start Your Journey</button>
          <a href="#about" className="bg">Learn More <i className="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </div>
  );
}
