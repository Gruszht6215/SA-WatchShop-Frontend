<template>
    <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title">{{manu.name}}</p>
            </div>
          </div>
          <div class="content">
            <h5 class="text">Tel no. : {{manu.tel_no}}</h5>
            <h5 class="text">List of spareparts :</h5>
            <h5 class="text">{{spareparts}}</h5>
            <b-modal
                :active.sync="showOrderModal"
                :can-cancel="['escape', 'x', 'outside']"
            >
                <OrderSparepartModal
                    class="post" 
                    @close="showOrderModal =false"
                    :manu="manu"
                    :spareparts="spareparts"
                >
                </OrderSparepartModal>
            </b-modal>
            <b-button size="is-small" type="is-primary" @click="showOrderModal = true" outlined>Order</b-button>
          </div>
        </div>
    </div>
</template>

<script>
import OrderSparepartModal from '@/components/OrderSparepartModal.vue'
export default {
    components:{
        OrderSparepartModal
    },
    data(){
        return{
            showOrderModal: false
        }
    },
    props:{
        manu: null,
        spareparts: null
    }
}
</script>

<style lang="scss" scoped>
.text{
    text-align: left;
}

</style>