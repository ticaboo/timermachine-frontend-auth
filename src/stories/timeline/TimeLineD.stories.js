/* BookToLibrary button  Story */
import TimeLineD from '../../schedule/TimeLineD';
// import '../../index.css';
import {
  singleEventTwoItems,
  twoEventsBothWithTwoItems
} from '../../../fixtures/timeline/timeline.fixtures';

export default {
  title: 'TimeLine',
  component: TimeLineD
  // argTypes: { handleClick: { action: 'handleClick label' } } //example of Action
};

// export const Primary = () => (
//   <div className="">
//     <TimeLineD />
//   </div>
// );

const Template = (args) => <TimeLineD {...args} />;

export const SingleEvent = Template.bind({});

SingleEvent.args = {
  schedules: singleEventTwoItems
};

export const twoEvents = Template.bind({});

twoEvents.args = {
  schedules: twoEventsBothWithTwoItems
};

export const Empty = Template.bind({});

Empty.args = {
  schedules: []
};
