import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginstatus: false,
    allpost: [],
    userdata: {},
    specificpost: {}
  },
  mutations: {
    changeloginstatus (state, payload) {
      state.loginstatus = payload
    },
    changepost (state, payload) {
      state.allpost = payload
      console.log(payload)
    },
    changeuserdata (state, payload) {
      state.userdata = payload
      console.log(payload)
    },
    changespecificpost (state, payload) {
      state.specificpost = payload
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
    getuserdata (state,payload) {
      axios.get('http://localhost:3000/userdata',{
        headers: {
          token: payload
        }
      }).then(response => {
        state.commit('changeuserdata', response.data)
      })
      .catch(err => {
        state.commit('changeloginstatus', false)
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
    },
    votingsystem (state, payload) {
      axios.post('http://localhost:3000/votingsystem',payload).then(response => {
        console.log(response.data)
        if (response.data.message) {
          swal({
            title: 'Hey udah pernah nge-vote situ',
            icon: 'warning',
            button: 'chill?'
          })
        } else {
          state.commit('changepost',response.data)
        }
      })
    },
    getspecificpost (state, payload) {
      axios.get('http://localhost:3000/' + payload.postid).then(response => {
        state.commit('changespecificpost', response.data)
      })
    },
    discussionsubmitit (state, payload) {
      axios.post('http://localhost:3000')
    }
  }
})

export default store
