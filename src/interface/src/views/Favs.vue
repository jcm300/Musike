<template>
    <div v-if="renderPage">
        <Favs />
    </div>
</template>

<script>
import Favs from '../components/Favs'
var auth = require('../components/auth.js')

export default {
  components: {
    Favs
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
