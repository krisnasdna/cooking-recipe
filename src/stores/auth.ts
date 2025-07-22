import { defineStore } from "pinia";
import { useTokenStore } from "./token";
import { ref, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () =>{
    const token = useTokenStore()
    const router = useRouter()
    interface Form{
        name: string
        email:string
        password: string
    }
    interface User{
        id: number
        name:string
        email : string
        password: string
        avatar?: string
    }
    const user: Ref<User | null> = ref(null)

    const error:Ref<Form | null> = ref(null)

    const authenticate = async (endpoint: string, formData: {}) => {
        const res = await fetch(`https://api-recipes-alpha.vercel.app/api/api/${endpoint}`,{
            headers:{
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            method: 'post',
            body: JSON.stringify(formData)
        })

        const data = await res.json()

        if(data.errors){
           error.value = data.errors
        }else{
            error.value = null
            token.setTokens(data.token, data.refresh_token)
            user.value = data.user
            router.push('/')
        }
    }

    const getUser = async () =>{
        try {
            const res = await token.authFetch('user');

            if (!res || !res.ok) return;

            const data = await res.json();
            user.value = data;
        } catch (error) {
            console.debug('Gagal mendapatkan user, kemungkinan belum login');
        }
    }


    const logout = async () =>{
        const res = await token.authFetch('logout',{
            method: 'post'
        })

        const data = await res?.json()

        if(res?.ok){
            token.clearTokens()
            error.value = null
            router.push('/')
        }
    }

    const forgotPassword = async (formData: {}) => {
        try{
            const res = await fetch('https://api-recipes-alpha.vercel.app/api/api/forget-password',{
                headers:{
                    Accept : 'application/json',
                    'Content-Type' : 'application/json'
                },
                method: 'post',
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if(data.errors){
                error.value = data.errors
                
            }
            token.setResetToken(data.token)
            router.push('/reset-password')
        }catch(error){
            return error
        }
    }

     const resetPassword = async (formData: {}) => {
        const resetToken  = token.resetToken
        try{
            const res = await fetch('https://api-recipes-alpha.vercel.app/api/api/reset-password',{
                headers:{
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${resetToken}`
                },
                method: 'post',
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if(data.errors){
                error.value = data.errors
            }
            token.clearResetToken()
            router.push('/login')
            
        }catch(error){
            return error
        }
    }

    return {
        authenticate,
        error,
        user,
        getUser,
        logout,
        forgotPassword,
        resetPassword
    }
})