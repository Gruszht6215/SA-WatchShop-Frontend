<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Select Product's Spare-part</p>
        <button type="button" class="delete" @click="$parent.close()" />
      </header>
      <section class="modal-card-body">
        <b-field>
          <b-checkbox
            v-model="selected_part"
            v-for="(spare, index) in spare_parts"
            :key="index"
            :native-value="spare.name"
          >
            <p v-if="spare.remain > 0">{{ spare.name }}</p>
          </b-checkbox>
        </b-field>

        <p class="content">
          <b>Selection:</b>
          {{ selected_part }}
        </p>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$parent.close()" />
        <b-button
          label="Confirm"
          type="is-primary"
          @click="
            onClickConfirm($props.selected_part);
            $parent.close();
          "
        />
      </footer>
    </div>
  </form>
</template>

<script>
import SparePartApi from "@/store/SparepartApi";

export default {
  props: ["spare_parts", "selected_part"],
  data() {
    return {};
  },
  methods: {
    onClickConfirm(sparepart) {
      this.$emit("clicked", sparepart);
    },
  },
};
</script>

<style scoped lang="scss">
</style>