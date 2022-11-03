<template>
  <div class="container-fluid">
    <PromptGrid />
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
export default {
  setup() {
    return {
      prompts: computed(() => AppState.prompts)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
