<template>
    <div v-if="renderPage">
        <UserSettings />
    </div>
</template>

<script>
import UserSettings from '../components/UserSettings'
var auth = require('../components/auth.js')

export default {
  components: {
    UserSettings
  },

  data: () => ({
    renderPage: false
  }),

  mounted: function () {
    auth.isAuthenticated(this.$urlAPI, (isAuth) => {
      if (!isAuth) {
        this.$router.push('/')
      } else {
        this.renderPage = true
      }
    })
  }
}
</script>
