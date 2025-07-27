import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal', ()=>{
    const isToggleLogout = ref(false)
    const isToggleRemove = ref(false)
    const isToast = ref(false)
    const messages = ref('')
    const id = ref(0)
    function showModalLogout(){
        isToggleLogout.value = true
    }

    function showModalRemove(idRecipe: number){
        isToggleRemove.value = true
        id.value = idRecipe
    }

    function showToast(message: string){
        isToast.value = true
        messages.value = message
    }

    function hideModalRemove(){
        isToggleRemove.value = false
 
    }

    function hideModalLogout(){
        isToggleLogout.value = false
    }
    
    function hideToast(){
        isToast.value = false
        messages.value = ''
    }
    return {
        isToggleLogout,
        showModalLogout,
        hideModalLogout,
        isToggleRemove,
        hideModalRemove,
        showModalRemove,
        isToast,
        showToast,
        hideToast,
        id,
        messages
    }
})