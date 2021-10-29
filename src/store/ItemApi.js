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
    items: (state) => state.data,
  },
  mutations: {
    fetch(state, { res }) {
      state.data = res.data
    },
    add(state, payload) {
      state.data.push(payload)
    }
  },
  actions: {
    async fetchItems({ commit }) {
      let res = await Axios.get(api_endpoint + "/items")
      commit('fetch', { res })
      console.log("Fetch items API");
    },

    async addItem({ commit }, payload) {
      let url = api_endpoint + "/items"
      let upload_url = api_endpoint + '/upload'
      let res_upload = await Axios.post(upload_url, payload.picture)
      if (res_upload.status === 200) {
        const imageId = res_upload.data[0].id;

        let body = {
          name: payload.name,
          price: payload.price,
          status: payload.status,
          picture: imageId,
          remain: payload.remain,
          spare_parts: payload.spare_parts,
        }
        let res = await Axios.post(url, body)
        if (res.status === 200) {
          commit('add', res.data)
          // swal("Success!", "Item has been added to your storage", "success")
        } else {
          //items error
          console.error(res)
        }
      } else {
        //upload pic error
        console.error(res)
      }
    },

    async editItem({ commit }, payload) {
      let url = api_endpoint + "/items/" + (payload.id)
      console.log(url);
      let body = {
        name: payload.name,
        price: payload.price,
        status: payload.status
      }
      console.log(body);
      let res = await Axios.put(url, body)
      console.log("Edit item");
      console.log(res.data)
    },

    async updateItemRemaining({ commit }, payload) {
      let url = api_endpoint + "/items/" + (payload.id)
      let body
      //if remaining = 0 then set status false(dont show on store)
      if (payload.remain == 0) {
        body = {
          remain: payload.remain,
          status: false
        }
      } else {
        body = {
          remain: payload.remain
        }
      }
      let res = await Axios.put(url, body)
      if (res.status === 200) {
        // console.log('buy success')
      } else {
        console.error(res)
      }
    },

    async deleteItem({ commit }, payload) {
      let url = api_endpoint + "/items/" + (payload.id)
      let res = await Axios.delete(url)
      console.log("Delete item");
      console.log(res.data)
      if (res.status == 200) {
        return {
          success: true
        }
      }
      return {
        success: false
      }
    },

    async fetchItemById({ commit }, payload) {
      let res = await Axios.get(api_endpoint + "/items?" + "id_in=" + payload)
      commit('fetch', { res })
      console.log("Fetch Item By ID API");
      return res.data[0]
    }
  },
  modules: {
  }
})
