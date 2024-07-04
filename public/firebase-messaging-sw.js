importScripts(
  'https://www.gstatic.com/firebasejs/10.12.3/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging-compat.js'
);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDwjPXx0-6NJCbjanQASVpAIhA7Qoi3Cnk',
  authDomain: 'gestedu2024.firebaseapp.com',
  projectId: 'gestedu2024',
  storageBucket: 'gestedu2024.appspot.com',
  messagingSenderId: '12698541745',
  appId: '1:12698541745:web:52618078395a22f59acc90',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received foreground message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
