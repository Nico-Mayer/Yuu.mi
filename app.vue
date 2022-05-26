<script setup>
// Variables
const router = useRouter()
const sumData = ref({
  id: "",
  name: "",
})
const apiKey = import.meta.env.VITE_API_KEY

// Functions
async function findSummoner(name) {
  const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`
  const { data, error } = await useFetch(url, { pick: ["id", "name"] })
  sumData.value = data.value
  if (!error.value) {
    router.push(`/sumPage-${sumData.value.id}`)
  } else {
    router.push(`/sumNotFound-${name}`)
  }
}

// Hooks
</script>

<template>
  <Head>
    <Title>Yuu.mi</Title>
  </Head>
  <div
    class="font-mono text-font0 h-screen outline outline-offset-[-17px] outline-2 outline-bg0h p-4"
  >
    <Navbar @findSum="findSummoner" />
    <NuxtPage />
  </div>
</template>
