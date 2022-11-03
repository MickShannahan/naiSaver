<template>
  <div class="component">
    <form class="container-fluid" @submit.prevent="handleSubmit()">
      <div class="d-flex flex-wrap">


        <div class="form-floating mb-3 col-6">
          <input type="text" class="form-control" v-model="editable.name" aria-describedby="helpId" placeholder="name">
          <label for="" class="form-label">Name</label>
        </div>

        <div class="form-floating mb-3 col-6">
          <input type="text" class="form-control" v-model="editable.image" aria-describedby="helpId"
            placeholder="image">
          <label for="" class="form-label">Image</label>
        </div>

        <div class="form-floating mb-3 col-12 h-100">
          <textarea v-model="editable.positive" class="form-control h-25" rows="5"
            placeholder="positive prompt"></textarea>
          <label for="" class="form-label">Positive</label>
        </div>

        <div class="form-floating mb-3 col-12 h-100">
          <textarea v-model="editable.negative" class="form-control h-25" rows="5"
            placeholder="negative prompt"></textarea>
          <label for="" class="form-label">Negative</label>
        </div>

        <div class="form-floating mb-3 col-3">
          <input type="text" class="form-control" v-model="editable.method" aria-describedby="helpId"
            placeholder="method">
          <label for="" class="form-label">method</label>
        </div>

        <div class="form-floating mb-3 col-3">
          <input type="text" class="form-control" v-model="editable.steps" aria-describedby="helpId"
            placeholder="steps">
          <label for="" class="form-label">steps</label>
        </div>

        <div class="form-floating mb-3 col-3">
          <input type="text" class="form-control" v-model="editable.seed" aria-describedby="helpId" placeholder="seed">
          <label for="" class="form-label">seed</label>
        </div>

        <div class="form-floating mb-3 col-3">
          <input type="text" class="form-control" v-model="editable.cfg" aria-describedby="helpId" placeholder="cfg">
          <label for="" class="form-label">cfg</label>
        </div>

        <div class="form-floating mb-3 col-6">
          <input type="text" class="form-control" v-model="editable.height" aria-describedby="helpId" placeholder="">
          <label for="" class="form-label">height</label>
        </div>

        <div class="form-floating mb-3 col-6">
          <input type="text" class="form-control" v-model="editable.height" aria-describedby="helpId" placeholder="">
          <label for="" class="form-label">width</label>
        </div>

      </div>
    </form>
  </div>
</template>


<script>
import { ref } from 'vue';

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      handleSubmit() {

      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>
