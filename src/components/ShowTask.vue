<template>
    <div>
        <ol>
            <li v-for="task in tasks" :key="task.id">
                <div class="task-container">
                    <div class="task">{{ task.name }}</div>
                    
                        <label :for="`checkbox-${task.id}`" class="custom-checkbox">
                            <input type="checkbox" :id="`checkbox-${task.id}`" class="task-checkbox"
                                v-model="task.completed" @change="updateTaskCompletion(task)">
                            <span class="checkmark"></span>
                        </label>
                        <button  @click="deleteTask(task)">Delete</button>
                    

                    

                </div>
            </li>
        </ol>
    </div>
</template>

<script>

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
                const response = await fetch(`https://todo-backend-nest.onrender.com/task/${id}`, {
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
                const response = await fetch(`https://todo-backend-nest.onrender.com/task/${task._id}`, {
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



<style scoped>

ol {
  font-size: 20px; /* Sets the font size for the numbers */
}

.task-container {
  display: flex;
  align-items: center; /* Ensures vertical alignment in the center */
  justify-content: space-between; /* Spaces out the child elements */
}

.task-container > div {
  display: flex;
  align-items: center; /* Aligns the checkbox and button inline with the task text */
}

.task {
  /* Ensure there's enough margin to separate the task text from the checkbox */
  margin-right: 10px;
  font-size: 20px;
  padding: 5px 100px;
  background-color: white; 
  border: 1px solid black; 
  border-radius: 5px; 
  

}

.task-checkbox {
  transform: scale(3); /* Adjust the scale value as needed */
  cursor: pointer; /* Optional: improves user experience by changing the cursor on hover */
}

button {
  border: 1px solid black; /* Adds a black border to the button */
  background-color: #ff4d4f;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
}

button:hover {
  background-color: #ff7875;
}

.custom-checkbox input {
  margin-right: 10px; /* Adds some space between the checkbox and the task text */
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