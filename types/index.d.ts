declare interface GraphConfig {
  scale: number;
}

declare interface GraphNode {
  id: number;
  content: string;
  x?: number;
  y?: number;
}

declare interface GraphEdge {
  id: number;
  content: string;
  from: number;
  to: number;
}

declare interface GraphData {
  config: GraphConfig;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export { GraphData, GraphConfig, GraphEdge, GraphNode };
