import { shallowMount } from '@vue/test-utils';
import { Node } from '@/components/Node';
import { HelloWorld } from '@/components/HelloWorld';

describe('Node.vue', () => {
  it('Renders HelloWorld.vue component inside the slot', () => {
    const node = shallowMount(Node, {
      slots: { default: HelloWorld },
    });
    expect(node.find(HelloWorld).isVueInstance()).toBe(true);
  });
});
