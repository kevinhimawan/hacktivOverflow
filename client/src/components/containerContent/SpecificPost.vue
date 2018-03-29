<template>
  <div id="specificContent" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="question-part" style="margin-bottom: 20px;">
            <h5>{{specificpost.title}}</h5>
            <h6>{{specificpost.question}}</h6>
            <div class="asker" style="display: flex; align-items:center;justify-content:flex-start">
              <span style="margin-right: 10px; font-size:.9em;">Asked By: </span>
              <h6 style="margin-bottom: 0">{{specificpost.user.username}}</h6>
            </div>
          </div>
          <div class="answer-part">
            <h6 style="margin-bottom: 20px;">{{specificpost.answer.length}} Answer</h6>
            <div class="answer-list" style="margin-bottom: 20px;">
              <div class="card">
                <div class="card-body" style="border: none, padding: 0">

                </div>
              </div>
            </div>
            <div class="answer-place">
              <div class="form-group">
                <label for="answer-place">Diskusimu</label>
                <textarea v-model="discussion" class="form-control" id="answer-place" rows="3" placeholder="Masukan kata untuk berdiskusi"></textarea>
                <button v-on:click="submitdiscussion(specificpost._id)" type="button" style="margin-top: 10px;" class="btn btn-outline-primary">Submit</button>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      discussion: ''
    }
  },
  methods: {
    ...mapActions([
      'discussionsubmitit'
    ]),
    submitdiscussion (postid) {
      const token = localStorage.getItem('token')
      if (token) {
        if (this.discussion === '') {
          swal({
            title: 'Text tidak boleh kosong',
            icon: 'warning',
            button: 'Chill?'
          })
        } else {
          const form = {
            token: token,
            discussion: this.discussion
          }
          this.discussionsubmitit(form)
        }
      } else {
        swal({
          title: 'Login dulu ya om',
          icon: 'warning',
          button: 'Chill?'
        })
      }
    }
  },
  computed: {
    ...mapState([
      'specificpost'
    ])
  }
}
</script>

<style scoped>
.modal-dialog{
  min-width: 700px !important;
  text-align: left;
}
</style>
