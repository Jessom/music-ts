<template>
  <div class="cell-head">
    {{ title }}
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class CellHead extends Vue {
  @Prop({ type: String, default: '', required: true })
  private title!: string;
}
</script>

<style lang='scss'>
@import "@/assets/scss/variable.scss";
.cell-head {
  position: relative;
  font-size: 16px;
  height: $cellHeadH;
  line-height: $cellHeadH;
  padding-left: 9px;
  margin-bottom: 10px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 5px;
    width: 3px;
    height: $cellHeadH - 10;
    background-color: $theme;
  }
}
</style>
