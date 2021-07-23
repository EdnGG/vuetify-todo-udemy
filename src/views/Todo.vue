<template>

<div class="home">

  

    <list-tasks 
      v-if="$store.state.tasks.length"
    />

    <no-tasks 
      v-else
    />

    <button-done-sorting
      v-if="$store.state.sorting"
    /> 

</div>

</template>

<script>
/* Convencional way to import child components
  import FieldAddTask from '@/components/Todo/FieldAddTask.vue'
*/

  export default {
    name: 'Home',
    components: {
      /*  convencional way to import child components
        FieldAddTask,
        'field-add-task' : FieldAddTask
      */
    //  'field-add-task' : require('@/components/Todo/FieldAddTask.vue').default,
     'list-tasks' : require('@/components/Todo/ListTasks.vue').default,
     'no-tasks' : require('@/components/Todo/NoTasks.vue').default,
     'button-done-sorting' : require('@/components/Todo/ButtonDoneSorting.vue').default
    },
    data () {
      return {
        newTaskTitle: '',
      }
    },
    methods: {
      addTask() {
        this.$store.commit('addTask', this.newTaskTitle)
        this.newTaskTitle = ''
      },
      
    }
  }
</script>


