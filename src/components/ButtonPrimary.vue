<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  background: var(--color-border-2);
  height: 40px;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: var(--color-background-2);
  padding: 6px 12px;
  cursor: pointer;
}

.btn:hover {
  background: #3c52e5;
}
</style>
