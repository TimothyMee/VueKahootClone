<template>
    <div class="container col-md-12" style="background: linear-gradient(to top, #4481eb 0%, #04befe 100%); height:100%; width:100%">
        <notifications position="top center"/>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <br><br><br><br><br><br><br>
            </div>
            <div class="col-md-12">
                <div class="container col-md-4">
                    <img src="../../../public/svg/Kahoot_Logo.svg" alt="">
                </div>
            </div>
            <div class="col-md-3">
                <!--<center><h5 style="color:white">Enter Name</h5></center>-->
                <input type="text" v-model="gamepin" placeholder="Enter Game Pin" id="gamepin" class="form-control">
                <input type="text" v-model="username" placeholder="Enter Username" id="name" class="form-control">
                <button class="btn btn-dark col-md-12" @click.prevent="submit()">Submit</button>
            </div>

            <div class="col-md-12">
                <br><br><br><br><br><br><br>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import router from '../routes.js'
    export default {
  name: 'NewPlayer',
  data () {
    return {
        username:'',
        gamepin:''
    }
  },

    methods:{
        submit(){
            axios.post('/check-pin', {gamepin: this.gamepin})
                .then(response => {
                    console.log(response);
                    if(response.data === 1){
                        this.$store.commit('createUser', this.username);

                        if(this.username in this.$store.state.result){
                            localStorage.setItem('username', this.username);
                            /*pusher code goes here*/

                            axios.post('/add-score', {'user': this.username,
                                'score': this.$store.state.result[this.username].score,
                                'message': "New User"
                            })
                                .then(res => {
//                                    console.log('broadcast route', res);
                                })
                                .catch(err => {
                                    console.log(err);
                                })

                            router.push({name: 'SinglePlayer'});
                        }
                    }else{
                        this.$notify({type: 'error', text: `Game pin is wrong`, duration:4000});
                    }
                })
                .catch(error =>{
                    console.log(error);
                })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn{
        white-space: normal;
        word-wrap: break-word;
        margin-top: 10px;
    }
    .form-control{
        margin-top: 10px;
        height: 50px;
        border-radius:0px;
        font-weight:bold;
        color:black;
        text-align:center;
        font-size:20px;
    }

    .form-control:focus{
        border:2px solid black;
    }
</style>
