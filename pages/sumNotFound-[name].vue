<script setup>
const route = useRoute()
</script>

<template>
  <main class="flex max-w-7xl m-auto mt-80 items-center justify-center">
    <h1 class="font-bold text-xl opacity-60">
      Summoner <span class="text-gruvAquaM">{{ route.params.name }} </span> not
      found!
    </h1>
  </main>
</template>
