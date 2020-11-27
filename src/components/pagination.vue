<template>
  <div>
    <div class="personal-pagination">
      <!-- prev btn -->
      <button
        class="personal-pagination__prevnext btn"
        @click="goPag(Number(pageNumber) - 1)"
        :disabled="pageNumber <= 1"
      >
        Previous
      </button>
      <!-- pagination numbers -->
      <button
        class="personal-pagination__pagnumber btn"
        :class="['btn', pageNumber == item ? 'active' : '']"
        @click="goPag(item)"
        v-for="item in Math.ceil(getCount.count / 10)"
        :key="item.id"
      >
        {{ item }}
      </button>
      <!-- next btn -->
      <button
        class="personal-pagination__prevnext btn"
        :disabled="pageNumber >= Math.ceil(getCount.count / 10)"
        @click="goPag(Number(pageNumber) + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNumber: Number(this.$route.query.page) || 1,
    };
  },
  computed: {
    getCount() {
      return this.$store.getters.getPeople;
    },
  },
  methods: {
    goPag(val) {
      if (Number(this.$route.query.page) !== val) {
        this.pageNumber = val;
        this.$router.push({
          query: {
            page: val,
          },
        });
        this.$store.dispatch("getPeople", val);
      }
    },
  },
};
</script>

<style lang="scss">
.personal {
  &-pagination {
    margin-top: 80px;
    .btn {
      cursor: pointer;
      color: #fff;
      border-radius: 4px;
    }
    &__prevnext {
      padding: 20px;
      background: #4114af;
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 4px;
    }
    &__pagnumber {
      background: #333;
      margin: 0 2px;
      padding: 20px;
      &:hover {
        background: #4114af;
      }
    }
  }
}
.active {
  background: #4114af;
}
</style>