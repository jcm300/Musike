var axios = require('axios')

module.exports.getAPI = function (url) {
  var token = localStorage.getItem('user-token')

  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
}

module.exports.putAPI = function (url, data) {
  var token = localStorage.getItem('user-token')

  return axios.put(url, data, { headers: {
    Authorization: `Bearer ${token}`,
    'Content-type': 'application/x-www-form-urlencoded'
  } })
}

module.exports.deleteAPI = function (url) {
  var token = localStorage.getItem('user-token')

  return axios.delete(url, { headers: { Authorization: `Bearer ${token}` } })
}
