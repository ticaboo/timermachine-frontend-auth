# Timer Machine React app

[![Netlify Status](https://api.netlify.com/api/v1/badges/d9b32da4-b311-4c63-802a-17ea51e41bfc/deploy-status)](https://app.netlify.com/sites/timermachine-frontend-auth/deploys)

Kaizen:

chaining:
onStart:
timeTrigger: every 30 seconds of day
timeTriggerActive: true/false

scheduler: runs every minute, on the minute.

when active
excludes:
timer can still be triggered by atEnd as well.
includes:
Time increase / decrease :
per completed run. -prefer this. (if skip a day or two, dont get punished with longer time -offputting.)
per day.

Note: this work dovetails into calendar integration, api integration (iftt, openhab etc.)

UI:
an alarm clock icon should be shown on time triggered timers. tool tip should show the time.
as should a chained timer: chain link icon. tool tip should say the timer

Implementation:
scheduler. UseScedule (timerWatch getting a bit Godesque)
timerData.
Kaizen guide.
Increase/decrease fields.
bonus:
Validation.
Logging. - sticky motivation.

UseScedule - should have one for whole app.
Event needs to be broadcast to relevant timers.
How to deal with singleTimer page? or other pages (that might not show a timer at all by default?)
So:
UsSchedule: Near/with Storage.
notification: iota. to chronos.

---> learning:
selfadjustingtimers,
webworkers - accurcy.
remember - just want it to within 300ms +/- say on the minute.
(could say:
50 seconds away, try in 25.
25 seconds away, try in 12.5
12.5 7
7 4
4 2
1 .5
.25 close enough - got it.
)

need:
webworker
way to make webworker work with react@@!
-comlink, requires eject and most unfriendly api.
self adaptive timer (90% there i think)
bonus: fix speech lag.

WEBWORKER NOTES:

---> learning:
selfadjustingtimers,
webworkers - accurcy.
remember - just want it to within 300ms +/- say on the minute.
(could say:
50 seconds away, try in 25.
25 seconds away, try in 12.5
12.5 7
7 4
4 2
1 .5
.25 close enough - got it.
)

need:
webworker
way to make webworker work with react@@!
self adaptive timer (90% there i think)
bonus: fix speech lag.

following along this (bit its fucking ts:)
https://blog.logrocket.com/integrating-web-workers-in-a-react-app-with-comlink/

arghhhh - post eject -
Parsing error: [BABEL] /Users/henry/dev/React/TIMERMACHINE/timer-app/config/env.js: Using `babel-preset-react-app` requires that you specify `NODE_ENV` or `BABEL_ENV` environment variables. Valid values are "development", "test", and "production". Instead, received: undefined. (While processing: "/Users/henry/dev/React/TIMERMACHINE/timer-app/node_modules/babel-preset-react-app/index.js")

This is turning out to be hard - just to get accurate timer!

PARKED
