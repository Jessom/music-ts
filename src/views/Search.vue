<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-wrap">
      <div class="search-box">
        <span class="search-ic"></span>

        <input 
          id='input'
          v-model="searchKey"
          class="search-input"
          type="search"
          ref='searchInput'
          @focus="isClick = true;"
          @keypress.enter="onSearch(searchKey)"
          placeholder="搜索歌曲">
        
        <i 
          class="close-icon"
          @click.stop="clearInput"
          v-show='searchKey'></i>
        <!-- <label class="search-label" for="input">搜索歌曲、歌手、专辑</label> -->
      </div>
    </div>

    <section v-show='status === 0'>
      <!-- 热搜 -->
      <div class="search-hot">
        <div class="search-hot-title">热门搜索</div>
        <ul class="search-hot-list">
          <li 
            class="item"
            v-for='(item, ind) in searchHot'
            :key='ind'>
            <div class="txt-box" @click="onHot(item)">
              <span class="txt">{{ item.first }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 搜索记录 -->
      <search-cell
        @onclose='onclose'
        :list='searchHistory'
        @click='click' />
    </section>

    <!-- 推荐 -->
    <section v-show='status === 1'>
      <search-cell
        :history='false'
        :list='searchSuggest'
        @click='click' />
    </section>

    <!-- 结果 -->
    <section v-show="status === 2">
      <music-cell-skeleton :line='5' v-show='!searchList.length' />
      <music-cell :list='searchList' />
    </section>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch, Provide } from 'vue-property-decorator';
import { State } from 'vuex-class';
import SearchCell from '@/components/SearchCell.vue';
import {
  SEARCH,
  SEARCH_HOT,
  SEARCH_SUGGEST,
  CLEAR_SEARCH_SUGGEST,
  CLEAR_SEARCH_LIST,
} from '@/store/types';
@Component({
  components: {
    SearchCell,
  },
})
export default class Search extends Vue {
  @State('searchHot')
  private searchHot!: [];

  @State('searchSuggest')
  private searchSuggest!: [];

  @State('searchList')
  private searchList!: [];

  @Provide()
  private searchKey: string = '';

  @Provide()
  private searchHistory: any[] = [];

  // 用于判断是否需要进行【搜索建议】
  @Provide()
  private isClick: boolean = true;

  // 0显示热搜与记录  1显示推荐搜索  2搜索结果
  @Provide()
  private status: number = 0;

  @Watch('searchKey')
  private onSearchKey(val: string, oldVal: string) {
    if (this.isClick) {
      this.status = 1;
      if (val) {
        this.$store.dispatch(SEARCH_SUGGEST, val);
      } else {
        this.$store.dispatch(CLEAR_SEARCH_SUGGEST);
        this.$store.commit(CLEAR_SEARCH_LIST);
      }
    }
  }

  private created() {
    this.$store.dispatch(SEARCH_HOT);

    const HISTORY = localStorage.getItem('searchHistory') || '{}';
    this.searchHistory = JSON.parse(HISTORY) || [];
  }

  private onclose(item: any) {
    this.searchHistory.splice(this.searchHistory.findIndex((c: any) => c.id === item.id), 1);
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  }

  private onSearch(key: string) {
    this.status = 2;
    this.$store.dispatch(SEARCH, key);
  }

  private clearInput() {
    this.searchKey = '';
    this.isClick = false;
    this.status = 0;
    this.$store.commit(CLEAR_SEARCH_LIST);
  }

  private onHot(item: any) {
    this.isClick = false;
    this.searchKey = item.first;
    this.onSearch(item.first);
  }

  private click(item: any) {
    this.isClick = false;
    this.searchKey = item.name;
    this.saveHistory(item);
    this.onSearch(item.name);
  }

  private saveHistory(item: any): void {
    const INDEX = this.searchHistory.findIndex((c: any) => c.id === item.id);
    if (INDEX < 0) {
      this.searchHistory.push(item);
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
  }
}
</script>

<style lang='scss'>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/mixin.scss';
$searchH: 30px;
.search {
  .search-wrap {
    @include borderBottom;
    padding: 15px 10px;
    .search-box {
      background-color: $searchBg;
      border-radius: $searchH;
      overflow: hidden;
      position: relative;
      @include horizontal(flex-start);
      .search-ic {
        display: block;
        flex: 0 0 13px;
        height: 13px;
        margin-left: 10px;
        margin-right: 10px;
        background: transparent url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==') 0 0 / contain no-repeat;
      }
      .search-input {
        height: $searchH;
        flex: 1;
        border: 0;
        outline: none;
        list-style: none;
        background-color: transparent;
        font-size: 14px;
        padding-right: 35px;
        &::-webkit-input-placeholder {
          color: #c9c9c9;
        }
      }
      .close-icon {
        position: absolute;
        right: 0;
        top: 0;
        width: $searchH;
        height: $searchH;
        background-position: center;
        background-size: 50%;
        background-repeat: no-repeat;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==');
      }
      /* .search-label {
        position: absolute;
        top: 0;
        color: #c9c9c9;
        left: 33px;
        top: 5px;
      } */
    }
  }
  .search-hot {
    padding: 10px;
    .search-hot-title {
      font-size: 12px;
      color: #666;
    }
    .search-hot-list {
      @include resetUl;
      margin: 10px 0 7px;
      .item {
        display: inline-block;
        margin-right: 8px;
        margin-bottom: 8px;
        .txt-box {
          height: 30px;
          line-height: 30px;
          border-radius: 30px;
          padding: 0 14px;
          border: 1px solid #d3d4da;
        }
      }
    }
  }
}
</style>
