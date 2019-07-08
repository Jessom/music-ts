<template>
  <div class="recom">
    <!-- 骨架屏 -->
    <div v-show='!playlist.length'>
      <cell-head-skeleton />
      <blend-skeleton />

      <div style="margin-top:20px;">
        <cell-head-skeleton />
        <music-cell-skeleton />
      </div>
    </div>

    <!-- 内容 -->
    <div v-show='playlist.length'>
      <div>
        <cell-head title='推荐歌单' />
        <blend :list='playlist' />
      </div>

      <div style="margin-top:20px;">
        <cell-head title='最新音乐' />
        <music-cell :list='newSongs' />
      </div>

      <footer class="footer">
        <div class="blur"></div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { getScrollTop, setScrollTop } from '@/utils/index';
import { SET_SCROLL_TOP, GET_RECOM_DATA } from '@/store/types';
import Blend from '@/components/Blend.vue';

@Component({
  components: {
    Blend,
  },
})
export default class Home extends Vue {
  @State('scrollTop')
  private scrollTop: any;

  @State('playlist')
  private playlist!: [];

  @State('newSongs')
  private newSongs!: [];

  private created() {
    this.$store.dispatch(GET_RECOM_DATA);
  }

  private beforeRouteLeave(to: any, from: any, next: () => void): void {
    if (to.name === '/playlist') {
      this.$store.dispatch(SET_SCROLL_TOP, getScrollTop());
    }
    next();
  }

  private activated(): void {
    setScrollTop(this.scrollTop);
  }
}
</script>

<style lang="scss">
.recom {
  margin-top: 20px;
}
.footer {
  width: 100%;
  margin-top: 10px;
  height: 100px;
  overflow: hidden;
  position: relative;
  .blur {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: transparent url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562390952642&di=842fa17613e091c24e2288718bf2b676&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F23%2F31%2F57%2F591403dc99ea3.png') top -100px center / 100% auto no-repeat;
    transform: scale(1.3);
    filter: blur(2px);
  }
}
</style>
