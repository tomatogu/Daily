<template>
  <div class="slider" ref="slider" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div class="slider-group" ref="sliderGroup">
      <div v-for="(topStory, index) in topStories" :key="index" class="slider-item" ref="sliderItem" @click="selectOneNews(topStory)">
        <img :src="topStory.image" class="image" />
        <p class="title">{{topStory.title}}</p>
      </div>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{'active': index === currentPageIndex}" :key="index"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        currentPageIndex: 0,
        dots: []
      }
    },
    props: {
      topStories: {
        type: Array
      },
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {
        if (this.slider) {
          this._setSliderWidth(true)
          this.slider.refresh()
        } else {
          return false
        }
      })
    },
    methods: {
      onTouchMove() {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        return false
      },
      onTouchEnd() {
        if (this.autoPlay) {
          this._play()
        }
        return false
      },
      selectOneNews(news) {
        this.$emit('selectOneNews', news)
      },
      _setSliderWidth(isResize) {
        // 这里必须要用this.$refs.sliderGroup.children，如果用this.$refs.sliderItem，那么sliderItem个数永远是5，当改变窗口大小调用_setSliderWidth()时，
        // 如果this.loop===true，那么BScroll不会给克隆的两个dom刷新宽高，用了sliderGroup.children后在初始化过BScroll后，sliderItem个数为7
        this.sliderItems = this.$refs.sliderGroup.children

        let width = 0
        const sliderWidth = this.$refs.slider.clientWidth
        const sliderHeight = sliderWidth * 0.6
        this.$emit('updateSliderHeight', sliderHeight)
        for (let i = 0; i < this.sliderItems.length; i++) {
          width += sliderWidth
          this.sliderItems[i].style.width = sliderWidth + 'px'
          this.sliderItems[i].style.height = sliderHeight + 'px'
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
        this.$refs.sliderGroup.style.height = sliderHeight + 'px'
      },
      _initDots() {
        this.dots = new Array(this.sliderItems.length)
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true, // 轮播图横向滚动，设为true
          scrollY: false, // 轮播图纵向不滚动，设为false
          momentum: false, // 设置为false避免一次滑动多张图片
          snap: { // slider组件需要
            loop: this.loop, // 开启循环
            threshold: 0.3, // 表示可以滚动到下一个阈值（自动滚到下一张图片）
            speed: 400 // 速度（鼠标放开到最终滚动到下一张图片时间段内的速度）
          }
        })
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _play() {
        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval)
      }
    },
    destroyed() {
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slider
    position relative
    min-height 1px
    overflow hidden
    .slider-group
      position relative
      width 100%
      overflow hidden
      .slider-item
        position relative
        float left
        box-sizing border-box
        overflow hidden
        .image
          display block
          width 100%
        .title
          position absolute
          left 5px
          right 5px
          bottom 30px
          color #ffffff
          font-size 21px
          line-height 30px
          letter-spacing 1px
    .dots
      position absolute
      left 0
      bottom 0
      width 100%
      height 30px
      line-height 30px
      text-align center
      z-index 1
      .dot
        display inline-block
        width 8px
        height 8px
        border-radius 50%
        margin 0 4px
        background rgba(255, 255, 255, 0.2)
        &.active
          background rgba(255, 255, 255, 1)
</style>