import Router from 'vue-router'
import NewPlayer from './components/NewPlayer.vue'
import SinglePlayer from './components/SinglePlayer.vue'

export default new Router({
    routes: [

        {
            path: '/',
            name: 'NewPlayer',
            component: NewPlayer
        },

        {
            path: '/single-player',
            name: 'SinglePlayer',
            component: SinglePlayer
        },
    ]
})
