<template>
  <div class="content">
    <CreatePost></CreatePost>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a data-toggle="modal" data-target="#createPost" class="nav-link">Create</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container_content">
      <div v-for="(post, i) in allpost" :key="i" class="card">
        <div class="card-body">
          <div class="col-lg-2 card-info" style="padding:0;margin-right:20px;">
            <div v-on:click="voteit(post._id)" class="col-lg-6 voting" style="display: flex; flex-direction: column; padding:0">
              <h6>{{post.votes.length}}</h6>
              <span>Votes</span>
            </div>
            <div class="col-lg-6" style="display: flex; flex-direction: column; padding:0">
              <h6>{{post.answer.length}}</h6>
              <span>Answer</span>
            </div>
          </div>
          <div class="col-lg-10 card-question">
            <router-link v-on:click.native="getpost(post._id)" class="question" style="margin-bottom:0;" :to="{name: 'Post', params: {postid: post._id}}">{{post.title}}</router-link>
            <div class="asker-site" style="display:flex;align-items:center">
              <span style="font-size:.9em">Asked by:</span>
              <h6 class="asker" style="margin-bottom:0">{{post.user.username}}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpecificPost from '@/components/containerContent/SpecificPost'
import CreatePost from '@/components/containerContent/CreatePost'
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    CreatePost
  },
  created () {
    this.getallpost()
  },
  methods:{
    ...mapActions ([
      'getallpost', 'votingsystem', 'getspecificpost'
    ]),
    voteit (postid) {
      const token = localStorage.getItem('token')
      if (token) {
        let vote = {
          token: token,
          postid: postid
        }
        this.votingsystem(vote)
      } else {
        swal({
          title: 'Upps login dulu ya',
          icon: 'warning',
          button: 'Revise'
        })
      }
    },
    getpost (postid) {
      this.getspecificpost({postid: postid})
    }
  },
  computed: {
    ...mapState([
      'allpost'
    ])
  }
}
</script>

<style scoped>
.navbar{
  padding: .5rem 100px;
}
.navbar-collapse{
  display: flex;
  justify-content: center;
  display: flex !important;
}
.nav-link:hover{
  cursor: pointer;
}
.container_content{
  padding: 20px 100px;
}
.card-body{
  display: flex;
  justify-content: space-between;
}
.card-info{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-question{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.card{
  margin-bottom: 20px;
}
.card-body {
  padding: 1em;
}
.voting:hover{
  cursor: pointer;
}
.question:hover{
  cursor: pointer;
}
</style>
