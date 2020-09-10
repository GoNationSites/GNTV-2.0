import axios from 'axios-jsonp'
// import axios from 'axios'
import jsonAdapter from 'axios-jsonp'

export function getData(url, callback, errorcallback) {
  axios({
    url: url,
    adapter: jsonAdapter
  })
    .then((res) => {
      //do something
      console.log('res: ', res)
      if (callback != null) {
        callback(res)
      }
    })
    .catch((e) => {
      if (errorcallback != null) {
        errorcallback(e)
      }
    })
}
