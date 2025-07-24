<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="bg-[#D7D37F] h-[90vh] hidden 2xl:inline-block">
    <div class="relative px-15 h-full grid grid-cols-3 items-start gap-10 pt-12">
      <div class="col-span-2 grid grid-rows-2 justify-between items-start h-full">
        <div>
          <h1 class="text-[6.188rem] font-semibold text-[#FFEEEE] leading-[120%] z-20 relative ">Gimbap Salmon <br> and Avocado</h1>
          <div class="pt-12">
            <RouterLink :to="{name: 'recipe'}" class="bg-[#1F2D0F] py-4 px-6 rounded-4xl font-medium text-[#FFEEEE]" >View recipe</RouterLink>
          </div>
        </div>
      </div>
      <div class="absolute left-[30%] z-10 hidden lg:inline">
          <img src="@/assets/image/main.png" alt="">
      </div>
      <div class="self-end pb-14">
          <p class="text-base text-[#5C5B5B] ">A fresh and savory roll made with seasoned rice, creamy avocado, and grilled salmon wrapped in seaweed — ready in under 45 minutes.</p>
      </div>
    </div>
  </div>
  <div class="bg-[#D7D37F] md:h-[90vh]  md:inline-block 2xl:hidden">
    <div class="relative px-4 md:px-10 lg:px-15 h-full grid grid-cols-1 lg:grid-cols-3 justify-center items-center lg:gap-10 pt-12">
      <div class="md:col-span-2 h-full">
        <div>
          <h1 class="text-[2.563rem] md:text-[3.438rem] font-semibold text-[#FFEEEE] leading-[120%] z-20 md:relative ">Gimbap Salmon and Avocado</h1>
          <div class="pt-12 hidden md:inline-block">
            <RouterLink :to="{name: 'recipe'}" class="bg-[#1F2D0F] py-4 px-6 rounded-4xl font-medium text-[#FFEEEE]" >View recipe</RouterLink>
          </div>
        </div>
      </div>
      <div class="md:absolute md:inset-y-60 lg:inset-y-5 md:left-40 lg:left-[25%] z-10 inline-block pt-10">
          <img src="@/assets/image/main.png" alt="" class="md:w-[80%] lg:w-[50vw] 2xl:w-full w-full">
      </div>
      <div class="md:self-end md:pb-14 py-10">
          <p class="text-base text-[#5C5B5B] w-full text-justify md:text-center lg:text-start">A fresh and savory roll made with seasoned rice, creamy avocado, and grilled salmon wrapped in seaweed — ready in under 45 minutes.</p>
          <div class="pt-6 inline-block md:hidden">
            <RouterLink :to="{name: 'recipe'}" class="bg-[#1F2D0F] py-2 px-6 rounded-4xl font-medium text-[#FFEEEE]" >View recipe</RouterLink>
          </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 w-full h-[70%] items-start">
      <div class="">
        <img src="@/assets/image/main3.png" alt="" class=" w-full object-cover h-[80%]">
      </div>
      <div class="flex flex-col bg-[#221F20] py-4 px-4 md:py-10 md:ps-10 md:pe-10 lg:pe-15 justify-between  items-start overflow-hidden relative h-full">
          <h1 class="text-[1.875rem] lg:text-[3.438rem] 2xl:text-[6.188rem] font-semibold text-[#FFEEEE] leading-[120%]">Craft Flavors That Inspire You</h1>
          <div class="absolute lg:-right-25 2xl:right-0 lg:top-[15%] 2xl:top-[30%] hidden 2xl:inline">
            <img src="@/assets/image/maskot.png" alt="" class="lg:w-[70%] 2xl:w-full">
          </div>
          <p class="text-base text-[#FFEEEE] text-justify self-end pt-20  md:pt-0 md:pb-0">Explore our collection of playful and easy-to-follow recipes that transform everyday ingredients into something unforgettable. Whether you're cooking for yourself or sharing with friends, Pawlicious is your purrfect companion in the kitchen, ready to add a sprinkle of fun and a dash of feline charm to every dish.</p>
      </div>
  </div>
  <div>
  <div class="px-4 pt-10 md:px-10 lg:px-15 md:pt-20 2xl:pt-40">
    <div class="flex flex-row justify-between items-end">
      <h3 class="text-[1.875rem] lg:text-[3.438rem] font-semibold text-[#221F20] leading-[120%]">Bring recipes to your life</h3>
      <RouterLink :to="{name: 'recipe'}" class="text-base font-semibold text-[#221F20] hidden md:inline-block">view all recipes</RouterLink>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5 2xl:pt-20  gap-5 2xl:gap-10">
      <div class="w-full">
        <div class="overflow-hidden">
          <img src="@/assets/image/card.jpg" alt="" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col pt-4 w-full">
          <h6 class="text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem] 2xl:text-[2.563rem] font-semibold truncate overflow-hidden whitespace-nowrap w-full text-[#221F20]">
            Soto Ayam
          </h6>
        </div>
      </div>
      <div class="w-full">
        <div class="overflow-hidden">
          <img src="@/assets/image/card.jpg" alt="" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col pt-4 w-full">
          <h6 class="text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem] 2xl:text-[2.563rem] font-semibold truncate overflow-hidden whitespace-nowrap w-full text-[#221F20]">
            Soto Ayam
          </h6>
        </div>
      </div>
    </div>
    <!-- <div class="grid grid-cols-2 lg:my-20 2xl:my-40 gap-10 items-start justify-start">
      <div class="">
        <h1 class="lg:text-[3.438rem] 2xl:text-[6.188rem] font-semibold text-[#221F20] leading-[120%]">Capture your foods and share with your friends</h1>
        <div class="lg:pt-40 2xl:pt-60 lg:w-[90%] 2xl:w-[80%]">
          <div class="flex flex-row items-end bg-[#D7D37F] px-5 py-5 2xl:px-10 2xl:py-10 relative">
            <h3 class="lg:text-[1.875rem] 2xl:text-[3.438rem] font-bold text-[#ffeeee]">#PawliciousEats</h3>
            <div class="absolute -right-20 bottom-0">
              <img src="@/assets/image/snapshot.png" alt="" class="lg:w-[70%]">
            </div>
          </div>
        </div>
        <p class="text-[#221F20] text-base pt-10 lg:w-[80%] 2xl:w-[70%]">Take snapshots of your delicious creations and share them with the Pawlicious community. Whether it's a fancy gimbap or a cheesy comfort dish, your food deserves the spotlight. #PawliciousEats</p>
      </div>  
      <div>
        <img src="@/assets/image/capture.png" alt="" class="w-full h-full">
      </div>
    </div> -->
  </div>
  <div class="w-full flex justify-center py-8 md:hidden">
    <h6 class="px-6 py-2 bg-[#221F20] text-[#ffeeee] rounded-3xl">See More</h6>
  </div>
  </div>
</template>
