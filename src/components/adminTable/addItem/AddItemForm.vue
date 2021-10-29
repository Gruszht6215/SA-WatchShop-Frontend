<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Add Item</p>
    </header>

    <section class="modal-card-body">
      <b-field label="Item Name">
        <b-input
          type="name"
          v-model="itemForm.name"
          placeholder="item name"
          required
        >
        </b-input>
      </b-field>

      <b-field label="Price">
        <b-input
          type="price"
          v-model="itemForm.price"
          placeholder="item price"
          required
        >
        </b-input>
      </b-field>

      <b-field label="Remain">
        <b-input
          type="remain"
          v-model="itemForm.remain"
          placeholder="item remain"
          required
        >
        </b-input>
      </b-field>

      <div class="sparepart">
        <b-field label="Spare-Part">
          <b-input
            placeholder="Spare-Part"
            v-model="itemForm.part.join()"
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

      <img :src="previewImage" class="uploading-image" />
      <input type="file" @change="onFileChanged" />
    </section>
    <footer class="modal-card-foot">
      <b-button label="Cancel" @click="$parent.close()" />
      <b-button label="Submit" type="is-primary" @click="onSubmit" />
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
        :spare_parts="leftSpareParts"
        :selected_part="itemForm.part"
        @clicked="setSeletedSparepart"
      ></SparePartForm>
    </b-modal>
    <b-button label="Test" type="is-primary" @click="test" />
  </div>
</template>

<script>
import ItemApi from "@/store/ItemApi";
import SparePartApi from "@/store/SparepartApi";
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
        selectedPartId: [],
      },
      spare_parts: [],
      leftSpareParts: [],
      selectedFile: null,
      previewImage: null,
    };
  },
  created() {
    this.fetchSpareParts();
  },
  methods: {
    async fetchSpareParts() {
      await SparePartApi.dispatch("fetchSpareparts");
      this.spare_parts = SparePartApi.getters.spareparts;
      this.addLeftSpareParts();
    },
    setSeletedSparepart(selectedSparepart) {
      this.itemForm.part = selectedSparepart;
      selectedSparepart.forEach((part_name) => {
        this.leftSpareParts.forEach((element) => {
          if (part_name === element.name) {
            this.itemForm.selectedPartId.push(element.id);
          }
        });
      });
      console.log(this.itemForm.selectedPartId);
    },
    addLeftSpareParts() {
      this.spare_parts.forEach((element) => {
        if (element.remain > 0) {
          this.leftSpareParts.push(element);
        }
      });
    },
    test() {
      console.log("Part", this.itemForm.part);
      console.log("Part", this.itemForm.selectedPartId);
      console.log("sparepart", this.spare_parts);
    },
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        // console.log(this.previewImage);
      };
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append("files", this.selectedFile);

      let payload = {
        name: this.itemForm.name,
        price: this.itemForm.price,
        picture: formData,
        remain: this.itemForm.remain,
        spare_parts: this.itemForm.selectedPartId,
      };
      await ItemApi.dispatch("addItem", payload);

      
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
  border-radius: 15px;
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