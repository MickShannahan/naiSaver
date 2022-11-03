<template>
  <div class="component">
    <form @submit.prevent="handleSubmit" class="d-flex flex-wrap">
      <div class="form-floating mb-3 col-6">
        <input v-model="editable.name" class="form-control" placeholder="name" />
        <label for="" class="form-label">name</label>
      </div>
      <div class="form-floating mb-3 col-6">
        <input v-model="editable.img" class="form-control" placeholder="img" />
        <label for="" class="form-label">image</label>
      </div>
      <div class="form-floating mb-3 col-12">
        <textarea v-model="editable.body" class="form-control h-75"></textarea>
        <label for="" class="form-label">Paste the entire prompt</label>
      </div>
      <div class="form-floating mb-3 col-12">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>

  </div>
</template>


<script>
import { ref } from 'vue';
import { promptsService } from '../services/PromptsService.js';
import { logger } from '../utils/Logger.js';
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      handleSubmit() {
        logger.log('raw body', editable.value)
        promptsService.createPrompt(editable.value)
      }
    }
  }
};
</script>


<style lang="scss" scoped>
textarea {
  min-height: 10em;
}
</style>
