import { useCounterAnimation } from '../hooks/useCounterAnimation';

export default function Counter() {
  const counters = [
    { target: 12000, label: 'Active Members' },
    { target: 48, label: 'Elite Coaches' },
    { target: 350, label: 'Classes Weekly' },
    { target: 98, label: '% Satisfaction' },
  ];

  return (
    <div className="cs">
      <div className="cg">
        {counters.map((counter, idx) => (
          <CounterItem key={idx} target={counter.target} label={counter.label} />
        ))}
      </div>
    </div>
  );
}

function CounterItem({ target, label }) {
  const { count, ref } = useCounterAnimation(target);

  const formatCount = () => {
    if (target >= 1000) {
      return count === 0 ? '0K+' : (count / 1000).toFixed(count >= target ? 0 : 1) + 'K+';
    }
    return count + (target < 100 ? '+' : '+');
  };

  return (
    <div className="ci" ref={ref}>
      <div className="cn">{formatCount()}</div>
      <div className="clb">{label}</div>
    </div>
  );
}
