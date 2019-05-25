<template>
    <div v-if="renderPage">
        <Album :id="$route.params.id" />
    </div>
</template>

<script>
import Album from '../components/Album'
var auth = require('../components/auth.js')

export default {
  components: {
    Album
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
