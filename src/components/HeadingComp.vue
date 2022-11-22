<template>
  <div class="root">
    <h1>Account users</h1>

    <div class="btn-group">
      <SearchComp />
      <ButtonPrimary @click="showText = true" class="btn"
        >Connect users</ButtonPrimary
      >
    </div>

    <div class="text-container" v-if="showText">
      Andreas said not to worry about this, so have a 🍪
      <span @click="showText = false">☒</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ButtonPrimary from "./ButtonPrimary.vue";
import SearchComp from "./SearchComp.vue";

const showText = ref(false);
</script>

<style scoped>
.root {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-group {
  display: flex;
  align-items: center;
}

.btn {
  margin-left: 12px;
}

.text-container {
  position: absolute;
  right: 0;
  top: 60px;
  background: var(--color-background-2);
  padding: 8px;
  z-index: var(--z-index-tooltip);
}

.text-container > span {
  padding: 0 8px;
  cursor: pointer;
  font-size: 18px;
}
</style>
