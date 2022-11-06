<template>
  <div class="container-fluid">
    <nav class=" p-2 row bg-dark justify-content-center mb-2">
      <h6 class="w-100"><input class="form-control w-100 h-100" type="text" placeholder="Prompter" v-model="filter">
      </h6>
    </nav>
    <PromptGrid :prompts="prompts" />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
export default {
  setup() {
    const filter = ref('')
    return {
      filter,
      prompts: computed(() => AppState.prompts.filter(p => {
        const fil = filter.value
        if (!fil) return true
        let strings = fil.split(/,|, /ig).map(s => s.toLowerCase())
        logger.log(strings)
        let tags = p.positiveTags.join('')
        return strings.every(s => tags.includes(s))
      }))
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
