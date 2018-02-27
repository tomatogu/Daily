import Vue from 'vue'
import Router from 'vue-router'
import HomePage from 'components/home-page/home-page'
import Psychology from 'components/psychology/psychology'
import Recommend from 'components/recommend/recommend'
import Movie from 'components/movie/movie'
import NotBoring from 'components/not-boring/not-boring'
import HomeNewsDetail from 'components/home-news-detail/home-news-detail'
import ThemeNewsDetail from 'components/theme-news-detail/theme-news-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomePage,
      children: [
        {
          path: ':id',
          component: HomeNewsDetail
        }
      ]
    },
    {
      path: '/psychology',
      component: Psychology,
      children: [
        {
          path: ':id',
          component: ThemeNewsDetail
        }
      ]
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: ThemeNewsDetail
        }
      ]
    },
    {
      path: '/movie',
      component: Movie,
      children: [
        {
          path: ':id',
          component: ThemeNewsDetail
        }
      ]
    },
    {
      path: '/not-boring',
      component: NotBoring,
      children: [
        {
          path: ':id',
          component: ThemeNewsDetail
        }
      ]
    }
  ]
})
