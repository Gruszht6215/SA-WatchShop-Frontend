<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ itemInput.name_item }}</p>
        </div>
      </div>
      <div class="content">
        Amount: {{itemInput.amount}}
        <br>
        Total: {{itemInput.price_all}}
        <br>
        Buy Date
        <div class="tag is-info">{{itemInput.date}}</div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    itemInput: Object
  },
  data() {
      return {
 
      }
  },
  methods:{
    
  }
}
</script>

<style scoped lang="scss">
.card{
  margin: 20px;
  width: 400px;
  height: auto;
  position: relative;
  float: left;
  margin-left: 47px;
}
</style>