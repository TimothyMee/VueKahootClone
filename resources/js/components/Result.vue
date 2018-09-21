<template>
    <div class="container col-md-12" style="background-color:#7900C9; height:100%; width:100%">
        <div class="row justify-content-center" v-if="started">
            <div class="col-md-12">
                <div class="container col-md-4">
                    <img :src="medalImage" alt="" style="height:400px; width:350px;">
                </div>
            </div>
            <div class="col-md-8" style="color:white;">
                <br><br><br>
                <center>
                    <h1 class="myh">Congratulations "{{username}}"</h1>
                    <h4 class="myh">You came {{position}}</h4>
                </center>
            </div>

            <div class="col-md-12">
                <br><br><br><br><br><br><br>
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
  name: 'Result',
  data () {
    return {
        username:localStorage.getItem('username'),
        results: '',
        started: true,
        positionArray:[],
        medalImage:'',
        position:''
    }
  },

    methods:{
        fetchData(){
            let result = this.$store.state.result;
            var unfinished = lodash.filter(result, ['finished', false]);
            if(unfinished.length === 0){
                this.positionArray =  lodash(result)
                            .map(function(v, k) { // insert the key into the object
                                return lodash.merge({}, v, { key: k });
                            })
                    .sortBy('score') // sort by name
                    .value();

                var position = lodash.findIndex(this.positionArray, {key: this.username}) + 1
                this.filterPosition(position);

            }else{
                this.started = false;
            }
        },

        filterPosition(position){
            if(position === 1){
                this.position = "1st"
                this.medalImage = require('../../../public/images/gold_medal.png')
            }
            else if(position === 2){
                this.position = "2nd"
                this.medalImage = require('../../../public/images/silver_medal.png')
            }
            else if(position === 3){
                this.position = "3rd"
                this.medalImage = require('../../../public/images/bronze_medal.jpeg')
            }
            else if(position > 3){
                this.position = postion+ "th"
                this.medalImage = require('../../../public/images/other_ribbon.png')
            }

            this.started = true;
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
                        console.log('listening again');
                        this.fetchData();
                    }
                });
        }


    },

    created(){
        this.fetchData();
        this.listening();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .myh{
        font-family: Courier New;
        font-size: 50px;
    }
</style>
