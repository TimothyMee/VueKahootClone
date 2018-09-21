<template>
    <div class="container col-md-12" style="background: linear-gradient(to top, #4481eb 0%, #04befe 100%); height:100%; width:100%">
        <notifications position="top right"/>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <br><br><br><br><br>
            </div>
            <div class="col-md-12">
                <div class="container col-md-4">
                    <img src="../../../public/svg/Kahoot_Logo.svg" alt="">
                </div>
            </div>
            <div class="col-md-12">
                <center>
                    <h3>Welcome To Kahoot Clone.</h3>
                    <h6>Made By Timothy_mee</h6>

                    <br>
                    <h5 class="myh">To start, kindly copy the Game pin below and Click Start to begin the game</h5>

                    <br><br>
                    <h3>Game PIN: <strong class="myh">5497202</strong></h3>
                    <button class="btn btn-success col-md-3" @click="start()">Start</button>
                </center>
            </div>

            <div class="col-md-12">
                <br><br><br><br><br>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import router from '../routes.js'
    export default {
  name: 'Home',
  data () {
      return{

      }
  },

    methods:{
        start(){
            router.push({name: 'NewPlayer'});
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn{
        white-space: normal;
        word-wrap: break-word;
    }
    .myh{
        font-family: Courier New;
        font-size: 50px;
        color:white
    }
</style>
