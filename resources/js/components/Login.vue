<template>
    <div>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
  name: 'SinglePlayer',
  data () {
    return {

    }
  },

    methods:{
      clickME(){
          Router.push('timothy');
      },

        fetchData(){
            axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
                .then(response => {
                    this.randomNumber = Math.floor(Math.random() * 4) + 1;
                    this.questions = response.data.results;
                    this.started = true;

                    console.log(this.questions);
                })
                .catch(error =>{
                    console.log(error);
                })
        },

        submit(value){
            if(value === "Right" && this.btnClassRight !== "btn btn-lg btn-success disabled"){
                this.$store.commit('increaseCorrectScore', this.userName);
                this.btnClassRight = "btn btn-lg btn-success disabled";
                this.btnClassWrong = "btn btn-lg btn-danger disabled";

                /*pusher code goes here*/
            }
            else{
                this.btnClassRight = "btn btn-lg btn-success disabled";
                this.btnClassWrong = "btn btn-lg btn-danger disabled";
            }
        },

        nextQuestion(){
            this.count += 1;

            if(this.count <= 9){
                this.btnClassWrong = 'btn btn-lg btn-outline-warning';
                this.btnClassRight = 'btn btn-lg btn-outline-warning';
                this.randomNumber= Math.floor(Math.random() * 4) + 1;;
            }else{
                this.started = false;
            }
        }
    },

    computed: mapGetters([
        'evenOrOdd'
    ]),

    created(){
        this.fetchData();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn{
        white-space: normal;
        word-wrap: break-word;
    }
</style>
