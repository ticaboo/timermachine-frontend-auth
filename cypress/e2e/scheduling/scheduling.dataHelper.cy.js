import { getNextSchedules } from '../../../src/schedule/scheduleDataHelper';
import {
  singleEventTwoItems,
  twoEventsBothWithTwoItems
} from '../../..//fixtures/timeline/timeline.fixtures';
// describe('', () => {
//     it('', () => {
//       expect(fntocall()).to.deep.equal();
//     });
// })
describe('gets schedules for timers from now forwards', () => {
  it('collates: when called with size 1 and two timers with same cron, will provide one event with both timers', () => {
    const timers = [
      {
        id: '1',
        timer: { name: 't1' },
        schedule: { cronPattern: '* * * * *' }
      },
      { id: '2', timer: { name: 't2' }, schedule: { cronPattern: '* * * * *' } }
    ];
    const size = 1;

    const res = getNextSchedules(size, timers);
    console.log(res);
    console.log(res[0].timers);

    expect(res[0].timers).to.deep.equal(singleEventTwoItems[0].timers);
  });

  it.only('collates: when called with size 2 and two timers with same cron, will provide two events, each with both timers', () => {
    const timers = [
      {
        id: '1',
        timer: { name: 't1' },
        schedule: { cronPattern: '* * * * *' }
      },
      { id: '2', timer: { name: 't2' }, schedule: { cronPattern: '* * * * *' } }
    ];
    const size = 2;

    const res = getNextSchedules(size, timers);
    console.log(res);
    //console.log(res[0].timers);

    expect(res[0].timers).to.deep.equal(twoEventsBothWithTwoItems[0].timers);
    expect(res[1].timers).to.deep.equal(twoEventsBothWithTwoItems[1].timers);
  });
});
