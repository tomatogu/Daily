<template>
  <div class="temp">
    <div class="bg-image" v-if="news.image" ref="bgWrapper">
      <img :src="news.image" ref="image"/>
    </div>
    <div class="wrapper" ref="wrapper" v-if="news.newsList">
      <news :news="news.newsList" class="list" @selectOneNews="selectOneNews"></news>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import News from 'components/news/news'
  import BScroll from 'better-scroll'

  const MATCH = {
    '日常心理学': 'psychology',
    '用户推荐日报': 'recommend',
    '电影日报': 'movie',
    '不许无聊': 'not-boring'
  }
  const BGIMAGE_HEIGHT = 44
  const IMAGE_BLUR = 5

  export default {
    data() {
      return {
        scrollY: 0
      }
    },
    props: {
      news: {
        type: Object
      }
    },
    mounted() {
      setTimeout(() => {
        this.imageHeight = this.$refs.image.offsetHeight
        this._initScroll()
      }, 20)
    },
    methods: {
      selectOneNews(_news) {
        const _path = MATCH[this.news.title]
        this.$router.push({
          path: `/${_path}/${_news.id}`
        })
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: 3,
            click: true
          })
        } else {
          this.scroll.refesh()
        }

        this.scroll.on('scroll', (pos) => {
          this.scrollY = pos.y
        })
      }
    },
    watch: {
      scrollY(newY) {
        const maxHeight = this.imageHeight - BGIMAGE_HEIGHT
        let blur
        if (newY > 0 && newY <= maxHeight) {
          this.$refs.bgWrapper.style.height = BGIMAGE_HEIGHT + newY + 'px'
          blur = IMAGE_BLUR - (newY / maxHeight) * IMAGE_BLUR
          this.$refs.image.style.filter = `blur(${blur}px)`
        } else if (newY < 0) {
          this.$refs.bgWrapper.style.height = BGIMAGE_HEIGHT + 'px'
        } else {
          return true
        }
      }
    },
    components: {
      News
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .temp
    position relative
    width 100%
    height 100%
    overflow hidden
    .bg-image
      position relative
      height 44px
      width 100%
      overflow hidden
      img
        display block
        width 100%
        filter blur(5px)
    .wrapper
      position absolute
      top 44px
      bottom 0
      overflow hidden
      .list
        position relative
        width 100%
</style>