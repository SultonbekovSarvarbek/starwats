<template>
  <div>
    <footer class="footer">
      <div class="container">
        <div class="footer-wrapper">
          <p class="footer-wrapper__info">
            API |
            <a href="https://swapi.dev/api/" target="_blank"
              >https://swapi.dev/api</a
            >
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
  background-color: #000;
  &-wrapper {
    font-size: 13px;
    text-align: center;
    color: #fff;
    padding: 20px 0 20px 0;
  }
}
</style>