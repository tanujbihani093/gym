export default function Services() {
  const services = [
    {
      num: '01',
      icon: 'fa-dumbbell',
      title: 'Strength Training',
      description: 'Progressive overload programs tailored to your body type and goals. From powerlifting to functional strength.',
    },
    {
      num: '02',
      icon: 'fa-heart-pulse',
      title: 'Cardio & HIIT',
      description: 'Heart-pumping sessions designed to torch calories, boost endurance, and elevate your cardiovascular health.',
    },
    {
      num: '03',
      icon: 'fa-user-group',
      title: 'Personal Coaching',
      description: 'One-on-one guidance from certified coaches who create custom plans and hold you accountable every step.',
    },
    {
      num: '04',
      icon: 'fa-spa',
      title: 'Recovery & Wellness',
      description: 'Sauna, cold plunge, massage therapy, and nutrition counseling to maximize recovery and longevity.',
    },
  ];

  return (
    <section id="services">
      <div className="ctn">
        <div className="sh">
          <div>
            <span className="tg">What We Offer</span>
            <h2 className="st2">SERVICES BUILT<br /><em>FOR RESULTS.</em></h2>
          </div>
          <p className="bc" style={{ maxWidth: '380px' }}>Every program is designed with precision, backed by science, and delivered by coaches who genuinely care about your progress.</p>
        </div>
        <div className="svgg">
          {services.map((service) => (
            <div key={service.num} className="sc2 rx">
              <div className="snum">{service.num}</div>
              <div className="sic"><i className={`fas ${service.icon}`}></i></div>
              <div className="sn">{service.title}</div>
              <div className="sd">{service.description}</div>
              <div className="sm">Learn More <i className="fas fa-arrow-right"></i></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
