<template>
  <div class="wrap selectable rounded-sm elevation-2">
    <BImage v-cloak :image="prompt" @click="setActive" data-bs-toggle="modal" data-bs-target="#prompt-details" />
    <!-- <img :src="prompt.img" alt="" @click="setActive" data-bs-toggle="modal" data-bs-target="#prompt-details"> -->
    <button class="btn btn-danger delete rounded-0" @click="deletePrompt"><i
        class="mdi mdi-delete-forever"></i></button>
  </div>
</template>


<script>
import { ref } from 'vue';
import { AppState } from '../AppState.js';
import { Prompt } from '../models/Prompt.js';
import { promptsService } from '../services/PromptsService.js';
import { logger } from '../utils/Logger.js';

export default {
  props: { prompt: { type: Prompt, required: true } },
  setup(props) {
    return {
      setActive() {
        AppState.activePrompt = props.prompt
      },
      deletePrompt() {
        logger.log('delete', props.prompt.name)
        promptsService.deletePrompt(props.prompt.seedId)
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.wrap {
  color: var(--bs-light);
  position: relative;
  height: 100%;
  width: 100%;
  transition: all ease .2s;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.15) 0%, rgba(214, 214, 214, 0.15) 100%);

  &:hover {
    transform: scale(1.01);
  }

  &:hover .delete {
    transition: opacity ease .2s .75s;
    opacity: 0;
    transform: scale(0);
    animation: reveal .2s .75s forwards ease;
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete {
  background-color: var(--bs-danger);
  top: 0;
  left: 0;
  position: absolute;
  opacity: 0;
  transform: scale(0);

  i {
    transform: scale(0);
  }
}

@keyframes reveal {
  0% {
    opacity: 0;
    transform: scale(0);
    display: none;
  }

  10% {
    opacity: 0;
    transform: scale(1);
    display: block;
  }

  100% {
    opacity: 1;
    transform: scale(1);
    display: block;
  }
}
</style>
