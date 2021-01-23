<template>
  <dag-container
    :height="value.config.height"
    :width="value.config.width"
    @mousemove.native="handleMouseMove"
    @mouseup.native="handleMouseUp"
    @mousedown.native="handleMouseDown"
  >
    <template v-if="edges" #edges>
      <dag-edge
        v-for="edge in edges"
        :id="edge.id"
        :key="'edge_' + edge.id"
        :start="edge.start"
        :end="edge.end"
        :edge-color="edge.edgeColor"
        :arrow-color="edge.arrowColor"
        @deleteEdge="deleteEdge"
      />
      <dag-edge
        v-if="draftEdge"
        :id="draftEdge.id"
        :start="draftEdge.start"
        :end="draftEdge.end"
        :edge-color="draftEdge.edgeColor"
        :arrow-color="draftEdge.arrowColor"
      />
    </template>
    <template #nodes>
      <dag-node
        v-for="node in value.nodes"
        :id="node.id"
        :key="'node_' + node.id"
        :x="node.x"
        :y="node.y"
        @selectNode="selectNode($event, node)"
        @linkClick="linkClick"
      >
        <component
          :is="node.component"
          v-if="node.component"
          v-bind="node.props"
          @edit="$emit('edit', node.id)"
          @delete="$emit('delete', node.id)"
        />
        <div v-if="node.content">{{ node.content }}</div>
      </dag-node>
    </template>
  </dag-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { DAGContainer } from '@/components/DAGContainer';
import { DAGNode } from '@/components/DAGNode';
import { DAGEdge } from '@/components/DAGEdge';
import { GraphData, GraphNode, GraphEdge, GraphLinkPosition } from '../types';

@Component({
  components: {
    'dag-container': DAGContainer,
    'dag-node': DAGNode,
    'dag-edge': DAGEdge,
  },
})
export default class VueDAG extends Vue {
  @Prop({
    required: true,
    default: () => {
      return {
        config: {
          scale: 1,
          height: '100%',
          width: '100%',
        },
        nodes: [],
        edges: [],
      };
    },
  })
  readonly value!: GraphData;

  dragging = false;

  newEdge: any = null;

  selected: GraphNode | null = null;

  mouse = {
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  };

  get edges() {
    let edges = this.value.edges.map((edge) => {
      const fromNode = this.value.nodes.find((node) => node.id === edge.from);
      const toNode = this.value.nodes.find((node) => node.id === edge.to);

      if (!fromNode || !toNode) return;
      if (!fromNode.x || !fromNode.y) return;
      if (!toNode.x || !toNode.y) return;

      let fy, fx, tx, ty;
      [fx, fy] = this.getLinkPosition(edge.fromLink || 'right', fromNode.x, fromNode.y);
      [tx, ty] = this.getLinkPosition(edge.toLink || 'left', toNode.x, toNode.y);

      return {
        ...edge,
        start: [fx, fy],
        end: [tx, ty],
      };
    });

    return edges;
  }

  get draftEdge() {
    if (!this.newEdge) return null;

    let x, y, fy, fx;
    const fromNode = this.value.nodes.find((node) => node.id === this.newEdge.from);

    if (!fromNode || !fromNode.x || !fromNode.y) return null;
    [fx, fy] = this.getLinkPosition(this.newEdge.fromLink || 'right', fromNode.x, fromNode.y);

    return {
      start: [fx, fy],
      end: [this.newEdge.tx, this.newEdge.ty],
    };
  }

  getLinkPosition(type: string, x: number, y: number) {
    switch (type) {
      case 'top':
        return [x + 120, y];
      case 'right':
        return [x + 240, y + 40];
      case 'bottom':
        return [x + 120, y + 40];
      case 'left':
        return [x, y + 40];
      default:
        break;
    }
  }

  deleteEdge(id: number) {
    this.value.edges = this.value.edges.filter((e) => e.id !== id);
  }

  linkClick(linkPosition: GraphLinkPosition, id: number) {
    if (this.newEdge) {
      this.stopLinking(linkPosition, id);
    } else {
      this.startLinking(linkPosition, id);
    }
  }

  startLinking(linkPosition: GraphLinkPosition, id: number) {
    const [mx, my] = [this.mouse.x, this.mouse.y];
    this.newEdge = {
      from: id,
      fromLink: linkPosition,
      tx: mx,
      ty: my,
    };
  }

  stopLinking(linkPosition: GraphLinkPosition, id: number) {
    if (this.newEdge.from !== id) {
      const exists = this.value.edges.find((edge) => {
        return edge.from === this.newEdge.from && edge.to === id;
      });

      if (!exists) {
        let maxID = Math.max(
          0,
          ...this.value.edges.map((edge) => {
            return edge.id;
          }),
        );
        const newEdge: GraphEdge = {
          id: maxID + 1,
          from: this.newEdge.from,
          fromLink: this.newEdge.fromLink,
          to: id,
          toLink: linkPosition,
        };
        this.value.edges.push(newEdge);
        this.$emit('edgeAdded', newEdge);
      }
    }
    this.newEdge = null;
  }

  selectNode(e: MouseEvent, node: GraphNode) {
    this.selected = node;
    this.mouse.lastX = e.pageX || e.clientX + document.documentElement.scrollLeft;
    this.mouse.lastY = e.pageY || e.clientY + document.documentElement.scrollTop;
  }

  handleMouseMove(e: MouseEvent) {
    if (this.dragging) {
      this.mouse.x = e.pageX || e.clientX + document.documentElement.scrollLeft;
      this.mouse.y = e.pageY || e.clientY + document.documentElement.scrollTop;

      const dx = this.mouse.x - this.mouse.lastX;
      const dy = this.mouse.y - this.mouse.lastY;
      this.mouse.lastX = this.mouse.x;
      this.mouse.lastY = this.mouse.y;
      this.moveSelectedNode(dx, dy);
    }

    if (this.newEdge) {
      [this.mouse.x, this.mouse.y] = this.getMousePosition(this.$el, e);
      [this.newEdge.tx, this.newEdge.ty] = [this.mouse.x, this.mouse.y];
    }
  }

  handleMouseUp(e: MouseEvent) {
    const target = e.target;
    this.dragging = false;
  }

  handleMouseDown(e: MouseEvent) {
    const target = e.target;
    this.dragging = true;
  }

  moveSelectedNode(dx: number, dy: number) {
    if (!this.selected || !this.selected.x || !this.selected.y) return;
    this.selected.x = this.selected.x + dx / (this.value.config.scale || 1);
    this.selected.y = this.selected.y + dy / (this.value.config.scale || 1);
  }

  getMousePosition(element: Element, event: MouseEvent) {
    const mouseX = event.pageX || event.clientX + document.documentElement.scrollLeft;
    const mouseY = event.pageY || event.clientY + document.documentElement.scrollTop;

    const offset = this.getOffsetRect(element);
    const x = mouseX - offset.left;
    const y = mouseY - offset.top;

    return [x, y];
  }

  getOffsetRect(element: Element) {
    const box = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    const scrollLeft = window.pageXOffset;
    const top = box.top + scrollTop;
    const left = box.left + scrollLeft;
    return { top: Math.round(top), left: Math.round(left) };
  }
}
</script>

<style lang="scss">
@import './scss/vue-dag.scss';
</style>
