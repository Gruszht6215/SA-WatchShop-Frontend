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
            {{ spare.name }}
          </b-checkbox>
        </b-field>

        <p class="content">
          <b>Selection:</b>
          {{ selected_part }}
        </p>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$parent.close()" />
        <b-button label="Login" type="is-primary" />
      </footer>

      <b-button label="Test" @click="test" />
    </div>
  </form>
</template>

<script>
import SparePartApi from "@/store/SparePartApi";

export default {
  props: ["spare_parts", "selected_part"],
  data() {
    return {
    };
  },
  methods: {
    test() {
      console.log(this.$props.selected_part);
      console.log(this.$props.spare_parts);
    },
  },
};
</script>

<style>
</style>