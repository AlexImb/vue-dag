<template>
  <div class="example-node">
    <h1>Example Custom Component</h1>
    <span @click="$emit('edit')">✏️ Edit</span>
    <span class="pull-right" @click="$emit('delete')">❌ Delete</span>
  </div>
</template>

<style lang="scss" scoped>
.example-node {
  padding: 5px;
}
.pull-right {
  float: right;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ExampleNode extends Vue {}
</script>
