<template>
    <div v-if="renderPage">
        <RecordingsSearch />
    </div>
</template>

<script>
import RecordingsSearch from '../components/RecordingsSearch'
var auth = require('../components/auth.js')

export default {
  components: {
    RecordingsSearch
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
