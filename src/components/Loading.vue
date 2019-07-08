<template>
  <div class="loading">
    <div class="la-line-scale-pulse-out la-2x">
      <div class="load1"></div>
      <div class="load2"></div>
      <div class="load3"></div>
      <div class="load4"></div>
      <div class="load5"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Loading extends Vue {
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/animate.scss';
.loading {
  .la-line-scale-pulse-out.la-2x {
    text-align: center;
    padding: 50px 0;
    &>div {
      width: 6px;
      height: 53px;
      margin: 4px;
      background-color: $theme;
      display: inline-block;
      animation: loading .9s infinite cubic-bezier(.85,.25,.37,.85);
      &.load1 { animation-delay: -.5s; }
      &.load2 { animation-delay: -.7s; }
      &.load3 { animation-delay: -.9s; }
      &.load4 { animation-delay: -.7s; }
      &.load5 { animation-delay: -.5s; }
    }
  }
}
</style>