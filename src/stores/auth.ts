import { defineStore } from "pinia";
import { useTokenStore } from "./token";
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useLoadingStore } from "./loading";
import { useForm } from "vee-validate";

export interface User{
        id: number | null
        name:string | null
        email : string | null
        avatar?: string | null
}
export const useAuthStore = defineStore('auth', () =>{
    const token = useTokenStore()
    const router = useRouter()
    interface Form{
        name: string
        email:string
        password: string
    }
    const user: Ref<User | null> = ref(null)
    const error:Ref<Form | null> = ref(null)
    const loading = useLoadingStore()
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
         if (data.errors) {
            error.value = data.errors;
            return data.errors;
        }

        token.setTokens(data.token, data.refresh_token);
        user.value = data.user;
        router.push('/');
        return null
    }

    const getUser = async () =>{
        loading.show()
        try {
            const res = await token.authFetch('user');

            if (!res || !res.ok) return;

            const data = await res.json();
            user.value = data;
        } catch (error) {
            console.debug('Gagal mendapatkan user, kemungkinan belum login');
        }finally{
            loading.hide()
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
            user.value = null
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
            if(res.ok){
                error.value = null
                token.clearResetToken()
                router.push('/login')
            }

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
        resetPassword,
        loading
    }
})