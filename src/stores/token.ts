import { defineStore } from "pinia";
import { ref } from "vue";
export const useTokenStore = defineStore('token', ()=>{
    const accessToken = ref<string | null>(localStorage.getItem('access_token'))
    const refreshToken = ref<string | null>(localStorage.getItem('refresh_token'))

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

    const refreshAccessToken = async () =>{
        try{
            const res = await fetch('https://api-recipes-alpha.vercel.app/api/api/refresh-token',{
                method: 'get',
                headers:{
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

        let res = await fetch(`https://api-recipes-alpha.vercel.app/api/api/${endpoint}`,{
            ...options,
            headers:{
                ...options.headers,
                Authorization : `Bearer ${token}`
            }
        })

        if(res.status === 401){
            const newToken = await refreshAccessToken()
            if(!newToken) return res

            res = await fetch(`https://api-recipes-alpha.vercel.app/api/api/${endpoint}`,{
                ...options,
                headers:{
                    ...options.headers,
                    Authorization : `Bearer ${newToken}`
                }
            })
        }

        return res

    }

    return {
        accessToken,
        refreshToken,
        setTokens,
        clearTokens,
        refreshAccessToken,
        authFetch
    }
})