export const basicTimer = {
  id: 'id1',
  direction: -1, //deprecate?
  schedule: {
    scheduleAnnounce: '',
    month: '',
    dayOfMonth: '',
    dayOfWeek: '',
    h: '',
    m: '',
    s: '',
    hasDurationAdjustment: false,
    durationAdjustment: '',
    hasCronPattern: false,
    cronPattern: '* * * * *'
  },

  timer: {
    name: 'basic timer fixture',
    h: '',
    m: '',
    s: '',
    hasAlert: false,
    alert: '',
    hasAnnounce: false,
    announce: '',
    hasStartAlert: false,
    startAlert: '',
    hasStartAnnounce: false,
    startAnnounce: '',

    hasEndPlaylist: false,
    endPlaylist: '',

    hasStartPlaylist: false,
    startPlaylist: '',

    hasPlayDuringUrl: false,
    playDuringUrl: '',
    hasEndPlayUrl: false,
    endPlayUrl: '',
    hasEndNotification: true
  },

  interval: {
    name: 'interval',
    h: '',
    m: '',
    s: '',
    hasAlert: false,
    alert: 1,
    hasAnnounce: false,
    announce: ''
  },
  chaining: {
    onend: {
      chainEnabled: false,
      chainId: ''
    }
  }
};
