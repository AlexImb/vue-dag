<template>
  <div class="vd__container">
    <svg width="100%" height="100%">
      <slot name="edges" />
    </svg>

    <slot name="nodes"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DAGContainer extends Vue {}
</script>
