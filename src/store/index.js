import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: null,

    tasks: [ 
      {
        id: 1,
        title: 'Wake up',
        done: false,
        dueDate: '2021-07-18',
      },
      {
        id: 2,
        title: 'Get Bananas',
        done: false,
        dueDate: '2021-07-19',
      },
      {
        id: 3,
        title: 'Eat Banannas',
        done: false,
        dueDate: '2021-07-20',
      },
      {
        id: 4,
        title: 'Study',
        done: false,
        dueDate: null,
      }
    ],
    snackbar: {
      show: false,
      text: '',
    },
  },
  mutations: {
    setSearch(state, payload) {
      state.search = payload
      console.log(payload)
    },   
    hideSnackbar(state){
      state.snackbar.show = false
    },
    updateTaskDueDate(state, payload) {
      console.log(payload)
      let task = state.tasks.filter( task => task.id === payload.id )[0]
      task.dueDate = payload.dueDate
    },
    updateTaskTitle(state, payload) {
      console.log(payload)
      let task = state.tasks.filter( task => task.id === payload.id )[0]
      task.title = payload.title
    },
    deleteTask(state, id){
      state.tasks =  state.tasks.filter( task => task.id !== id )
    },
    
    addTask(state, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title : newTaskTitle,
        done: false,
        dueDate:  null
      }
      state.tasks.push(newTask)
    },
    doneTask(state, id){
      // agregamos [0] para que pueda agarrar el primer elemnto del arreglo de objetos
      /**
       * Primero return an array of objects, not a single object
       */
      let task = state.tasks.filter( task => task.id === id )[0]
      task.done = !task.done
    },
    showSnackbar(state, payload) {
      let timeout = 0
      if(state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout( () => {
        state.snackbar.show = true,
        state.snackbar.text = payload.text
      }, timeout)
    }
  },
  actions: {
    updateTaskDueDate({commit}, payload){
      commit('updateTaskDueDate',  payload)
      commit('showSnackbar', {text: 'Due Date updated!'})
    },
    updateTaskTitle({commit}, payload){
      commit('updateTaskTitle, payload')
      commit('showSnackbar', {text: 'Task updated!'})
    },
    addTask({ commit }, newTaskTitle) {
      commit('addTask', newTaskTitle)
      commit('showSnackbar', { text: 'Task Added'} )
    },
    deleteTask({ commit }, id){
      commit('deleteTask', id)
      commit('showSnackbar', { text: 'Task Deleted'} )
    }
  },
  getters: {
    tasksFiltered(state) {
      if(!state.search){
        return state.tasks
      }
      return state.tasks.filter( task => 
        task.title.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  }
})
