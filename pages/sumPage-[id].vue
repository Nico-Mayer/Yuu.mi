<script setup>
// Variables
const date = Date.now()
const router = useRouter()

const sumId = ref(useRoute().params.id)
const apiKey = import.meta.env.VITE_API_KEY
const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${sumId.value}?api_key=${apiKey}`
const { data: sumData, error: sumDataErr } = await useFetch(url)
const { data: firestoreData, error: firestoreDataErr } = await useFetch(
  `/api/checkSum/${sumId.value}`
)

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
}
function addSumToDb() {
  //const { data } = useFetch(`/api/addSum/${"test"}`)
}

// Hooks
onMounted(() => {
  checkForFetchError()
})
</script>

<template>
  <main class="mx-auto max-w-7xl flex flex-1 px-4" v-if="sumData">
    <div class="h-44 z-10 py-4 flex flex-1">
      <div class="flex flex-col items-center w-32 whitespace-nowrap">
        <img
          class="w-16 h-16 rounded-full"
          :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${sumData.profileIconId}.jpg`"
          alt=""
        />
        <div class="flex flex-col">
          <div class="mt-4">
            <span>lvl</span>
            <span class="text-gruvOrangeM">= </span>
            <span class="text-gruvPurpleM">{{ sumData.summonerLevel }}</span>
          </div>

          <div class="mt-4">
            <span>soloQ<span class="text-gruvOrangeM">= </span></span>
            <span class="text-gruvRedM">{<br /></span>
            <span class="ml-10"
              >elo: <span class="text-gruvYellowM">"gold1"</span><br
            /></span>
            <span class="ml-10"
              >lp: <span class="text-gruvPurpleM">10</span><br
            /></span>
            <span class="ml-10"
              >winRate: <span class="text-gruvPurpleM">49%</span><br
            /></span>
            <span class="ml-10"
              >games: <span class="text-gruvPurpleM">244</span><br
            /></span>
            <span class="ml-10"
              >win: <span class="text-gruvBlueM">124</span><br
            /></span>
            <span class="ml-10"
              >loose: <span class="text-gruvRedM">124</span><br
            /></span>
            <span class="text-gruvRedM">}</span>
          </div>

          <div class="mt-4">
            <span>flexQ<span class="text-gruvOrangeM">= </span></span>
            <span class="text-gruvRedM">{<br /></span>
            <span class="ml-10"
              >elo: <span class="text-gruvAquaM">"plat2"</span><br
            /></span>
            <span class="ml-10"
              >lp: <span class="text-gruvPurpleM">91</span><br
            /></span>
            <span class="ml-10"
              >winRate: <span class="text-gruvPurpleM">52%</span><br
            /></span>
            <span class="ml-10"
              >games: <span class="text-gruvPurpleM">109</span><br
            /></span>
            <span class="ml-10"
              >win: <span class="text-gruvBlueM">55</span><br
            /></span>
            <span class="ml-10"
              >loose: <span class="text-gruvRedM">54</span><br
            /></span>

            <span class="text-gruvRedM">}</span>
          </div>
        </div>
      </div>

      <h1 class="text-lg text-gruvAquaM ml-6 font-semibold">
        &lt
        <span class="text-font0">{{ sumData.name }}</span>
        <span class="text-gruvBlue"> @euw</span>
        /&gt
      </h1>

      <div class="flex flex-1"></div>
      <button
        class="h-10 flex justify-self-end border-2 border-bg0h items-center px-4 py-2"
        @click="addSumToDb"
      >
        <span>{{ firestoreData ? "in Firestore" : "not in Firestore" }}</span>
      </button>
    </div>
  </main>
</template>
