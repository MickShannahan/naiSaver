<template>
  <div class="component">
    <form @submit.prevent="handleSubmit" class="d-flex flex-wrap">
      <div class="form-floating mb-3 col-6">
        <input v-model="editable.name" class="form-control" placeholder="name" required minlength="3" maxlength="25" />
        <label for="" class="form-label">name</label>
      </div>
      <div class="mb-3 col-6">
        <!-- <input @change="fileUpload" class="form-control" placeholder="img" type="file" /> -->
        <UploadButton @uploadComplete="up => editable.img = up.url" />
      </div>
      <div class="mb-3 col-12 img-preview d-flex justify-content-center">
        <img :src="editable.img" class="img-fluid" alt="">
      </div>
      <div class="form-floating mb-3 col-12">
        <textarea v-model="editable.body" class="form-control h-75"></textarea>
        <label for="" class="form-label">Paste the entire prompt</label>
      </div>
      <div class="form-floating mb-3 col-12">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
      <div v-if="uploading" class="progress mb-3 col-12">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar"
          style="width: 100%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Uploading</div>
      </div>
    </form>

  </div>
</template>


<script>
import { ref } from 'vue';
import { blobsService } from '../services/BlobService.js';
import { promptsService } from '../services/PromptsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {

    const editable = ref({})
    const uploading = ref(false)
    return {
      editable,
      uploading,
      async handleSubmit() {
        if (!uploading.value) {
          logger.log('raw body', editable.value)
          await promptsService.createPrompt(editable.value)
          editable.value = {}
        }
      },
      async fileUpload(e) {
        try {
          uploading.value = true
          if (e.target.files.length) {
            let file = e.target.files[0]
            logger.log('file', file)
            const url = await blobsService.upload(file)
            editable.value.img = url
          }
        } catch (e) {
          Pop.toast(e.message, 'error')
          logger.error(e)
        } finally {
          uploading.value = false
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
textarea {
  min-height: 10em;
}

.img-preview {
  max-height: 20vh;
}
</style>
