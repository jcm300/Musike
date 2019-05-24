<template>
    <div v-if="renderPage">
        <Recordings />
    </div>
</template>

<script>
import Recordings from '../components/Recordings'
var auth = require('../components/auth.js')

export default {
  components: {
    Recordings
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
