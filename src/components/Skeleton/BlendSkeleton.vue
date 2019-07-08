<template>
  <div class="blend-skeleton">
    <div class="blend-item" v-for='item in line' :key='item'>
      <div class="blend-link">
        <div class="blend-img"></div>

        <div class="txt"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class BlendSkeleton extends Vue {
  @Prop({ type: Number, default: 6 })
  private line!: number;
}
</script>

<style lang='scss'>
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/skeleton.scss';
$blendWidth: calc(100vw / 3 - 2px);
.blend-skeleton {
  @include row;
  flex-wrap: wrap;
  .blend-item {
    width: $blendWidth;
    margin-right: 3px;
    position: relative;
    margin-bottom: 13px;
    &:nth-of-type(3n) { margin-right: 0; }
    .txt {
      height: 28px;
      position: relative;
      &::before, &::after {
        content: "";
        position: absolute;
        left: 0;
        width: 100%;
        height: 13px;
        background-color: $skeleton;
      }
      &::before { top: 0; @extend .ani-skeleton2; }
      &::after { bottom: 0; width: 60%; @extend .ani-skeleton3; }
    }
    .blend-img {
      @extend .ani-skeleton1;
      margin-bottom: 4px;
      background-color: $skeleton;
      width: $blendWidth;
      height: $blendWidth;
    }
  }
}
</style>