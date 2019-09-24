import { shallowMount, Wrapper } from '@vue/test-utils';
import App from '@/App.vue';

let wrapper: Wrapper<App>;

describe('App', () => {
  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
