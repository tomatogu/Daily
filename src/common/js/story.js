import {convertImageUrl} from 'common/js/util'

export class Story {
  constructor({id, title, image}) {
    this.id = id
    this.title = title
    this.image = convertImageUrl(image)
  }
}