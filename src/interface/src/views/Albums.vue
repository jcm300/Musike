<template>
    <div v-if="renderPage">
        <Albums />
    </div>
</template>

<script>
import Albums from '../components/Albums'
var auth = require('../components/auth.js')

export default {
  components: {
    Albums
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
