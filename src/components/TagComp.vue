<template>
  <div :style="setBgColor">
    <span class="tag">{{ tagDetails.text }}</span>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    tagDetails: {
      text: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
  },

  setup(props) {
    const setBgColor = computed(() => {
      return { "--bg-color": props.tagDetails.color };
    });

    return {
      setBgColor,
    };
  },
};
</script>

<style scoped>
.tag {
  background-color: var(--bg-color);
  border-radius: 4px;
  padding: 4px 8px;
}
</style>
