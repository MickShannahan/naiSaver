<template>
  <div class="container-fluid">
    <nav class=" p-2 row bg-dark justify-content-center mb-2 flex-row">
      <div class="input-group">
        <div v-if="sfwFilter" class="btn btn-primary" @click="sfwFilter = false"><i class="mdi mdi-domino-mask"></i>
        </div>
        <div v-else class="btn btn-outline-primary" @click="sfwFilter = true"><i class="mdi mdi-domino-mask"></i>
        </div>
        <input class="form-control" type="text" placeholder="Prompter" v-model="filter">
      </div>
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
    const sfwFilter = ref(false)
    return {
      filter,
      sfwFilter,
      prompts: computed(() => AppState.prompts.filter(p => sfwFilter.value ? !p.positive.match(/nsfw|sex|nipples|pussy/ig) : true).filter(p => {
        const fil = filter.value
        if (!fil) return true
        let strings = fil.split(/,|, /ig).map(s => s.toLowerCase())
        logger.log(strings)
        let tags = p.positiveTags.join('')
        return strings.some(s => tags.includes(s))
      }).slice(0, 10))
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
