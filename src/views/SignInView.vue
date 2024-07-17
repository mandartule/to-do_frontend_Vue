<template>
  <div class="form-container">
    <h1>Sign In</h1>

    <form @submit.prevent="submit">

      <input v-model="data.email" type="email" placeholder="email" required>
      <input v-model="data.password" type="password" placeholder="password" minlength="6" required>
      <button  type="submit">Submit</button>

    </form>
    <h4>Please wait for some time after clicking submit button , As I am using free server to it is slow</h4>
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
        alert("Incorrect User Id or Password");
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

.form-container {
  max-width: 400px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); /* Enhanced box shadow */
  border-radius: 8px;
  background-color: #fff; /* Optional: Add a background color */
}

/* Style inputs with improved interaction feedback */
input[type="email"], input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s; /* Smooth transition for border color */
}

input[type="email"]:hover, input[type="password"]:hover,
input[type="email"]:focus, input[type="password"]:focus {
  border-color: #007bff; /* Change border color on hover/focus */
}

/* Enhanced submit button styling */
button[type="submit"] {
  width: 100%;
  background-color: #007bff; /* Primary color */
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s; /* Smooth transition for background color */
}

button[type="submit"]:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

/* Style the hint message */
h4 {
  text-align: center;
  color: #888;
}
</style>
