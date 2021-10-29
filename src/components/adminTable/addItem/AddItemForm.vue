<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <h1 class="modal-card-title">Add Item</h1>
    </header>

    <section class="modal-card-body">
      <b-field label="Item Name">
        <b-input
          type="name"
          :value="itemForm.name"
          placeholder="item name"
          required
        >
        </b-input>
      </b-field>

      <b-field label="Price">
        <b-input
          type="price"
          :value="itemForm.price"
          placeholder="item price"
          required
        >
        </b-input>
      </b-field>

      <b-field label="Remain">
        <b-input
          type="remain"
          :value="itemForm.remain"
          placeholder="item remain"
          required
        >
        </b-input>
      </b-field>

      <div class="sparepart">
        <b-field label="Spare-Part">
          <b-input
            placeholder="Spare-Part"
            :value="itemForm.part.join()"
            disabled
          ></b-input>
        </b-field>

        <b-button
          label="Select Spare-part Used"
          type="is-primary"
          size="is-medium"
          @click="isComponentModalActive = true"
        />
      </div>
    </section>
    <footer class="modal-card-foot">
      <b-button label="Cancel" @click="$parent.close()" />
      <b-button label="Submit" type="is-primary" />
    </footer>

    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal
    >
      <SparePartForm
        :spare_parts="spare_parts"
        :selected_part="itemForm.part"
      ></SparePartForm>
    </b-modal>

    <b-button label="Test" type="is-primary" @click="test" />
  </div>
</template>

<script>
import SparePartApi from "@/store/SparePartApi";
import SparePartForm from "@/components/adminTable/addItem/SparePartForm";

export default {
  components: {
    SparePartForm,
  },
  data() {
    return {
      isComponentModalActive: false,
      itemForm: {
        name: "",
        price: null,
        remain: null,
        part: [],
      },
      spare_parts: [],
    };
  },
  created() {
    this.fetchSpareParts();
  },
  methods: {
    async fetchSpareParts() {
      await SparePartApi.dispatch("fetchSpareParts");
      this.spare_parts = SparePartApi.getters.spare_parts;
    },
    test() {
      console.log("TESTING", this.spare_parts);
    },
  },
};
</script>

<style scoped lang="scss">
.sparepart {
  background-color: #c0c0c0;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 25px;
  padding-bottom: 25px;
}
.spareparts {
  background-color: #c0c0c0;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 25px;
  padding-bottom: 25px;
}

.card {
  padding: 25px;
}
</style>