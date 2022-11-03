<template>
  <section class="columns">

    <Prompt class="grid-item" v-for="p in prompts" :key="p.sampler + p.seed" :prompt="p" />

  </section>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
export default {
  setup() {
    return {
      prompts: computed(() => AppState.prompts)
    };
  }
};
</script>


<style lang="scss" scoped>
.columns {
  width: 100%;
  columns: 400px;
  gap: 1em;
}

.grid-item {
  width: 100%;
}
</style>
