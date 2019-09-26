<template>
  <h1>ExampleNode - Custom Component</h1>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ExampleNode extends Vue {}
</script>
