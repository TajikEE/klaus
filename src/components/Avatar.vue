<template>
  <div class="img" v-lazyBg="url">
    <slot />
  </div>
</template>

<script>
export const lazyBg = {
  mounted: (el, binding) => {
    const url = binding.value;
    const image = new Image();

    image.onload = () => {
      el.style.backgroundImage = `url(${url})`;
    };

    image.src = url;
  },
};

export default {
  props: {
    url: {
      type: String,
    },
  },

  directives: { lazyBg },
};
</script>

<style scoped lang="scss">
.img {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  background-image: url("../assets/icons/profile-placeholder.svg");
}
</style>
