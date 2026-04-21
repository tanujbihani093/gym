export default function Testimonials() {
  const testimonials = [
    {
      quote: 'APEX completely changed my relationship with fitness. The coaches pushed me beyond what I thought possible. Down 40lbs and stronger than ever.',
      author: 'Sarah Johnson',
      role: 'Member since 2022',
    },
    {
      quote: 'The community here is incredible. It\'s not just a gym — it\'s a family. I look forward to every single session. Best investment I\'ve ever made.',
      author: 'Marcus Chen',
      role: 'Member since 2020',
    },
    {
      quote: 'As a competitive athlete, I needed a facility that could keep up. APEX delivers world-class equipment and coaching that rivals any professional setup.',
      author: 'Alex Rodriguez',
      role: 'Member since 2021',
    },
  ];

  return (
    <section id="testimonials">
      <div className="ctn">
        <div className="tth">
          <span className="tg">Success Stories</span>
          <h2 className="st2">REAL PEOPLE.<br /><em>REAL RESULTS.</em></h2>
        </div>
        <div className="ttg">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="tc2 rx">
              <div className="tc2-before"></div>
              <div className="tqi">&ldquo;</div>
              <div className="ttx">{testimonial.quote}</div>
              <div className="tst">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <div className="tau">
                <div>
                  <div className="tan">{testimonial.author}</div>
                  <div className="tar">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
