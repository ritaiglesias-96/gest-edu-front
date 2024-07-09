'use client';
import useFcmToken from './useFMCToken';
import { getMessaging, onMessage } from 'firebase/messaging';
import { app } from '../../../firebase.config';
import { useContext, useEffect } from 'react';
import {
  getNotificaciones,
  tokenFirebasePost,
} from '@/lib/data/estudiante/actions';
import { SessionCtx } from '../../../context/SessionContext';

export default function FcmTokenComp() {
  const { setNotifications } = useContext(SessionCtx);
  const messaging = getMessaging(app);
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  const fetchNotifications = async () => {
    const notifications = await getNotificaciones();
    if (notifications) setNotifications(notifications);
  };

  useEffect(() => {
    tokenFirebasePost(fcmToken);
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fcmToken]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        fetchNotifications();
        const unsubscribe = onMessage(messaging, (payload) => {
          fetchNotifications();
          console.log('Foreground push notification received:', payload);
          alert('Foreground push notification received: ' + payload);
        });
        return () => {
          unsubscribe();
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationPermissionStatus, messaging]);

  return null;
}
