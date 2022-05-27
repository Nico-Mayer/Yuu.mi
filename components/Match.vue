<script setup>
// Variables
const { matchData, index, sumId } = defineProps(["matchData", "index", "sumId"])
const teamBlue = ref(getTeam(100))
const teamRed = ref(getTeam(200))

const currentSum = ref(getSum(sumId))
const win = currentSum.value.win

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
      return "ranked solo"
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
    :class="`flex border-l-2 p-2 ${win ? 'border-gruvBlue' : 'border-gruvRed'}`"
  >
    <p>
      {{ getQType() }}
      {{ currentSum.championName.toLowerCase() }}

      {{ currentSum.kills }}
      {{ currentSum.assists }}
      {{ currentSum.deaths }}
    </p>
  </main>
</template>

<!-- <div class="flex flex-col">
      <p v-for="sum in teamBlue">{{ sum.summonerName }}</p>
    </div>
    <div class="flex flex-col">
      <p v-for="sum in teamRed">{{ sum.summonerName }}</p>
</div> -->
