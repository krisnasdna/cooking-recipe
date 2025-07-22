import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeView from '@/views/Recipe/RecipeView.vue'
import DetailRecipeView from '@/views/DetailRecipeView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import ForgotView from '@/views/Auth/ForgotView.vue'
import ResetPasswordView from '@/views/Auth/ResetPassword.view.vue'
import { useAuthStore } from '@/stores/auth'
import { useTokenStore } from '@/stores/token'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recipe',
      name: 'recipe',
      component: RecipeView,
    },
    {
      path: '/recipe/:id',
      name: 'detailRecipe',
      component: DetailRecipeView,
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
    },
    {
      path: '/forget-password',
      name: 'forgetPassword',
      component: ForgotView,
      meta: {guest: true}
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: ResetPasswordView,
      beforeEnter: async (to, from) =>{
        const token = useTokenStore()

        if(!token.resetToken && to.fullPath){
          return {name: 'login'}
        }

       try {
          const res = await fetch('https://api-recipes-alpha.vercel.app/api/api/verify-reset-token', {
            headers: {
              Authorization: `Bearer ${token.resetToken}`,
              Accept: 'application/json'
            }
          })
          const data = await res.json()
          if (res.status === 401) {
            console.log(data)
            return { name: 'login' }
          }
          console.log(data)
          return true 

        } catch (err) {
          return { name: 'login' }
        }
      }
    }
  ],
})

router.beforeEach(async (to, form) =>{
  const auth = useAuthStore()
  auth.getUser()

  if(auth.user && to.meta.guest){
    return {name:'home'}
  }
})
export default router
