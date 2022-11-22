<template>
  <div class="input-container">
    <input
      class="search text-input"
      type="text"
      v-model="searchQuery"
      placeholder="Search"
      @focus="showTooltip = true"
      @blur="showTooltip = false"
    />
    <div v-if="userStore.isSearching === true" class="icon-container">
      <i class="loader"></i>
    </div>
    <span class="tooltip sub-text" v-if="showTooltip"
      >Enter at least 3 characters of user name to search</span
    >
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "../stores/users";

const showTooltip = ref(false);
const searchQuery = ref("");
const userStore = useUserStore();

watch(
  () => searchQuery.value,
  (value) => {
    userStore.getSearchResult(value);
    if (searchQuery.value.length === 0) userStore.isSearching = false;
  }
);
</script>
<style scoped>
@import "../assets/base.css";

.search {
  background: url("../assets/icons/search.svg") no-repeat;
  background-color: var(--color-background-2);
  background-size: 14px;
  background-position: 14px 10px;
  padding-left: 36px;
  max-width: 204px;
  width: 100%;
  height: 40px;
}

.input-container {
  position: relative;
}

.icon-container {
  position: absolute;
  right: 10px;
  top: calc(50% - 10px);
}
.loader {
  position: relative;
  height: 20px;
  width: 20px;
  display: inline-block;
  animation: around 5.4s infinite;
}

@keyframes around {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader::after,
.loader::before {
  content: "";
  background: var(--color-background-2);
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: var(--color-border-2) var(--color-border-2) transparent
    transparent;
  border-style: solid;
  border-radius: 20px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  animation: around 0.7s ease-in-out infinite;
}

.loader::after {
  animation: around 0.7s ease-in-out 0.1s infinite;
  background: transparent;
}

.tooltip {
  position: absolute;
  left: 0;
  top: 40px;
  z-index: var(--z-index-tooltip);
  background: var(--color-background-2);
  padding: 8px;
}
</style>
