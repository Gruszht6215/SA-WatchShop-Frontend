<template>
  <div class="home">
    <ads-slide></ads-slide>
    <div v-for="(item, index) in itemsDummy" :key="index">
      <item-card v-if="item.status" :itemInput="item"></item-card>
    </div>
  </div>
</template>

<script>
import AuthUser from '@/store/AuthUser'
import UserService from '@/services/UserService'
import ItemApiStore from '@/store/ItemApi'
import AdsSlide from '../components/AdsSlide.vue'
import ItemCard from '../components/ItemCard.vue'
export default {
  components: { 
    ItemCard,
    AdsSlide
  },
  data() {
      return {
        pictureDummy: [],
        itemsDummy: [],
      }
  },
  created(){
    this.fetchItems()
  },
  methods:{
    async fetchItems(){
      await ItemApiStore.dispatch('fetchItems')
      this.itemsDummy = ItemApiStore.getters.items
    },
    isAuthen() {
        return AuthUser.getters.isAuthen
    },
    isAdmin(){
      return AuthUser.getters.isAdmin
    },
  },
  async mounted(){
  }
}
</script>

<style lang="scss">
.bg{
  background-color: lightslategrey;
}
</style>
