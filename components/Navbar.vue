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
  <main>
    <nav
      class="flex bg-[#282828] text-white h-24 py-4 px-10 items-center justify-between"
    >
      <h1
        class="font-bold text-[#a89984] text-4xl cursor-pointer"
        @click="goHome"
      >
        Yuumi
      </h1>
      <input
        class="bg-[#282828] border"
        v-model="name"
        placeholder="Summoner Name"
        @change="emitName"
        type="text"
      />
    </nav>
  </main>
</template>
