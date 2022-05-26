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
  <main class="flex flex-col items-center border-r border-bg0h px-2 pt-8 w-80">
    <img
      class="w-20 h-20 rounded-full mb-8"
      :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${sumData.profileIconId}.jpg`"
      alt=""
    />

    <div class="text-lg">
      <section class="whitespace-nowrap leading-snug">
        <p>
          <span>lvl</span>
          <span class="text-gruvOrangeM"> = </span>
          <span class="text-gruvPurpleM">{{ sumData.summonerLevel }}</span>
        </p>
      </section>
      <section v-if="soloQData" class="whitespace-nowrap leading-snug">
        <p>&nbsp;</p>
        <p>
          <span>soloQ </span>
          <span class="text-gruvOrangeM">=</span>
          <span class="text-gruvRedM"> {</span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span>rank:</span>
          <span
            :class="getRankColor(soloQData.tier) + ` neon${soloQData.tier}`"
          >
            "{{ soloQData.tier }} {{ soloQData.rank }}"
          </span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span>lp: </span>
          <span class="text-gruvPurpleM">{{ soloQData.leaguePoints }}</span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span>games: </span>
          <span class="text-gruvPurpleM">
            {{ soloQData.wins + soloQData.losses }}
          </span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span> winRate: </span>
          <span class="text-gruvPurpleM">{{ soloQWinRate }}%</span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span>w: </span>
          <span class="text-gruvPurpleM">{{ soloQData.wins }}</span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span>l: </span>
          <span class="text-gruvPurpleM">{{ soloQData.losses }}</span>
        </p>
        <p>}</p>
      </section>

      <div v-else class="opacity-60">
        <p>&nbsp;</p>
        <p>
          soloQ <span class="text-gruvOrangeM">=</span>
          <span class="text-gruvRedM"> { }</span>
        </p>
      </div>

      <section v-if="flexQData" class="whitespace-nowrap leading-snug">
        <p>&nbsp;</p>
        <p>
          <span>flexQ </span>
          <span class="text-gruvOrangeM">=</span>
          <span class="text-gruvRedM"> {</span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span>rank:</span>
          <span
            :class="getRankColor(flexQData.tier) + ` neon${flexQData.tier}`"
          >
            "{{ flexQData.tier }} {{ flexQData.rank }}"
          </span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span>lp: </span>
          <span class="text-gruvPurpleM">{{ flexQData.leaguePoints }}</span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span>games: </span>
          <span class="text-gruvPurpleM">
            {{ flexQData.wins + flexQData.losses }}
          </span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span> winRate: </span>
          <span class="text-gruvPurpleM">{{ flexQWinRate }}%</span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span>w: </span>
          <span class="text-gruvPurpleM">{{ flexQData.wins }}</span>
        </p>
        <p class="pl-5 border-l-2 border-bg0h">
          <span>l: </span>
          <span class="text-gruvPurpleM">{{ flexQData.losses }}</span>
        </p>
        <p class="text-gruvRedM">}</p>
      </section>
      <div v-else class="opacity-60">
        <p>&nbsp;</p>
        <p>
          flexQ <span class="text-gruvOrangeM">=</span>
          <span class="text-gruvRedM"> { }</span>
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.neonIRON {
  text-shadow: 0 0 7px #665c54;
}
.neonSILVER {
  text-shadow: 0 0 7px #ebdbb2;
}
.neonGOLD {
  text-shadow: 0 0 7px #fabd2f;
}
.neonPLATINUM {
  text-shadow: 0 0 7px #8ec07c;
}
.neonDIAMOND {
  text-shadow: 0 0 7px #458588;
}
.neonMASTER {
  text-shadow: 0 0 7px #cc241d;
}
.neonGRANDMASTER {
  text-shadow: 0 0 7px #cc241d;
}
.neonCHALLENGER {
  text-shadow: 0 0 7px #cc241d;
}
</style>
