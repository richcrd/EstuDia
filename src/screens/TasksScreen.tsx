import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTaskStore } from '../store/taskStore';
import TaskItem from '../components/TaskItem';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from "../context/ThemeContext";

export default function TasksScreen() {
  const { tasks, addTask, loadTasks } = useTaskStore();
  const [taskTitle, setTaskTitle] = useState('');
  const [reminder, setReminder] = useState<Date | undefined>();
  const [showPicker, setShowPicker] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = () => {
    if (taskTitle.trim() !== "") {
      addTask(taskTitle, reminder);
      setTaskTitle('');
      setReminder(undefined);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Lista de Tareas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholderTextColor={isDarkMode ? "#ccc" : "#999"}
          placeholder="Escribe una nueva tarea..."
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>{reminder ? reminder.toLocaleTimeString() : "⏰"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={[styles.addText, isDarkMode && styles.darkAddText]}>+</Text>
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          textColor={isDarkMode ? "#fff" : "#000"}
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
        ListEmptyComponent={<Text style={[styles.emptyText, isDarkMode && styles.darkText]}>No hay tareas aún.</Text>}
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
  darkContainer: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  darkText: {
    color: '#fff',
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
  darkInput: {
    color: '#fff',
    backgroundColor: '#333',
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
  darkAddText: {
    color: '#fff',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  dateButton: {
    backgroundColor: '#B2A5FF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
})