<template>
    <div v-if="renderPage">
        <Index />
    </div>
</template>

<script>
import Index from '../components/Index'
var auth = require('../components/auth.js')

export default {
  components: {
    Index
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
