# Chronos

This hydra head is build from scratch, all about testing state.
single timer, no persistence, no form (to start with)

> linted, organised subcomponents of timer to common. [√]

now-start Fresh write: v7-chronos:

> YT Player withing with jotai. [√]

> shows timer passed in in view.[√]

> play button - in view: starts YTplayer.[√]

> style view [*]

> change vid url

> add form. - check jotai still works.

> consider form wrapping, how used.

## Parked:

> Investigate:
> TimerPlayer.js:
> this is higly suspect and needs fixing with rewrite:
> // was double starting - causing two intervals -odd effect - 2 seconds,two calls in one second.
> useEffect(() => {
> if (autoPlay) handleStart();
> }, []);

## progress notes:

write without form - get jotai, video playing.[√]

Add form - very basicly: change url, style buttons, play, pause (stop) [√]

form: edit, submit. [ ]
isPlaying : toggles edit/play views.
move vid selection to edit:
edit: changes timer video. save button.
play: switches view, changes atom, starts starts video.

> timer url/id sent to player.
> next? saving? timewatch, autoplay - what exactly their roles? ?
> need all the states and button actions right - for all timer types and timer combinations. eg
> player:edit button -> halts any alarms, goes back to form.

> COOL! 8:45 - state in much better state!
> reinstate form.
> implement single timer.
> fix tabhandle replacement with videoActived state.
> fix daft playlist/url - refactor out variable - just flow the data/check in right place at right time.

duplicate timer button : acts as save from single :)

=================================================
FUCK - this is going great!!!

now, get rid of old timer -> xtimer. only dep i think is Timer.js for ListChronos.
Mission now:

> multiple and single timers both working: V8-multiSingular branch.
> localstorage : seems need to pass props in: https://reactjs.org/docs/hooks-rules.html

- Timer.js vs Chronos.js :- one, with single vs multi timer differntiation:-
  single: does not save on play.

- single / multi : configure from host props. Can have both/any number on same page. - note: watch what happens with
  jotai though - might trigger between apps! (if topic on window -this could be very useful / very annoying!)

- appearance may differ: color at least ie: blue to indicate example, unsaved state? i like that.
  ytplayer : match card size. add drag handles.

Checkpoint:

can add sample timers. configure in data/timers, pass into tag on page.

Then Playlist vs Link clean up.

Single Timer / pranking:
app level: qt ? to single.
get the qt url - how? (without interfering with rest of app): copy single path button? open in new tab button(ala pop out - i like this option, gives other multiple timer/bookmark management options.)
prank stealth mode: on play: black browser tab. on focus - close self! (suppose they can get from history - but hah!)

> > > REFOCUS:

Bugs fixed: so can release.
Features: Curation single timers.
Enhancements: single/unsaved style (blue for now)
