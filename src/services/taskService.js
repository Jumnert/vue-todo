import { ref } from "vue";
import { storageService } from "./storageService";

const tasks = ref(storageService.getTasks());

export const taskService = {
  getTasks() {
    return tasks;
  },

  add(name) {
    const newTask = { id: Date.now(), name, done: false };
    tasks.value = [...tasks.value, newTask];
    storageService.saveTasks(tasks.value);
  },

  delete(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
    storageService.saveTasks(tasks.value);
  },

  toggle(id) {
    tasks.value = tasks.value.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    storageService.saveTasks(tasks.value);
  },

  update(id, name) {
    tasks.value = tasks.value.map((t) => (t.id === id ? { ...t, name } : t));
    storageService.saveTasks(tasks.value);
  },
};
