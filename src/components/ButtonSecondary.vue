<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  background: var(--color-background-2);
  border: 1px solid var(--button-background);
  box-shadow: 0px 1px 2px rgba(45, 55, 72, 0.08);
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #4a5568;
  padding: 6px 12px;
  cursor: pointer;
}

.btn:hover {
  background: var(--color-background-1);
}
</style>
