import { shallowMount, Wrapper } from '@vue/test-utils';
import { DAGEdge } from '@/components/DAGEdge';

let wrapper: Wrapper<DAGEdge>;

describe('DAGEdge', () => {
  beforeEach(() => {
    wrapper = shallowMount(DAGEdge);
  });

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
