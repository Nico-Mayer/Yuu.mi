<script setup>
const { matchHist } = defineProps(["matchHist", "sumId"])
const matchHistData = ref(null)
const loading = ref(true)

function resolvePromise() {
  matchHist
    .then((res) => {
      matchHistData.value = res
      loading.value = false
    })
    .catch((err) => {
      console.log("Error on resolving match data Promise")
    })
}

onMounted(() => {
  resolvePromise()
})
</script>

<template>
  <div v-if="loading">loading...</div>
  <main
    class="p-8"
    v-if="matchHistData"
    v-for="(match, index) in matchHistData"
  >
    <Match :matchData="match" :index="index" :sumId="sumId" />
  </main>
</template>
