'use client';
import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { app } from '../../../firebase.config';

const useFcmToken = () => {
  const [fcmToken, setFcmToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = getMessaging(app);
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);
          if (permission === 'granted') {
            navigator.serviceWorker
              .register('/firebase-messaging-sw.js')
              .then((registration) => {
                console.log('Service Worker registered successfully');
              })
              .catch((error) => {
                console.error('Service Worker registration failed:', error);
              });
            const currentToken = await getToken(messaging, {
              vapidKey:
                'BMhHn9Tqsp9A6BVloya8r4jJhflAEHs5V0roxXpycbOJBW28fnD2RwwRFyETa0YoOPSMVzpYtWAdLDdW5aVDutM',
            }).then((currentToken) => {
              return currentToken;
            });
            if (currentToken) {
              setFcmToken(currentToken);
            } else {
              console.log(
                'No registration token available. Request permission to generate one.'
              );
            }
          }
        }
      } catch (error) {
        console.log('Error retrieving token:', error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken, notificationPermissionStatus };
};

export default useFcmToken;
