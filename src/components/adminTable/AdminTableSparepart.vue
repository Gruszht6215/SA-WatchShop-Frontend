<template>
    <div>
        <div id="tableBoard">
            <table class="table is-hoverable is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name Sparepart</th>
                        <th>Price</th>
                        <th>Remain</th>
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