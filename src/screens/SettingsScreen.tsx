import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { Switch } from 'react-native-paper'
import { useTheme } from '../context/ThemeContext'
import { auth } from '../config/firebase'
import { useNavigation } from '@react-navigation/native'

const SettingsScreen = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Usuario deslogueado");
      alert("Usuario deslogueado");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error('Error al cerrar sesion', error);
    }
  }
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Modo {isDarkMode ? "Oscuro" : "Claro"}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
        <Button color="red" title="Cerrar sesión" onPress={handleLogout} />
    </View>
  )
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#fff',
  }
})