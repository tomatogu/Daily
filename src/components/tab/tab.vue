<template>
  <div>
    <div class="tab" ref="tab">
      <div class="tab-item-wrapper" @click="toggle">
        <router-link tag="div" class="tab-item" to="/home">
          <span class="tab-link">首页</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/psychology">
          <span class="tab-link">日常心理学</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/recommend">
          <span class="tab-link">用户推荐日报</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/movie">
          <span class="tab-link">电影日报</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/not-boring">
          <span class="tab-link">不许无聊</span>
        </router-link>
      </div>
      <div class="btn-wrapper" @click="toggle">
        <div class="btn" ref="btn">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="mask" v-show="show" @click="toggle"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'

  const transform = prefixStyle('transform')

  export default {
    data() {
      return {
        show: false
      }
    },
    methods: {
      toggle() {
        if (this.show) {
          this.$refs.tab.style[transform] = ''
          this.$refs.btn.style[transform] = ''
        } else {
          this.$refs.tab.style[transform] = 'translateX(0)'
          this.$refs.btn.style[transform] = 'rotate(0)'
        }
        this.show = !this.show
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tab
    position fixed
    top 0
    left 0
    width 120px
    height 100%
    background #018BEC
    color #ffffff
    text-align center
    font-size 18px
    transform translateX(-120px)
    transition-duration 300ms
    z-index 10
    .tab-item-wrapper
      display flex
      flex-direction column
      justify-content center
      height 60%
      .tab-item
        flex 1
        .tab-link
          display inline-block
          position relative
          top 50%
          transform translateY(-50%)
        &.router-link-active
          &.tab-item
            background #3535E1
    .btn-wrapper
      position absolute
      top 0
      right -50px
      .btn
        display flex
        align-items center
        height 30px
        width 30px
        padding 10px
        color #018BEC
        transform rotate(180deg)
        transition-duration 300ms
        i
          flex 1
  .mask
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index 9
    background #000000
    opacity 0.2
    &.fade-enter, &.fade-leave-to
      opacity 0
    &.fade-enter-active, &.fade-leave-active
      transition all 0.4s
</style>