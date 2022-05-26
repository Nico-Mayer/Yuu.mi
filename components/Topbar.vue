<script setup>
const { sumData, firestoreData, activeTab } = defineProps([
  "sumData",
  "firestoreData",
  "activeTab",
])
const emits = defineEmits(["changeTab"])

const lastUpdated = computed(() => {
  let hours = Math.round((Date.now() - firestoreData.lastUpdated) / 1000 / 3600)
  let days = Math.floor(hours / 24)
  if (hours < 24) {
    return `${hours}h ago`
  } else {
    let temp = days > 1 ? "days" : "day"
    return `${days} ${temp} ago`
  }
})

function emitTabName(name) {
  emits("changeTab", name)
}
</script>

<template>
  <main class="w-full flex flex-col">
    <div class="flex justify-between w-full items-center p-8">
      <div class="flex">
        <div
          class="text-xl text-gruvAquaM font-semibold mr-5 whitespace-nowrap"
        >
          &lt
          <span class="text-font0">{{ sumData.name }}</span>
          <span class="text-gruvBlue"> @euw</span>
          /&gt
        </div>

        <div class="flex cursor-pointer">
          <div
            :class="`px-4 py-1 opacity-60 hover:opacity-100 w-36 ${
              activeTab == 'matchHistory'
                ? 'border-b border-font0 opacity-95'
                : ''
            }`"
            @click="emitTabName('matchHistory')"
          >
            <p class="text-center">matchHistory</p>
          </div>
          <div
            :class="`px-4 py-1 opacity-60 hover:opacity-100 w-36 ${
              activeTab == 'comments' ? 'border-b border-font0 opacity-95' : ''
            }`"
            @click="emitTabName('comments')"
          >
            <p class="text-center">comments</p>
          </div>
        </div>
      </div>

      <div class="flex items-center opacity-60">
        <p class="text-xs">
          <span>lastUpdate</span>
          <span class="text-gruvOrangeM"> = </span>
          <span v-if="firestoreData" class="text-gruvAquaM">
            "{{ lastUpdated }}"</span
          >
          <span v-else class="text-gruvRedM">null</span>
        </p>
      </div>
    </div>
  </main>
</template>
