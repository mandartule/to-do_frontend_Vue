<template>
  <div class="background">
    <div class="shape"></div> <!-- Decorative shape -->
    <div class="shape2"></div> <!-- Another decorative shape -->
    <form @submit.prevent="submit">
      <h3>Sign Up Here</h3>
      <!-- Input fields for signup, e.g., username, email, password -->
      <label for="username">Username</label>
      <input type="text" id="username" v-model="data.name" placeholder="Username" required>

      <label for="email">Email</label>
      <input type="email" id="email" v-model="data.email" placeholder="Email" required>

      <label for="password">Password</label>
      <input type="password" id="password" v-model="data.password" placeholder="Password" minlength="6" required>

      <!-- Add any other fields you need for signup -->

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>

import { reactive, computed } from "vue";
// import { mapActions } from 'vuex';
import { useStore } from 'vuex'
import { useRouter } from "vue-router";
import { API_URL } from "@/constants";

export default {
  name: "SignUp",

  setup() {

    const store = useStore();

    const data = reactive({
      name: "",
      email: "",
      password: "",
    });

    const router = useRouter();

    const status = computed(() => store.getters["auth/isAuthenticated"]);

    const submit = async () => {

      //console.log(data);

      const response = await fetch(API_URL+"/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      const token = responseData.token;

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


<style scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: #080710;
}
.background {
  margin-top: 50px;
  background-color: #080710;
  width: 430px;
  height: 600px; /* Adjusted for potentially more fields in signup */
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.shape, .shape2 {
  height: 150px;
  width: 150px;
  position: absolute;
  border-radius: 50%;
}
.shape {
  background: linear-gradient(#1845ad, #23a2f6);
  left: -50px;
  top: -50px;
}
.shape2 {
  background: linear-gradient(to right, #ff512f, #f09819);
  right: -50px;
  bottom: -50px;
}
form {
  height: 560px; /* Adjusted for potentially more fields in signup */
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
}
form * {
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}
label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}
input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
::placeholder {
  color: #e5e5e5;
}
button {
  margin-top: 50px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
</style>