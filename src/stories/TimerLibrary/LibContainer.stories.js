/* BookToLibrary button  Story */
import TimeLineD from '../../schedule/TimeLineD';
import LibContainer from '../../common/LibContainer';
import '../../index.css';
import { singleEventTwoItems } from '../../../fixtures/timeline/timeline.fixtures';

const main = {
  title: 'LibContainer',
  component: LibContainer
  // argTypes: { handleClick: { action: 'handleClick label' } } //example of Action
};

export default main;

// export const Primary = () => (
//   <div className="">
//     <TimeLineD />
//   </div>
// );

const Template = (args) => (
  <LibContainer>
    <TimeLineD {...args} />
  </LibContainer>
);

export const SingleEvent = Template.bind({});

SingleEvent.args = {
  schedules: singleEventTwoItems
};

export const Empty = Template.bind({});

Empty.args = {
  schedules: []
};
