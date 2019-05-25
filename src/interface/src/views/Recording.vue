<template>
    <div v-if="renderPage">
        <Recording :id="$route.params.id" />
    </div>
</template>

<script>
import Recording from '../components/Recording'
var auth = require('../components/auth.js')

export default {
  components: {
    Recording
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
