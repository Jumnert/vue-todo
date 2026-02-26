import { storageService } from "./storageService";

export const taskService = {
  getAll() {
    return storageService.getTasks();
  },

  add(name) {
    const tasks = this.getAll();
    const newTask = { id: Date.now(), name, done: false };
    const updated = [...tasks, newTask];
    storageService.saveTasks(updated);
    return updated;
  },

  delete(id) {
    const tasks = this.getAll();
    const updated = tasks.filter((t) => t.id !== id);
    storageService.saveTasks(updated);
    return updated;
  },

  toggle(id) {
    const tasks = this.getAll();
    const updated = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    storageService.saveTasks(updated);
    return updated;
  },

  update(id, name) {
    const tasks = this.getAll();
    const updated = tasks.map((t) => (t.id === id ? { ...t, name } : t));
    storageService.saveTasks(updated);
    return updated;
  },
};
