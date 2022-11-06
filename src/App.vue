<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <div class="btn btn-primary rounded-pill prompt-fab" data-bs-target="#create-prompt" data-bs-toggle="modal"><i
        class="mdi mdi-plus"></i> prompt</div>
  </main>
  <footer class="bg-dark text-light">
    <Modal id="create-prompt">
      <template #body class="bg-dark">
        <div class="p-4">
          <div class="row nav-tabs nav-dark mb-3">
            <div class="col-3 nav-item p-0">
              <p class="nav-link p-2" :class="{ active: modalTab == 'block' }" @click="modalTab = 'block'">block</p>
            </div>
            <div class="col-3 nav-item p-0">
              <p class="nav-link p-2" :class="{ active: modalTab == 'input' }" @click="modalTab = 'input'">input</p>
            </div>
          </div>
          <CreatePromptForm v-if="modalTab == 'input'" />
          <PasteForm v-if="modalTab == 'block'" />
        </div>
      </template>
    </Modal>
    <!-- Fab create -->

    <Modal id="prompt-details">
      <template #body class="p-0">
        <div class="container-fluid">
          <PromptDetails />
        </div>
      </template>
    </Modal>
  </footer>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    const modalTab = ref('block')
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

.prompt-fab {
  position: fixed;
  bottom: 1em;
  left: calc(50vw - 50px);
  width: 100px;
  text-align: center;
  margin: auto 0px;
  background-color: $primary;
}

:root {
  --main-height: calc(100vh - 32px - 64px);
}
</style>
