<template>
  <transition name="modal">
    <div v-if="show" class="mask" @click="$emit('onBackdrop')">
      <div class="container" @click.stop>
        <div class="header">
          <slot name="header" />
        </div>

        <div class="body">
          <slot name="body" />
        </div>

        <div class="footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-index-modal);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 3rem 1.5rem;
  background-color: var(--backdrop-background);
  transition: opacity 0.3s;
  will-change: opacity;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 25rem;
  height: 100%;
  max-height: 32rem;
  margin: 0 auto;
  padding: 2rem 2.5rem;
  background-color: var(--color-background-2);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: transform 1s;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;
  font-weight: 500;
  text-align: center;
}

.body {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 1rem;
  height: 100%;
  overflow-y: scroll;
}

.footer {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
