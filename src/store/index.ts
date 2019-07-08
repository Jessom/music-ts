import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import { fetch } from './api';
import axios from '../utils/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scrollTop: 0,
    playlist: [],
    newSongs: [],
    hotSongs: [],
    playlistSongs: [],
    searchHot: [],
    searchSuggest: [],
    searchList: [],
  },

  mutations: {
    [types.SET_SCROLL_TOP](state: any, payload: number): void {
      state.scrollTop = payload;
    },

    [types.GET_RECOM_DATA](state: any, payload: any[]): void {
      state.playlist = payload[0].playlists;
      state.newSongs = payload[1].songs;
    },

    [types.HOT_SONGS](state: any, payload: any): void {
      state.hotSongs = payload.songs;
    },

    [types.PLAY_LIST_DETAIL](state: any, payload: any): void {
      state.playlistSongs = payload.songs;
    },

    [types.CLEAR_PLAY_LIST](state: any) {
      state.playlistSongs = [];
    },

    [types.SEARCH_HOT](state: any, payload: []) {
      state.searchHot = payload;
    },

    [types.SEARCH_SUGGEST](state: any, payload: []) {
      state.searchSuggest = payload;
    },

    [types.CLEAR_SEARCH_SUGGEST](state: any) {
      state.searchSuggest = [];
    },

    [types.SEARCH](state: any, payload: any) {
      state.searchList = payload.songs;
    },

    [types.CLEAR_SEARCH_LIST](state: any) {
      state.searchList = [];
    },
  },

  actions: {
    [types.SET_SCROLL_TOP]({ commit }, payload: number): void {
      commit(types.SET_SCROLL_TOP, payload);
    },

    async [types.GET_RECOM_DATA]({ commit }) {
      const NEWSONGS = await fetch('/top/list?idx=0');
      const SONGIDS = NEWSONGS.privileges.slice(0, 10).map((c: any) => c.id);
      const RESULT: any = await axios.all([
        fetch('/top/playlist?limit=6'),
        fetch(`/song/detail?ids=${SONGIDS.join(',')}`),
      ]);
      commit(types.GET_RECOM_DATA, RESULT);
    },

    async [types.HOT_SONGS]({ commit }) {
      const HOT_SONGS = await fetch('/top/list?idx=1');
      const SONGIDS = HOT_SONGS.privileges.slice(0, 20).map((c: any) => c.id);
      const RESULT: any = await fetch(`/song/detail?ids=${SONGIDS.join(',')}`);
      commit(types.HOT_SONGS, RESULT);
    },

    async [types.PLAY_LIST_DETAIL]({ commit }, payload: number) {
      const PLAY_LIST_SONGS = await fetch(`/playlist/detail?id=${payload}`);
      const SONGIDS = PLAY_LIST_SONGS.privileges.map((c: any) => c.id);
      const RESULT: any = await fetch(`/song/detail?ids=${SONGIDS.join(',')}`);
      commit(types.PLAY_LIST_DETAIL, RESULT);
    },

    [types.CLEAR_PLAY_LIST]({ commit }) {
      commit(types.CLEAR_PLAY_LIST);
    },

    async [types.SEARCH_HOT]({ commit }) {
      const SEARCH_HOT = await fetch(`/search/hot`);
      commit(types.SEARCH_HOT, SEARCH_HOT.result.hots);
    },

    async [types.SEARCH_SUGGEST]({ commit }, payload: string) {
      const SEARCH_SUGGEST = await fetch(`/search/suggest?keywords=${payload}`);
      commit(types.SEARCH_SUGGEST, SEARCH_SUGGEST.result.songs);
    },

    [types.CLEAR_SEARCH_SUGGEST]({ commit }) {
      commit(types.CLEAR_SEARCH_SUGGEST);
    },

    async [types.SEARCH]({ commit }, payload: string) {
      const SEARCH = await fetch(`/search?keywords=${payload}`);
      const SONGIDS = SEARCH.result.songs.map((c: any) => c.id);
      const RESULT = await fetch(`/song/detail?ids=${SONGIDS.join(',')}`);
      commit(types.SEARCH, RESULT);
    },
  },

  getters: {
    [types.PLAY_LIST](state: any) {
      return (id: number) => {
        return state.playlist.find((item: any) => item.id === Number(id));
      };
    },
  },
});
