<template>
  <div id="app">
    <node>
      <h1>Node content</h1>
    </node>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Node } from '@/components/Node';

@Component({
  components: {
    Node,
  },
})
export default class App extends Vue {}
</script>
