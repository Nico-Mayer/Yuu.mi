<script setup>
const { matchHist } = defineProps(["matchHist"])
const matchHistData = ref(null)
const loading = ref(true)

function resolvePromise() {
  matchHist.then((res) => {
    console.log(res)
    matchHistData.value = res
    loading.value = false
  })
}

onMounted(() => {
  resolvePromise()
})
</script>

<template>
  <div v-if="loading">loading...</div>
  <main v-if="matchHistData">{{ matchHistData }}</main>
</template>
