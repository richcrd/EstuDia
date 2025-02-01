import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTaskStore } from '../store/taskStore';

type TaskItemProps = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TaskItem({ id, title, completed }: TaskItemProps) {
  const { toggleTask, removeTask } = useTaskStore();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleTask(id)}>
        <Ionicons
          name={completed ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={completed ? "green" : "gray"}
        />
      </TouchableOpacity>
      <Text style={[styles.text, completed && styles.completed]}>{title}</Text>
      <TouchableOpacity onPress={() => removeTask(id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginVertical: 4,
  },
  text: { fontSize: 16 },
  completed: { textDecorationLine: "line-through", color: "gray" },
})