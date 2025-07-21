import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '@/views/EditView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recipe/:id',
      name: 'detailRecipe',
      component: EditView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {guest : true}
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {guest: true}
    }
  ],
})

router.beforeEach(async (to, form) =>{
  const auth = useAuthStore()
  await auth.getUser()

  if(auth.user && to.meta.guest){
    return {name:'home'}
  }
})
export default router
