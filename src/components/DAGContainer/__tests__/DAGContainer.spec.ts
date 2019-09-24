import { shallowMount, Wrapper } from '@vue/test-utils';
import { DAGNode } from '@/components/DAGNode';

let wrapper: Wrapper<DAGNode>;

describe('DAGContainer', () => {
  beforeEach(() => {
    wrapper = shallowMount(DAGNode);
  });

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
