<template>
  <main>
    <vue-dag v-model="graphData" />
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import VueDag from './VueDag.vue';
import { GraphData } from 'types';

@Component({
  components: { VueDag },
})
export default class App extends Vue {
  graphData: GraphData = {
    config: {
      scale: 1,
    },
    nodes: [
      { id: 0, content: 'content 0', x: 500 * Math.random(), y: 500 * Math.random() },
      { id: 1, content: 'content 1', x: 500 * Math.random(), y: 500 * Math.random() },
      { id: 2, content: 'content 2', x: 500 * Math.random(), y: 500 * Math.random() },
    ],
    edges: [{ id: 0, content: 'link 0', from: 0, to: 1 }],
  };
}
</script>

<style lang="scss" scoped>
main {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
</style>
