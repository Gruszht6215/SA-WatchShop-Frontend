<template>
    <div>
        <div id="tableBoard">
            <table class="table is-hoverable is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name Sparepart</th>
                        <th>Price</th>
                        <th>remain</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in spareparts" v-bind:key = "index">
                        <th>{{item.id}}</th>

                        <td v-if="item.id !== editId">{{item.name}}</td>
                        <td v-else>{{item.name}}</td>

                        <td v-if="item.id !== editId">{{item.price}}</td>
                        <td v-else>{{item.price}}</td>

                        <td v-if="item.id !== editId">{{item.remain}}
                        </td>
                        <td horizontal v-else>
                            <b-input size="is-small" placeholder="remain" v-model="form.remain"></b-input>
                            <button @click="plus()">+</button>
                        </td>
                        <td v-if="item.id !== editId">
                            <b-button @click="openForm(item)" size="is-small" type="is-primary" outlined>Edit</b-button>&nbsp;
                        </td>
                        <td v-else-if="item.id === editId" id="EditButtonGroup">
                            <b-button @click="editItem()" size="is-small" type="is-warning">Confirm</b-button>&nbsp;
                            <b-button @click="closeForm()" size="is-small" type="is-warning">close</b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import SparepartApiStore from '@/store/SparepartApi'
export default {
    data(){
        return{
            spareparts: [],
            editId: -1,
            form: {
                remain: 0
            }
        }
    },
    created(){
        this.fetchSpareparts()
    },
    methods: {
        async fetchSpareparts() {
            await SparepartApiStore.dispatch('fetchSpareparts')
            this.spareparts = SparepartApiStore.getters.spareparts
        },
        openForm(item){
            this.editId = item.id
            let cloned = JSON.parse(JSON.stringify(item))
            this.form.remain = cloned.remain
        },
        closeForm(){
            this.editId = -1
            this.form= {
                remain: 0
            }
        },
        plus(){
            this.form.remain = parseInt(this.form.remain)+1;
        },
        async editItem(){
            let payload={
                id: this.editId,
                remain: parseInt(this.form.remain)
            }
            let res = await SparepartApiStore.dispatch("editItem",payload)
            if(res.success){
                this.$swal("Edit spare part Success", item.name, "success")
            }
            else{
                this.$swal("Edit spare part Failed", item.name, "error")
            }
            this.closeForm()
            this.fetchSpareparts()
        },
    }
}
</script>

<style scoped lang="scss">
#tableBoard{
    .table{
        width: 75%;
        text-align: center;
        padding-top: 2em;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>