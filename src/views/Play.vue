<template>
  <div class="play">
    <div class="play-bg" :style="'background-image: url('+ picUrl +')'"></div>
    <div class="play-content">
      <div class="play-song-wrap">
        <div 
          class="play-song-box"
          :class="paused ? 'paused' : ''"
          @click.stop="pause">
          <div class="play-song">
            <img :src="picUrl" alt="">
          </div>
        </div>
        <span class="play-playbtn" v-show="paused" @click.stop="play"></span>
      </div>
      <audio 
        :src="'https://music.163.com/song/media/outer/url?id='+id+'.mp3'"
        autoplay
        loop
        ref='audio'
      >
      您的浏览器不支持 audio 标签。
      </audio>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Provide } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
// import { PLAY_LIST } from '@/store/types';
@Component
export default class Play extends Vue {
  @Provide()
  private picUrl!: any;

  @Provide()
  private id!: number;

  @Provide()
  private paused: boolean = false;

  private created() {
    const ROUTE = this.$route;
    this.id = Number(ROUTE.params.id);
    this.picUrl = ROUTE.query.picUrl;
  }

  private pause() {
    this.paused = true;
    this.$refs.audio.pause();
  }

  private play() {
    this.paused = false;
    this.$refs.audio.play();
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/mixin.scss';
$width: 150px;
$box: 248px;
.play {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .play-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
    transform: scale(1.5);
    filter: blur(20px);
    &::after {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(#000, .5);
    }
  }

  .play-content {
    @include center;
    position: absolute;
    z-index: 1;
    top: 0; left: 0; right: 0; bottom: 0;

    .play-song-wrap {
      @include center;
      position: relative;
      width: $box;
      height: $box;
      .play-song-box {
        @include center;
        width: 100%;
        height: 100%;
        background-image: url(//s3.music.126.net/mobile-new/img/disc.png?d3bdd1080a72129346aa0b4b4964b75f=);
        position: relative;
        animation: rotate 20s linear infinite;
        &.paused {
          animation-play-state: paused;
        }
        &, &::after {
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }
        &::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url(//s3.music.126.net/mobile-new/img/disc_light.png?2bb24f3fd11569809b817b4988f12bc7=);
        }
        .play-song {
          margin: 0 auto;
          width: $width;
          height: $width;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          background: rgba(0,0,0,.1) url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAAFmCAMAAADQyRFFAAAAZlBMVEUAAADl5eXl5eXy8vKlpaWmpqakpKSpqamrq6utra24uLivr6+xsbG1tbWzs7PBwcG+vr66urrExMTHx8fJycm9vb28vLzAwMDDw8PMzMzGxsbR0dHOzs7U1NTLy8vW1tbg4ODZ2dlCyz43AAAABHRSTlMALnlgMg+ulwAAEV5JREFUeNrU28ty2kAQQNFe3NsjnsHYSZx38v8/mVQgQAEW0qalnLVddamRBrUkosCXD6v2R7eLGVs2RQDdx0wtG8hfmqxijnZcazE/T/ofdG5Jrjm7zjVyI3Udc9KpckN8ifnoQO4Qu5gNeYMwn21J5C5FM+YBpIfEHDRJ6TOHw7Nle5CZuYypdRzMe9k3DNByFdNSHhEwJtWSIWQRE9owiOJzTOaFVB4TbDGZTgbL55jIlhFsMRFGyXcxiSZ9ZjJwfEjGSIwpMJJsot53+s1kfFvIKAr7KCcyhkgX1ZajMxMyqjXGSuRjFAPp5RymjSdSxjNqNblDMyVtq92Xb99eNg1J5Ow1Ssl9mu19nLw25dIqKr1P7pFcf7+65yk52ap3XLPh/auLptDk4GsU4lbSWMc9K8+DfO3Ezh3mNu5rmBxkizqbu5XreMOz4jEzo05Lbi16/h7laBdluGHvai5TDmQdVT6M/X75qvJX0kWVlckV++exxPqdkzbswDw7bUhCVMk29pLC5ECJKsgFgafot1UOkrJxHeTMAXv2M/KX6VMU4drnwf9iuo0immPvXeops4saT8oF83n46GTdPZolcskYlWnU2CIXXM4zc6HJmTEqM4kaHSZn6xjAPG+yUaMpF2KIpDxTkYMk26hMrM8U4XVkpmWZyCmzjfzi0owSl5m4jCEWp1mIKTI1BiEnzCQHZn4hJ1x0sI0anupPoaPtwEPzRI0a50xzP/Khu1C/6GYMsU88Z9YvusYQazBPZ9AEmYux92xTCo/NcWcQ6ikzJ8jcDX4e5zGzbsg4Z/o6ehBNJ8jcj9s0wWQTNUCOhmTmVeaHKHF5vTlg0RfXmfsocZm5H3uLpGbbvJ6Fvo59NCNGke68C/6KR0peTOmf082f8cBKkQt2UWSrHD3MRLmk6yiyVA78OaSycel9FHn/b9Hz0aKvSVUuZFR5Oe/vP6LPR25kXeYnkqNPYx+6Z4sq3zLl4CV6rJAbqyjDUf8rrjuSG/kUZbpBmSq39lFm44DMVWJyI+rsT5mf3/4oM3jDR47exRt2c/h1RuNo8/ZTNblnG4VWD7aXT/N4q+s3c/eC3DQMhVH4Audc2U6ahkdLh0Jn2P8mebR0Shu7liGyvwVk/pFlWbZ0lffT69PfRDewvfhPa2U38l6RvCBmHqOlN5MxD4o8J5DR1NupmJeq8kJiiabelfGYX5MReoym3nSjMW8Lp5lZorGLsWnZ1zQ5Tfto7HqkRu1OkxFyGa2dnkl8EpSTEqI5Ts2LP5sgY/bRnADPdogPyaRorwPxrxY6JH+sP+t4sFMRypO2TLe0l/y3a5QUH1PqdMw+1gAK+JgSNtczf1KU4t1DH2CciXaxir3gw2P6sjBN8y5WcQmIHiL2JjJFjZUopIfLjtfJh1hJB+lwQF6VdrGWIS07NXmNEqv5RCnbLgS9l261mOmpa2WmXazmAuXBNh9Av+xV3Xpj9kAyg6Sxlj6ZJyWvo7H6im+xj3X0mBUxYxU3qsz3OdZwULHwxAbP7kGBjR+XcC1S5Sra60kB2PQlL8m4LXzO/OWjCcCGq7zvuyVSQW0/FhUAqZHvo7ErNdFt3z69QFVK298+HxWpIhpt7UxJKrhCygIgdZKo1v5YjDSa6kzkuY29og3U00yjpX1STzAaOlp4aWsjUbEg9TKjncHUzR9905sJSQ1tnVKmbGRN5ajKlC2sSR6Uhd5HMz0LpTfRTCFZptxGMxZZaIhWbhi3nc8bA2ayWDTxvUg1E5N7H6OB2yLLlNKuc35hGekjmnXOo9QT8HNE2Kg6YABAKvlwoYH7xOc1uCRm4jF+K+L5C/6GZAF5jHUwPXt1/CBLuHtaLSBonNExUWqIpEM8uiNR8iLO5oMoldR4ShCyi7PJ1KSOzwN1576HCjXGqr336Dm3Z5ossI9nrtAzLkj3INUO8QKJinEOvWlSxfTUlQVN04fG3RdQ7mXSHYYvsdQ1ptTQkcobEUx2Q18UUPmLdhfLuq4pUkP8MH3Wv6AgTwmCpmV/PPc7pEL5FCftUWYqQ9W4Th1N+zjpWJhP8Hi+EVPpxv6JTWQuRcrV/Ed5lTT7/zdx0XJznsPa7UZaUlmk/zijMUmZy5Gq8ksAZKnuNl5RKMwlibuJ8u/lbmLSNchMiXoxPqAtl3qIKYLO/7F8XzFS1NnFuE9U0NyPnkP870qM6pFcPr2M6OT/0IkXZ5knLXlq4laU/ybZx0kHmclC/qDtXJbbhmEomsU9oGJZdv1umrid/v9PdibtcBSZJEAlxSKbyPYVH3gRvLg8orQvhAk1XmhFBcH+MZFjAr4OZu0ExOIw9YDyWteuJvT+1yQEfCoiOCksPGiiQ2szDNNm2v6dwdtuwBRP6x66zp89gqUbJUMqiefNt8thl5JYmgAUkeM6bUIphDwsHH6QSRouf1c8sCQBnaKWhFVRLxQsxA8Qi8dQ+vFv/xsSaLOcPFZ5YBLrvOBfLD9qM49+kpCVPndF3pAaIkVhOnxAg2khMBtqEzVuwOSVjCRpMQ0bE6ts7c7a9WUIE4iXMitSUywJXue7L2JDwDWxBsPSONUbdoy9WR9CS9P13OzBduwkUT1Vv/bt9t+KwLyVeDpok+vtoVVIsZcrs6jwxTA3qBgLDJrJsHYlAqJFh3YKlI+c8sMBmCrfr8Pa1ZkeP+Mb7kYaZoRPHkwOhasDEp7TPWLtyOHuDmfOUR0QOPbA2aggKik+p8rn7qHMkzThetOev49VyjrMZQ37hWf7vkUV2M49ebXUDl747uD0ldLgJaaSH5awd3KR0ycygRmmpxMc1W4M3oHd4JCAt/yyyTVCSBprhGxZwB0pc7JsuLMpVfWm1bbwpaDY28FgBwdeuYOJWvwglVU1orm4uV00rU+n2/jvhWlE5YEWCRYgnUqfODUzD2ZtPsNZn2Pdw4p7S+/UTjRgYueADnn2uFNw7/bjHtya6O17PH7UDlfv9xFO9eGpGRyRt1AXw86ARXsJjcE7oENl7eWBAKyzMDhhzkbPciDYSldAq6iWpJrYJUB93wbwAkqRIuMBlYBkbvCEib7ELYhoZa5MGPjU5cJaJRqJ7qJbSUQLNQeBAD2vbXaM0PvirYlrAvFhbiSBkmxth2uE3Z+e7b/C/JEPq1cfmhr2UoaJJMYvgJkVHjquH06dGtnN45fATMJiXFLUYV6fjoKCEsBovDZxmDtz9IabrzExPr0WuRmwxteaRBjmXpBthfekVKVCLP0HWvoQAjCziGiDvjJKmaBy9pSkSwum4jDBgt3atsUqQvQOcypYISzfVWjZdAi0St3GK+HNKE36uzb7bioI1r4fGG8of7EwFXlCWAXmk0QfzC1iVgEQ1IfoHKGLoAqzKClccRElBfAX50lSFeZQXLYp3Ax0H9SHDCE+xxrMyTm48MpsvEG6xMnOkqjCPBfHeXT7YkR38Fu86d6mBrMy1DRN8BbNxGLGOkTdY1gV5raE89Kkmenq/8os4+8/WoV56mawoesC4M4JAZ08jYHV3oFL2IW1FLvFhezuLs5Wvfq4tKVgu/C3hRQ8RHTX0w3K2f/irHs28JVlzszXM0T6oBzLzu+Uw9S0rFTscGFxXZ8kIUirFHxulDQubL65ulimbDLhGrifi4QCTpIWgsFrpuB/KFN25zF/JLkaPvOmu65x21tL0hKnt3sBsjv3EtSca+I2yDAnDGWJWLZBFIpV3HYfK6J1lKolU+jgBFjZ6QeE530Q8fqK7hrzQZg+jCb4wQPzxBxtjfiSHz77DvxCgGtttIHUZTBSMGjcuDDbiY1vS5jqalanU8hWu5ETpUm/VxYvQoxdWYrBI+eM7SEcBoZ8qhvvLaoPFqG56k4E95AKsn84OwP/h7NMxFdnNCQx/wQAE/Twsaf5e3GIrDkbojCrLzYts16+25VkhBgrt8QUvNBC8AI7tr4yBinScvMmVsIcvQBc6ui9aM58Zk238TvrZDGTfXfdSEcn5bLCyKynwne6ACTMtfwkc9M+h4wSMD8xh1LcCCHYuYVrLL7TL5pPflsSU3yjI+zNHXUD3fouig8BzbmPk6Ni24YuzKNZHJ9GtTbaewPVdL32wAeUVi8oMDp7bpzIjSIboXgKLM5pWW258Qmd413DfyoL6eQ5fsR99xRl7YmRNp+REBIyjdVZRwhxDDsezfAB00xsF+wkBjTHIHuIm2hqZmyHOSzLN315G0y0KQ0HECYxBLOwuCQpJoG62ngP80+0TxbqzQxsdpbjK8NDztXkMNyXa5qFmjYWGWJowXwWhnN3d6kZDMswSfcQ689zhlkM+ZBBIym5MECvKwjP7sF72YMASbJHPz2v3uRvIIK8vDtDMxkyzpBLj6A394Gy1G1V+8oF4hxnNxiBodV5s+kcdZJYjCbyPEFv0/hWV75bg5DHoK/Fy6Q88Zh9Qc9rRO1Q4Wz8Q9nPTLUXygIMX0TxZ6nhmKGkz5C7+G8ZdvX1p7qzW04bhoKwLvY7svEfBNNCQun0/V+yF2U0LiWRD8hAv6skk5BFloV1JO1eDjaNDO7w7KxK6hw/O4heI0hX/eZoFpNUwoHrk4eKSkJnoIwLWl/CIMiuDUXcFXE5InzTuGyyMnatnosi9X2xIhIkqd39Lnrb9DOD1AR3xggO0Yzp7PntXpvZbtICBqWM/PrpAhzQ3tk5q/QIiiIF7fVrTbcJWXbukV+zbsX0xN4uFGEAm3R36Lb+10i9cNfJJjLRoaT34aS/I6iH20KiURORhOOudNDocvlI7Q2haAaxT4pRF0rTcSHTRDe6sk6RkM61J4xNWIJOlqqPSXAzzP1jzjI3EcmWzMjZRYEZaAKKq/3n07lx6CrRnASSIbqaxU23twCmKYAAYqz71aRth1VfxQiAZO8YkjDqjbVhcQ4N06supLPwJD9VQabWsVHosR7rh1XETC4gfRkeyL6rkAcyVePlGFpMCQQSTM3ukBmx/XaufaSnj0fz62O76ZoqIiEws7QXxKia6S2F0tPHKxPF8xNC8+wknh4Rmme0NB96adCZ8NJU9vxcWI/LdBdemZP4H0ak8Ii4go9vfRXReeCO7Xtw0yx9Dx0iIDGdEVl9vG3eZkulfq8E6B/obhqSbJn0lDECAl1gpuj7h3HByI9afOFbFvf+qvECT+89DguwHG1aWS9MRGboC3C0TbNQJDDKAaLzyVRhmd81A2z+ylHnb81SLrwIbDdz+py2WRcEgWayDnP4QfmLHkGmDL5AyGN5mWvzWCbPK1sdcK+t5K+PB6IjyhGFUlRygRwDUjmZR/mwWYNnXVpmKx8oPkMm8oFZyENhmYMJeUA2hixWWGbjl6l9/lUpLBNMXtZzb0uKyTSEfLDJ9yQKxwMbJid0s4fiYq0pTF52+aClPxiUk4l82GHuqS30tIsOlq8bUjqK1ZATyM/9TIVrXQK5yE9qJUQymswxD3CP7se8BU3xUlcFckGuuxFlpN8tRCevzIMjHmhdrGwkJ5XHdCAUI8oBkB00HftdHXQ4RM4YYabWP6Eg8kD+wTC1Je0jq0euzXMjzPK08bPWXMAxvhXPE6w0A4Qqz1suX4GVBBmNzPrgEyL5iZSmzcmUiei7LrShOKAvgfW86R8mCS2UG7qzK5l/JpMA0Qy+NSvwq7wlsw2k+uNtt/6+/v5+nNt1wFEYuYmNhP6G4407J8CasBCN/iGOwQGZM4mFqHWJsXHtzybjs1SwMofcJzSmoUJGdl5RPhLaQG+ucxiI6hQyFP5wjwLRjPktlIJk6fkzLM6I6R/4qq8dei7S1R/BCV2D5v16N6mUyVVYiEO8krcKGNXfDTV0EQmmXkRVeBw75AWEiOvwUFbIBxJ9eDjHKMmY3ZBSH57CqUYzMEmy6lt4Hj3Kg6zZhucy1CDJTDJN4fy9UW/DK/DWRwMEkFQCIKMZwkuxHVZ1BNJkve72H6E0vwFTy3PTnTNF2AAAAABJRU5ErkJggg==") 50%/auto 80% no-repeat;
        }
      }
  
      .play-playbtn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        display: block;
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 0 0;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAABJlBMVEUAAAAAAAD////l5eX///9iYmKDg4Pn5+f///9YWFj////09PT////4+Pjt7e3///////9oaGhBQUH////////////////CwsIaGhr///8xMTEkJCT////7+/vp6en///////////////+srKyoqKienp58fHz////y8vKTk5P///8EBAT////////////////V1dW3t7f////////////////////v7++jo6N9fX3///////+UlJT////s7Oz////Nzc3///////+RkZGPj495eXkTExP////////29vb////k5OTPz882Njb////////////c3Nz///////9ycnJsbGz///9dXV3////////Q0ND///9QUFD///////////////////9FeiN6AAAAYXRSTlNmAP3c+oWT3ueB9vA19ealRId5EQbuurpu83RxD/nh05dfAquooo+M7JtzaSolE+vMspJ3Wj7w6KSQj6ucKeXNxLWnmpmObVYd8t3axXZRSt7TvbKLideCeSzHnn4V3Nh6YarbPAAABlRJREFUeNrU14lWEmEYh/GXcdj3HQTZRCkS913UNE2zbLd9Oc/930Q2LmVpwPAC03MD/M5835n/IC6dkqHnzcVoZvdkLp2HfHruZDcTXWw+DyVdOilAt6uNjI8782Ua1W2XjTShtdDSmzRdlH6zFKq5bKQBTS5H57gqXJrP1tsb7kShkBPJFQoJ90a7np0vhblqLrrc8R7oQ4vVPZOLIp8mp8flzsanJ59FuMjcqxZdHVKFxvYDWK1lPQXpooInu4ZVYD/m6pAWNLn0DSvvekJ6KLHuxerb0qyrQwrQViV/oZzKSc/lpi6sgUrLdSN16MyWARBcOBWbnS4EAYytj67r1KGtqMUseaSvPCWLGr14u+pDZysmwFhc+i4+BmBWZgcATTXTFvO9qOS3qOlmShu68g7A6xa13F6A7yuq0ORnA9jZENU2dgDjc1IPGvMB4QNR7+AJ4IspQVObBjDmF+Wur6qxmdKAbpeBoEcGlCcIlLf7hx7lOzxOlYeaP+oTmmoYQFsGWhswGql+oMUMEInLgItHgEzRPvS43OHYVY+/fGwXGvIBkzKU6oAvZA8aywOPZEg9AvIxO9AXAZg4lKF1OAGBF71DX5jw5EyG2NkTMJ/3Co2ZcM8tQ819D8xYb9CVgA2nijSw0gs0tArBzk59aRBWQ91Dj30QjssIiofBd9wttFiGiTMZSWcTUC52B629Bg5lRB0Cr2tdQRvAfRlZ94FGN9AjA+oywupgHHWGzuRhTEbaGORnOkFTZYj4ZaT5I1BOdYBuAnEZcXFg89/QmAFtGXltMGL/ghZ9I7+g19fUV/wHtAJBvzggfxAqd0NXDPCII/KAsXIXNPXOIQd/efjvUndAmxB2xMH/zB+G5u3Qr2k4EMd0AOmvt0IrsCMOagcqt0FbJkyLg5oGs3ULNApecVReiP4NnTHALY7KDcbHv6BbDno1XTUGW39CWwa8F4flB6P1B3TRgQ/UeqSLN6GzAQd83f1dHAKzN6AfoCQOrARLN6Andr9GpiITT9/KwPLAye/QGATFTusAxsOCDKogxH6D7sOC2GkNq+B9GVALsP8LWgzAqdjJ4LJXCRlIpxAoXkOrtteT6yYmH8gg8kL1GroHU/1CoTSQBZ6CvSto0oRc/1DM7GNRLwdm8hK6DF5RgMI9j6jnheVLaBTWdaAwPy7KrUP0Alqbg4QWlPCU6JaAuZoFDcGaqEHh6RdRLQIhC/oBsppQzAXVN1UWlixoBjyqUIhozr8H3vyE1lYhpwnVnv8CpH9CZyAi2lAIPtK8pDPn0Cp8UoWqz/8zqJ5DGzCpCdWf/0lonEMzMK0J1Z//acicQ30wrgnVn/9x8LkkCWFRherPfxiSEgKvLlR//r0QkmWY14Xqz/88LEsTsqpQ/fm3RlQWoa4L1Z//OixKFNq6UP35vw9RycDGMKAYD3P9vEhlF9y6UP35d8OuvISELlR//hPwUqxh0oTqz781TbIKueFB4em4rb/Mq5IfMpRn0nOPIS+ADBUatvcz/w/0B/X2VgMACMNQ9AMnWOADKwT/QuahyZYcDcte7e146X9W+vFmWmEzOeOJGfjMCmWOEubMYw7no7wizHPHvMuMAMFIOo5IxsiOjJDLSOOM2cDYN44hxliMjGnL2OAOWMCgGgz84uBEDKDFIG8ORLhzLPO2Y5kK6PpMdJiBsR28nQkMOBEMJtTixISY4JUTZWPCgVXevesgCINhGG7dZPLEIg7GRRsMTsaoMTEOnmLUuBgn+e//JuTHGt0aKT3y3QIFpj6vO9ctnbnAmr9PIysefn0E0PfhkjW92HFtnQHULn5AAG9aISZGF3NaQYxVrInRrcVYBW4H5vkPEPIfuIV5UGXhClHT8Qv9oXQ/MckoTfb+wVTGqK8ZUl9+4mmUnpGj03pOmzlH5y/w5w6ZiAil+G9qA0KpkfWMTxKsJ6530wel3try9CwjSscg27BTDcw321gHjzyuEjj9IbwP1hPeDqHo2abP0pn5XMR/NhTB/fyo2gv3q0gh1JSkEHCrUuMSG1VxCdxDOtfR1ZDr4AGUwIUACi5JJZMyx1RHUgY3kIn0LBuFQk2EFlv7J3t0+id7JPi86wlJsfm9FUVbQrZR1LrPmQ0hKZfSXC7Fzr5LeD7uGoYBQBCGV56PS2g5ewGy+NkUNbjr9gAAAABJRU5ErkJggg==);
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
