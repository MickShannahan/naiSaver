<template>
  <div class="row">
    <img class="img-fluid" :src="prompt.img" alt="">
  </div>
</template>


<script>
import { Prompt } from '../models/Prompt.js';

export default {
  props: { prompt: { type: Prompt, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>

</style>
