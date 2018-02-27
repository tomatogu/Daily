<template>
  <div>
    <div class="recommand" v-if="recNews.newsList.length">
      <div class="theme-title">用户推荐日报</div>
      <theme-temp :news="recNews"></theme-temp>
    </div>
    <div class="loading-container" v-else>
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ThemeTemp from 'components/theme-temp/theme-temp'
  import {getThemeNews} from 'api/index'
  import {convertImageUrl} from 'common/js/util'
  import Loading from 'components/loading/loading'

  const THEME_NAME = '用户推荐日报'

  export default {
    data() {
      return {
        recNews: {
          title: THEME_NAME,
          image: '',
          newsList: []
        }
      }
    },
    created() {
      this._getRecommandNews()
    },
    methods: {
      _getRecommandNews() {
        getThemeNews(THEME_NAME).then((res) => {
          this.recNews.image = convertImageUrl(res.image)
          this.recNews.newsList = this._normalizeNews(res.stories)
        })
      },
      _normalizeNews(news) {
        let _news = []
        news.forEach((eachNews) => {
          _news.push({
            id: eachNews.id,
            title: eachNews.title,
            image: eachNews.images ? convertImageUrl(eachNews.images[0]) : ''
          })
        })
        return _news
      }
    },
    components: {
      ThemeTemp,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .recommand
    position fixed
    top 44px
    bottom 0
    width 100%
    .theme-title
      position absolute
      top 0
      left 0
      width 100%
      height 44px
      line-height 44px
      text-align center
      color #ffffff
      z-index 10
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>