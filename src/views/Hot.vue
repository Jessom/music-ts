<template>
  <div class="hot">
    <div class="hot-img"></div>

    <!-- 骨架屏 -->
    <div v-show='!hotSongs.length'>
      <music-cell-skeleton />
    </div>

    <div v-show='hotSongs.length'>
      <music-cell :index='true' :list='hotSongs' />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { HOT_SONGS } from '@/store/types';
import { State } from 'vuex-class';
@Component
export default class Hot extends Vue {
  @State('hotSongs')
  private hotSongs!: [];

  private created() {
    this.$store.dispatch(HOT_SONGS);
  }
}
</script>

<style lang='scss'>
.hot-img {
  width: 100%;
  height: 125px;
  background: transparent url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562408766816&di=02f4645397f7310275479bbc974eabcf&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa24fac0ae5b12f822e8405f2ae69d82b5639902bca01-OPIgBo_fw658') center / 100% 170% no-repeat;
}
</style>