<template>
    <div v-if="renderPage">
        <Area :id="$route.params.id" />
    </div>
</template>

<script>
import Area from '../components/Area'
var auth = require('../components/auth.js')

export default {
  components: {
    Area
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
