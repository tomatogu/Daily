import axios from 'axios'

// 获取首页所有news
export function getAllStories() {
  const url = '/api/home'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取某个news内容
export function getNewsDetail(id) {
  const url = '/api/newsDetail'
  const data = {
    id
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取主题日报列表
function _getThemesList() {
  const url = '/api/themesList'
  let list = {}
  let themes = []

  return axios.get(url).then((res) => {
    themes = res.data.others
    themes.forEach((item) => {
      if (!list[item.name]) {
        list[item.id] = item.name
      }
    })
    return Promise.resolve(list)
  }).catch((e) => {
    console.log(e)
  })
}

// 通过主题名称获取主题列表

export function getThemeNews(theme) {
  const name = theme
  const match = {
    '日常心理学': 'psychology',
    '用户推荐日报': 'recommend',
    '电影日报': 'movie',
    '不许无聊': 'not-boring'
  }
  const url = `/api/${match[name]}`

  return _getThemesList().then((list) => {
    const id = (function() {
      for (let k in list) {
        if (list[k] === name) {
          return k
        }
      }
      return false
    })()
    const data = {
      id
    }

    return data
    }).then((data) => {
      return axios.get(url, {
        params: data
      }).then((res) => {
        return Promise.resolve(res.data)
    })
  }).catch((e) => {
    console.log(e)
  })
}