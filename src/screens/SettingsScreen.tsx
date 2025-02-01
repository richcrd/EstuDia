import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Switch } from 'react-native-paper'
import { useTheme } from '../context/ThemeContext'

const CalendarScreen = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Modo {isDarkMode ? "Oscuro" : "Claro"}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>
  )
}

export default CalendarScreen;

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