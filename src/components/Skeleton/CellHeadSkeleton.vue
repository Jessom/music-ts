<template>
  <div class="cell-head-skeleton">
    <span class="skeleton"></span>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class CellHeadSkeleton extends Vue {
}
</script>

<style lang='scss'>
@import "@/assets/scss/variable.scss";
@import '@/assets/scss/skeleton.scss';
.cell-head-skeleton {
  position: relative;
  font-size: 16px;
  height: $cellHeadH;
  line-height: $cellHeadH;
  margin-bottom: 10px;
  .skeleton {
    display: inline-block;
    background-color: $skeleton;
    @extend .ani-skeleton1;
    height: 25px;
    width: 120px;
  }
}
</style>
