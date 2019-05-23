<template>
    <v-container fill-height bgcolor=secundary>
        <v-layout justify-center align-center>
            <v-flex xs12 sm6>
                <div class="text-xs-center">
                    <v-img
                        height="200"
                        src="static/favicon.png"
                        contain
                    ></v-img>
                    <h1><strong>Musike</strong></h1>
                </div>
                <v-form>
                    <v-text-field
                        v-model="email"
                        label="E-mail"
                        name="email"
                        @input="$v.email.$touch(); valid=!$v.$invalid"
                        :error-messages="emailErrors"
                        outline
                        clearable
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        :type="show ? 'text' : 'password'"
                        label="Password"
                        @click:append="show = !show"
                        @input="$v.password.$touch(); valid=!$v.$invalid"
                        name="password"
                        :error-messages="passwordErrors"
                        outline
                        clearable
                        required
                    ></v-text-field>
                    <div class="text-xs-center">
                        <v-btn
                            :disabled="!valid"
                            color="success"
                            @click="logIn"
                        >
                            Log In
                        </v-btn>
                        <v-btn
                            color="info"
                            @click="signUp"
                        >
                            Sign Up
                        </v-btn>
                    </div>
                </v-form>
                <v-alert
                    v-if="$route.query.signup=='true'"
                    :value="true"
                    type="success"
                    @click="$router.push('/')"
                    dismissible
                >
                    Sign Up successfully!
                </v-alert>
                <v-alert
                    v-if="error!=''"
                    :value="true"
                    type="error"
                    dismissible
                >
                    {{ error }}
                </v-alert>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
var axios = require('axios')

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
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Invalid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },

  methods: {
    logIn () {
      this.$v.$touch()
      this.valid = !this.$v.$invalid
      if (this.valid) {
        axios.post(this.$urlAPI + '/users/login',
          'email=' + encodeURIComponent(this.email) + '&' +
          'password=' + encodeURIComponent(this.password), {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response => {
            const token = response.data
            localStorage.setItem('user-token', token)
            this.$router.push('/index')
          })
          .catch(() => {
            this.error = 'Email or password incorrect!'
            localStorage.removeItem('user-token')
          })
      }
    },
    signUp () {
      this.$router.push('/signup')
    }
  }
}
</script>

<style>

</style>
