export default function Marquee() {
  const items = ['Strength Training', 'Personal Coaching', 'Group Classes', 'Cardio & Conditioning', 'Nutrition Guidance', 'Recovery Suites', 'Elite Equipment', '24/7 Access'];

  return (
    <div className="mq">
      <div className="mqt">
        {items.map((item, idx) => (
          <span key={`first-${idx}`} className="mqi">{item}</span>
        ))}
        {items.map((item, idx) => (
          <span key={`second-${idx}`} className="mqi">{item}</span>
        ))}
      </div>
    </div>
  );
}
