import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
export const useTokenStore = defineStore('token', ()=>{
    const router = useRouter()
    const accessToken = ref<string | null>(localStorage.getItem('access_token'))
    const refreshToken = ref<string | null>(localStorage.getItem('refresh_token'))
    const resetToken = ref<string | null>(localStorage.getItem('reset_token'))

    function setTokens(access: string , refresh: string ){
        accessToken.value = access
        refreshToken.value = refresh
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
    }

    function clearTokens(){
        accessToken.value = null
        refreshToken.value = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }

    function setResetToken(reset : string){
        resetToken.value = reset
        localStorage.setItem('reset_token', reset)
    }

    function clearResetToken(){
        resetToken.value = null
        localStorage.removeItem('reset_token')
    }


    const refreshAccessToken = async () =>{
        try{
            const res = await fetch('https://api-recipes-alpha.vercel.app/api/api/refresh-token',{
                method: 'get',
                headers:{
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${refreshToken.value}`
                }
            })

            if(!res.ok){
                throw new Error('Refresh Token Invalid')
            }

            const data = await res.json()

            setTokens(data.token, refreshToken.value!)

            return data.token

        }catch(err){
            clearTokens()
            return null
        }
    }

    const authFetch = async (endpoint: string, options : RequestInit = {}) =>{
        const token = accessToken.value

        if (!token) return 

        let res = await fetch(`https://api-recipes-alpha.vercel.app/api/api/${endpoint}`,{
            ...options,
            headers:{
                ...options.headers,
                Accept : 'application/json',
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            }
        })

        if(res.status === 401){
            try{
                const newToken = await refreshAccessToken()
                if(!newToken) return res

                res = await fetch(`https://api-recipes-alpha.vercel.app/api/api/${endpoint}`,{
                    ...options,
                    headers:{
                        ...options.headers,
                        Accept : 'application/json',
                        'Content-Type' : 'application/json',
                        Authorization : `Bearer ${newToken}`
                    }
                    })
            }catch(err){
                return new Response(null, { status: 401 });
            }

        }

        return res

    }
    return {
        accessToken,
        refreshToken,
        setTokens,
        clearTokens,
        refreshAccessToken,
        authFetch,
        setResetToken,
        clearResetToken,
        resetToken,
    }
})