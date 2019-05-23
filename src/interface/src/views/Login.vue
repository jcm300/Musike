<template>
    <div v-if="renderPage">
        <Login />
    </div>
</template>

<script>
import Login from '../components/Login'
var auth = require('../components/auth.js')

export default {
  components: {
    Login
  },

  data: () => ({
    renderPage: false
  }),

  mounted: function () {
    auth.isAuthenticated(this.$urlAPI, (isAuth) => {
      if (isAuth) {
        this.$router.push('/index')
      } else {
        this.renderPage = true
      }
    })
  }
}
</script>
