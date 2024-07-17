<template>
  <div class="task-form-container">
    Add a Task
    <form class="task-form" @submit.prevent="add(taskName)">
      <input class="task-input" type="text" v-model="taskName" placeholder="Enter task name" required />
      <button class="submit-button" type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskName: '', // This will hold the task name
    };
  },

  methods: {

    async add(name) {
      if (!name) return; // Prevent adding empty tasks

      const token = localStorage.getItem("user");

      try {
        const response = await fetch('https://todo-backend-nest.onrender.com/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
          credentials: 'include', // Equivalent to Axios' withCredentials: true
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        console.log(response);
        console.log('Task added successfully');

        // Clear the input field
        this.taskName = '';
        this.$emit('taskUpdated');


      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }

  },
};

</script>

<style scoped>
.task-form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>