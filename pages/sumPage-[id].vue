<script setup>
// Variables
const router = useRouter()
const sumId = ref(useRoute().params.id)
const apiKey = import.meta.env.VITE_API_KEY
const riotUrl = "https://euw1.api.riotgames.com/lol/"
const { data: sumData, error: sumDataErr } = await useFetch(
  `${riotUrl}summoner/v4/summoners/${sumId.value}?api_key=${apiKey}`
)
const { data: rankData, error: rankDataErr } = await useFetch(
  `${riotUrl}league/v4/entries/by-summoner/${sumId.value}?api_key=${apiKey}`
)
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
  if (!rankDataErr.value) {
    console.log("No Error on rankData Load!")
  }
  if (rankDataErr.value) {
    console.log("Error on rankData Load!")
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
    <Sidebar :sumData="sumData" :rankData="rankData" />

    <div class="w-full flex flex-col">
      <div class="flex justify-between w-full items-center p-8">
        <div class="text-xl text-gruvAquaM font-semibold">
          &lt
          <span class="text-font0">{{ sumData.name }}</span>
          <span class="text-gruvBlue"> @euw</span>
          /&gt
        </div>
        <div class="flex items-center">
          <button
            class="flex mr-2 border border-bg0h px-2 items-center space-x-4"
          >
            <div>update</div>
            <div
              :class="
                (firestoreData ? 'bg-gruvAquaM ' : 'bg-gruvRedM ') +
                ' w-2 opacity-70 h-2 rounded-full animate-pulse'
              "
            />
          </button>
        </div>
      </div>

      <div class="flex flex-1 px-4">Content</div>
    </div>
  </main>
</template>
