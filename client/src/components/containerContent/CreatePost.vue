<template>
  <div id="createPost" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content" style="text-align: left;">
        <div class="modal-header">
          <h5 class="modal-title">Pertanyaan</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="title">Title</label>
            <input  v-model ="title" type="text" class="form-control" id="title">
          </div>
          <div class="form-group">
            <label for="postAsk">Ask Here</label>
            <textarea v-model="question" class="form-control" name="" id="postAsk" rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button v-on:click="submitquestion" type="button" class="btn btn-primary">Ask it</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import {mapMutations, mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      question: '',
      title: ''
    }
  },
  methods: {
    ...mapActions([
      'createpost'
    ]),
    submitquestion () {
      if (this.question === '' || this.title === '') {
        swal({
          title: `Error blank question`,
          icon: 'warning',
          button: 'Revise'
        })
      } else {
        let form = {
          question: this.question,
          title: this.title
        }
        this.createpost(form).then(()=>{
          $('#createPost').modal('hide')
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style>

</style>
