<script setup>
const { sumData } = defineProps(["sumData"])
const emits = defineEmits(["changeTab"])
</script>

<template>
  <main class="w-full flex flex-col">
    <div class="flex justify-between w-full items-center">
      <div class="flex">
        <div
          class="text-xl text-gruvAquaM font-semibold mr-5 whitespace-nowrap"
        >
          &lt
          <span class="text-font0">{{ sumData.name }}</span>
          <span class="text-gruvBlue"> @euw</span>
          /&gt
        </div>
      </div>
    </div>
  </main>
</template>
