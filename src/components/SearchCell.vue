<template>
  <ul class="search-list">
    <li 
      class="search-item"
      v-for='item in list'
      :key='item.id'>
      <div class="search-link" @click="click(item)">
        <i class="icon" :class="history ? '' : 'icon1'"></i>
        <div class="search-content">
          <div class="txt">{{ item.name }}</div>

          <i class="icon-close" v-if='history' @click.stop="onclose(item)"></i>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
@Component
export default class SearchCell extends Vue {
  @Prop({ type: Boolean, default: true })
  private history!: boolean;

  @Prop({ type: Array, default: () => [], required: true })
  private list!: any[];

  @Emit()
  private onclose(item: any): string {
    return item;
  }

  @Emit()
  private click(item: any): any {
    return item;
  }
}
</script>

<style lang='scss'>
@import '@/assets/scss/mixin.scss';
$height: 44px;
.search-list {
  @include resetUl;
  .search-item {
    .search-link {
      @include horizontal(flex-start);
      height: $height;
    }
    .icon {
      display: block;
      flex: 0 0 15px;
      height: 15px;
      margin: 0 10px;
      background-color: transparent;
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+');
      background-position: 0 0;
      background-size: contain;
      background-repeat: no-repeat;
      &.icon1 {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjguMTgxIDI3LjUzNWwtMS40MTQgMS40MTQtNy43NTUtNy43NTRBMTEuNDQ1IDExLjQ0NSAwIDAgMSAxMS41IDI0QzUuMTQ5IDI0IDAgMTguODUyIDAgMTIuNSAwIDYuMTQ5IDUuMTQ5IDEgMTEuNSAxIDE3Ljg1MiAxIDIzIDYuMTQ5IDIzIDEyLjVjMCAyLjc1Ni0uOTczIDUuMjg1LTIuNTg5IDcuMjY2bDcuNzcgNy43Njl6TTExLjUgM2E5LjUgOS41IDAgMSAwIDAgMTkgOS41IDkuNSAwIDAgMCAwLTE5eiIgb3BhY2l0eT0iLjMiLz48L3N2Zz4=');
      }
    }
    .search-content {
      flex: 1;
      height: 100%;
      @include borderBottom;
      @include horizontal(space-between);
      .txt {
        flex: 1;
        @include ellipsis;
      }
      .icon-close {
        display: block;
        flex: 0 0 12px;
        height: $height;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=');
        margin: 0 10px;
      }
    }
  }
}
</style>
