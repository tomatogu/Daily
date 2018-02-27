<template>
  <div class="news">
    <div class="each-news" v-for="(each, index) in news" :key="index" @click="selectOneNews(each)">
      <h1 class="title">{{each.title}}</h1>
      <div class="image" v-if="each.image">
        <img :src="each.image" width="100%" height="100%"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      news: Array
    },
    methods: {
      selectOneNews(news) {
        this.$emit('selectOneNews', news)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .news
    .each-news
      display flex
      margin 0 20px
      padding 20px 0
      border-bottom 1px solid #D9D9D9
    .title
      display inline-block
      flex 1
      line-height 20px
      font-weight 500
      letter-spacing 1px
    .image
      display inline-block
      flex 0 0 70px
      height 60px
      width 70px
</style>