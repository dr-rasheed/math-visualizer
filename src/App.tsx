import {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';

export default function App() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [A, setA] = useState(100);
  const [B, setB] = useState(100);
  const [a, setA_val] = useState(3);
  const [b, setB_val] = useState(2);
  const [delta, setDelta] = useState(Math.PI / 2);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 600;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const points = [];
    for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
      const x = A * Math.sin(a * t + delta) + width / 2;
      const y = B * Math.sin(b * t) + height / 2;
      points.push({x, y});
    }

    const line = d3.line<{x: number, y: number}>()
      .x(d => d.x)
      .y(d => d.y);

    svg.append('path')
      .datum(points)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', line);

  }, [A, B, a, b, delta]);

  return (
    <div className="p-8 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold">Lissajous Curve Visualizer</h1>
      <svg ref={svgRef} width={600} height={600} className="border border-gray-300 rounded-lg" />
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        <label>A: <input type="range" min="10" max="250" value={A} onChange={e => setA(Number(e.target.value))} /></label>
        <label>B: <input type="range" min="10" max="250" value={B} onChange={e => setB(Number(e.target.value))} /></label>
        <label>a: <input type="range" min="1" max="10" step="0.1" value={a} onChange={e => setA_val(Number(e.target.value))} /></label>
        <label>b: <input type="range" min="1" max="10" step="0.1" value={b} onChange={e => setB_val(Number(e.target.value))} /></label>
        <label>delta: <input type="range" min="0" max={2 * Math.PI} step="0.1" value={delta} onChange={e => setDelta(Number(e.target.value))} /></label>
      </div>
    </div>
  );
}
