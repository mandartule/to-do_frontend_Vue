<template>
  <div>
    <h1>TO DO LIST</h1>

    <!-- add task component -->
    <AddTask v-if="isAuthenticated" @taskUpdated="fetchTasks" />

    <div id="tasks" v-if="isAuthenticated">
      <h4>Task Yet to be completed</h4>
      <ShowTask v-if="notCompletedTasks.length" :tasks="notCompletedTasks" @taskUpdated="fetchTasks" />

      <h4>Completed Tasks</h4>
      <ShowTask v-if="completedTasks.length" :tasks="completedTasks" @taskUpdated="fetchTasks" />
    </div>

    <div v-else>
      You are not logged In Please log in to view your tasks
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddTask from '../components/AddTask.vue';
import VueJwtDecode from "vue-jwt-decode";
import ShowTask from '@/components/ShowTask.vue';


export default {
  name: 'TaskTracker',

  data() {
    return {
      completedTasks: [],
      notCompletedTasks: []
    };
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },

  methods: {
    ...mapActions('auth', ['login']),

    async fetchTasks() {
      let token = localStorage.getItem("user");
      try {
        const response = await fetch('https://todo-backend-nest.onrender.com/task', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        let tasks = await response.json();

        this.completedTasks = tasks.filter(task => task.completed === true);
        this.notCompletedTasks = tasks.filter(task => task.completed === false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
  },

  mounted() {
    this.login();
    let token = localStorage.getItem("user");

    if (token != null) {
      try {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
        this.fetchTasks();
      } catch (error) {
        console.log(error, 'error from decoding token');
      }
    }
  },

  components: {
    AddTask,
    ShowTask
  },
};
</script>

<style scoped>
/* Home container styling */
div {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #cbf4ed;
  border-radius: 8px;
  box-shadow: 0 0 10px rgb(0, 0, 0);
  text-align: center;
  margin-top: 20px;
}

/* Title styling */
h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

/* TaskTracker component styling */
#tasks-container {
  margin-top: 20px;
}

/* AddTask component styling */
#add-task-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

#task-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#add-button {
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#add-button:hover {
  background-color: #45a049;
}

/* TaskRender component styling */
#tasks {
  margin-top: 20px;
}

h4 {
  color: #333;
  font-size: 18px;
  margin-top: 20px;
}
</style>
