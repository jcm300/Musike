<template>
    <div v-if="renderPage">
        <Artist :id="$route.params.id" />
    </div>
</template>

<script>
import Artist from '../components/Artist'
var auth = require('../components/auth.js')

export default {
  components: {
    Artist
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
