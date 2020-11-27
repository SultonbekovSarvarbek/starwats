<template>
  <div>
    <!-- loader -->
    <div v-if="loadingStatus" class="loading">
      <div class="loading-content">
        <img src="@/assets/icons/icons8-star-wars-96.png" alt="" />
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <!-- content -->
    <div v-else>
      <div class="personal-cards">
        <div
          class="personal-cards__item"
          v-for="item in getPeople.results"
          :key="item.id"
        >
          <h2 class="personal-cards__name">{{ item.name }}</h2>
          <p>Gender: {{ item.gender }}</p>
          <p>Height: {{ item.height }}</p>
          <p>Mass: {{ item.mass }}</p>
          {{ item.startships__name }}
          <div>
            <h3>Starships:</h3>
            <div v-if="item.starships__name.length === 0">
              <span class="personal-cards__nostartships">
                I haven't starship</span
              >
            </div>
            <div v-else>
              <div v-for="(item, index) in item.starships__name" :key="item.id">
                {{ index + 1 }} - {{ item.name }}
              </div>
            </div>
          </div>
          <div class="personal-cards__details">
            <router-link :to="{ path: '/person/' + item.url.slice(28, -1) }"
              >See more</router-link
            >
          </div>
        </div>
      </div>
      <pagination />
    </div>
  </div>
</template>

<script>
import pagination from "@/components/pagination";
export default {
  components: {
    pagination,
  },
  async created() {
    await this.$store.dispatch("getPeople", this.pageNumber);
  },
  computed: {
    getPeople() {
      return this.$store.getters.getPeople;
    },

    loadingStatus() {
      return this.$store.getters.getLoadingStatus;
    },
  },
};
</script>

<style lang="scss" >
.personal {
  &-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(325px, auto);
    grid-gap: 10px;
    color: #fff;
    &__item {
      border: 1px solid rgb(0, 0, 0);
      background-color: rgb(33, 33, 33);
      border-radius: 4px;
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
    &__name {
      color: #9e6dff;
    }
    &__details {
      a {
        display: block;
        padding: 5px 0;
      }
      margin-top: auto;
      text-align: center;
      transition: 0.5s;
      background-size: 200% auto;
      color: white;
      border-radius: 10px;
      display: block;
      border-radius: 4px;
      text-align: center;
      background-image: linear-gradient(
        to right,
        #5478ff 0%,
        #ce22da 51%,
        #0e5eb1 100%
      );
      &:hover {
        background-position: right center;
        color: #fff;
        text-decoration: none;
      }
    }
    &__nostartships {
      background-color: #680000a5;
      color: rgb(255, 0, 0);
    }
  }
}
</style>