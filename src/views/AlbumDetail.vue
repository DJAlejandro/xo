<template>
  <div class="album-detail">
    <v-header></v-header>

    <div class="album-header" v-if="albumList!=null">
      <div class="album-img">
        <img :src="albumList.src" alt="edit" />
      </div>
      <div class="album-content">
        <div class="album-content-title">{{albumList.name}}</div>
        <div class="album-content-info">
          <div class="album-content-text">
            by
            <span v-for="artist in albumList.artists" class="artist-name">{{artist.name}}</span>
          </div>
          <div class="album-content-text">
            <span class="time">Released {{time}}</span>
          </div>
        </div>
        <div class="album-content-controls">
          <button type="button" class="btn1">
            <span class="icon-play iconfont"></span>
            <span class="icon-text">Play</span>
          </button>
          <button type="button" class="btn1">
            <span class="icon-shuffle iconfont"></span>
            <span class="icon-text">Shuffle</span>
          </button>
          <button type="button" class="btn2">
            <span class="icon-favourite iconfont"></span>
          </button>
          <button type="button" class="btn2">
            <span class="icon-credits iconfont"></span>
          </button>
          <button type="button" class="btn2">
            <span class="icon-more iconfont"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { format } from "date-fns";

import VHeader from "components/VHeader.vue";
let instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000
});
export default {
  props: {},
  data() {
    return {
      albumList: {}
    };
  },
  components: {
    VHeader
  },
  computed: {
    time() {
      if (this.albumList.publishTime) {
        let time = new Date(this.albumList.publishTime);
        let date = time.getDate();
        let month = time.getMonth();
        let year = time.getFullYear();
        return format(new Date(year, month, date), "yyyy-MM-dd");
      }
    }
  },
  mounted() {
    let id = this.$route.query.id;
    instance
      .get("/album", {
        params: {
          id
        }
      })
      .then(res => {
        // console.log(res);
        let data = res.data;
        let tracks = [];
        let {
          album: { blurPicUrl, name, artists, publishTime, songs }
        } = data;

        songs.forEach(item => {
          let { dt, name, id, ar } = item;
          tracks.push({
            time: dt,
            name,
            artists: ar,
            id
          });
        });
        this.albumList = {
          src: blurPicUrl, //专辑封面
          name, //专辑名称
          artists, //专辑歌手
          publishTime, //发行时间
          tracks //歌曲
        };
        console.log(this.albumList);
      });
  }
};
</script>
<style lang="scss" scoped>
@import "~style/mixin.scss";
.album-detail {
  display: flex;
  flex-direction: column;
  position: relative;
  .album-header {
    display: flex;
    margin: 80px 0 48px;
    width: 100%;
    padding: 22px 28px 32px 28px;
    .album-img {
      flex: 0 0 200px;
      width: 200px;
      height: 200px;
      margin-right: 40px;
      max-width: 100%;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .album-content {
      flex: 1;
      min-width: 0; //flex 布局下实现 text-overflow: ellipsis 效果
      .album-content-title {
        margin: 16px 0 6px;
        line-height: 1.17;
        font-size: 3.429rem;
        font-weight: 600;
        text-align: left;
        color: #fff;
        font-size: 48px;
        font-weight: 600;
        text-align: left;
        color: #fff;
        @include ellipsis;
      }
      .album-content-info {
        color: hsla(0, 0%, 100%, 0.5);
        margin-bottom: 20px;
        font-size: 1.143rem;
        line-height: 1.5;
        text-align: left;
        font-size: 16px;
        .artist-name {
          color: #fff;
        }
      }
      .album-content-controls {
        display: flex;
        max-width: 530px;
        align-items: center;

        button {
          @include ellipsis;
          display: flex;
          border: none;
          outline: none;
          margin-right: 16px;
          align-items: center;
          background-color: rgba(229, 238, 255, 0.2);
          display: inline-flex;
          justify-content: center;
          border-radius: 12px;
          height: 48px;
          transition: background 0.35s ease;
          font-size: 16px;
          color: #fff;
          &:hover {
            background-color: rgba(229, 238, 255, 0.3);
          }
          &.btn1 {
            min-width: 144px;
          }
          &.btn2 {
            border-radius: 100%;
            width: 48px;
            height: 48px;
            padding: 0;
          }
          .iconfont {
            font-size: 24px;
          }
          .icon-favourite,
          .icon-more {
            font-size: 30px;
          }
          .icon-text {
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>