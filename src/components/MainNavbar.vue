<template>

  <nav class="navbar">
    <div>
      <router-link  class="home" to="/">Task Manager</router-link></div>
    <div > 
      <router-link class="signIn" v-if="!isAuthenticated" to="/signin">Login</router-link>
      <router-link class="signOut" v-if="!isAuthenticated" to="/signup">Sign Up</router-link>

      <router-link class="logout-button" @click="handleLogout" v-if="isAuthenticated" to="/signin">Logout</router-link>
    </div>

  </nav>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';


  
export default {
  
  name: "MainNavbar",
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    handleLogout(){
      this.logout();
    }
    
  },
};


</script>

<style scoped>
.navbar {
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.13); /* Adjusted for glass effect */
  color: #fff;
  border-radius: 10px; /* Matched with form */
  backdrop-filter: blur(10px); /* Blur effect for glass-like appearance */
  border: 2px solid rgba(255, 255, 255, 0.1); /* Border to match form */
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6); /* Shadow to match form */
  position: relative;
  overflow: hidden;
}

.navabar-div h1, .home, .nav-link, .logout-button {
  position: relative;
  z-index: 1;
}

.home, .logout-button {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
}

 .signIn {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  background: none;
}

.signOut {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  background: none;
}


.home {
  font-size: x-large;
  text-transform: bold;
  color: #fff;
  padding: 0.5rem;
 font-weight: 600;
}
.logout-button {
  background-color: #d9534f;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.5rem 1rem;
}

/* Removing hover effects */
.home:hover, .nav-link:hover, .logout-button:hover {
  text-decoration: none;
  color: #fff;
}

/* Adding glow effect on hover for sign-in and sign-out buttons */
.signIn:hover, .signOut:hover {
  animation: glow 1s infinite alternate;
  background: none;
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px #fff;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #00e1ff, 0 0 40px #00e1ff, 0 0 50px #00e1ff;
  }
}

</style>