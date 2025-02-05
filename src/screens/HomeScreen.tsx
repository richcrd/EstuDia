import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React from 'react';
import { useAuthState } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@config/firebase';

const HomeScreen = () => {
  const { loggedInUser, setLoggedInUser, logout } = useAuthState();
  const signOutUser = () => {
    signOut(auth)
    .then((res) => {
      console.log("User logged out",res);
      setLoggedInUser(null);
    })
    .catch((err) => {
      console.log(err);
      Alert.alert("Alerta: ", err);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Te damos la bienvenida a EstuDia</Text>
      <Text>Usuario autenticado: {loggedInUser?.email}</Text>
      <Button color="red" title="Cerrar sesión" onPress={signOutUser} />
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})