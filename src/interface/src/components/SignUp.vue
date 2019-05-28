<template>
    <v-container fill-height bgcolor=secundary>
        <v-layout justify-center align-center>
            <v-flex xs12 sm6>
                <div class="text-xs-center">
                    <v-img
                        height="100"
                        src="static/favicon.png"
                        contain
                    ></v-img>
                    <h1><strong>Musike</strong></h1>
                    <br>
                    <br>
                    <br>
                    <h2>Sign Up</h2>
                </div>
                <v-form>
                    <v-text-field
                        v-model="name"
                        label="Name"
                        name="name"
                        @input="$v.name.$touch(); valid=!$v.$invalid"
                        :error-messages="nameErrors"
                        outline
                        clearable
                        required
                    ></v-text-field>
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
                    <v-text-field
                        v-model="repeatPassword"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        :type="show ? 'text' : 'password'"
                        label="Repeat Password"
                        @click:append="show = !show"
                        @input="$v.repeatPassword.$touch(); valid=!$v.$invalid"
                        name="repeatPassword"
                        :error-messages="repeatPasswordErrors"
                        outline
                        clearable
                        required
                    ></v-text-field>
                    <div class="text-xs-center">
                        <v-btn
                            :disabled="!valid"
                            color="success"
                            @click="signUp"
                        >
                            Sign Up
                        </v-btn>
                    </div>
                </v-form>
                <v-alert
                    :value="error!=''"
                    type="error"
                    @click="error=''"
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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
var axios = require('axios')

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    repeatPassword: { required, minLength: minLength(8), sameAs: sameAs('password') }
  },

  data: () => ({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    show: false,
    valid: false,
    error: ''
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required')
      return errors
    },
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
      !this.$v.password.minLength && errors.push('Password must have at least 8 characters')
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.required && errors.push('Password is required')
      !this.$v.password.minLength && errors.push('Password must have at least 8 characters')
      !this.$v.repeatPassword.sameAs && errors.push('Password must match')
      return errors
    }
  },

  methods: {
    signUp () {
      axios.post(this.$urlAPI + '/users',
        'name=' + encodeURIComponent(this.name) + '&' +
        'email=' + encodeURIComponent(this.email) + '&' +
        'password=' + encodeURIComponent(this.password), {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => this.$router.push('/?signup=true'))
        .catch(() => { this.error = 'Maybe email already exists? Try again!' })
    }
  }
}
</script>

<style>

</style>
