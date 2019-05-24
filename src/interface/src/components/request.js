var axios = require('axios')

module.exports.getAPI = function (url) {
  var token = localStorage.getItem('user-token')

  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
}
