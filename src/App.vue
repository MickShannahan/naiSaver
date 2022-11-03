<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    <Modal id="create-prompt">
      <template #body class="bg-dark">
        <div class="row nav-tabs nav-dark mb-3">
          <div class="col-3 nav-item p-0">
            <p class="nav-link p-2" :class="{ active: modalTab == 'input' }" @click="modalTab = 'input'">input</p>
          </div>
          <div class="col-3 nav-item p-0">
            <p class="nav-link p-2" :class="{ active: modalTab == 'block' }" @click="modalTab = 'block'">block</p>
          </div>
        </div>
        <CreatePromptForm v-if="modalTab == 'input'" />
        <PastePrompt v-if="modalTab == 'block'" />

      </template>
    </Modal>
    <div class="btn btn-primary" data-bs-target="#create-prompt" data-bs-toggle="modal">create prompt</div>
  </footer>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    const modalTab = ref('input')
    return {
      modalTab,
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
