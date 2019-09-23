import { shallowMount, Wrapper } from '@vue/test-utils';
import { HelloWorld } from '@/components/HelloWorld';

let wrapper: Wrapper<HelloWorld>;

describe('HelloWorld', () => {
  beforeEach(() => {
    wrapper = shallowMount(HelloWorld);
  });

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders props.msg when passed', () => {
    const msg = ' test!';
    wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
