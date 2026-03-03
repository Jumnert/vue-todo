<script setup>
import TodoHeader from "./components/TodoHeader.vue";
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
import { taskService } from "./services/taskService";

const tasks = taskService.getTasks();

const addTask = (name) => {
  taskService.add(name);
};

const toggleTask = (id) => {
  taskService.toggle(id);
};

const deleteTask = (id) => {
  taskService.delete(id);
};

const updateTask = (id, name) => {
  taskService.update(id, name);
};
</script>

<template>
  <TodoHeader />
  <section class="flex gap-2 justify-center items-center flex-col">
    <TodoForm @add-task="addTask" />
    <TodoList :tasks="tasks" @toggle="toggleTask" @delete="deleteTask" @update="updateTask" />
  </section>
</template>
