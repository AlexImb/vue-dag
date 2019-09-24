<template>
  <dag-container>
    {{ value }}
    <dag-node />
  </dag-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { DAGContainer } from '@/components/DAGContainer';
import { DAGNode } from '@/components/DAGNode';

@Component({
  components: {
    'dag-container': DAGContainer,
    'dag-node': DAGNode,
  },
})
export default class VueDAG extends Vue {
  @Prop([Object]) readonly value: [Object] | undefined;

  emitModel() {
    this.$emit('input', { ...this.value, lastEdit: new Date().getTime() });
  }
}
</script>

<style lang="scss">
@import './scss/vue-dag.scss';
</style>
