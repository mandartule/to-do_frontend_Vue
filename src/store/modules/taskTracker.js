import axios from "axios";

const state = {
  tasks: [],
};

const actions = {
  async fetchTasks({ commit }, token) {
    try {
      const response = await axios.get("http://localhost:3333/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      let res = response.data.tasks;
      commit("setTasks", res);
    } catch (e) {
      console.log("Error" + e);
    }
  },
  async addTasks({ commit }, { name, token }) {
    try {
      console.log(token);
      console.log(name);
      const response = await axios.post(
        "http://localhost:3333/task/",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      let res = response.data;
      if (res && res._id) {  // Ensure the response is valid
        commit("newTasks", res);
      } else {
        console.error("Invalid response from server:", res);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },
  async updateTasks({ commit }, { taskId, token, updatePayload }) {
    try {
      const response = await axios.patch(
        `http://localhost:3333/task/${taskId}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      let res = response.data;
      if (res && res._id) {  // Ensure the response is valid
        commit("updateTask", res);
      } else {
        console.error("Invalid response from server:", res);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  },
};

const getters = {
  allTasks: (state) => state.tasks,
};

const mutations = {
  setTasks: (state, tasks) => (state.tasks = Array.isArray(tasks) ? tasks : []),
  newTasks: (state, task) => {
    if (!Array.isArray(state.tasks)) {
      state.tasks = [];
    }
    if (task && typeof task === 'object') {
      state.tasks.unshift(task);
    }
  },
  updateTask: (state, task) => {
    const index = state.tasks.findIndex((tasks) => tasks._id === task._id);
    if (index !== -1 && task && typeof task === 'object') {
      state.tasks.splice(index, 1, task);
    }
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
