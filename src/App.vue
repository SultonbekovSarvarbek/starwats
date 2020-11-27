<template>
  <div id="app">
    <!-- app-header -->
    <appHheader />
    <div class="main-content">
      <div class="container">
        <transition name="fade" mode="out-in">
          <!-- router-view -->
          <router-view />
        </transition>
      </div>
    </div>
    <!-- app-footer -->
    <appFooter />
  </div>
</template>
<script>
import AppHheader from "@/components/header.vue";
import AppFooter from "@/components/footer.vue";
export default {
  components: {
    AppHheader,
    AppFooter,
  },
};
</script>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.4s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.main-content {
  flex: 1;
  padding: 20px 0;
}
</style>
