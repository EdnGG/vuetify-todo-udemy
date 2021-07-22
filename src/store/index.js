import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')

db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: null,
    tasks: [ ],
    sorting: false,
    appTitle: process.env.VUE_APP_TITLE,
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
    addTask(state, newTask) {
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
    setTasks(state, tasks) {
      state.tasks = tasks 
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
    },
    toogleSorting(state) {
      state.sorting = !state.sorting
    }
  },
  actions: {
    
    getTasks({commit}) {
      db.collection('tasks').get().then((task)=> {
        commit('setTasks', task)
      })
    },
    setTasks({ commit }, tasks){
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    },
    updateTaskDueDate({commit}, payload){
      db.collection('tasks').doc({id: payload.id}).update({
        dueDate: payload.dueDate
      }).then(()=> {
        commit('updateTaskDueDate',  payload)
        commit('showSnackbar', {text: 'Due Date updated!'})
      })
     
    },
    updateTaskTitle({commit}, payload){
      db.collection('tasks').doc({id: payload.id}).update({
        title: payload.title
      }).then(()=> {
        commit('updateTaskTitle' , payload)
        commit('showSnackbar', {text: 'Task updated!'})
      })
    },
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title : newTaskTitle,
        done: false,
        dueDate:  null
      }
      db.collection('tasks').add(newTask).then( ()=> {
        commit('addTask', newTask)
        commit('showSnackbar', { text: 'Task Added'} )
      })
    },
    doneTask({ state, commit }, id){
      let task = state.tasks.filter( (task) => task.id === id)[0]
      db.collection('tasks').doc({ id: id}).update({
        done: !task.done
      }).then(()=> {
        commit('doneTask', id)
      })
    },
    deleteTask({ commit }, id){
      db.collection('tasks').doc({ id: id }).delete().then(()=> {
        commit('deleteTask', id)
        commit('showSnackbar', { text: 'Task Deleted'} )
      })
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
