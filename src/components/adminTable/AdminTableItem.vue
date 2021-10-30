<template>
  <div>
    <div style="margin-bottom: 20px">
      <b-button
        type="is-success"
        @click="isComponentModalActive = true"
        label="Add Item"
      ></b-button>
      <b-modal
        v-model="isComponentModalActive"
        has-modal-card
        full-screen
        :can-cancel="false"
      >
        <AddItemForm></AddItemForm>
      </b-modal>
    </div>
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
            <th>Name Item</th>
            <th>Price</th>
            <th>Remain</th>
            <th>Spare Part</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" v-bind:key="index">
            <th>{{ item.id }}</th>

            <td v-if="item.id !== editId">{{ item.name }}</td>
            <td v-else>
              <b-input
                size="is-small"
                placeholder="Name"
                v-model="form.name"
              ></b-input>
            </td>

            <td v-if="item.id !== editId">{{ item.price }}</td>
            <td v-else>
              <b-input
                size="is-small"
                placeholder="price"
                v-model="form.price"
              ></b-input>
            </td>

            <td v-if="item.id !== editId">{{ item.remain }}</td>
            <td v-else>
              <b-input
                size="is-small"
                placeholder="0"
                v-model="form.remain"
                disabled
              ></b-input>
              <b-button @click="plus()">+</b-button>
            </td>

            <td v-if="item.id !== editId">
              <div v-for="spare_part in item.spare_parts">
                {{ spare_part.name }},
              </div>
            </td>
            <td v-else>
              <div v-for="spare_part in item.spare_parts">
                {{ spare_part.name }},
              </div>
            </td>

            <td v-if="item.id !== editId">
              <div v-if="item.status" class="tag is-success">ON</div>
              <div v-else class="tag is-danger">OFF</div>
            </td>
            <td v-else>
              <b-select placeholder="Status" v-model="form.status">
                <option value="true">ON</option>
                <option value="false">OFF</option>
              </b-select>
            </td>

            <td v-if="item.id !== editId && item.id !== deleteId">
              <b-button
                @click="openForm(item)"
                size="is-small"
                type="is-primary"
                outlined
                >Edit</b-button
              >&nbsp;
              <b-button
                @click="openDelete(item)"
                size="is-small"
                type="is-danger"
                outlined
                >Delete</b-button
              >
            </td>

            <td v-else-if="item.id === editId" id="EditButtonGroup">
              <b-button @click="editItem()" size="is-small" type="is-warning"
                >Confirm</b-button
              >&nbsp;
              <b-button @click="closeForm()" size="is-small" type="is-warning"
                >close</b-button
              >
            </td>
            <td v-else id="DeleteButtonGroup">
              <b-button
                @click="deleteItem(item)"
                size="is-small"
                type="is-danger"
                >Confirm</b-button
              >&nbsp;
              <b-button @click="closeForm()" size="is-small" type="is-warning"
                >close</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ItemApiStore from "@/store/ItemApi";
import SparepartApi from "@/store/SparepartApi";
import AddItemForm from "@/components/adminTable/addItem/AddItemForm";

export default {
  components: {
    AddItemForm,
  },
  data() {
    return {
      items: [],
      editId: -1,
      deleteId: -1,
      isComponentModalActive: false,
      countItemAdded: 0,
      form: {
        name: "",
        price: 0,
        remain: 0,
        spare_parts: [],
        status: true,
      },
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    plus() {
      this.form.remain = parseInt(this.form.remain) + 1;
      this.countItemAdded++;
      // console.log(this.countItemAdded);
    },
    async fetchItems() {
      await ItemApiStore.dispatch("fetchItems");
      this.items = ItemApiStore.getters.items;
    },
    openForm(item) {
      this.editId = item.id;
      let cloned = JSON.parse(JSON.stringify(item));
      this.form.name = cloned.name;
      this.form.price = cloned.price;
      this.form.remain = cloned.remain;
      this.form.spare_parts = cloned.spare_parts;
      this.form.status = cloned.status;
    },
    openDelete(item) {
      this.deleteId = item.id;
    },
    closeForm() {
      this.editId = -1;
      this.deleteId = -1;
      this.form = {
        name: "",
        price: 0,
        status: true,
      };
      this.countItemAdded = 0;
    },
    async editItem() {
      if (await this.isSparepartEnough()) {
        await this.updateSparepartRemain();
        let payload = {
          id: this.editId,
          name: this.form.name.trim(),
          price: parseInt(this.form.price),
          remain: parseInt(this.form.remain),
          status: this.form.status,
        };
        await ItemApiStore.dispatch("editItem", payload);
      }

      this.closeForm();
      this.fetchItems();
    },

    async updateSparepartRemain() {
      for (const element of this.form.spare_parts) {
        let partRemain = parseInt(element.remain) - this.countItemAdded;
        let payload = {
          id: element.id,
          remain: partRemain,
        };
        await SparepartApi.dispatch("updateSparepartsRemain", payload);
      }
    },

    async isSparepartEnough() {
      for (const element of this.form.spare_parts) {
        if (parseInt(element.remain) < parseInt(this.countItemAdded)) {
          this.$swal(
            "Not Enough Spare-part",
            `${element.name} are not enough`,
            "warning"
          );
          return false;
        }
      }
      return true;
    },

    async deleteItem(item) {
      let payload = {
        id: item.id,
      };
      let res = await ItemApiStore.dispatch("deleteItem", payload);
      if (res.success) {
        // console.log("Delete Success");
        this.$swal("Delete Item Success", item.name, "success");
      } else {
        this.$swal("Delete Item Failed", item.name, "error");
      }
      this.fetchItems();
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