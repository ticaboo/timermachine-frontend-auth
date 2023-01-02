/* BookToLibrary button  Story */
import Chrono from '../../chronic/Chrono';
import '../../index.css';
import { timerBasic } from '../../../fixtures/chronos/chronos.fixtures';

export default {
  title: 'Chronos',
  component: Chrono
  // argTypes: { handleClick: { action: 'handleClick label' } } //example of Action
};

// export const Primary = () => (
//   <div className="">
//     <TimeLineD />
//   </div>
// );

const Template = (args) => <Chrono {...args} />;

export const BasicTimer = Template.bind({});

BasicTimer.args = {
  timer: timerBasic,
  singleTimerFlag: true,
  duplicateTimer: () => {},
  craddTimer: () => {},
  removeTimer: () => {},
  timers: () => {},
  collapsed: false
};
