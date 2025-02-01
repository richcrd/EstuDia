import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Platform } from 'react-native'
import React, { useState } from 'react'
import { useTaskStore } from '../store/taskStore';
import TaskItem from '../components/TaskItem';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TasksScreen() {
  const { tasks, addTask } = useTaskStore();
  const [taskTitle, setTaskTitle] = useState('');
  const [reminder, setReminder] = useState<Date | undefined>();
  const [showPicker, setShowPicker] = useState(false);

  const handleAddTask = () => {
    if (taskTitle.trim() !== "") {
      addTask(taskTitle, reminder);
      setTaskTitle('');
      setReminder(undefined);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una nueva tarea..."
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>{reminder ? reminder.toLocaleTimeString() : "⏰"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          value={reminder || new Date()}
          mode="time"
          is24Hour={true}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setReminder(selectedDate);
          }}
        />
      )}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem {...item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay tareas aún...</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '##007bff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addText: { 
    color: "#000", 
    fontSize: 20, 
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  dateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
})