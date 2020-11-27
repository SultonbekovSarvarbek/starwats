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
      <div class="person-details__action">
        <button @click="goBack" class="person-details__btnback">
          Back to List
        </button>
      </div>
      <div class="person-details">
        <div class="person-details__item">
          <h2>{{ getPersonDetails.name }}</h2>
          <ul class="person-details__item__list">
            <li>Birth Year: {{ getPersonDetails.birth_year }}</li>
            <li>Gender: {{ getPersonDetails.gender }}</li>
            <li>Height: {{ getPersonDetails.height }}</li>
            <li>Mass: {{ getPersonDetails.mass }}</li>
            <li>Hair Color: {{ getPersonDetails.hair_color }}</li>
            <li>Skin Color: {{ getPersonDetails.skin_color }}</li>
            <li>Eye Color: {{ getPersonDetails.eye_color }}</li>
          </ul>
        </div>
        <div class="person-details__item">
          <h2>Films</h2>

          <ul class="person-details__item__filmslist">
            <li v-for="(item, index) in getFilms" :key="item.id">
              {{ index + 1 }} - {{ item.data.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("getPeopleDetails", this.$route.params.id);
    await this.$store.dispatch("getFilmsName", this.getPersonDetails.films);
  },
  computed: {
    getPersonDetails() {
      return this.$store.getters.getPeopleDetails;
    },
    getFilms() {
      return this.$store.getters.getPeopleFilms;
    },
    loadingStatus() {
      return this.$store.getters.getLoadingStatus;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  beforeDestroy() {
    this.$store.commit("SET_PEOPLE_DETAILS", null);
    this.$store.commit("SET_PEOPLE_FILMS", null);
  },
};
</script>

<style lang="scss">
.person {
  &-details {
    display: flex;
    &__item {
      flex: 1;
      margin-right: 50px;
      &__list {
        border-radius: 6px;
        color: #fff;
        border: 1px solid #9190fb;
        li {
          &:first-child {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
          }
          border-bottom: 1px solid #9190fb;
          background: #333;
          padding: 10px;
          &:last-child {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            border-bottom: 0;
          }
          &:hover {
            background-color: rgb(0, 0, 2);
          }
        }
      }
      &__filmslist {
        color: #fff;

        li {
          display: inline-block;
          border-radius: 4px;
          padding: 5px 15px;
          margin-bottom: 10px;
          background-color: rgb(17, 8, 113);
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    &__action {
      display: flex;
      margin-bottom: 20px;
    }
    &__btnback {
      display: inline-block;
      background: rgb(77, 46, 126);
      cursor: pointer;
      padding: 10px 18px;
      font-weight: bold;
      border-radius: 4px;
      color: rgb(255, 255, 255);
    }
  }
}
</style>