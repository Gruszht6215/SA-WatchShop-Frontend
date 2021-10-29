<template>
    <div class="card draft">
        <div class="card-content">
            <h1 class="Title">Order to {{manu.name}}</h1>
            <br>
            <div v-for="(sp, index) in spare" v-bind:key="index">
                {{sp}}
                <input type="text" v-model="input[index]">
            </div>
            <br>

            <b-button class="is-success" size="is-small" @click="order">Order</b-button>
        </div>
    </div>
</template>

<script>
import SparepartApiStore from '@/store/SparepartApi.js'
export default {
    data(){
        return{
            spare: [],
            input: [0,0,0],
            sparepartStore: []
        }
    },
    props:{
        manu: null,
        spareparts: null
    },
    created(){
        this.setUpInfo();
    },
    methods:{
        async setUpInfo(){
            this.spare = this.$props.spareparts.split(', ')
            await SparepartApiStore.dispatch("fetchSpareparts")
            this.sparepartStore = SparepartApiStore.getters.spareparts
        },
        async order(){
            if(this.input[0] !== "" && this.input[1] !== "" && this.input[2] !== ""){
                for (const spStore in this.sparepartStore) {
                    for (let i = 0; i < this.spare.length; i++) {
                        if(this.sparepartStore[spStore].name === this.spare[i]){
                            let order = parseInt(this.sparepartStore[spStore].remain) + parseInt(this.input[i])
                            let payload = {
                                id: this.sparepartStore[spStore].id,
                                remain: order
                            }
                            await SparepartApiStore.dispatch("updateSparepartsRemain", payload)
                        }
                    }
                }
                this.input= [0,0,0]
                this.$swal("Orderd Spare part", "", "success").then((value) =>{
                    this.$router.go(0)
                })
            }
            else{
                this.input= [0,0,0]
                this.$swal("Error", "", "error").then((value) =>{
                    this.$router.go(0)
                })
            }
            
        }
    },
}
</script>

<style lang="scss" scoped>
.card {
  width: 50%;
  margin: auto;
  margin-top: 30px;
}
</style>