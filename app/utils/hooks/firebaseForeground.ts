'use client';
import useFcmToken from './useFMCToken';
import { getMessaging, onMessage } from 'firebase/messaging';
import { app } from '../../../firebase.config';
import { useEffect } from 'react';
import { tokenFirebasePost } from '@/lib/data/estudiante/actions';

export default function FcmTokenComp() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    tokenFirebasePost(fcmToken);
  }, [fcmToken]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(app);
        const unsubscribe = onMessage(messaging, (payload) =>
          console.log('Foreground push notification received:', payload)
        );
        return () => {
          unsubscribe();
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null;
}
