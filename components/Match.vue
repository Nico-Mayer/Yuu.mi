<script setup>
// Variable
const { matchData, index, sumId } = defineProps(["matchData", "index", "sumId"])
const teamBlue = ref(getTeam(100))
const teamRed = ref(getTeam(200))
const currentSum = ref(getSum(sumId))
const win = currentSum.value.win
const router = useRouter()
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
async function findSum(id) {
  router.push(`/sumPage-${id}`)
}
// Hooks
</script>

<template>
  <main
    :class="`flex p-4 border-opacity-50 justify-between ${
      win ? 'border-gruvBlue' : 'border-gruvRed'
    } hover:border-opacity-100 border border-l-4 transition-all duration-250 my-4`"
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
        <img src="" alt="" />
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
    <div class="grid grid-cols-3 items-center gap-2 h-16">
      <img
        v-if="currentSum.item0"
        :src="`http://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${currentSum.item0}.png`"
        alt=""
        class="w-8 h-8 rounded-lg border-bg0"
      />
      <img
        v-if="currentSum.item1"
        :src="`http://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${currentSum.item1}.png`"
        alt=""
        class="w-8 h-8 rounded-lg"
      />
      <img
        v-if="currentSum.item2"
        :src="`http://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${currentSum.item2}.png`"
        alt=""
        class="w-8 h-8 rounded-lg"
      />
      <img
        v-if="currentSum.item3"
        :src="`http://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${currentSum.item3}.png`"
        alt=""
        class="w-8 h-8 rounded-lg"
      />
      <img
        v-if="currentSum.item4"
        :src="`http://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${currentSum.item4}.png`"
        alt=""
        class="w-8 h-8 rounded-lg"
      />
      <img
        v-if="currentSum.item5"
        :src="`http://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${currentSum.item5}.png`"
        alt=""
        class="w-8 h-8 rounded-lg"
      />
    </div>

    <div class="flex text-sm cursor-pointer">
      <div class="flex-col w-20 truncate ... mr-4">
        <div
          class="flex opacity-80 hover:opacity-100"
          v-for="sum in teamBlue"
          @click="findSum(sum.summonerId)"
        >
          <img
            class="w-5 h-5 rounded-full mr-1"
            :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${sum.championId}.png`"
            alt="#"
          />
          <span>{{ sum.summonerName }}</span>
        </div>
      </div>

      <div class="flex-col w-20 truncate ...">
        <div
          class="flex opacity-80 hover:opacity-100"
          v-for="sum in teamRed"
          @click="findSum(sum.summonerId)"
        >
          <img
            class="w-5 h-5 rounded-full mr-1"
            :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${sum.championId}.png`"
            alt="#"
          />
          <span>{{ sum.summonerName }}</span>
        </div>
      </div>
    </div>
  </main>
</template>
