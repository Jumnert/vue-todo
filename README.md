# Vue Todo Application

A task management app demonstrating three-layer architecture and clean code principles.

## Architecture

I separated the application into three distinct layers:

**Presentation Layer (App.vue)**
Handles the UI and user interactions. When a user clicks "Add Task", the component calls the service but doesn't know how tasks are stored or validated.

**Business Layer (taskService.js)**
Contains all the logic for managing tasks - adding, deleting, updating. This layer doesn't care about Vue or localStorage, it just handles the rules.

**Data Layer (storageService.js)**
Deals with localStorage. Could swap this for an API later without touching the other layers.

## Why This Matters

Each part has one job. If I want to change how data is stored, I only touch storageService.js. If I want to change the UI, I only touch App.vue. They don't interfere with each other.

## Key Decisions

**Immutability**
I never modify the original task array. Every operation creates a new array:

```javascript
const updated = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
```

This prevents bugs where data gets changed unexpectedly.

**Data Reactivity**
Vue's ref() means when I update tasks.value, the UI updates automatically. No need to manually update the DOM like in vanilla JavaScript.

**DRY Principle**
Instead of writing localStorage logic in multiple places, I created one storageService that handles all saves and loads.

**Encapsulation**
The tasks array isn't global. It's managed by taskService, which provides controlled access through methods like getAll() and add().

## Tech Stack

- Vue 3 with Composition API
- Vite
- Tailwind CSS
- LocalStorage

## What Could Be Better

With more time I'd add:

- Tests for the service layer
- Task filtering
- Better validation
- Accessibility improvements

The focus here was on demonstrating clean architecture rather than feature completeness.
