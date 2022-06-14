<script setup>
const apiKey = import.meta.env.VITE_API_KEY
const top300Sorted = ref([])
const upperLimit = ref(30)
const { data: top300 } = useFetch(
  `https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${apiKey}`
)

function sortByWins() {
  console.log("click")
  top300Sorted.value.sort((a, b) => {
    if (a.wins < b.wins) {
      return 1
    } else {
      return -1
    }
  })
}

function sortTop300ByLp() {
  let temp = top300.value.entries
  temp.sort((a, b) => {
    if (a.leaguePoints < b.leaguePoints) {
      return 1
    } else {
      return -1
    }
  })
  for (let i = 0; i < temp.length; i++) {
    temp[i] = { rang: i + 1, ...temp[i] }
  }
  top300Sorted.value = temp.slice(0, upperLimit.value)
}

function winRate(wins, games) {
  return Math.round(wins / (games / 100))
}
function test() {
  upperLimit.value += 10
  sortTop300ByLp()
}

onMounted(() => {
  sortTop300ByLp()
})
</script>

<template>
  <main class="flex mx-auto max-w-7xl my-20 justify-center">
    <div class="w-2/3">
      <h1>Top {{ upperLimit }} <span class="text-gruvBlue">@EUW</span></h1>
      <table class="table-auto text-left w-full overflow-hidden">
        <thead class="border-b border-bg0h cursor-pointer">
          <th>rank</th>
          <th>name</th>
          <th>lp</th>
          <th>games</th>
          <th @click="sortByWins">wins</th>
          <th>losses</th>
          <th>winrate</th>
          <th>hotStreak</th>
          <!-- <th>freshBlood</th> -->
        </thead>
        <tbody v-if="top300Sorted">
          <tr
            class="opacity-50 hover:opacity-100 transition-all duration-10 cursor-pointer"
            v-for="sum in top300Sorted"
          >
            <td>{{ sum.rang }}</td>
            <td class="text-gruvAquaM whitespace-nowrap">
              &lt
              <span class="text-font0">{{ sum.summonerName }}</span>
              <span class="text-gruvBlue"> @euw</span>
              /&gt
            </td>
            <td>{{ sum.leaguePoints }}</td>
            <td>{{ sum.wins + sum.losses }}</td>
            <td>{{ sum.wins }}</td>
            <td>{{ sum.losses }}</td>
            <td>{{ winRate(sum.wins, sum.wins + sum.losses) }} %</td>
            <td>{{ sum.hotStreak }}</td>
            <!-- <td>{{ sum.freshBlood }}</td> -->
          </tr>
        </tbody>
      </table>
      <!-- <button
        @click="test"
        class="flex w-full justify-center items-center border-bg0h border"
      >
        load more
      </button> -->
    </div>
  </main>
</template>
