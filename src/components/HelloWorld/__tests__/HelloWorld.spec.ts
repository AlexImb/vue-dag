import { shallowMount } from '@vue/test-utils';
import { HelloWorld } from '@/components/HelloWorld';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = ' test!';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
