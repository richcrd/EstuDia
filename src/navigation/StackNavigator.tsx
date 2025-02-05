import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import LoginScreen from '@screens/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen';
import WelcomeScreen from '@screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3674B5"
        },
        headerTintColor: "#fff"
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ 
          headerShown: false,
          headerTitle: "Bienvenido"
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ 
          headerShown: true,
          headerTitle: "Inicio Sesión"
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ 
          headerShown: true,
          headerTitle: "Registrarse"
        }}
      />
    </Stack.Navigator>
  )
}
