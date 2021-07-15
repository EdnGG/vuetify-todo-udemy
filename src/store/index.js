import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    tasks: [ 
      {
        id: 1,
        title: 'Wake up',
        done: false
      },
      {
        id: 2,
        title: 'Get Bananas',
        done: false
      },
      {
        id: 3,
        title: 'Eat Banannas',
        done: false
      },
      {
        id: 4,
        title: 'Study',
        done: false
      }
    ],
    snackbar: {
      show: false
    },
  },
  mutations: {
    deleteTask(state, id){
      state.tasks =  state.tasks.filter( task => task.id !== id )
    },
    
    addTask(state, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title : newTaskTitle,
        done: false
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
    showSnackbar(state) {
      state.snackbar.show = true
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      commit('addTask', newTaskTitle)
      commit('showSnackbar')
    }
  },
  getters: {

  }
})
