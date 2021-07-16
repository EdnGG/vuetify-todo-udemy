<template>
  <v-text-field
            v-model="newTaskTitle"
            @click:append="addTask"
            @keyup.enter="addTask"
            class="pa-3"
            outlined
            label="Add Task"
            append-icon="mdi-plus"
            hide-details
            clearable
  >
  </v-text-field>
</template>

<script>
export default {
    data () {
      return {
        newTaskTitle: '',
        
      }
    },
    methods: {
      // doneTask(task, id){
      //   this.$store.commit('doneTask', task.id)
      // },
      addTask() {
        this.$store.dispatch('addTask', this.newTaskTitle)
        this.newTaskTitle = ''
      },
      
    }
}
</script>
