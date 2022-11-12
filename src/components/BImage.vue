<template>
  <div class="responsive">
    <div class="wrapper">
      <canvas :id="image.seedId"></canvas>
    </div>
    <img v-show="loaded" :src="image.img" alt="" @load="load" :class="{ fade: loaded }">
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { decode } from "blurhash";
import { logger } from '../utils/Logger.js';
import { blurService } from '../services/BlurService.js'
export default {
  props: { image: { type: Object, required: true } },
  setup(props) {
    const loaded = ref(false)
    function hash() {
      const canvas = document.getElementById(props.image.seedId);
      blurService.hash(canvas, props.image.blurhash, 150, 150)
    }

    onMounted(() => {
      hash()
      logger.log('bimage loaded')
    })
    return {
      loaded,
      load() {
        setTimeout(() => loaded.value = true, 50)
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.responsive {
  overflow: hidden;
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: relative;
}

.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
  object-fit: cover;

  canvas {
    height: 100%;
    width: 200%;
    opacity: 70%;

  }
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0;
}

.fade {
  animation: reveal .2s forwards;
}

@keyframes reveal {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
