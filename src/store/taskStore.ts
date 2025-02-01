import { create } from 'zustand';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the store
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  reminder?: Date;
  notificationId?: string;
}

// Create the global store
type TaskStore = {
  tasks: Task[];
  addTask: (title: string, reminder?: Date) => Promise<void>;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  loadTasks: () => Promise<void>;
}

// Function to save tasks to AsyncStorage
const saveTasksToStorage = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to AsyncStorage:', error);
  }
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  addTask: async (title, reminder) => {
    const newTask: Task = { id: Date.now().toString(), title, completed: false, reminder };

    if (reminder) {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: { title: "Recordatorio 📌", body: `No olvides: ${title}`, sound: true },
        trigger: null,
      });
      newTask.notificationId = notificationId;
    }

    set((state) => {
      const updatedTasks = [...state.tasks, newTask];
      saveTasksToStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },

  toggleTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      saveTasksToStorage(updatedTasks);
      return { tasks: updatedTasks };
    }),

  removeTask: (id) =>
    set((state) => {
      const task = state.tasks.find((t) => t.id === id);
      if (task?.notificationId) {
        Notifications.cancelScheduledNotificationAsync(task.notificationId);
      }
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      saveTasksToStorage(updatedTasks);
      return { tasks: updatedTasks };
    }),

  loadTasks: async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        set({ tasks: JSON.parse(storedTasks) });
      }
    } catch (error) {
      console.error("Error cargando tareas:", error);
    }
  },
}));