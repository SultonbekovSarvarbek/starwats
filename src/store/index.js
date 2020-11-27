import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
axios.defaults.baseURL = 'https://swapi.dev/api/';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: false,
    allPeople: null,
    films: null,
    peopleDetails: null,
  },
  mutations: {
    SET_PEOPLE(state, payload) {
      state.allPeople = payload;
    },
    SET_LOADING_STATUS(state, newLoadingStatus) {
      state.loadingStatus = newLoadingStatus;
    },
    SET_PEOPLE_DETAILS(state, payload) {
      state.peopleDetails = payload;
    },
    SET_PEOPLE_FILMS(state, payload) {
      state.films = payload;
    },
  },
  actions: {
    async getPeople({ commit, dispatch }, payload) {
      try {
        commit('SET_LOADING_STATUS', true);
        const res = await axios.get('people/', {
          params: {
            page: payload,
          },
        });

        const mixPersonsStarships = {
          starshipsArr: [],
        };

        for (let index = 0; index < res.data.results.length; index++) {
          mixPersonsStarships.starshipsArr.push(
            res.data.results[index].starships
          );
        }
        mixPersonsStarships.personsObj = res.data;
        dispatch('getAllStarships', mixPersonsStarships);
      } catch (err) {
        console.log(err);
      }
    },

    async getPeopleDetails({ commit }, payload) {
      try {
        commit('SET_LOADING_STATUS', true);
        const res = await axios.get('people/' + payload + '/');
        commit('SET_PEOPLE_DETAILS', await res.data);
        commit('SET_LOADING_STATUS', false);
      } catch (err) {
        console.log(err);
      }
    },

    async getAllStarships({ commit }, payload) {
      try {
        for (let i = 0; i < payload.starshipsArr.length; i++) {
          const data = [];
          if (payload.starshipsArr[i].length !== 0) {
            for (
              let index = 0;
              index < payload.starshipsArr[i].length;
              index++
            ) {
              let axiosGet = axios.get(payload.starshipsArr[i][index]);
              data.push(axiosGet);
            }
            let res = await axios.all(data);
            const startShipsName = [];
            for (let j = 0; j < res.length; j++) {
              const names = {
                name: res[j].data.name,
              };
              startShipsName.push(names);
            }
            payload.personsObj.results[i].starships__name = startShipsName;
          } else {
            let res = await axios.all(data);
            payload.personsObj.results[i].starships__name = res;
          }
        }

        commit('SET_PEOPLE', payload.personsObj);
        commit('SET_LOADING_STATUS', false);
      } catch (err) {
        console.log(err);
      }
    },

    async getFilmsName({ commit }, payload) {
      try {
        const data = [];
        commit('SET_LOADING_STATUS', true);
        for (let i = 0; i < payload.length; i++) {
          let dqwd = payload[i];
          let axiosGet = axios.get(dqwd);
          data.push(axiosGet);
        }
        const res = await axios.all(data);

        commit('SET_PEOPLE_FILMS', res);
        commit('SET_LOADING_STATUS', false);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getPeople(state) {
      return state.allPeople;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
    getPeopleDetails(state) {
      return state.peopleDetails;
    },
    getPeopleFilms(state) {
      return state.films;
    },
  },
  modules: {},
});
