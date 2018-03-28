import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginstatus: false,
    allpost: []
  },
  mutations: {
    changeloginstatus (state, payload) {
      state.loginstatus = payload
    },
    changepost (state, payload) {
      state.allpost = payload
      console.log(payload)
    }
  },
  actions: {
    signup (state, payload) {
      axios.post('http://localhost:3000/user/create', payload).then(response => {
        localStorage.setItem('token', response.data)
        state.commit('changeloginstatus', true)
      }).catch(err => {
        console.log(err)
      })
    },
    login (state, payload) {
      axios.post('http://localhost:3000/user/login', payload).then(response => {
        localStorage.setItem('token', response.data)
        state.commit('changeloginstatus', true)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getallpost (state, payload) {
      axios.get('http://localhost:3000').then(response => {
        state.commit('changepost', response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    createpost (state, payload) {
      let form = {
        question: payload.question,
        title: payload.title,
        token: localStorage.getItem('token')
      }
      axios.post('http://localhost:3000/createpost', form).then(response => {
        state.commit('changepost', response.data)
      })
    }
  }
})

export default store
