/* BookToLibrary button  Story */
import BookToLibrary from '../../chronic/subcomponents/buttons/BookToLibrary';
import '../../index.css';
export default {
  title: 'BookToLibrary button',
  component: BookToLibrary
  // argTypes: { handleClick: { action: 'handleClick label' } } //example of Action
};

export const Primary = () => (
  <div className="">
    <BookToLibrary />
  </div>
);

const Template = (args) => <BookToLibrary {...args} />;

export const DarkMode = Template.bind({});

DarkMode.args = {
  backgroundColor: 'blue',
  timer: { id: 'test', timer: { name: 'test' } }
};
