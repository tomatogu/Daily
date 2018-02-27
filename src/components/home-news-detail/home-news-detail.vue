<template>
  <transition name="slider">
    <div class="news-detail">
      <div class="back" @click="back">
        <i class="icon-arrow_lift"></i>
      </div>
      <div class="main-image-wrapper" ref="mainImageWrapper" v-if="news">
        <img :src="news.image" />
        <h1 class="image-title" ref="imageTitle">{{news.title}}</h1>
        <div class="filter" ref="filter"></div>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <div ref="scroll" class="news-wrapper">
        <div class="news" v-if="news">
          <h2 class="news-title">{{news.body.title}}</h2>
          <div class="news-content">
            <div v-for="(each, index) in news.body.content" :key="index">
              <div class="content-item" v-html="each"></div>
              <div class="split" v-if="index !== news.body.content.length - 1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {getNewsDetail} from 'api/index'
  import {News} from 'common/js/news'
  import {prefixStyle} from 'common/js/dom'

  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')
  const RESERVER_HEIGHT = 60

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
        },
        scrollY: 0
      }
    },
    created() {
      this._getNewsDetail(this.$route.params.id)
    },
    mounted() {
      // 把tab组件的z-index值设为0，否则tab层会在newDetail层上面
      document.getElementsByClassName('tab')[0].style.zIndex = 0
      this._setMainImageHeight()
      this.$refs.scroll.style.top = this.mainImageHeight + 'px'
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scroll, {
            probeType: 3,
            click: true
          })
          this.scroll.on('scroll', (pos) => {
            this.scrollY = pos.y
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    methods: {
      back() {
        this.$router.back()
        document.getElementsByClassName('tab')[0].style.zIndex = 10
      },
      _getNewsDetail(id) {
        getNewsDetail(id).then((res) => {
          this.news = new News(res)
          console.log(this.news)
        })
      },
      _setMainImageHeight() {
        const width = this.$refs.mainImageWrapper.clientWidth
        this.mainImageHeight = width * 0.6
        this.$refs.mainImageWrapper.style.height = this.mainImageHeight + 'px'
      }
    },
    watch: {
      scrollY(newY) {
        this.maxTranslateY = -this.mainImageHeight + RESERVER_HEIGHT
        let zIndex = 0
        let blur = 0
        let translateY = Math.max(this.maxTranslateY, newY)
        const percent = Math.abs(newY / this.mainImageHeight)
        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        if (newY < this.maxTranslateY) {
          zIndex = 10
          blur = Math.min(percent * 10, 10)
          this.$refs.mainImageWrapper.style.height = RESERVER_HEIGHT + 'px'
          this.$refs.imageTitle.style.display = 'none'
        } else if (newY > this.maxTranslateY && newY < 0) {
          blur = Math.min(percent * 10, 10)
          this.$refs.mainImageWrapper.style.height = this.mainImageHeight + 'px'
          this.$refs.imageTitle.style.display = 'block'
        } else {
          this.$refs.mainImageWrapper.style.height = this.mainImageHeight + newY + 'px'
        }
        this.$refs.mainImageWrapper.style.zIndex = zIndex
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      }
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
    .back
      position absolute
      left 10px
      top 10px
      padding 10px
      color #018BEC
      font-size 22px
      z-index 50
    .main-image-wrapper
      position relative
      width 100%
      overflow hidden
      img
        display block
        width 100%
      .image-title
        position absolute
        bottom 5px
        left 5px
        right 5px
        color #ffffff
        font-size 22px
        line-height 30px
        letter-spacing 1px
      .filter
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background rgba(7, 17, 27, 0.1)
    .bg-layer
      position relative
      height 100%
      background #ffffff
    .news-wrapper
      position absolute
      top 0
      bottom 0
      width 100%
      .news
        position absolute
        width 100%
        padding 20px
        box-sizing border-box
        .news-title
          line-height 30px
          font-size 20px
          font-weight 500
        .news-content
          margin-top 20px
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
</style>