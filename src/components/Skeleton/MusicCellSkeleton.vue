<template>
  <ul class="music-cell-skeleton">
    <li class="music-cell-item" v-for='item in line' :key='item'>
      <div class="music-link pl">
        <div class="music-content">
          <div class="content-left">
            <div class="title"></div>
            <div class="meta"></div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class MusicCellSkeleton extends Vue {
  @Prop({ type: Number, default: 10 })
  private line!: number;
}
</script>

<style lang='scss'>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/skeleton.scss';
.music-cell-skeleton {
  @include resetUl;
  .music-cell-item {
    .music-link {
      @include row;
      &.pl { padding-left: 10px; }
      .music-content {
        flex: 1;
        padding: 6px 0;
        @include row;
        // @include borderBottom;
        .content-left {
          flex: 1;
          .title, .meta { background-color: $skeleton; }
          .title { height: 21px; width: 150px; @extend .ani-skeleton2; }
          .meta { height: 18px; width: 270px; margin-top: 4px; @extend .ani-skeleton3; }
        }
      }
    }
  }
}
</style>
