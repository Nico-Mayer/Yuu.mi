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
  <main>{{ sumData }}</main>
</template>
