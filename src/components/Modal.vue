<template>

  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div class="modal fade" :id="id" tabindex="-1" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
      <div class="modal-content bg-dark text-light">

        <div class="modal-body p-0">
          <slot name="body">no body</slot>
        </div>

      </div>
    </div>
  </div>

</template>


<script>
export default {
  props: { id: { type: String, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>

</style>
