<template >
  <div class="background">
    <div class="shape"></div>
    <div class="shape2"></div>
    <form @submit.prevent="submit">
      <h3>Login Here</h3>

      <label for="username">Username</label>
      <input type="email" placeholder="Email" id="username" v-model="data.email"  required>

      <label for="password">Password</label>
      <input type="password" placeholder="Password" id="password" v-model="data.password" minlength="6" required>

      <button type="submit">Log In</button>

      <div style="margin-top: 10px;">      Please wait for some time after clicking submit button , As I am using free server to it is slow
      </div>
    </form>
  </div>
</template>


<script>

import { API_URL } from "@/constants";
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

      const response = await fetch(API_URL+"/auth/login", {
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

<style scoped>
/* Adjusted CSS */
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.background {
  margin-top: 10px;
  background-color: #080710;
  width: 430px;
  height: 560px;
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
  height: 520px;
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