<template>
  <div class="homePage">
    <div class="date-flag" ref="dateFlag">今日热闻</div>
    <div ref="scroll" class="homePage-content">
      <div>
        <div class="slider-wrapper" v-if="topStories.length" ref="sliderWapper">
          <slider :topStories="topStories" @updateSliderHeight="updateSliderHeight" @selectOneNews="selectOneNews"></slider>
        </div>
        <div class="news-wrapper" v-if="stories.stories">
          <news :news="stories.stories" @selectOneNews="selectOneNews"></news>
        </div>
      </div>
      <div class="loading-container" v-if="!stories.stories">
        <loading></loading>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAllStories} from 'api/index'
  import {Story} from 'common/js/story'
  import BScroll from 'better-scroll'
  import Slider from 'components/slider/slider'
  import News from 'components/news/news'
  import Loading from 'components/loading/loading'

  const DATAFLAG_HEIGHT = 44

  export default {
    data() {
      return {
        topStories: [],
        stories: {},
        scrollY: 0,
        sliderHeight: 0
      }
    },
    created() {
      this._getAllStories()
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)

      window.addEventListener('resize', () => {
        if (this.scroll) {
          this.scroll.refresh()
        }
      })
    },
    methods: {
      selectOneNews(news) {
        this.$router.push({
          path: `/home/${news.id}`
        })
      },
      updateSliderHeight(sliderHeight) {
        this.sliderHeight = sliderHeight
      },
      _getAllStories() {
        getAllStories().then((res) => {
          this._initTopStories(res.date, res.top_stories)
          this._initStories(res.date, res.stories)
        }).catch((e) => {
          console.log(e)
        })
      },
      _initTopStories(date, topStories) {
        topStories.forEach((item) => {
          this.topStories.push(new Story({id: item.id, image: item.image, title: item.title}))
        })
      },
      _initStories(date, stories) {
        this.stories.date = date
        this.stories.stories = []
        stories.forEach((item) => {
          this.stories.stories.push(new Story({id: item.id, title: item.title, image: item.images[0]}))
        })
      },
      _initScroll() {
        this.scroll = new BScroll(this.$refs.scroll, {
          click: true,
          probeType: 3
        })

        this.scroll.on('scroll', (pos) => {
          this.scrollY = pos.y
        })
      }
    },
    watch: {
      scrollY(newY) {
        let opacity = 0
        if (newY <= 0 && newY >= -this.sliderHeight) {
          opacity = Math.abs(newY / this.sliderHeight)
        } else if (newY < -this.sliderHeight) {
          opacity = 1
        }
        if (newY > 0 && newY <= DATAFLAG_HEIGHT) {
          opacity = Math.abs(newY / DATAFLAG_HEIGHT)
        } else if (newY > DATAFLAG_HEIGHT) {
          opacity = 1
        }
        this.$refs.dateFlag.style.background = `rgba(1,139,236,${opacity})`
      }
    },
    components: {
      Slider,
      News,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .homePage
    position fixed
    top 44px
    bottom 0
    width 100%
    z-index 1
    .date-flag
      position fixed
      top 44px
      width 100%
      height 44px
      line-height 44px
      text-align center
      color #ffffff
      background rgba(1, 139, 236, 0)
      z-index 10
    .homePage-content
      height 100%
      overflow hidden
      .slider-wrapper, .news-wrapper
        position relative
        width 100%
        overflow hidden
      .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>