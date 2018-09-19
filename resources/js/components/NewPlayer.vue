<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-3">
                <!--<center><h5 style="color:white">Enter Name</h5></center>-->
                <input type="text" v-model="gamepin" placeholder="Enter Game Pin e.g 223003" id="gamepin" class="form-control">
                <input type="text" v-model="username" placeholder="Enter Username e.g Timothy" id="name" class="form-control">
                <button class="btn btn-dark col-md-12" @click.prevent="submit()">Submit</button>
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
            axios.post('/check-pin', gamepin)
                .then(response => {
                    if(response.data === 1){
//                        console.log(response);
                    }

                    this.$store.commit('createUser', this.username);

                    if(this.username in this.$store.state.result){
                        localStorage.setItem('username', this.username);
                        console.log(this.$store.state.result);
                        router.push({name: 'SinglePlayer'});
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
    }
</style>
