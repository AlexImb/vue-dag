<template>
  <g @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <path :d="dAttr" :style="pathStyle"></path>
    <a v-if="show.delete" @click="deleteLink">
      <text text-anchor="middle" :transform="arrowTransform" font-size="22">&times;</text>
    </a>
    <path v-else d="M -1 -1 L 0 1 L 1 -1 z" :style="arrowStyle" :transform="arrowTransform"></path>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DAGLink extends Vue {
  @Prop({ default: () => [0, 0] }) start: [number, number] | undefined;
  @Prop({ default: () => [0, 0] }) end: [number, number] | undefined;

  show = {
    delete: false,
  };

  pathStyle() {
    return {
      stroke: 'rgb(255, 136, 85)',
      strokeWidth: 2.73205,
      fill: 'none',
    };
  }

  arrowStyle() {
    return {
      stroke: 'rgb(255, 136, 85)',
      strokeWidth: 5.73205,
      fill: 'none',
    };
  }

  get arrowTransform() {
    const [arrowX, arrowY] = this.caculateCenterPoint();
    const degree = this.caculateRotation();
    return `translate(${arrowX}, ${arrowY}) rotate(${degree})`;
  }

  get dAttr() {
    if (!this.start || !this.end) return;
    const cx = this.start[0];
    const cy = this.start[1];
    const ex = this.end[0];
    const ey = this.end[1];

    let x1 = cx,
      y1 = cy + 50,
      x2 = ex,
      y2 = ey - 50;
    return `M ${cx}, ${cy} C ${x1}, ${y1}, ${x2}, ${y2}, ${ex}, ${ey}`;
  }

  handleMouseOver() {
    this.show.delete = true;
  }
  handleMouseLeave() {
    this.show.delete = false;
  }

  caculateCenterPoint() {
    if (!this.start || !this.end) return;
    const dx = (this.end[0] - this.start[0]) / 2;
    const dy = (this.end[1] - this.start[1]) / 2;
    return [this.start[0] + dx, this.start[1] + dy];
  }
  caculateRotation() {
    if (!this.start || !this.end) return;
    const angle = -Math.atan2(this.end[0] - this.start[0], this.end[1] - this.start[1]);
    const degree = (angle * 180) / Math.PI;
    return degree < 0 ? degree + 360 : degree;
  }

  deleteLink() {
    this.$emit('deleteLink');
  }
}
</script>
