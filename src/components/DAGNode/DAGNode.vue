<template>
  <div class="vd__node" :style="nodePositionAndScale" @mousedown="$emit('selectNode', $event)">
    <div
      v-for="position in ['top', 'right', 'left', 'bottom']"
      :key="`link_${position}`"
      class="vd__node__link"
      :class="`vd__node__link--${position}`"
      @click="$emit('linkClick', position, id)"
    ></div>
    <slot>
      <div class="vd__node__default-content">Empty node</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DAGNode extends Vue {
  @Prop({ default: 1 }) readonly scale!: number;
  @Prop() readonly id!: number;
  @Prop() readonly x!: number;
  @Prop() readonly y!: number;

  get nodePositionAndScale() {
    return {
      top: this.y * this.scale + 'px',
      left: this.x * this.scale + 'px',
      transform: `scale(${this.scale})`,
    };
  }
}
</script>
