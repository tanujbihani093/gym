export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="fg">
        <div className="fb2">
          <a href="#" className="logo">APEX<em>.</em></a>
          <p>Where iron meets ambition. Transform your body, elevate your life with the premier fitness experience.</p>
          <div className="soc">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
          </div>
        </div>
        <div className="fcol">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#testimonials">Stories</a></li>
          </ul>
        </div>
        <div className="fcol">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Strength Training</a></li>
            <li><a href="#services">Cardio & HIIT</a></li>
            <li><a href="#services">Personal Coaching</a></li>
            <li><a href="#services">Recovery</a></li>
          </ul>
        </div>
        <div className="fcol">
          <h4>Contact</h4>
          <ul>
            <li><a href="#">Tanuj Bihani</a></li>
            <li><a href="mailto:tanujbihani093@gmail.com">tanujbihani093@gmail.com</a></li>
            <li><a href="https://wa.me/918824895049" target="_blank" rel="noreferrer">WhatsApp: 8824895049</a></li>
            <li><a href="#">Mon-Sun: 24/7</a></li>
          </ul>
        </div>
      </div>
      <div className="fbot">
        <span>&copy; {currentYear} APEX GYM. All rights reserved.</span>
        <span>Designed with <i className="fas fa-heart" style={{ color: 'var(--red)' }}></i> for fitness</span>
      </div>
    </footer>
  );
}
