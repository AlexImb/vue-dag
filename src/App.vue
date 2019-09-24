<template>
  <vue-dag v-model="graphData" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import VueDag from './VueDag.vue';

@Component({
  components: { VueDag },
})
export default class App extends Vue {
  graphData: Object = {
    nodes: [
      { id: 0, content: 'content 0' },
      { id: 1, content: 'content 1' },
      { id: 2, content: 'content 2' },
    ],
    edges: [],
  };
}
</script>
