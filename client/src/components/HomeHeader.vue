<template>
  <div class="content">
    <div class="col-lg-6" style="padding-right:50px; text-align:left; display:flex;justify-content:center; flex-direction:column;">
      <h4 style="margin-bottom:20px;">Tanya, Jawab dan Bagikan</h4>
      <p>Punya ilmu? ya bagi-bagi donk. Belajar bersama, pintar bersama, susah dibantu bersama-sama</p>
    </div>
    <div class="col-lg-6" style="text-align:left;padding-left:50px;">
      <div v-if="loginstatus" class="greeting">
        <h4>Welcome {{userdata.username}}</h4>
        <p>Selamat menikmati pengalaman bertanya, menjawab dan membagikan postingan di askdong.</p>
      </div>
      <form v-else>
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="form.username" type="text" class="form-control" id="username" placeholder="Input your username">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" type="email" class="form-control" id="email" placeholder="Input your email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="form.password" type="password" class="form-control" id="password" placeholder="Input your password">
        </div>
        <button v-on:click="signupbutton" type="button" class="btn btn-outline-primary">Signup</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState, mapActions} from 'vuex'
import swal from 'sweetalert'
export default {
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  created () {
    const token = localStorage.getItem('token')
    if (token) {
      this.getuserdata(token)
    } 
  },
  methods: {
    ...mapActions([
      'signup', 'getuserdata'
    ]),
    signupbutton () {
      let error = 0
      Object.keys(this.form).forEach((key, index) => {
        if (this.form[key] === '') {
          error++
        }
      })
      if (error > 0) {
        swal({
          title: 'Blank input has found',
          icon: 'warning',
          button: 'Revise'
        })
      } else {
        this.signup(this.form).then(() => {
          this.form.username = ''
          this.form.email = ''
          this.form.password = ''
        })
      }
    }
  },
  computed: {
    ...mapState([
      'loginstatus', 'userdata'
    ])
  }
}
</script>

<style scoped>
.content{
  display: flex;
  width: 100%;
  padding: 50px 100px;
}
</style>
