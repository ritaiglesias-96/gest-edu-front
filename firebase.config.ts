import { initializeApp } from 'firebase/app';
import { Messaging, getMessaging } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDwjPXx0-6NJCbjanQASVpAIhA7Qoi3Cnk',
  authDomain: 'gestedu2024.firebaseapp.com',
  projectId: 'gestedu2024',
  storageBucket: 'gestedu2024.appspot.com',
  messagingSenderId: '12698541745',
  appId: '1:12698541745:web:52618078395a22f59acc90',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fbStorage = getStorage(app);
const messaging: Messaging = getMessaging(app);

export { app, fbStorage, messaging };
