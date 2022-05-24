<script setup>
// Variables
const router = useRouter()
const sumId = ref(useRoute().params.id)
const apiKey = import.meta.env.VITE_API_KEY
const sumData = ref(getSumData())

// Functions
async function getSumData() {
  const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${sumId.value}?api_key=${apiKey}`
  const { data, error } = await useFetch(url)
  if (!error.value) {
    sumData.value = data.value
  } else {
    router.push("/sumNotFound-id=" + sumId.value)
  }
}

async function checkSumDb() {
  if (sumData.value) {
    console.log("api call ins backend")
    await useFetch(`/api/checkSum/${sumId.value}`)
  }
}

// Hooks
onMounted(() => {
  checkSumDb()
})
</script>

<template>
  <main class="px-10">
    <div class="h-44 z-10 text-red py-4 flex">
      <div class="flex flex-col items-center">
        <img
          class="w-16 h-16 rounded-full"
          :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${sumData.profileIconId}.jpg`"
          alt=""
        />
        <span>189</span>
      </div>

      <h1 class="text-lg ml-6">{{ sumData.name }}</h1>
    </div>
    <!-- <div>
      {{ sumData }}
    </div> -->
  </main>
</template>
