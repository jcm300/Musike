<template>
    <div v-if="renderPage">
        <SignUp />
    </div>
</template>

<script>
import SignUp from '../components/SignUp'
var auth = require('../components/auth.js')

export default {
  components: {
    SignUp
  },

  data: () => ({
    renderPage: false
  }),

  mounted: function () {
    auth.isAuthenticated(this.$urlAPI, (isAuth) => {
      if (isAuth) {
        this.$router.push('/index')
      } else {
        this.renderPage = true
      }
    })
  }
}
</script>
