/*
serves as a dictionary of data-test tags.
common to source and cypress tests
dataTestTagIds: dictionary of data-test- tags
exports 
    dataTest : convertion to data-test-tag
    tagids: conversion to [data-test-tag] for cypress selection

At:
 dynamically create tagids and dataTest.
 buuut as dynamic dont get intellisense.
 solutions:
    generate json & reference that? + dynamic and intellisense. + better sharing & wall - test code, app code. - extra step.
    pre every start, test, deploy (every frikkin one)-MUST Generate
    symbols?
*/

/*
useage: <div {dataTest.addNewTimerButton} > resolves to <div data-test-addnewtimerbutton
(need data-test-addnewtimerbutton='') to get attr without value templated in. retch.
*/

/*
  TESTS TO BE DONE:
  on edit, reload, changes are saved and retrieved. !
  single timers
  concurrent timers
  cron timeres (with clock timer travel!)
  do above with form edits (checks state changing working right)
  form editing.
  default timer (when db empty)
  cucmber BDD for new functionality.

*/

const dataTestTagIds = {
  //buttons
  addnewtimerbutton: 'addnewtimerbutton',
  removebutton: 'removebutton',
  badgeCount: 'badgecount',
  bookMarkButton: 'bookmarkbutton',
  bookToLibraryButton: 'booktolibrarybutton',
  copyToLibraryButton: 'copytolibrarybutton',
  duplicateTimerButton: 'duplicatetimerbutton',
  editButton: 'editbutton',
  infoButton: 'infobutton',
  pauseButton: 'pausebutton',
  playButton: 'playbutton',
  replayButton: 'replaybutton',

  //actioned states
  playervisible: 'playervisible',
  startAudioIsPlaying: 'startaudioisplaying',
  endAudioIsPlaying: 'endaudioisplaying',
  isAnnouncing: 'isannouncing',
  //clocks
  counterclock: 'counterclock',
  counterclockSeconds: 'counterclockseconds',
  counterclockMinutes: 'counterclockminutes',
  counterclockHours: 'counterclockhours',
  counteroverclock: 'counteroverclock',
  counterclockoverclockSeconds: 'counterclockoverclockseconds',
  clock: 'clock',
  //simple textinput
  'timer.name.inputtext': 'timer-input-name',

  //HMS component:
  'timer.inputh': 'timer-input-h',
  'timer.inputm': 'timer-input-m',
  'timer.inputs': 'timer-input-s',
  'interval.inputh': 'interval-input-h',
  'interval.inputm': 'interval-input-m',
  'interval.inputs': 'interval-input-s',

  //CheckedText components:
  'timer.startAnnounce.checkedinputtext': 'startannounce-checked-input-text',
  'timer.startAnnounce.checkbox': 'startannounce-checked-input-checkbox',

  'timer.announce.checkedinputtext': 'announce-checked-input-text',
  'timer.announce.checkbox': 'announce-checked-input-checkbox',

  'timer.startPlayUrl.checkbox': 'startplayurl-checked-input-checkbox',
  'timer.startPlayUrl.checkedinputtext': 'startplayurl-checked-input-text',

  'timer.endPlayUrl.checkbox': 'endplayurl-checked-input-checkbox',
  'timer.endPlayUrl.checkedinputtext': 'endplayurl-checked-input-text',

  'interval.announce.checkbox': 'interval-announce-checked-input-checkbox',
  'interval.announce.checkedinputtext': 'interval-announce-checked-input-text',

  //CheckBox component(s):
  'timer.hasEndNotification.checkbox': 'hasendnotification-checkbox',

  //CheckedSelect components:

  //onStart
  'timer.hasStartAlert.checkbox': 'timer-hasstartalert-checked-input-checkbox',
  'timer.startAlert.select': 'timer-startalert-checked-input-select',

  'timer.hasStartPlaylist.checkbox':
    'timer-hasstartplaylist-checked-input-checkbox',
  'timer.startPlaylist.select': 'timer-startplaylist-checked-input-select',

  //onEnd
  'timer.hasAlert.checkbox': 'timer-hasalert-checked-input-checkbox',
  'timer.alert.select': 'timer-alert-checked-input-select',

  'timer.hasEndPlaylist.checkbox':
    'timer-hasendplaylist-checked-input-checkbox',
  'timer.endPlaylist.select': 'timer-endplaylist-checked-input-select',

  //interval
  'interval.hasStartAlert.checkbox':
    'interval-hasstartalert-checked-input-checkbox',
  'interval.alert.select': 'interval-alert-checked-input-select',

  //Chaining component

  'chaining.onend.chainEnabled.checkbox':
    'chaining-chainenabled-checked-input-checkbox',
  'chaining.onend.chainId.select': 'chaining-chainid-checked-input-select',

  //ToLibButton
  toLibButton: 'tolibbutton'

  //TODO:

  //singleTimer
  //guide example timers (reference /e2e)
  //alert sounding
  //announce announcing
  //media playing
  //tabs
  //cron
  //yt player
};
const dtag = (id) => {
  return `data-test-${id}`;
};
const dselect = (id) => {
  return `[data-test-${id}]`;
};

const dataTest = {};
//var key; //dirty lazy - but how bad? pretty fucking awful!!!
//for (let [key, value] of Object.entries(obj)) {
//for (key in dataTestTagIds) {
for (let [, value] of Object.entries(dataTestTagIds)) {
  dataTest[value] = { [dtag(value)]: '' };
}

/* cypress selection tags */
const tagids = {};
for (let [, value] of Object.entries(dataTestTagIds)) {
  tagids[value] = dselect(value);
}

//console.log('DATATEST', dataTest, 'tagids', tagids);

/*
 To conditionally add a data-test attr with no assignment 
 eg: 
 data-test-playervisible
 not
  data-test-playervisible="true"

  allows assingment of x.y : z
 {...dataTestAttr(dataTestTagIds.playervisible, playerVisible)}
 and encapsulates 
 {...(playerVisible ? { 'data-test-playervisible': '' } : '')}
 */
const dataTestAttr = (ident) => {
  return dataTest[ident];
};

/*
example usage:
import { dataTestAttr, dataTestTagIds } from '../../common/tags';
 vanilla:
 {...dataTestAttr(dataTestTagIds.badgeCount)}
 conditional:
 {...(playerVisible && dataTestAttr(dataTestTagIds.playervisible))}
*/

export { dataTest, dataTestTagIds, tagids, dataTestAttr };
