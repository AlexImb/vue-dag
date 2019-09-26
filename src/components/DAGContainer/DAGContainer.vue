<template>
  <div class="vd__container">
    <svg :width="width" :height="height">
      <slot name="edges" />
    </svg>

    <slot name="nodes"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DAGContainer extends Vue {
  @Prop({ default: '100%' }) width!: string;
  @Prop({ default: '100%' }) height!: string;
}
</script>
