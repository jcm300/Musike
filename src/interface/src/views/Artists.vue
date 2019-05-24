<template>
    <div v-if="renderPage">
        <Artists />
    </div>
</template>

<script>
import Artists from '../components/Artists'
var auth = require('../components/auth.js')

export default {
  components: {
    Artists
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
