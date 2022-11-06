<template>
  <div class="row p-0 prompt-details" v-if="prompt.name">
    <!-- LEFT -->
    <div class="img-wrap p-0 col-md-6">
      <div class="blur-fill h-100 w-100 d-flex justify-content-center align-items-center">
        <img :src="prompt.img" class="img-fluid" alt="">
      </div>
    </div>
    <!-- RIGHT -->
    <div class="col-md-6 p-4 d-flex flex-column justify-content-between">
      <div class="mb-2 text-center">
        <h4 class=" text-primary mt-4 mb-2">{{ prompt.name }}</h4>
        <small class="text-secondary">{{ prompt.sampler }} | {{ prompt.steps }} | {{ prompt.cfg }} | {{ prompt.seed
        }} </small>
        <br />
        <small v-if="prompt.denoise" class="text-secondary">{{ prompt.firstWidth }}x{{ prompt.firstHeight }} <i
            class="mdi mdi-arrow-right"></i>{{ prompt.width
            }}x{{ prompt.height }}<i class="mdi mdi-blur"></i>{{ prompt.denoise }}</small>
        <small v-else class="text-secondary">{{ prompt.width }}x{{ prompt.height }}</small>
        <div class="d-flex flex-wrap justify-content-center"><span v-for="t in topTags" class="tag">{{ t }}</span></div>
      </div>
      <p class="positive">{{ prompt.positive }}</p>
      <div class="negative p-1 px-3 w-100 selectable rounded" data-bs-toggle="collapse"
        data-bs-target="#negative-prompt">
        <h6>Negative</h6>
        <div id="negative-prompt" class="negative p-1 mb-2 collapse">{{ prompt.negative }}
        </div>

      </div>
      <div class="d-flex justify-content-evenly">
        <button class="btn btn-outline-info rounded-pill px-4" @click="copyFrom('positive')"><i
            class="mdi mdi-content-copy"></i> <i class="mdi mdi-plus"></i></button>
        <button class="btn btn-outline-info rounded-pill px-4" @click="copyFrom('negative')"><i
            class="mdi mdi-content-copy"></i> <i class="mdi mdi-minus"></i></button>
        <button class="btn btn-outline-info rounded-pill px-4" @click="copyFrom('rawBody')"><i
            class="mdi mdi-content-copy"></i>
          all</button>
      </div>
    </div>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    const regSplit = /,|, /ig
    return {
      prompt: computed(() => AppState.activePrompt),
      blurFill: computed(() => `url(${AppState.activePrompt.img})`),
      tagCount: computed(() => AppState.activePrompt.positive.split(regSplit).length),
      topTags: computed(() => AppState.activePrompt.positive.split(regSplit).slice(0, 10)),
      copyFrom(prop) {
        navigator.clipboard.writeText(AppState.activePrompt[prop])
        Pop.toast('copied ' + prop, 'success', 'top')
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import '../assets/scss/main.scss';

.prompt-details {
  min-height: 55vh;
}

.blur-fill {
  backdrop-filter: blur(20px);
}

.img-wrap {
  background-image: v-bind(blurFill);
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.tag {
  margin: .2em;
  padding: .2em .4em;
  font-size: 12px;
  border-radius: 50em;
  color: var(--bs-secondary);
  background: var(--bs-black)
}

.positive {}

.negative {
  color: lighten($color: $danger, $amount: 20deg);
  background-color: transparentize($color: $danger, $amount: .8);
}
</style>
