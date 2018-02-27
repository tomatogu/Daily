<template>
  <div>
    <div class="movie" v-if="movNews.newsList.length">
      <div class="theme-title">电影日报</div>
      <theme-temp :news="movNews"></theme-temp>
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

  const THEME_NAME = '电影日报'

  export default {
    data() {
      return {
        movNews: {
          title: THEME_NAME,
          image: '',
          newsList: []
        }
      }
    },
    created() {
      this._getMovieNews()
    },
    methods: {
      _getMovieNews() {
        getThemeNews(THEME_NAME).then((res) => {
          this.movNews.image = convertImageUrl(res.image)
          this.movNews.newsList = this._normalizeNews(res.stories)
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
  .movie
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