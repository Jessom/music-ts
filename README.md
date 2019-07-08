# music-ts
仿[网易云音乐](https://music.163.com/m/)(web移动端)

# 技术栈
![VueCLI](https://img.shields.io/badge/VueCLI-3-blue.svg)
![vue](https://img.shields.io/badge/Vue-green.svg)
![vue-router](https://img.shields.io/badge/VueRouter-green.svg)
![Vuex](https://img.shields.io/badge/Vuex-green.svg)
![ts](https://img.shields.io/badge/TypeScript-blue.svg)
![axios](https://img.shields.io/badge/axios-blue.svg)
![es6/es7](https://img.shields.io/badge/es6/es7-blue.svg)

## 路由
```
├─ views
│  ├─ Home.vue          主页面
│  │  ├─ Recom.vue      推荐音乐
│  │  ├─ Hot.vue        热歌榜
│  │  └─ Search.vue     搜索
│  ├─ PlayList.vue      歌单
│  └─ Play.vue          播放
```

## 接口
- 推荐歌单
  - /top/playlist?limit=6
- 歌单详情
  - /playlist/detail?id=24381616
- 热歌榜
  - /top/list?idx=1
- 最新音乐
  - /top/list?idx=0
- 音乐详情
  - /song/detail?ids=563350043,31446838
- 热门搜索
  - /search/hot
- 搜索建议
  - /search/suggest?keywords= 海阔天空
- 搜索
  - /search?keywords= 海阔天空
- 播放音乐
  - https://music.163.com/song/media/outer/url?id=id.mp3