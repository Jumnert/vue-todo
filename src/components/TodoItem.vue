<script setup>
import { ref } from "vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["toggle", "delete", "update"]);

const isEditing = ref(false);
const editText = ref("");

const startEdit = () => {
  isEditing.value = true;
  editText.value = props.task.name;
};

const saveEdit = () => {
  if (editText.value.trim() !== "") {
    emit("update", props.task.id, editText.value.trim());
    isEditing.value = false;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
};
</script>

<template>
  <li class="flex items-center gap-3">
    <input
      type="checkbox"
      :checked="task.done"
      @change="emit('toggle', task.id)"
      class="w-5 h-5 cursor-pointer accent-slate-800"
    />

    <span
      v-if="!isEditing"
      :class="{ 'line-through text-gray-400': task.done }"
      class="flex-1 text-lg"
    >
      {{ task.name }}
    </span>

    <input
      v-else
      v-model="editText"
      @keyup.enter="saveEdit"
      @keyup.esc="cancelEdit"
      class="flex-1 bg-white border-2 border-blue-500 px-3 py-2 rounded"
      autofocus
    />

    <div v-if="!isEditing" class="flex gap-2">
      <button
        @click="startEdit"
        class="font-semibold bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Edit
      </button>
      <button
        @click="emit('delete', task.id)"
        class="font-semibold bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>

    <div v-else class="flex gap-2">
      <button
        @click="saveEdit"
        class="font-semibold bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        Save
      </button>
      <button
        @click="cancelEdit"
        class="font-semibold bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
      >
        Cancel
      </button>
    </div>
  </li>
</template>
