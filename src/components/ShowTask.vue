<template>
    <div>
        <ol>
            <li v-for="task in tasks" :key="task.id">
                {{ task.name }} <input type="checkbox" v-model="task.completed" @change="updateTaskCompletion(task)">
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
                const response = await fetch(`http://localhost:3333/task/${id}`, {
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
    },


};
</script>

<style scoped>
h2 {
    color: #333;
}



li {
    background-color: #f9f9f9;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>