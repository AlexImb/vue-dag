import { shallowMount, Wrapper } from '@vue/test-utils';
import { DAGNode } from '@/components/DAGNode';
import { HelloWorld } from '@/components/HelloWorld';

let wrapper: Wrapper<DAGNode>;

describe('DAGNode', () => {
  beforeEach(() => {
    wrapper = shallowMount(DAGNode);
  });

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders HelloWorld component inside the default slot', () => {
    wrapper = shallowMount(DAGNode, {
      slots: { default: HelloWorld },
    });
    expect(wrapper.find(HelloWorld).isVueInstance()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
