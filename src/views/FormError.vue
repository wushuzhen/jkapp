<template>
  <div class="form-error">
    <p v-for="(item, i) in formErrors" :key="i">{{ item.message }}</p>
  </div>
</template>

<script>
export default {
  name: "form-error",
  props: {
    response: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    formErrors: function() {
      let errors;
      if (this.response.data) errors = this.response.data["form_error"];
      //console.log(errors);
      if (errors) return JSON.parse(errors).name;
      else return {};
    }
  }
};
</script>  

<style lang="less" scoped>
.form-error {
  color: red;
}
</style>
