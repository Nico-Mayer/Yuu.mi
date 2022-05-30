<script setup>
// Variables
const { matchData, index, sumId } = defineProps(["matchData", "index", "sumId"])
const teamBlue = ref(getTeam(100))
const teamRed = ref(getTeam(200))

const currentSum = ref(getSum(sumId))
const win = currentSum.value.win

const date = computed(() => {
  const hours = Math.round((Date.now() - matchData.gameCreation) / 1000 / 3600)
  const days = Math.round(
    (Date.now() - matchData.gameCreation) / 1000 / 3600 / 24
  )

  if (days < 1) {
    return `${hours}h ago`
  }
  if (days === 1) {
    return "1 day ago"
  } else {
    return `${days} days ago`
  }
})
const duration = computed(() => {
  const minutes = Math.floor(matchData.gameDuration / 60)
  const seconds = matchData.gameDuration - minutes * 60
  return `${minutes}m ${seconds}s`
})

console.log(currentSum.value)

// Functions
function getTeam(teamId) {
  const participants = matchData.participants
  const team = []
  for (const sum of participants) {
    if (sum.teamId == teamId) {
      team.push(sum)
    }
  }
  return team
}
function getSum(sumId) {
  for (const sum of matchData.participants) {
    if (sum.summonerId === sumId) {
      return sum
    }
  }
}

function getQType() {
  switch (matchData.queueId) {
    case 420:
      return "rankedSolo"
    case 700:
      return "clash"
    case 440:
      return "flex 5:5"
    case 450:
      return "aram"
    case 400:
      return "normal"
  }
}
// Hooks
</script>

<template>
  <main
    :class="`flex border-l-2 p-2 ${
      win ? 'border-gruvBlue' : 'border-gruvRed'
    } border`"
  >
    <div class="mr-4">
      <p
        :class="`${win ? 'text-gruvBlue ' : 'text-gruvRed '} font-bold text-lg`"
      >
        &lt
        <span class="text-font0">{{ getQType() }}</span>

        /&gt
      </p>
      <p>{{ date }}</p>
      <p>
        <span>win</span>
        <span class="text-gruvOrangeM"> = </span>
        <span :class="`${win ? 'text-gruvBlue ' : 'text-gruvRed '}`">{{
          win
        }}</span>
      </p>
      <p>{{ duration }}</p>
    </div>

    <div class="flex justify-center flex-col items-center">
      <div class="flex">
        <img
          class="w-12 h-12 rounded-full"
          :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${currentSum.championId}.png`"
          alt="#"
        />
        <img src="" alt="">
      </div>

      <p>
        &lt
        {{ currentSum.championName.toLowerCase() }}
        /&gt
      </p>
      <p>
        <span>{{ currentSum.kills }}/</span>
        <span class="text-gruvRedM">{{ currentSum.deaths }}</span>
        <span>/{{ currentSum.assists }}</span>
      </p>
    </div>
  </main>
</template>

<!-- <div class="flex flex-col">
      <p v-for="sum in teamBlue">{{ sum.summonerName }}</p>
    </div>
    <div class="flex flex-col">
      <p v-for="sum in teamRed">{{ sum.summonerName }}</p>
</div> -->
