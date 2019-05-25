var axios = require('axios')

module.exports.isAuthenticated = function (url, callback) {
  var token = localStorage.getItem('user-token')

  axios.get(url + '/users/isAuthenticated', { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      if (response.data === 'Authenticated') {
        callback(true)
      } else {
        localStorage.removeItem('user-token')
        localStorage.removeItem('user-id')
        callback(false)
      }
    })
    .catch(() => {
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-id')
      callback(false)
    })
}

module.exports.logout = function () {
  localStorage.removeItem('user-token')
  localStorage.removeItem('user-id')
}
