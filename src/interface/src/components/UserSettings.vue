<template>
    <Toolbar />
</template>

<script>
import Toolbar from './Toolbar'
var axios = require('axios')
var auth = require('./auth.js')

export default {
  components: {
    Toolbar
  },

  data: () => ({
  }),

  computed: {
  },

  methods: {
    logout () {
      auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
