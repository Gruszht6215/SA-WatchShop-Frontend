<template>
    <div>
        <ManufacturerCard
            v-for="(manu, index) in manufacturers" v-bind:key="index"
            :manu="manu"
            :spareparts="spareparts[index]"
        >
        </ManufacturerCard>
    </div>
</template>

                            

<script>
import ManufacturerCard from '@/components/ManufacturerCard.vue'
import ManufacturerStore from '@/store/ManufacturerApi.js'
export default {
    components:{
        ManufacturerCard
    },
    data(){
        return{
            manufacturers: [],
            spareparts: [],
            editId: -1,
            form: {
                remain: 0
            },
        }
    },
    created(){
        this.fetchManufacturer()
    },
    methods: {
        async fetchManufacturer() {
            await ManufacturerStore.dispatch('fetchManufacturer')
            this.manufacturers = ManufacturerStore.getters.manufacturers
            let string = ''
            this.manufacturers.forEach(manu => {
                for(let i = 0; i < manu.spare_parts.length ; i++){
                    if(i !== manu.spare_parts.length -1){
                        string += manu.spare_parts[i].name +", "
                    }
                    else{
                        string += manu.spare_parts[i].name 
                    }
                }
                this.spareparts.push(string)
                string = ''
            });
        },
    }
}
</script>

<style scoped lang="scss">
.card {
  text-align: center;
  margin-left: 100px;
  width: 500px;
  height: auto;
  position: relative;
  float: left;
  background-color: #7cbed8;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>