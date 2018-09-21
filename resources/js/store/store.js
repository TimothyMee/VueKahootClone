import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    result:{

    }
}


const getters = {
    evenOrOdd: (state) => {
        if(state.count % 2 === 0){
            return 'even';
        }else{
            return 'odd';
        }
    }
}

const mutations = {
    increaseCorrectScore (state, player){
        if (player === 'player1'){
            state.result.player1.correctAnswerCount++
        }else if(player === 'player2'){
            state.result.player2.correctAnswerCount++
        }
    },

    createUser(state, user){
        state.result[user] = {
            score: 0,
            position:null,
            finished:false
        }
    },

    updateScore(state, user){
        state.result[user.username] = {
            score: user.score,
            position:user.position,
            finished: false,
        }
    },

    markUserAsFinished(state, user){
        state.result[user].finished = true;
    }
}

export default new Vuex.Store({
    state,
    mutations
})



















// import Vue from 'vue'
// import Vuex from 'vuex'
//
// Vue.use(Vuex);
//
// const state = {
//   count: 4,
// }
//
// const getters = {
//   evenOrOdd: (state) => {
//       if(state.count % 2 === 0){
//           return 'even';
//       }else{
//           return 'odd';
//       }
//   }
// }
//
// const mutations = {
//     correct(state){
//         state.correctAnswers++
//     },
//
//     decrement(state){
//         state.count--
//     }
//
// }
//
// export default new Vuex.Store({
//   state,
//     getters,
//     mutations
// })
//
