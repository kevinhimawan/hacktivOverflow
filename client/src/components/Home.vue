<template>
  <div class="content">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Askme Dong</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li v-if="loginstatus" class="nav-item active">
            <a v-on:click="signoutbutton">Signout</a>
          </li>
          <li v-else class="nav-item active">
            <div class="form-row">
              <div class="form-group form-group-top col-md-5">
                <input v-model="form.email" type="text" class="form-control" id="emailsingin" placeholder="Email Address">
              </div>
              <div class="form-group form-group-top col-md-5">
                <input v-model="form.password" type="password" class="form-control" id="passwordsignin" placeholder="Password">
              </div>
              <button v-on:click="loginbutton" type="button" class="btn btn-outline-primary btn-top">Sign in</button>
            </div>
          </li>
        </ul>
      </div> 
    </nav>
    <HomeHeader></HomeHeader>
    <HomeContainer></HomeContainer>
  </div>
</template>

<script>
import {mapMutations, mapState, mapActions} from 'vuex'
import swal from 'sweetalert'
import HomeHeader from '@/components/HomeHeader'
import HomeContainer from '@/components/HomeContainer'
export default {
  components: {
    HomeHeader, HomeContainer
  },
  name: 'HelloWorld',
  data () {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  created () {
    const token = localStorage.getItem('token')
    if (token) {
      this.changeloginstatus(true)
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    ...mapMutations([
      'changeloginstatus'
    ]),
    loginbutton () {
      let countblank = 0
      Object.keys(this.form).forEach((key, index) => {
        if (this.form[key] === '') {
          countblank++
        }
      })
      if (countblank > 0) {
        swal({
          title: 'Blank input has found',
          icon: 'warning',
          button: 'Revise'
        })
      } else {
        this.login(this.form).then(() => {
          this.form.email = ''
          this.form.password = ''
        })
      }
    },
    signoutbutton () {
      localStorage.removeItem('token')
      this.changeloginstatus(false)
    }
  },
  computed: {
    ...mapState ([
      'loginstatus'
    ])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  padding: 15px 100px !important;
}
.navbar-brand {
  font-family: 'Pacifico', cursive !important;
  font-size: 1.5em;
  font-weight: 300;
}
.navbar-collapse{
  justify-content: flex-end !important;
}
.form-group-top{
  margin: 0 !important;
  padding: 0 10px !important;
}
.btn-top{
  margin-left: 10px !important;
  margin-top: 0px !important;
  padding: 0 8px !important;
}
</style>
