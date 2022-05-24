<script setup>
const router = useRouter()
const name = ref("")
const emits = defineEmits(["findSum"])

function test() {
  console.log(name.value)
}

function goHome() {
  router.push("/")
}

function emitName() {
  emits("findSum", name.value)
  name.value = ""
}
</script>

<template>
  <main>
    <nav
      class="flex h-24 py-4 px-10 items-center justify-between border-b border-bg0h"
    >
      <h1 class="font-bold text-4xl cursor-pointer" @click="goHome">Yuu.mi</h1>
      <form @submit.prevent="emitName">
        <input
          class="bg-bg0 border border-font0 py-1 px-4 outline-none caret"
          v-model="name"
          @input="test"
          placeholder="Summoner Name..."
          type="text"
        />
        <input type="submit" class="hidden" />
      </form>
    </nav>
  </main>
</template>
