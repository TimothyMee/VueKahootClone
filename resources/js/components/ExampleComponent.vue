<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        I'm an example component.

                        <button @click="clickMe">ClickMe</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                messages:'',
            }
        },
        methods:{
          clickMe(){
              axios.post('/add-score', {'user': 'Timothy', 'score': 5})
                  .then(response => {
                      console.log(response);
                  })
                  .catch(error => {
                      console.log(error);
                  })
          }
        },
        mounted() {
            console.log('Component mounted.');

            window.Echo.channel('score')
                .listen('CorrectAnswer', (e) =>{
                    console.log(e);
                    this.messages = {
                        score: e.score,
                        user: e.user
                    };
                });

            console.log(this.messages);
        }
    }
</script>
