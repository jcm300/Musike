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

                    <v-btn icon>
                        <v-icon>search</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>apps</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>refresh</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
var axios = require('axios')
var auth = require('./auth.js')

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required }
  },

  data: () => ({
    email: '',
    password: '',
    show: false,
    valid: false,
    error: ''
  }),

  computed: {
  },

  mounted: function () {
    auth.isAuthenticated(this.$urlAPI, (isAuth) => {
      if (!isAuth) {
        this.$router.push('/')
      }
    })
  },

  methods: {
  }
}
</script>

<style>

</style>
