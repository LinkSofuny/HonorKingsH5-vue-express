<template>
  <div class="card bg-white mt-2 p-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <div class="iconfont icon-menu"></div>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
 props: {
   title: { tyep: String, required: true },
   icon: { tyep: String, required: true },
 }
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