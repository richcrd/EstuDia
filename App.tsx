import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabsNavigator from './src/navigation/TabsNavigator';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      alert("Debes habilitar las notificaciones para recibir recordatorios de tareas.");
      return;
    }
  }
}

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <TabsNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}
