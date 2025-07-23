<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>

  <div class="bg-[#F74909] h-[87vh] mx-5 relative">
    <div class="absolute  -top-3 -right-1 -left-2">
      <img src="@/assets/image/stripe.png" alt="" class="w-full">
    </div>
    <div class="absolute  -bottom-3 -right-1 -left-2 rotate-180">
      <img src="@/assets/image/stripe.png" alt="" class="w-full">
    </div>
    <div class="mx-5 relative h-full grid grid-cols-2 items-start gap-10 pt-13">
      <div>
          <h1 class="text-[4.188rem] font-bold text-[#FCF1E0] leading-[128%]">Gak perlu jadi chef buat <br> masak enak!</h1>
          <div class="pt-6">
            <RouterLink :to="{name: 'recipe'}" class="bg-[#FCF1E0] py-2 px-3 rounded-xl font-semibold text-[#004810]" >Yuk lihat resep</RouterLink>
          </div>
      </div>
      <div class="absolute inset-y-30 right-90">
        <img src="@/assets/image/main-hero-cook.png" alt="" class="w-[87%]">
      </div>
      <div class="self-end pb-13">
        <p class="text-[#FCF1E0]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec sapien ultrices, sagittis metus ut, cursus quam. Fusce iaculis euismod sem, eget cursus libero pharetra id. In hac habitasse platea dictumst. </p>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-4">
    <div>

    </div>
    <div>

    </div>
  </div>
  
</template>
