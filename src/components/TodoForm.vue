<script setup>
import { ref } from "vue";

const emit = defineEmits(["add-task"]);
const newTask = ref("");

const handleAdd = () => {
  if (newTask.value.trim() !== "") {
    emit("add-task", newTask.value.trim());
    newTask.value = "";
  }
};
</script>

<template>
  <div class="flex gap-2 justify-center items-center">
    <label for="task" class="text-lg">Enter your task</label>
    <input
      type="text"
      id="task"
      class="bg-gray-200 py-3 px-3 rounded-md"
      v-model="newTask"
      @keyup.enter="handleAdd"
      placeholder="What needs to be done?"
    />
    <button
      @click="handleAdd"
      class="font-semibold bg-black text-white px-5 py-3 rounded-md hover:bg-gray-800 transition"
    >
      Add Task
    </button>
  </div>
</template>
