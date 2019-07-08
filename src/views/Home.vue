<template>
  <div class="home">
    <topbar />
    <keep-alive v-if='$route.meta.keepAlive'>
      <router-view class="main" />
    </keep-alive>
    <router-view class="main" v-if='!$route.meta.keepAlive' />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Topbar from '@/components/Topbar.vue';

@Component({
  components: {
    Topbar,
  },
})
export default class Home extends Vue {
}
</script>

<style lang="scss">
@import '@/assets/scss/variable.scss';
.main {
  padding-top: $navHeight;
}
</style>

