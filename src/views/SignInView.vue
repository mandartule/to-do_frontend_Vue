<template>
  <div class="form-container">
    <h1>Sign In</h1>

    <form @submit.prevent="submit">

      <input v-model="data.email" type="email" placeholder="email" required>
      <input v-model="data.password" type="password" placeholder="password" minlength="6" required>
      <button  type="submit">Submit</button>

    </form>
    <h4>Please wait for some time after clicking submit button</h4>
  </div>
</template>

<script>

import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "SignIn",
  setup() {

    const store = useStore();
    const data = reactive({
      email: "",
      password: "",
    });

    const router = useRouter();
    const status = computed(() => store.getters["auth/isAuthenticated"]);

    const submit = async () => {

      const response = await fetch("https://todo-backend-nest.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      const token = responseData.token;

      //setting user to store
      localStorage.setItem("user", token);

      store.dispatch('auth/login');

      if (status.value) {
        router.push('/')
      } else {
        router.push('/signin')
      }

    };

    return {
      data,
      submit,
    };
  },
};
</script>


/* Sign In container styling */
<style scoped>
/* Scoped CSS ensures styles only apply to this component */

/* Style the form container */
.form-container {
  
  max-width: 400px;
  margin-top: 20px;
  margin-left: 35%;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
}

/* Style inputs */
input[type="email"], input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* Style the submit button */
button[type="submit"] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

/* Style the hint message */
h4 {
  text-align: center;
  color: #888;
}
</style>
