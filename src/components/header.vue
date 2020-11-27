<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header-wrapper">
          <a href="#" @click.prevent="goHome"
            ><img src="@/assets/icons/icons8-star-wars-96.png" alt=""
          /></a>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      if (this.$route.path !== "/persons") {
        this.$router.push({ path: "/persons" });
      }
    },
  },
};
</script>

<style lang="scss">
.header {
  background: url("../assets/imgs/star-wars-backgrounds.jpg");
  background-position: center center;

  &-wrapper {
    text-align: center;
  }
}
</style>