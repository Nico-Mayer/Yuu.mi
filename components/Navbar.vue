<script setup>
const router = useRouter()
const name = ref("")
const emits = defineEmits(["findSum"])

function goHome() {
  router.push("/")
}

function emitName() {
  emits("findSum", name.value)
  name.value = ""
}
</script>

<template>
  <main
    class="flex max-w-7xl items-center h-24 py-4 border-b border-bg0h justify-between mx-auto"
  >
    <h1 class="font-bold text-4xl cursor-pointer" @click="goHome">
      Yuu<span class="text-gruvAquaM">.mi</span>
    </h1>
    <form @submit.prevent="emitName">
      <input
        class="bg-bg0 border border-bg0h py-1 px-4 outline-none caret placeholder-font0"
        v-model="name"
        placeholder="Summoner Name..."
        type="text"
      />
      <input type="submit" class="hidden" />
    </form>
  </main>
</template>
