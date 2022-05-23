<script setup>
const route = useRoute()
</script>

<template>
  <main>Summoner {{ route.params.name }} not found!</main>
</template>
