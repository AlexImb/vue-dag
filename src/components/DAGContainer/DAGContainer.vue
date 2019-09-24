<template>
  <div class="vd__container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DAGContainer extends Vue {}
</script>
