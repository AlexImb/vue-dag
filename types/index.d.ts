declare interface GraphConfig {
  scale: number;
}

declare interface GraphNode {
  id: number;
  content: string;
  x?: number;
  y?: number;
}

declare type GraphLinkPosition = 'top' | 'right' | 'bottom' | 'left';

declare interface GraphEdge {
  id: number;
  content?: string;
  from: number;
  to: number;
  fromLink?: GraphLinkPosition;
  toLink?: GraphLinkPosition;
  edgeColor?: string;
  arrowColor?: string;
}

declare interface GraphData {
  config: GraphConfig;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export { GraphData, GraphConfig, GraphEdge, GraphNode, GraphLinkPosition };
