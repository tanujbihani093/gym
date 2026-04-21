import { useCustomCursor } from '../hooks/useCustomCursor';

export default function CustomCursor() {
  useCustomCursor();

  return (
    <>
      <div id="pb"></div>
      <div id="co"></div>
      <div id="cd"></div>
    </>
  );
}
