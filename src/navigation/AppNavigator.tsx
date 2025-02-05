import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import TabsNavigator from './TabsNavigator';
import { useAuthState } from '@context/AuthContext';

const AppNavigator = () => {
  const { loggedInUser } = useAuthState();
  return (
    <NavigationContainer>
      { loggedInUser ? <TabsNavigator /> : <StackNavigator /> }
    </NavigationContainer>
  );
};

export default AppNavigator;
