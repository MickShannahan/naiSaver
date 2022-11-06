<template>
  <section class="brick-grid">

    <div :class="`grid-item ${gridSize(p.width, p.height)}`" v-for="p in prompts" :key="p.sampler + p.seed">
      <Prompt :prompt="p" />
    </div>

  </section>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
export default {
  props: { prompts: { type: Array } },
  setup() {
    return {
      gridSize(x, y) {
        if (x - y > 200) return 'wide'
        if (y - x > 200) return 'tall'
        if (Math.abs(x - y) <= 180) return 'big'
        return ''
      }
    };
  }
};
</script>


<style lang="scss" scoped>
.columns {
  width: 100%;
  columns: 250px;
  gap: 1em;
}

.brick-grid {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(180px, .9fr));
  grid-auto-rows: minmax(275px, 10%);
  grid-auto-flow: dense;
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.wide {
  grid-column: span 2;
}

.tall {
  grid-row: span 2;
}

.big {
  grid-column: span 2;
  grid-row: span 2;
}
</style>
