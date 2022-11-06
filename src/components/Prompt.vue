<template>
  <div class="wrap selectable rounded-sm elevation-2">
    <img :src="prompt.img" alt="" @click="setActive" data-bs-toggle="modal" data-bs-target="#prompt-details">
    <button class="btn btn-danger delete rounded-0" @click="deletePrompt"><i
        class="mdi mdi-delete-forever"></i></button>
  </div>
</template>


<script>
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
        promptsService.deletePrompt(props.prompt.name + props.prompt.seed)
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

  &:hover {
    transform: scale(1.01);
  }

  &:hover .delete {
    transition: all ease .2s .75s;
    opacity: 1;
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
}
</style>
