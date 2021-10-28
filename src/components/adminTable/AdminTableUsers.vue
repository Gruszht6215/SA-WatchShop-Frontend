<template>
  <div>
    <br />
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
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" v-bind:key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ user.username }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import HistoryBuyApi from "@/store/HistoryBuyApi";
export default {
  data() {
    return {
      users: [],
      usersTmp: [],
      historyBuys: [],

      checkBoxSort: false,
      datesChoose: [],
      datesFormated: ["", ""],
      locale: "en-CA",
    };
  },
  created() {
    this.fetchHistoryBuys();
    this.getUsersData();
  },
  methods: {
    async fetchHistoryBuys() {
      await HistoryBuyApi.dispatch("fetchHistory");
      this.historyBuys = HistoryBuyApi.getters.history_buys;
    },
    async getUsersData() {
      let userList = await UserService.getUser();
      userList.forEach((e) => {
        let payload = {
          username: e.username,
        };
        this.users.push(payload);
      });
    },
  },
};
</script>

<style scoped lang="scss">
#sortType {
  width: 20%;
  margin-left: auto;
  margin-right: auto;
}
#pickDate {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
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