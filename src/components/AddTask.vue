<template>
  <div class="task-form-container">
    Add a Task
    <form class="task-form" @submit.prevent="add(taskName)">
      <input class="tast-input" type="text" v-model="taskName" placeholder="Enter task name" required />
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
        const response = await fetch('http://localhost:3333/task', {
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
  display: inline-block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

}

.task-form {

  gap: 10px;
}

.task-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.task-input:focus {
  outline: none;
  border-color: #007BFF;
}

.submit-button {
  margin-left: 10px;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>