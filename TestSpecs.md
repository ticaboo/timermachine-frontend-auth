# Test Specs

psudo code / BDD specs for tests with notes.

Timer Activate with play button
Timer Activated from Schedule
onStart:
hasAlertSound + alert sound
= alert sounds once. (timer key={timer.id} data-test-start-alert-sound)
hasTTS + tts text
= tts sounds (timer key={timer.id} data-test-start-alert-tts)
hasStartPlayList + startPlaylist
= ytplayer playing

data-test-timer
-id
-start
-interval
-end
-schedule
-chaining

note:
want to test multiple concurrent/overlapping timers.
triggered in different scenarios:
manually
by schedule.
by schedule from state loaded
by schedule after editing

    want to test accuracy to within adjustable tolerance.
    e.g. 1 second per 5 minutes. 3 seconds per hour.

# CRUD operations:

# SingleTimers:

====A===>

setup (timer data):
click start timer -> timer started.
teardown
