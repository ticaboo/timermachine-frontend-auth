import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

/*
    apparently only works with https
    deply and test 
*/
export const notifyBrowser = (message) => {
  if (!('Notification' in window)) {
    // Check if the browser supports notifications
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    new Notification(message);
    // …
  } else if (Notification.permission !== 'denied') {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        new Notification(message);
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
  // H: or use toast in page notification.
  // or use browser notification, but fallback to in page notification.
};

export const notifyInPage = (message, title) => {
  console.log('notifyInPage', message);
  Store.addNotification({
    title: title || 'Info',
    message,
    type: 'success',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 12000,
      onScreen: false
    }
  });
};
