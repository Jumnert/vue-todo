export const storageService = {
  getTasks() {
    const data = localStorage.getItem("task");
    return data ? JSON.parse(data) : [];
  },
  saveTasks(tasks) {
    localStorage.setItem("task", JSON.stringify(tasks));
  },
};
