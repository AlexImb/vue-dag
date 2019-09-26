<template>
  <main>
    <section class="section">
      <h1 class="title">Vue DAG Demo</h1>

      <div class="columns">
        <div class="column is-4"></div>
        <div class="column">
          <vue-dag v-model="graphData" @edit="onNodeEdit" @delete="onNodeDelete" />
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import VueDag from './VueDag.vue';
import { GraphData } from 'types';
import ExampleNode from './ExampleNode.vue';

Vue.component('ExampleNode', ExampleNode);

@Component({
  components: { VueDag },
})
export default class App extends Vue {
  graphData: GraphData = {
    config: {
      scale: 1,
      width: '100%',
      height: '100vh',
    },
    nodes: [
      { id: 0, x: 500 * Math.random(), y: 500 * Math.random(), component: 'ExampleNode' },
      { id: 1, x: 500 * Math.random(), y: 500 * Math.random(), content: 'Example content' },
      { id: 2, x: 500 * Math.random(), y: 500 * Math.random() },
    ],
    edges: [
      { id: 0, from: 0, to: 1, edgeColor: 'red', arrowColor: 'red' },
      { id: 1, from: 1, to: 2 },
    ],
  };

  onNodeEdit() {
    console.log('Node edit event', arguments);
  }

  onNodeDelete() {
    console.log('Node edit event', arguments);
  }
}
</script>

<style lang="scss" scoped>
main {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
</style>
