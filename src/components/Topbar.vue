<template>
  <nav class="nav">
    <div class="nav-item">
      <router-link to='/recom' class="meta">
        <span class="txt">推荐音乐</span>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to='/hot' class="meta">
        <span class="txt">热歌榜</span>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to='/search' class="meta">
        <span class="txt">搜索</span>
      </router-link>
    </div>
  </nav>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Topbar extends Vue {

}
</script>

<style lang="scss">
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/variable.scss';
.nav {
  @include row;
  @include resetUl;
  @include borderBottom;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 9;
  background-color: #fff;
  .nav-item {
    flex: 1;
    text-align: center;
    .meta {
      display: block;
      height: $navHeight;
      line-height: $navHeight;
      &.router-link-active {
        color: $theme;
        .txt::after { background-color: $theme; }
      }
    }
    .txt {
      display: inline-block;
      height: inherit;
      padding: 0 4px;
      font-size: 16px;
      @include borderBottom($color: #fff, $height: 4px, $alpha: 1);
    }
  }
}
</style>
