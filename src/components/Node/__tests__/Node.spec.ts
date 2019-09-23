import { shallowMount, Wrapper } from '@vue/test-utils';
import { Node } from '@/components/Node';
import { HelloWorld } from '@/components/HelloWorld';

let wrapper: Wrapper<Node>;

describe('DAGNode', () => {
  beforeEach(() => {
    wrapper = shallowMount(Node);
  });

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders HelloWorld component inside the default slot', () => {
    wrapper = shallowMount(Node, {
      slots: { default: HelloWorld },
    });
    expect(wrapper.find(HelloWorld).isVueInstance()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
