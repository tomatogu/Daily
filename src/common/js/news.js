import {convertImageUrl} from 'common/js/util'

const titleReg = /<h2[^<>]*>([^<>]*)<\/h2>/
const contentReg = /<p>.*<\/p>/g

export class News {
  constructor({id, body, image, title}) {
    this.id = id
    this.body = this._formatBody(body)
    this.image = convertImageUrl(image)
    this.title = title
  }

  _formatBody(body) {
    let o = {}
    o.content = []

    body = body.replace(/https?:\/\//g, 'https://images.weserv.nl/?url=')

    if (titleReg.test(body)) {
      o.title = RegExp.$1
    } else {
      o.title = ''
    }

    o.content = body.match(contentReg)

    return o
  }
}