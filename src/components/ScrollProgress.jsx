import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ScrollProgress() {
  const progressRef = useScrollProgress();

  return <div id="scroll-progress" ref={progressRef}></div>;
}
