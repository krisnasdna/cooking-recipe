import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeView from '@/views/Recipe/RecipeView.vue'
import DetailRecipeView from '@/views/Recipe/DetailRecipeView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import ForgotView from '@/views/Auth/ForgotView.vue'
import ResetPasswordView from '@/views/Auth/ResetPassword.view.vue'
import EditRecipeView from '@/views/Recipe/EditRecipeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useAuthStore } from '@/stores/auth'
import { useTokenStore } from '@/stores/token'
import { useLoadingStore } from '@/stores/loading'
import { nextTick } from 'vue'
import MyRecipeView from '@/views/Recipe/MyRecipeView.vue'
import CreateRecipeView from '@/views/Recipe/CreateRecipeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        hideHeader: true
      }
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
      path: '/my-recipes/edit/:id',
      name: 'addRecipe',
      component: EditRecipeView,
      meta: { requiresAuth : true}
    },
    {
      path: '/my-recipes',
      name: 'myRecipe',
      component: MyRecipeView,
      meta: { requiresAuth : true},
    },
    {
      path: '/my-recipes/create',
      name: 'addrecipe',
      component: CreateRecipeView,
      meta: { requiresAuth : true},
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        hideHeader: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        hideHeader: true
      }
    },
    {
      path: '/forget-password',
      name: 'forgetPassword',
      component: ForgotView,
      meta: {
        hideHeader: true
      }
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: ResetPasswordView,
      meta: {
        hideHeader: true
      },
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

router.beforeEach(async (to, from) => {
  const loading = useLoadingStore()
  const auth = useAuthStore()

  loading.show()

  if (to.meta.requiresAuth) {
    await auth.getUser()
    if (!auth.user) {
      loading.hide()
      return { name: 'login' }
    }
  }


  const authPages = ['/login', '/register', '/forgetPassword']
  if (authPages.includes(to.fullPath) && auth.user) {
    loading.hide()
    return { name: 'home' }
  }


  return true
})

router.afterEach(() => {
  const loading = useLoadingStore()
  nextTick(() => {
    setTimeout(() => {
      loading.hide()
    }, 3500) 
  })
})

export default router
