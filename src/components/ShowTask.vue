<template>
    <div class="main-container">
        <ol>
            <li v-for="task in tasks" :key="task.id">
                <div class="task-container">

                    <div class="task"> {{ task.name }}</div>

                    <label :for="`checkbox-${task.id}`" class="custom-checkbox">
                        <input type="checkbox" :id="`checkbox-${task.id}`" class="task-checkbox"
                            v-model="task.completed" @change="updateTaskCompletion(task)">

                    </label>
                    <span class="checkmark"></span>

                    <button @click="deleteTask(task)" class="noselect"><span class="text">Delete</span><span class="icon"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                                </path>
                            </svg></span>
                    </button>

                </div>
            </li>
        </ol>
    </div>
</template>


<style scoped>
.main-container {
    border: 3px solid black;

}

ol {
    font-size: 20px;
    /* Sets the font size for the numbers */
}

.task-container {
    /* Corrected border declaration */
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* Spaces out the child elements */
}



.task {
    margin-bottom: 5px;
    font-size: 18px;
    padding: 5px 100px;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    font-weight: bold;
    font-family: monospace;
    width: 100px;
    text-transform: uppercase;
}

.task-checkbox {
    transform: scale(3);
    /* Adjust the scale value as needed */
    cursor: pointer;
    /* Optional: improves user experience by changing the cursor on hover */
}

button {
 width: 150px;
 height: 50px;
 cursor: pointer;
 display: flex;
 align-items: center;
 background: red;
 border: none;
 border-radius: 5px;
 box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
 background: #e62222;
}

button, button span {
 transition: 200ms;
}

button .text {
 transform: translateX(35px);
 color: white;
 font-weight: bold;
}

button .icon {
 position: absolute;
 border-left: 1px solid #c41b1b;
 transform: translateX(110px);
 height: 40px;
 width: 40px;
 display: flex;
 align-items: center;
 justify-content: center;
}

button svg {
 width: 15px;
 fill: #eee;
}

button:hover {
 background: #ff3636;
}

button:hover .text {
 color: transparent;
}

button:hover .icon {
 width: 150px;
 border-left: none;
 transform: translateX(0);
}

button:focus {
 outline: none;
}

button:active .icon svg {
 transform: scale(0.8);
}
.custom-checkbox input {
    margin-right: 10px;
    /* Adds some space between the checkbox and the task text */
}

.custom-checkbox input:checked~.checkmark {
    background-color: #2196F3;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.custom-checkbox input:checked~.checkmark:after {
    display: block;
}

.custom-checkbox .checkmark:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}
</style>

<script>
import { API_URL } from '@/constants';




export default {

    props: ['tasks'],

    mounted() {

    },

    methods: {

        async updateTaskCompletion(task) {
            // Here, you can also send an update to the server to reflect the change
            // For example:

            const id = task._id;

            console.log(id);

            try {
                const response = await fetch(API_URL+`/task/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("user")}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                this.$emit('taskUpdated');
                //const data = await response.json();
                // console.log('Task updated successfully:', data);
            } catch (error) {
                // console.error('Failed to update task:', error);
            }
        },

        async deleteTask(task) {
            try {
                const response = await fetch(API_URL+`/task/${task._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("user")}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Optionally, remove the task from the tasks array to update UI
                //this.tasks = this.tasks.filter(t => t._id !== task._id);

                this.$emit('taskUpdated'); // Emit an event to notify parent components
            } catch (error) {
                console.error('Failed to delete task:', error);
            }
        },
    },


};
</script>
