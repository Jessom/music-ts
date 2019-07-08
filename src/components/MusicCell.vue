<template>
  <ul class="music-cell-list">
    <li 
      class="music-cell-item"
      v-for='(item, ind) in list'
      :key='item.id'>
      <router-link 
        class="music-link"
        :to="{
          path: `/play/${item.id}`,
          query: { picUrl: item.al.picUrl }
        }"
        :class="{'pl': !index}">
        <div 
          class="music-index"
          v-if='index'
          :class="{'actived': ind <= 2 }">{{ ++ind <= 9 ? '0'+ind : ind }}</div>
        <div class="music-content">
          <div class="content-left">
            <div class="title">{{ item.name }}</div>
            <div class="meta">
              <span 
                v-for='(name, ind) in item.ar'
                :key='name.id'>
                {{ name.name }}
                <span v-if='item.ar.length != ind+1'> / </span>
              </span>
              - {{ item.al.name }}
            </div>
          </div>
          <div class="content-right">
            <span class="icon"></span>
          </div>
        </div>
        <img v-show='false' :src="item.al.picUrl" alt="">
      </router-link>
    </li>
  </ul>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class MusicCell extends Vue {
  @Prop({ type: Boolean, default: false })
  private index!: boolean;

  @Prop({ type: Array, default: () => [] })
  private list!: [];
}
</script>

<style lang='scss'>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/mixin.scss';
.music-cell-list {
  @include resetUl;
  .music-cell-item {
    .music-link {
      @include row;
      &.pl { padding-left: 10px; }
      .music-index {
        flex: 0 0 40px;
        @include center;
        font-size: 17px;
        font-weight: 400;
        color: #666;
        &.actived { color: $theme; }
      }
      .music-content {
        flex: 1;
        padding: 6px 0;
        @include row;
        @include borderBottom;
        .content-left {
          flex: 1;
          line-height: 1.5;
          .title, .meta { @include ellipsis; }
          .title { font-size: 17px; }
          .meta { font-size: 12px; color: #888; }
        }
        .content-right {
          @include center;
          flex: 0 0 42px;
          .icon {
            display: inline-block;
            width: 22px;
            height: 22px;
            background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=) -24px 0 / 166px 97px no-repeat;
          }
        }
      }
    }
  }
}
</style>