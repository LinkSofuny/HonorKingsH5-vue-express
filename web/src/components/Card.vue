<template>
  <div class="card bg-white mt-2 p-3">
    <div class=" d-flex ai-center " :class="{'border-bottom': !plain, 'pb-3': !plain}">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2" :class="{'fw-xl': plain}">{{title}}</div>
      <div class="iconfont icon-menu" v-if="!plain"></div>
    </div>
    <div class="card-body pt-3">
      <slot ></slot>
    </div>
  </div>
</template>

<script>
export default {
 props: {
   title: { tyep: String, required: true },
   icon: { tyep: String, required: true },
   plain: { type: Boolean}
 },
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';

.card {
  border-bottom: 1px solid $border-color;
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>