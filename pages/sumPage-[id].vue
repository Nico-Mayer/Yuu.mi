<script setup>
// Variables
const router = useRouter()
const sumId = ref(useRoute().params.id)
const apiKey = import.meta.env.VITE_API_KEY
const riotUrl = "https://euw1.api.riotgames.com/lol/"
const activeTab = ref("matchHistory")
// API Calls
const { data: sumData, error: sumDataErr } = await useFetch(
  `${riotUrl}summoner/v4/summoners/${sumId.value}?api_key=${apiKey}`
)
const { data: rankData, error: rankDataErr } = await useFetch(
  `${riotUrl}league/v4/entries/by-summoner/${sumId.value}?api_key=${apiKey}`
)
const { data: firestoreData, error: firestoreDataErr } = await useFetch(
  `/api/checkSum/${sumId.value}`
)
const matchIdsCallString = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${sumData.value.puuid}/ids?start=0&count=10&api_key=${apiKey}`
const { data: matchHistIds, error: matchHistIdsErr } = await useFetch(
  matchIdsCallString
)
const matchHist = ref(getMatchHist(matchHistIds.value))

// Functions
function checkForFetchError() {
  if (!sumDataErr.value) {
    console.log("No Error on sumData Load!")
  }
  if (sumDataErr.value) {
    console.log("Error on sumData Load!")
    router.push(`sumNotFound-id=${sumId.value}`)
  }
  if (!firestoreDataErr.value) {
    console.log("No Error on firestoreData Load!")
  }
  if (firestoreDataErr.value) {
    console.log("Error on firestoreData Load!")
  }
  if (!rankDataErr.value) {
    console.log("No Error on rankData Load!")
  }
  if (rankDataErr.value) {
    console.log("Error on rankData Load!")
  }
  if (!matchHistIdsErr.value) {
    console.log("No Error on matchHistIds Load!")
  }
  if (matchHistIdsErr.value) {
    console.log("Error on matchHistIds Load!")
  }
}
function addSumToDb() {
  //const { data } = useFetch(`/api/addSum/${"test"}`)
}
function changeTab(name) {
  activeTab.value = name
}
async function getMatchHist(matchIds) {
  let matchHistory = []
  for (const id of matchIds) {
    const { data: match, error: matchLoadErr } = await useFetch(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${apiKey}`
    )
    if (!matchLoadErr.value) {
      matchHistory.push(match.value.info)
    }
  }
  return matchHistory
}

// Hooks
onMounted(() => {
  checkForFetchError()
})
</script>

<template>
  <main class="mx-auto max-w-7xl flex flex-1 px-4" v-if="sumData">
    <Sidebar :sumData="sumData" :rankData="rankData" />
    <div class="flex flex-col w-full">
      <Topbar
        :sumData="sumData"
        :firestoreData="firestoreData"
        :activeTab="activeTab"
        @changeTab="changeTab"
      />
      <MatchHistoryTab
        v-if="activeTab == 'matchHistory'"
        :matchHist="matchHist"
      />

      <div v-if="activeTab == 'comments'">{{ activeTab }}</div>
    </div>
  </main>
</template>
