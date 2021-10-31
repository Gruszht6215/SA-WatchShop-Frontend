<template>
  <div>
    <div id="tableBoard">
      <table
        class="
          table
          is-hoverable
          is-bordered
          is-striped
          is-narrow
          is-hoverable
          is-fullwidth
        "
      >
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Item</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in history_buys" v-bind:key="index">
            <th>{{ item.id }}</th>

            <td>{{ item.name_user }}</td>

            <td>{{ item.name_item }}</td>

            <td>{{ item.amount }}</td>

            <td>{{ item.price_all }}</td>
            
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import HistoryStore from "@/store/HistoryBuyApi";

export default {
  data() {
    return {
      history_buys: [],
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      await HistoryStore.dispatch("fetchHistory");
      this.history_buys = HistoryStore.getters.history_buys;
    },
  },
};
</script>

<style scoped lang="scss">
#tableBoard {
  .table {
    width: 75%;
    text-align: center;
    padding-top: 2em;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>