<template>
  <transition name="slider">
    <div class="news-detail" ref="scroll">
      <div class="scroll-wrapper">
        <h1 class="title">{{news.title}}</h1>
        <div class="split"></div>
        <div class="news-wrapper">
          <div class="news" v-if="news.body.content">
            <h2 class="news-title">{{news.body.title}}</h2>
            <div class="news-content">
              <div v-for="(each, index) in news.body.content" :key="index">
                <div class="content-item" v-html="each"></div>
                <div class="split" v-if="index !== news.body.content.length - 1"></div>
              </div>
            </div>
          </div>
          <p class="tips" v-if="!news.body.content">改文章暂不支持阅读模式</p>
        </div>
      </div>
      <div class="back" @click="back">
        <i class="icon-arrow_lift"></i>
      </div>
      <div class="loading-container" v-if="!news.title">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {getNewsDetail} from 'api/index'
  import {News} from 'common/js/news'
  import Loading from 'components/loading/loading'

  export default {
    data() {
      return {
        news: {
          id: 0,
          body: {
            title: '',
            content: []
          },
          image: '',
          title: ''
        }
      }
    },
    created() {
      this._getNewsDetail(this.$route.params.id)
    },
    mounted() {
      // 把tab组件的z-index值设为0，否则tab层会在newDetail层上面
      document.getElementsByClassName('tab')[0].style.zIndex = 0
      setTimeout(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scroll, {
            click: true
          })
        }
      }, 20)
    },
    methods: {
      back() {
        this.$router.back()
        document.getElementsByClassName('tab')[0].style.zIndex = 10
      },
      _getNewsDetail(id) {
        getNewsDetail(id).then((res) => {
          if (res.images) {
            res.image = res.images[0]
          }
          if (!res.images && !res.image) {
            res.image = ''
          }
          this.news = new News(res)
          console.log(this.news)
        })
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .news-detail
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index 100
    background #ffffff
    &.slider-enter, &.slider-leave-to
      transform translate3d(100%, 0, 0)
    &.slider-enter-active, &.slider-leave-active
      transition all 0.4s
    .scroll-wrapper
      position relative
      .title
        position relative
        padding 20px
        width 100%
        line-height 30px
        font-size 20px
        font-weight bold
        text-align left
        box-sizing border-box
      .split
        width 100%
        height 2px
        background #D9D9D9
      .news-wrapper
        position relative
        width 100%
        .news
          position relative
          width 100%
          padding 20px
          box-sizing border-box
          .news-title
            line-height 30px
            font-size 20px
            font-weight 500
          .news-content
            width 100%
            .content-item
              line-height 28px
              strong
                font-weight bold
              img
                display block
                width 100%
            .split
              width 100%
              height 20px
              background  #ffffff
        .tips
          margin-top 50px
          font-size 22px
          font-weight bold
          vertical-align middle
          text-align center
    .back
      position fixed
      left 10px
      bottom 10px
      padding 10px
      color #018BEC
      font-size 22px
      z-index 50
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>