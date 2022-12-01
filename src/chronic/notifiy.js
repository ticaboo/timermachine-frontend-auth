import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

//todo: think about not candywrapping, call direct.
const Msg = ({ closeToast, toastProps, children, autoClose }) => (
  <div>{children}</div>
);

export const notifyInPage = (message, title, children) => {
  if (children) {
    toast(<Msg children={children} />, { autoClose: 15000 });
  } else if (message) {
    toast(message);
  }
};

export const notifyBrowser = (message, title, clickhandler) => {
  title = title || 'TimeRmachine';

  if (!('Notification' in window)) {
    // Check if the browser supports notifications
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/favicon-32x32.png',
      body: message
    });
    if (clickhandler) {
      notification.onclick = () => clickhandler();
    }
  } else if (Notification.permission !== 'denied') {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        const notification = new Notification(title, {
          icon: '/favicon-32x32.png',
          body: message
        });
        if (clickhandler) {
          notification.onclick = () => clickhandler();
        }
      }
    });
  } else if (Notification.permission === 'denied') {
    notifyInPage(
      'notifications are turned off, either in browser or system settings. Click for Dont show this message again?',
      'TimeRmachine notification'
    );
  }
  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
  // H: or use toast in page notification.
  // or use browser notification, but fallback to in page notification.
};

export const XnotifyInPage = (message, title) => {
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
