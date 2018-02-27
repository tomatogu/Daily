<template>
  <div>
    <div class="psychology" v-if="psyNews.newsList.length">
      <div class="theme-title">日常心理学</div>
      <theme-temp :news="psyNews"></theme-temp>
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

  const THEME_NAME = '日常心理学'

  export default {
    data() {
      return {
        psyNews: {
          title: THEME_NAME,
          image: '',
          newsList: []
        }
      }
    },
    created() {
      this._getPsychologyNews()
    },
    methods: {
      _getPsychologyNews() {
        getThemeNews(THEME_NAME).then((res) => {
          this.psyNews.image = convertImageUrl(res.image)
          this.psyNews.newsList = this._normalizeNews(res.stories)
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
  .psychology
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