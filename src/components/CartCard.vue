<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          :src="getImage(itemInput.picture[0].url)"
          alt="Placeholder image"
        />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left"></div>
        <div class="media-content">
          <p class="title is-4">{{ itemInput.name }}</p>
        </div>
      </div>
      <div class="content">
        <div>{{ itemInput.price }} Bath</div>
        <br />
        <div style="margin-bottom: 20px">
          <input class="input" type="number" v-model="inputNum" min="1" />
          <b-button class="calNum" type="is-success" v-on:click="increase"
            >+</b-button
          >
          <b-button class="calNum" type="is-danger" v-on:click="decrease"
            >-</b-button
          >

          <!-- <b-field label="amount">
            <b-numberinput v-model="inputNum" min="1"></b-numberinput>
          </b-field> -->
        </div>
        <div>
          <b-button @click="confirmItem()" type="is-success">Buy</b-button>
        </div>
      </div>
    </div>
    <b-loading v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import AuthUser from "@/store/AuthUser";
import HistoryBuyApi from "@/store/HistoryBuyApi";
import ItemApi from "@/store/ItemApi";

export default {
  props: {
    itemInput: Object,
  },
  data() {
    return {
      inputNum: 1,
      isLoading: false,
    };
  },
  methods: {
    increase() {
      // this.inputNum = this.inputNum === this.$props.itemInput.remain ? 5 : 10;
      if (this.inputNum == this.$props.itemInput.remain) {
        this.inputNum = this.$props.itemInput.remain;
      } else {
        this.inputNum++;
      }
    },
    decrease() {
      // this.inputNum = this.inputNum == 1 ? 1 : this.inputNum--;
      if (this.inputNum == 1) {
        this.inputNum = 1;
      } else {
        this.inputNum--;
      }
    },
    async confirmItem() {
      this.isLoading = true;
      //User
      let user = await UserService.getUserById(AuthUser.getters.user.id);
      let item = user.items;
      for (let i = 0; i < item.length; i++) {
        if (item[i].id === this.itemInput.id) {
          item.splice(i, 1);
        }
      }
      let payload = {
        id: user.id,
        items: item,
      };
      await AuthUser.dispatch("updateItem", payload);
      //Update Item
      const remain = this.$props.itemInput.remain - this.inputNum;
      let itemPayload = {
        id: this.$props.itemInput.id,
        remain: remain,
      };
      await ItemApi.dispatch("updateItemRemaining", itemPayload);
      //historyBuy
      var today = new Date();
      var dateLocal =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      let historyPayload = {
        name_item: this.itemInput.name,
        price_all: this.itemInput.price * this.inputNum,
        date: dateLocal,
        amount: this.inputNum,
        name_user: user.username,
      };
      await HistoryBuyApi.dispatch("updateNewHistory", historyPayload);

      await this.$swal("Success!!!", "", "success");
      this.isLoading = false;
      location.reload();
    },
    getImage(url) {
      return "http://localhost:1337" + url;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  margin: 20px;
  width: 400px;
  height: 560px;
  position: relative;
  float: left;
  margin-left: 47px;
}
.calNum {
  width: 25px;
  height: 30px;
  margin-bottom: 10px;
  margin-left: 5px;
}
.input {
  width: 100px;
  height: 30px;
}
</style>