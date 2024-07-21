<template>
  <div class="task-form-container">
    <form class="task-form" @submit.prevent="add(taskName)">
      <label for="task" class="task-label">Add a task</label>
      <input class="task-input" type="text" v-model="taskName" placeholder="Enter task name" id="task" required />
      <button class="submit-button" type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
import { API_URL } from '@/constants';

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
        const response = await fetch(API_URL+'/task', {
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  
}


.task-form {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #e4e2e2;
  padding: 20px;
  border-radius: 8px;
  box-shadow: -14px 15px 4px rgb(0 0 0 / 36%);
}

.task-label {
  font-size: larger;
  color: #333;
  margin-right: 10px;
  font-weight: bold;

}

.task-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: large;
}

.submit-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: large;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>