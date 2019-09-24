<template>
  <dag-container
    @mousemove.native="handleMove"
    @mouseup.native="handleUp"
    @mousedown.native="handleDown"
  >
    <template #edges>
      <dag-edge
        v-for="edge in value.edges"
        :key="'edge_' + edge.id"
        :edge="edge"
        :start="[1, 1]"
        :end="[100, 100]"
      />
    </template>
    <template #nodes>
      <dag-node
        v-for="node in value.nodes"
        :key="'node_' + node.id"
        :x="node.x"
        :y="node.y"
        @selectNode="selectNode($event, node)"
      />
    </template>
  </dag-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { DAGContainer } from '@/components/DAGContainer';
import { DAGNode } from '@/components/DAGNode';
import { DAGEdge } from '@/components/DAGEdge';
import { GraphData } from '../types';

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
        },
        nodes: [],
        edges: [],
      };
    },
  })
  readonly value!: GraphData;

  dragging = false;
  linking = false;
  scrolling = false;

  selected: Object | null = null;

  mouse = {
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  };

  emitModel() {
    this.$emit('input', { ...this.value, lastEdit: new Date().getTime() });
  }

  selectNode(e: MouseEvent, node: Object) {
    this.selected = node;
    this.mouse.lastX = e.pageX || e.clientX + document.documentElement.scrollLeft;
    this.mouse.lastY = e.pageY || e.clientY + document.documentElement.scrollTop;
  }

  handleMove(e: MouseEvent) {
    if (this.dragging) {
      this.mouse.x = e.pageX || e.clientX + document.documentElement.scrollLeft;
      this.mouse.y = e.pageY || e.clientY + document.documentElement.scrollTop;
      let diffX = this.mouse.x - this.mouse.lastX;
      let diffY = this.mouse.y - this.mouse.lastY;
      this.mouse.lastX = this.mouse.x;
      this.mouse.lastY = this.mouse.y;
      this.moveSelectedNode(diffX, diffY);
    }

    if (this.linking) {
      [this.mouse.x, this.mouse.y] = this.getMousePosition(this.$el, e);
    }

    if (this.scrolling) {
      [this.mouse.x, this.mouse.y] = this.getMousePosition(this.$el, e);
      let diffX = this.mouse.x - this.mouse.lastX;
      let diffY = this.mouse.y - this.mouse.lastY;
      this.mouse.lastX = this.mouse.x;
      this.mouse.lastY = this.mouse.y;
      // this.value.centerX += diffX;
      // this.value.centerY += diffY;
    }
  }

  handleUp(e: MouseEvent) {
    this.dragging = false;
    this.linking = false;
    this.scrolling = false;
  }

  handleDown(e: MouseEvent) {
    const target = e.target || e.srcElement;
    this.dragging = true;
  }

  moveSelectedNode(dx: number, dy: number) {
    let index = this.value.nodes.findIndex(item => {
      return this.selected && item.id === this.selected.id;
    });

    console.log(index);

    let left = this.value.nodes[index].x + dx / this.value.config.scale;
    let top = this.value.nodes[index].y + dy / this.value.config.scale;

    this.$set(
      this.value.nodes,
      index,
      Object.assign(this.value.nodes[index], {
        x: left,
        y: top,
      }),
    );
  }

  getMousePosition(element: any, event: any) {
    let mouseX = event.pageX || event.clientX + document.documentElement.scrollLeft;
    let mouseY = event.pageY || event.clientY + document.documentElement.scrollTop;

    let offset = this.getOffsetRect(element);
    let x = mouseX - offset.left;
    let y = mouseY - offset.top;

    return [x, y];
  }

  getOffsetRect(element: any) {
    let box = element.getBoundingClientRect();
    let scrollTop = window.pageYOffset;
    let scrollLeft = window.pageXOffset;
    let top = box.top + scrollTop;
    let left = box.left + scrollLeft;
    return { top: Math.round(top), left: Math.round(left) };
  }
}
</script>

<style lang="scss">
@import './scss/vue-dag.scss';
</style>
