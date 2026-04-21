import { useLoader } from '../hooks/useLoader';

export default function Loader() {
  const { isLoaded, progress } = useLoader();

  return (
    <div id="loader" className={isLoaded ? 'done' : ''}>
      <div className="ld-logo">APEX<em>.</em></div>
      <div className="ld-bw"><div className="ld-b" style={{ width: progress + '%' }}></div></div>
      <div className="ld-p">{progress}%</div>
    </div>
  );
}
