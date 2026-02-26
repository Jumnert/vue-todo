<script setup>
import { ref, onMounted } from "vue";
import { taskService } from "./services/taskService";

const tasks = ref([]);
const newTask = ref("");
const editingId = ref(null);
const editText = ref("");

onMounted(() => {
  tasks.value = taskService.getAll();
});

const addTask = () => {
  if (newTask.value.trim() !== "") {
    tasks.value = taskService.add(newTask.value.trim());
    newTask.value = "";
  }
};

const deleteTask = (id) => {
  tasks.value = taskService.delete(id);
};

const startEdit = (task) => {
  editingId.value = task.id;
  editText.value = task.name;
};

const saveEdit = (task) => {
  if (editText.value.trim() !== "") {
    tasks.value = taskService.update(task.id, editText.value.trim());
    editingId.value = null;
  }
};

const cancelEdit = () => {
  editingId.value = null;
};

const toggleDone = (task) => {
  tasks.value = taskService.toggle(task.id);
};
</script>

<template>
  <header class="p-5">
    <h1 class="font-semibold text-3xl text-center">Todo-List</h1>
    <p class="font-medium text-center">Manage your tasks with local storage persistence</p>
  </header>
  <section class="flex gap-2 justify-center items-center flex-col">
    <div class="flex gap-2 justify-center items-center">
      <label for="task" class="text-lg">Enter your task</label>
      <input
        type="text"
        name="task"
        id="task"
        class="bg-gray-200 w-sm py-3 rounded-md px-3"
        v-model="newTask"
        @keyup.enter="addTask"
      />
      <button
        @click="addTask"
        id="addBtn"
        class="font-semibold bg-black text-white px-5 py-3 rounded-md hover:bg-gray-800 cursor-pointer transition ease-in"
      >
        Add Task
      </button>
    </div>
    <ul id="taskList" class="flex flex-col gap-3 mt-6">
      <li v-for="task in tasks" :key="task.id" class="flex items-center gap-3">
        <input
          type="checkbox"
          :checked="task.done"
          @change="toggleDone(task)"
          class="w-5 h-5 cursor-pointer cursor-pointer accent-slate-800"
        />

        <span
          v-if="editingId !== task.id"
          :class="{ 'line-through text-gray-400': task.done }"
          class="flex-1 text-lg"
        >
          {{ task.name }}
        </span>

        <input
          v-else
          v-model="editText"
          @keyup.enter="saveEdit(task)"
          @keyup.esc="cancelEdit"
          class="flex-1 bg-white border-2 border-blue-500 px-3 py-2 rounded"
          autofocus
        />

        <div v-if="editingId !== task.id" class="flex gap-2">
          <button
            @click="startEdit(task)"
            class="font-semibold bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
          >
            Edit
          </button>
          <button
            @click="deleteTask(task.id)"
            class="font-semibold bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
          >
            Delete
          </button>
        </div>

        <div v-else class="flex gap-2">
          <button
            @click="saveEdit(task)"
            class="font-semibold bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition cursor-pointer"
          >
            Save
          </button>
          <button
            @click="cancelEdit"
            class="font-semibold bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </li>
    </ul>
    <p v-if="tasks.length === 0" class="text-gray-400 text-lg mt-6">No tasks yet. Add one above!</p>
  </section>
</template>
