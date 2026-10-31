type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  w?: number;
  accent?: boolean;
};

export type DiagramSpec = {
  width: number;
  height: number;
  nodes: Node[];
  edges: [string, string][];
};

const NODE_W = 200;
const NODE_H = 48;

// Connector between two boxes: straight when they share a row or column,
// otherwise an elbow through the vertical midpoint.
function edgePath(a: Node, b: Node) {
  const aw = a.w ?? NODE_W;
  const bw = b.w ?? NODE_W;
  if (a.y === b.y) {
    const leftToRight = a.x < b.x;
    const x1 = leftToRight ? a.x + aw : a.x;
    const x2 = leftToRight ? b.x : b.x + bw;
    const y = a.y + NODE_H / 2;
    return `M ${x1} ${y} H ${x2}`;
  }
  const x1 = a.x + aw / 2;
  const x2 = b.x + bw / 2;
  const y1 = a.y + NODE_H;
  const y2 = b.y;
  const mid = (y1 + y2) / 2;
  return x1 === x2 ? `M ${x1} ${y1} V ${y2}` : `M ${x1} ${y1} V ${mid} H ${x2} V ${y2}`;
}

export default function Diagram({
  spec,
  title,
  animate = false,
}: {
  spec: DiagramSpec;
  title: string;
  animate?: boolean;
}) {
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));
  return (
    <svg
      className={animate ? "diagram diagram--animate" : "diagram"}
      viewBox={`0 0 ${spec.width} ${spec.height}`}
      role="img"
      aria-label={title}
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" className="diagram__arrowhead" />
        </marker>
      </defs>
      {spec.edges.map(([from, to], i) => {
        const a = byId.get(from)!;
        const b = byId.get(to)!;
        return (
          <path
            key={`${from}-${to}`}
            d={edgePath(a, b)}
            className="diagram__edge"
            markerEnd="url(#arrow)"
            pathLength={1}
            style={{ animationDelay: `${0.35 + i * 0.28}s` }}
          />
        );
      })}
      {spec.nodes.map((n, i) => {
        const w = n.w ?? NODE_W;
        return (
          <g
            key={n.id}
            className={n.accent ? "diagram__node diagram__node--accent" : "diagram__node"}
            style={{ animationDelay: `${i * 0.28}s` }}
          >
            <rect x={n.x} y={n.y} width={w} height={NODE_H} rx={8} />
            <text x={n.x + w / 2} y={n.y + NODE_H / 2} dominantBaseline="central" textAnchor="middle">
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
