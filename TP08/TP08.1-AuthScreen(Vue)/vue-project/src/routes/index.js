import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../views/Login.vue';

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'login',
            component: LoginForm
        }
    ]
})
export default router;