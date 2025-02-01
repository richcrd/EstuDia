import { create } from 'zustand';
import * as Notifications from 'expo-notifications';

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
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addTask: async (title, reminder) => {
    const newTask: Task = {
      id: Date.now().toString(), 
      title, 
      completed: false, 
      reminder
    };

    if (reminder) {
      const triggerTime = (reminder.getTime() - Date.now()) / 1000; // in seconds
      if (triggerTime > 0) {
        const notificationId = await Notifications.scheduleNotificationAsync({
          content: { 
            title: 'Recordatorio 📌', 
            body: `No olvides: ${title}`,
            sound: true,
          },
          trigger: null
        });
        newTask.notificationId = notificationId;
      }
    }

    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

    removeTask: (id) =>
      set((state) => {
        const task = state.tasks.find((t) => t.id === id);
        if (task?.notificationId) {
          Notifications.cancelScheduledNotificationAsync(task.notificationId);
        }
        return { tasks: state.tasks.filter((task) => task.id !== id) };
      }),
}));