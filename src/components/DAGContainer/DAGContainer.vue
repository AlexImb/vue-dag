<template>
  <div class="vd__container">
    <svg width="100%" :height="height">
      <slot name="edges" />
    </svg>

    <slot name="nodes"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DAGContainer extends Vue {
  @Prop({ default: '500px' }) height!: string;
}
</script>
