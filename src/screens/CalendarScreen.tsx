import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calendario de Clases</Text>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})