<script setup>
import TodoItem from "./TodoItem.vue";

defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["toggle", "delete", "update"]);
</script>

<template>
  <div>
    <ul v-if="tasks.length > 0" class="flex flex-col gap-3 mt-6">
      <TodoItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="(id) => emit('toggle', id)"
        @delete="(id) => emit('delete', id)"
        @update="(id, name) => emit('update', id, name)"
      />
    </ul>
    <p v-else class="text-gray-400 text-lg mt-6 text-center">No tasks yet. Add one above!</p>
  </div>
</template>
