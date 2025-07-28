<template>
    <transition name="fade">
        <div
        v-if="modal.isToggleLogout"
        class="fixed inset-0 z-[8888] bg-black/40 "
        @click.self="modal.hideModalLogout()"
        >
        <div
            class="fixed top-10 left-1/2 transform -translate-x-1/2 bg-[#FCF1E0] w-[22rem] md:w-[28rem] rounded-3xl p-6 shadow-lg px-4"
        >
            <div class="flex flex-row justify-center items-start gap-4">
                <div class="w-12 pt-1">
                    <img src="@/assets/image/danger.png" alt=""></img>
                </div>
                <div>
                    <h6 class="text-lg font-medium text-[#221F20] mb-2 font-main h-full">
                        {{ authLoading ? 'Processing...' : 'Logout account' }}
                    </h6>
                    <p class="text-base font-normal font-main text-[#5C5B5B]">
                        Are you sure you want to log out of your account? You'll need to log in again to access your data.
                    </p>
                </div>
            </div>
            <div class="flex justify-end gap-2 pt-6">
            <button
                class="border border-[#221F20] text-[#221F20] text-sm px-10 py-1.5 rounded-full hover:bg-[#e8e3d4] font-main cursor-pointer"
                @click="modal.hideModalLogout()"
            >
                No
            </button>
            <form @submit.prevent="logout">
                <button class="bg-[#221F20] text-white text-sm px-10 py-1.5 rounded-full hover:bg-[#333] font-main cursor-pointer">
                    Yes
                </button>
            </form>
            </div>
        </div>
        </div>
    </transition>
    <transition name="fade">
    <div
      v-if="modal.isToggleRemove"
      class="fixed inset-0 z-[8888] bg-black/40 "
      @click.self="modal.hideModalRemove()"
    >
      <div
        class="fixed top-10 left-1/2 transform -translate-x-1/2 bg-[#FCF1E0] w-[22rem] md:w-[28rem] rounded-3xl p-6 shadow-lg px-4"
      >
        <div class="flex flex-row justify-center items-start gap-4">
            <div class="w-12 pt-1">
                <img src="@/assets/image/danger.png" alt=""></img>
            </div>
            <div>
                <h6 class="text-lg font-medium text-[#221F20] mb-2 font-main h-full">
                    {{ loading ? 'Processing....' : ' Remove recipe' }}
                </h6>
                <p class="text-base font-normal font-main text-[#5C5B5B]">
                    Are you sure you want to delete this recipe? All of its data will be permanently removed. This action cannot be undone.
                </p>
            </div>
        </div>
        <div class="flex justify-end gap-2 pt-6">
          <button
            class="border border-[#221F20] text-[#221F20] text-sm px-10 py-1.5 rounded-full hover:bg-[#e8e3d4] font-main"
            @click="modal.hideModalRemove()"
            :disabled="loading"
          >
            No
          </button>
          <form @submit.prevent="removeRecipe(modal.id)">
            <button class="bg-[#221F20] text-white text-sm px-10 py-1.5 rounded-full hover:bg-[#333] font-main" :disabled="loading">
                Yes
            </button>
          </form>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
        <div
        v-if="modal.isToast"
        class="fixed inset-0 z-[8888]"
        @click.self="modal.hideToast()"
        >
        <div class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[#FCF1E0] w-[16rem] rounded-lg py-2 shadow-lg px-4">
            <h6 class="text-base font-normal font-main text-[#221F20]">
                {{ modal.messages }}
            </h6>
        </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { useRecipeStore } from '@/stores/recipies';
import { storeToRefs } from 'pinia';
const {logout} = useAuthStore()
const modal = useModalStore()
const {removeRecipe} = useRecipeStore()
const {loading} = storeToRefs(useRecipeStore())
const{ loading:authLoading} = storeToRefs((useAuthStore()))
</script>

<style scoped>

</style>