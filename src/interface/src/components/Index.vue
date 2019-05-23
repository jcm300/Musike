<template>
    <v-container fill-height bgcolor=secundary>
        <v-layout justify-center>
            <v-flex xs12>
                <v-toolbar dark color="primary">
                    <v-toolbar-side-icon>
                        <v-img
                            src="static/favicon.png"
                            contain
                        ></v-img>
                    </v-toolbar-side-icon>
                    <a>
                        <v-img
                            src="static/favicon.png"
                            contain
                        ></v-img>
                    </a>
                    <v-toolbar-title class="white--text">
                        <strong>Musike</strong>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>

                    <v-btn flat>
                        Albums
                    </v-btn>

                    <v-btn flat>
                        Recordings
                    </v-btn>

                    <v-btn flat>
                        Artists
                    </v-btn>

                    <v-btn flat>
                        Areas
                    </v-btn>

                    <v-btn flat>
                        User Settings
                    </v-btn>

                    <v-btn @click="logout" flat>
                        Logout
                    </v-btn>
                </v-toolbar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
var axios = require('axios')
var auth = require('./auth.js')

export default {

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
