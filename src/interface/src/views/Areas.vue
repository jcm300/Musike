<template>
    <div v-if="renderPage">
        <Areas />
    </div>
</template>

<script>
import Areas from '../components/Areas'
var auth = require('../components/auth.js')

export default {
  components: {
    Areas
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
