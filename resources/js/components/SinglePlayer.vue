<template>
    <div class="container col-md-12" style="background-color: #efefef; width: 100%; min-height:100%">
        <notifications position="top right"/>
        <div v-if="started" style="font-family: Quicksand;" class="row justify-content-center">
            <div class="container col-md-12 " style="background-color: white; box-shadow: 5px 5px 5px #BFBFBF">
                <center>
                    <h4>
                        <p style="color: #3cbdfc; font-weight: bold;">
                            {{questions[count].category}}||{{randomNumber}}
                        </p>
                        <p style="font-weight: bold;">
                            {{questions[count].question}}
                        </p>
                        <h5 style="font-weight: bold; color:#d9534f;">
                            Score: {{$store.state.result[username].score}}
                        </h5>
                    </h4>
                </center>
            </div>
            <div class="col-md-12" style="height:60%;">
                <br><br>
                <span v-for="(incorrect, index) in questions[count].incorrect_answers">
                    <button :class="btnClassRight" @click.prevent="submit('Right')"
                             v-if="index+1 == randomNumber" class="my-btn">
                        <span>
                            {{questions[count].correct_answer}}
                        </span>
                    </button>
                    <button :class="btnClassWrong" @click.prevent="submit('Wrong')"
                             class="my-btn">
                        <span>
                            {{incorrect}}
                        </span>
                    </button>
                    <button v-if="(randomNumber >= 4) && (index == 2)" :class="btnClassRight"
                            @click.prevent="submit('Right')"
                             class="my-btn">
                        <span>
                            {{questions[count].correct_answer}}
                        </span>
                    </button>
                </span>

                <span>
                    <br><br>
                    <button class="btn btn-primary col-md-12" @click="nextQuestion()"
                            style="height: 150px;">
                        Continue
                    </button>
                </span>
                <br><br>
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
        btnClassWrong: 'btn btn-lg btn-outline-danger',
        btnClassRight: 'btn btn-lg btn-outline-danger',
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
                axios.post('/add-score', {'user': this.username,
                                            'score': this.$store.state.result[this.username].score,
                                            'message': "Score Update"
                                            })
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
                this.btnClassWrong = 'btn btn-lg btn-outline-danger';
                this.btnClassRight = 'btn btn-lg btn-outline-danger';
                this.randomNumber= Math.floor(Math.random() * 4) + 1;
            }else{
                this.started = false;

                /*pusher code to send final result goes here*/

                axios.post('/add-score', {'user': this.username,
                                            'score': this.$store.state.result[this.username].score,
                                            'message': "Done",
                                            })
                    .then(res => {
                        this.$store.commit('markUserAsFinished', this.username);

                        this.$router.push({name: 'Result'});
                    })
                    .catch(err => {
                        console.log(err);
                    })

//                setTimeout()
            }
        },

        listening(){
            window.Echo.channel('score')
                .listen('CorrectAnswer', (e) =>{
//                    console.log(e);

                    let user = {
                        username: e.user,
                        score: e.score,
                        position: null,
                    }

                    this.$store.commit('updateScore', user);

                    if(e.message === "New User"){
                        this.$notify({type: 'error', text: `User "${e.user}" just joined`, duration:4000});
                    }else if(e.message === "Score Update"){
                        this.$notify({type: 'error', text: `User ${e.user}'s Score is ${e.score}`, duration:4000});
                    }else if(e.message === "Done"){
                        this.$store.commit('markUserAsFinished', e.user);
                        this.$notify({type: 'error', text: `User ${e.user} is Done.`, duration:4000});

                    }

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
    .my-btn{
        white-space: normal;
        word-wrap: break-word;
        height: 150px;
        width: 49.5%;
        margin-bottom:7px;
    }
    .btn{
        font-weight: bold;
    }
</style>
