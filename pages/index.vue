<script setup>
const apiKey = import.meta.env.VITE_API_KEY
const top10 = ref([])
const { data: top300 } = useFetch(
  `https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${apiKey}`
)

function getTopTen() {
  let temp = top300.value.entries
  temp.sort((a, b) => {
    if (a.leaguePoints < b.leaguePoints) {
      return 1
    } else {
      return -1
    }
  })
  top10.value = temp.slice(0, 10)
}

onMounted(() => {
  getTopTen()
})
</script>

<template>
  <main class="flex mx-auto max-w-7xl justify-center mt-80">
    <h1 class="font-semibold text-5xl">Home...</h1>
    <div class="flex flex-col">
      <p v-for="sum in top10">{{ sum.summonerName }}</p>
    </div>
  </main>
</template>
