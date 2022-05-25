<script setup>
// Variables
const { sumData, rankData } = defineProps(["sumData", "rankData"])
const soloQData = ref(null)

const flexQData = ref(null)

const soloQWinRate = computed(() =>
  Math.round(
    soloQData.value.wins /
      ((soloQData.value.wins + soloQData.value.losses) / 100)
  )
)
const flexQWinRate = computed(() =>
  Math.round(
    flexQData.value.wins /
      ((flexQData.value.wins + flexQData.value.losses) / 100)
  )
)

// Functions
function sortRankData() {
  if (rankData) {
    rankData.forEach((ele) => {
      if (ele.queueType == "RANKED_SOLO_5x5") {
        soloQData.value = ele
      }
      if (ele.queueType == "RANKED_FLEX_SR") {
        flexQData.value = ele
      }
    })
  }
}
function getRankColor(rank) {
  switch (rank) {
    case "IRON":
      return "text-[#665c54]"
    case "SILVER":
      return "text-[#ebdbb2]"
    case "GOLD":
      return "text-[#fabd2f]"
    case "PLATINUM":
      return "text-[#8ec07c]"
    case "DIAMOND":
      return "text-[#458588]"
    default:
      return "text-[#cc241d]"
  }
}

// Hooks
onMounted(() => {
  sortRankData()
})
</script>

<template>
  <main class="flex flex-col items-center border-r border-bg0h px-8 pt-8">
    <img
      class="w-20 h-20 rounded-full mb-8"
      :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${sumData.profileIconId}.jpg`"
      alt=""
    />
    <section class="text-lg whitespace-nowrap">
      <div class="flex flex-col">
        <div class="">
          <span>lvl</span>
          <span class="text-gruvOrangeM">= </span>
          <span class="text-gruvPurpleM">{{ sumData.summonerLevel }}</span>
        </div>

        <div class="mt-4">
          <span>soloQ<span class="text-gruvOrangeM">= </span></span
          ><span class="text-gruvRedM">{ </span>

          <div v-if="soloQData">
            <span class="ml-10"
              >elo:
              <span :class="getRankColor(soloQData.tier)"
                >"{{ soloQData.tier }} {{ soloQData.rank }}"<br /></span
            ></span>
            <span class="ml-10"
              >lp:
              <span class="text-gruvPurpleM">{{ soloQData.leaguePoints }}</span
              ><br
            /></span>
            <span class="ml-10"
              >winRate:
              <span
                :class="soloQWinRate > 50 ? 'text-gruvAquaM' : 'text-gruvRedM'"
                >{{ soloQWinRate }}%</span
              ><br
            /></span>
            <span class="ml-10"
              >games:
              <span class="text-gruvPurpleM">{{
                soloQData.wins + soloQData.losses
              }}</span
              ><br
            /></span>
            <span class="ml-10"
              >win:
              <span class="text-gruvBlueM hover:text-gruvBlue">{{
                soloQData.wins
              }}</span
              ><br
            /></span>
            <span class="ml-10"
              >loose:
              <span class="text-gruvRedM hover:text-gruvRed">{{
                soloQData.losses
              }}</span
              ><br
            /></span>
          </div>

          <span class="text-gruvRedM">}</span>
        </div>

        <div class="mt-4">
          <span>flexQ<span class="text-gruvOrangeM">= </span></span>
          <span class="text-gruvRedM">{ </span>
          <div v-if="flexQData">
            <span class="ml-10"
              >elo:
              <span :class="getRankColor(flexQData.tier)"
                >"{{ flexQData.tier }} {{ flexQData.rank }}"</span
              ><br
            /></span>
            <span class="ml-10"
              >lp:
              <span class="text-gruvPurpleM">{{ flexQData.leaguePoints }}</span
              ><br
            /></span>
            <span class="ml-10"
              >winRate:
              <span
                :class="flexQWinRate > 50 ? 'text-gruvAquaM' : 'text-gruvRedM'"
                >{{ flexQWinRate }}%</span
              ><br
            /></span>
            <span class="ml-10"
              >games:
              <span class="text-gruvPurpleM">{{
                flexQData.wins + flexQData.losses
              }}</span
              ><br
            /></span>
            <span class="ml-10"
              >win: <span class="text-gruvBlueM">{{ flexQData.wins }}</span
              ><br
            /></span>
            <span class="ml-10"
              >loose: <span class="text-gruvRedM">{{ flexQData.losses }}</span
              ><br
            /></span>
          </div>

          <span class="text-gruvRedM">}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
