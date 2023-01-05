/* BookToLibrary button  Story */

import SampleUIComponent from '../../libs/shared-ui/SampleUIComponent';
import '../../index.css';
export default {
  title: 'SampleUIComponent (React Native Web)',
  component: SampleUIComponent
  // argTypes: { handleClick: { action: 'handleClick label' } } //example of Action
};

export const Primary = () => (
  <div className="">
    <SampleUIComponent>children passed in</SampleUIComponent>
  </div>
);

const Template = (args) => <SampleUIComponent {...args} />;

export const DarkMode = Template.bind({});

DarkMode.args = {
  backgroundColor: 'blue',
  timer: { id: 'test', timer: { name: 'test' } }
};
