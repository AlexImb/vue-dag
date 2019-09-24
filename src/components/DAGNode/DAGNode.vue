<template>
  <div class="vd__node">
    <div class="vd__node__link vd__node__link--top"></div>
    <div class="vd__node__link vd__node__link--right"></div>
    <div class="vd__node__link vd__node__link--bottom"></div>
    <div class="vd__node__link vd__node__link--left"></div>
    <slot>
      <div class="vd__node__default-content">
        Empty node
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DAGNode extends Vue {}
</script>
