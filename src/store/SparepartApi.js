import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

let api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    spareparts: (state) => state.data,
  },
  mutations: {
    fetch(state, { res }) {
      state.data = res.data
    },
  },
  actions: {
    async fetchSpareparts({ commit }) {
      let res = await Axios.get(api_endpoint + "/spare-parts")
      commit('fetch', { res })
      console.log("Fetch spareparts API");
    },

    async updateSparepartsRemain({ commit }, payload) {
      let url = api_endpoint + "/spare-parts/" + (payload.id)
      let body = {
        remain: payload.remain
      }
      let res = await Axios.put(url, body)
      if (res.status === 200) {
        console.log("updated spare part")
      } else {
        console.error(res)
      }
    },

    async fetchItemById({ commit }, payload) {
      let res = await Axios.get(api_endpoint + "/spare-parts?" + "id_in=" + payload.id)
      commit('fetch', { res })
      console.log("Fetch Item By ID API");
      return res.data[0]
    }
  },
  modules: {
  }
})
