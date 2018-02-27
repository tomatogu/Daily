export function convertImageUrl(image) {
  const http = new RegExp(/http\w{0,1}:\/\//, 'g')
  const httpPrefix = 'https://images.weserv.nl/?url='

  if (!(image.match(http))) {
    return false
  } else {
    return image.replace(http, httpPrefix)
  }
}