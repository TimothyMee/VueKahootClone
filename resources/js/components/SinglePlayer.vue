<template>
    <div class="container">
        <div v-if="started" style="font-family: Quicksand;" class="row justify-content-center">
            <div class="container col-md-12">
                <h4 style="color:white">
                    <strong>Welcome {{username}} to the Quiz app</strong><br><br>
                </h4>
            </div>
            <div class="container col-md-5" style="background: #1177bd; border-radius:10%; color: white;">
                <h4>
                    <br>
                    <p style="color: #3cbdfc;">{{questions[count].category}}
                        <span style="float: right;">Q<span style="color: white;">{{count+1}}</span></span>
                    </p>

                    <h5 v-text="questions[count].question"></h5>
                </h4>

                {{$store.state.result[username].score}}    ||     {{randomNumber}}

                <div class="col-md-12">
                    <span v-for="(incorrect, index) in questions[count].incorrect_answers">

                        <span v-if="index+1 == randomNumber">
                            <button :class="btnClassRight" @click.prevent="submit('Right')"
                                    class="col-md-12" style="border-radius:100px;">
                                <span v-text="questions[count].correct_answer"></span>
                            </button><br><br>
                        </span>

                        <button :class="btnClassWrong" @click.prevent="submit('Wrong')"
                                class="col-md-12" style="border-radius:100px;">
                            <span v-text="incorrect"></span>
                        </button><br><br>

                    </span>

                    <span v-if="randomNumber >= 4">
                        <button :class="btnClassRight" @click.prevent="submit('Right')"
                                class="col-md-12" style="border-radius:100px;">
                            <span v-text="questions[count].correct_answer"></span>
                        </button><br><br>
                    </span>


                    <span>
                        <button class="btn btn-large col-md-11" @click="nextQuestion()"
                                style="background-color: whitesmoke; color:#1177bd; border-radius:100px;">
                            Continue
                        </button>
                    </span>
                    <br><br>
                </div>
            </div>
        </div>

        <div v-else="">
            Coming soon........
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
  name: 'SinglePlayer',
  data () {
    return {
        questions: '',
        count : 0,
        btnClassWrong: 'btn btn-lg btn-outline-warning',
        btnClassRight: 'btn btn-lg btn-outline-warning',
        randomNumber:2,
        started:false,
        username:''
    }
  },

    methods:{
        fetchData(){
            if(Object.keys(this.$store.state.result).length !== 0){
                axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
                    .then(response => {
                        this.randomNumber = Math.floor(Math.random() * 4) + 1;
                        this.questions = response.data.results;
                        this.started = true;

//                        console.log(this.questions);
                        console.log('store', this.$store.state.result);

                        this.username = localStorage.getItem('username');
                    })
                    .catch(error =>{
                        console.log(error);
                    })
            }
        },

        submit(value){
            if(value === "Right" && this.btnClassRight !== "btn btn-lg btn-success disabled"){

                let newScore = this.$store.state.result[this.username].score + 1;
                console.log('newScore' , newScore)
                let user = {
                    username: this.username,
                    score: newScore,
                    position: null,
                }
                this.$store.commit('updateScore', user);

                console.log(this.$store.state.result[this.username].score);

                this.btnClassRight = "btn btn-lg btn-success disabled";
                this.btnClassWrong = "btn btn-lg btn-danger disabled";

                /*pusher code goes here*/

                axios.post('/add-score', {'user': this.username, 'score': this.$store.state.result[this.username].score})
                    .then(res => {
                        console.log('broadcast route', res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
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
        },

        listening(){
            window.Echo.channel('score')
                .listen('CorrectAnswer', (e) =>{
                    console.log(e);

                    let user = {
                        username: e.user,
                        score: e.score,
                        position: null,
                    }

                    this.$store.commit('updateScore', user);
                    console.log(this.$store.state.result);
                });
        }
    },

    computed: mapGetters([
        'evenOrOdd'
    ]),

    created(){
        this.fetchData();
        this.listening();
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
