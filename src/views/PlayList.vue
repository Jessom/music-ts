<template>
  <div class="play-list">
    <section class="plhead">
      <div 
        class="plhead-blur"
        :style="'background-image: url('+ plinfo.coverImgUrl +')'"></div>
      <div class="plhead-content">
        <div class="plhead-fl shadow">
          <img :src="plinfo.coverImgUrl" alt="">
          <span class="tag">歌单</span>
          <span class="playcount">{{ plinfo.playCount | playCountFilter }}</span>
        </div>
        <div class="plhead-fr">
          <div class="pl-title">{{ plinfo.name }}</div>

          <div class="plhead-author">
            <router-link class="plhead-link" to='/play/123'>
              <img :src="plinfo.creator.avatarUrl" alt="" class="avatar">
              {{ plinfo.creator.nickname }}  
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="pldesc">
      <div class="tags">
        标签：
        <span class="tag" v-for='(item, ind) in plinfo.tags' :key='ind'>{{ item }}</span>
      </div>
      <div class="desc">
        <div class="box" :style="show ? 'height:auto;' : ''">
          <div 
            v-for='(item, ind) in plinfo.description.split(/\n/g)'
            :key='ind'>{{ ind===0 ? "简介：" + item : item }}</div>
        </div>
        
        <div 
          class="btn"
          :class="show ? 'show' : 'hide'"
          @click="show = !show"></div>
      </div>
    </section>

    <div class="cell">歌曲列表</div>

    <music-cell-skeleton v-show='!playlistSongs.length' />
    <music-cell :list='playlistSongs' v-show="playlistSongs.length" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import { PLAY_LIST_DETAIL, CLEAR_PLAY_LIST } from '@/store/types';
@Component
export default class PlayList extends Vue {
  @Getter('PLAY_LIST')
  private playlist!: any;

  @State('playlistSongs')
  private playlistSongs!: [];

  @Provide()
  private plinfo: any = {};

  @Provide()
  private show: boolean = false;

  @Provide()
  private plID!: number | string;

  private created(): void {
    this.plID = this.$route.params.id;
    this.requestPlayListSongs();
  }

  private activated(): void {
    this.requestPlayListSongs();
  }

  private deactivated() {
    // 当前组件激活时，数据显示不正确
    // 再次清空 playlistSongs，重新请求歌单列表
    this.$store.dispatch(CLEAR_PLAY_LIST);
  }

  private requestPlayListSongs() {
    this.plinfo = this.playlist(this.plID);
    this.$store.dispatch(PLAY_LIST_DETAIL, this.plID);
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/variable.scss';
$pflw: 114px;
$avatar: 36px;
.play-list {
  .plhead {
    position: relative;
    padding: 30px 15px;
    overflow: hidden;
    .plhead-blur {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transform: scale(1.5);
      filter: blur(20px);
      &::after {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(#000, .1);
      }
    }
    .plhead-content {
      @include row;
      position: relative;
      z-index: 1;
    }
    .plhead-fl {
      flex: 0 0 $pflw;
      height: $pflw;
      position: relative;
      .ls-num, .tag { position: absolute; }
      .ls-num { right: 2px; top: 0px; padding-left: 15px; }
      .tag {
        left: 0; top: 10px;
        background-color: $theme;
        color: #fff;
        font-size: 12px;
        line-height: 17px;
        padding: 0 8px;
        border-top-right-radius: 17px;
        border-bottom-right-radius: 17px;
      }
    }
    .plhead-fr {
      flex: 1;
      margin-left: 16px;
      .pl-title {
        padding: 1px;
        font-size: 17px;
        line-height: 1.3;
        color: #fff;
        @include ellipsis(2);
      }
      .plhead-author {
        margin-top: 20px;
        margin-left: 10px;
        .plhead-link {
          @include horizontal(flex-start);
          color: rgba(#fff, .9);
          .avatar {
            width: $avatar;
            height: $avatar;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .pldesc {
    padding: 10px 15px 5px;
    color: #666;
    .tags {
      font-size: 15px;
      .tag {
        display: inline-block;
        font-size: 12px;
        padding: 2px 8px;
        margin-right: 10px;
        border: 1px solid rgba(#000, .1);
        border-radius: 14px;
      }
    }
    .desc {
      margin-top: 7px;
      font-size: 15px;
      .box {
        height: 63px;
        overflow: hidden;
      }
      .btn {
        height: 20px;
        background-position:  right center;
        background-size: 12px auto;
        background-repeat: no-repeat;
        &.hide { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAANCAQAAAAZZWZbAAAAkElEQVR4AY2RtQEDMQxFX+D4RsgA6cN4XGr/cQJyEzD9yvCeZIAVWxbEJKNhDQ3CiUUE3iE0UNAjnFniS674nVQnqlw8iiHuJN/+hQRbzBluJP8tryQWfLAXy2j/61Aa3H7clOb7pJSMFtyipABUip/9T55yR2hIqZnifihRpVX8aMGtyg1BODAnMglHdnb8CYQbEwGgBxiKAAAAAElFTkSuQmCC'); }
        &.show { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAANCAQAAAAZZWZbAAAAlElEQVR4AY2ShQ1CMRBA33efgSgD4B/3aPdfhwsO1Vdvz1OMZCwYExNIzhYlbUocJr5DybjKPPOrFHfxLRndXWVO7Bbfo9iQIdBykdOCBAslBxRrMgS/yl2cFRnfNHeVnkQXP97FU/6pOcvL8vel4nS/NEdbc/oxdr/Q3eoGV2Qvl3piusrxWRCPuJ4lg+BfU7JneAOq9xL9utncPAAAAABJRU5ErkJggg=='); }
      }
    }
  }

  .cell {
    font-size: 12px; color: #666; line-height: 23px;
    background-color: #eeeff0;
    padding: 0 10px;
  }
}
</style>
