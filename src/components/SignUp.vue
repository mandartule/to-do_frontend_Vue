<template>
    <div class="signup">
        <h2>Sign Up</h2>

        <div class="signup">
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="user.name" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password" required>
            </div>
            <button v-on:click="signUp">Sign Up</button>
        </div>

    </div>
</template>

<script>

import { reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

import axios from 'axios';
export default {
    name: 'SignUp',

    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                
            },
        };
    },

    methods: {
        signUp() {

            axios.post('http://localhost:3000/users', this.user)
                .then(response => {
                    console.log(response.data);
                    this.$router.push('/login');
                })
                .catch(error => {
                    console.log(error);
                });
            console.warn('Submitting:' + JSON.stringify(this.user));
        },
    },
};
</script>

<style scoped>
.signup {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: wheat;
    
}

.signup h2 {
    text-align: center;
}

.signup >div {
    margin-bottom: 20px;
}

.signup  label {
    display: inline-block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 1.1em;
    margin-right: 10px;
}

.signup  input[type="text"],
.signup  input[type="email"],
.signup  input[type="password"] {
    width: 60%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.signup button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.signup button:hover {
    background-color: #0056b3;
}
</style>