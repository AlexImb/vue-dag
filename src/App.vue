<template>
  <main>
    <section class="section">
      <h1 class="title">Vue DAG Demo</h1>

      <div class="columns">
        <div class="column">
          <vue-dag v-model="graphData" @edit="onNodeEdit" @delete="onNodeDelete" />
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueDag from '@/VueDag.vue';
import { GraphData } from 'types';
import ExampleNode from '@/ExampleNode.vue';

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
      {
        id: 0,
        x: 500 * Math.random(),
        y: 500 * Math.random(),
        component: ExampleNode,
        props: { exampleProp: '✨' },
      },
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

  onNodeDelete(id: number) {
    console.log('Node delete event', id);
    this.graphData.edges = this.graphData.edges.filter((e) => e.from !== id && e.to !== id);
    const index = this.graphData.nodes.findIndex((node) => node.id === id);
    if (index > -1) this.graphData.nodes.splice(index, 1);
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
