<template>
    <div>
        <Toolbar page="userSettings" />
        <v-layout
            row wrap
            fill-height
            justify-center
            align-center
        >
            <v-flex xs8>
                <v-alert
                    :value="error!=''"
                    type="error"
                    @click="error=''"
                    dismissible
                >
                    {{ error }}
                </v-alert>
                <v-alert
                    :value="$route.query.updpass=='true'"
                    type="success"
                    @click="$router.push('/userSettings/' + id)"
                    dismissible
                >
                    Password updated successfully!
                </v-alert>
                <v-alert
                    :value="$route.query.updinfo=='true'"
                    type="success"
                    @click="$router.push('/userSettings/' + id)"
                    dismissible
                >
                    User info updated successfully!
                </v-alert>
                <v-card>
                    <v-card-title>
                        <h1>Change Password</h1>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-form>
                        <v-text-field
                            v-model="currentPassword"
                            :append-icon="showC ? 'visibility' : 'visibility_off'"
                            :type="showC ? 'text' : 'password'"
                            label="Current Password"
                            @click:append="showC = !showC"
                            @input="$v.currentPassword.$touch(); validP=!$v.currentPassword.$invalid && !$v.password.$invalid && !$v.repeatPassword.$invalid"
                            name="currentPassword"
                            :error-messages="currentPasswordErrors"
                            outline
                            clearable
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :append-icon="show ? 'visibility' : 'visibility_off'"
                            :type="show ? 'text' : 'password'"
                            label="New Password"
                            @click:append="show = !show"
                            @input="$v.password.$touch(); validP=!$v.currentPassword.$invalid && !$v.password.$invalid && !$v.repeatPassword.$invalid"
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
                            @input="$v.repeatPassword.$touch(); validP=!$v.currentPassword.$invalid && !$v.password.$invalid && !$v.repeatPassword.$invalid"
                            name="repeatPassword"
                            :error-messages="repeatPasswordErrors"
                            outline
                            clearable
                            required
                        ></v-text-field>
                        <div class="text-xs-center">
                            <v-btn
                                :disabled="!validP"
                                color="success"
                                @click="updatePass"
                            >
                                Change Password
                            </v-btn>
                        </div>
                    </v-form>
                </v-card>

                <br>

                <v-card>
                    <v-card-title>
                        <h1>Update User Info</h1>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-form>
                        <v-text-field
                            v-model="name"
                            label="Name"
                            name="name"
                            @input="$v.name.$touch(); validU=validU=!$v.email.$invalid && !$v.name.$invalid"
                            :error-messages="nameErrors"
                            outline
                            clearable
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="email"
                            label="E-mail"
                            name="email"
                            @input="$v.email.$touch(); validU=!$v.email.$invalid && !$v.name.$invalid"
                            :error-messages="emailErrors"
                            outline
                            clearable
                            required
                        ></v-text-field>
                        <div class="text-xs-center">
                            <v-btn
                                :disabled="!validU"
                                color="success"
                                @click="updateInfo"
                            >
                                Update Info
                            </v-btn>
                        </div>
                    </v-form>
                </v-card>
                <br>
                <div class="text-xs-center">
                    <v-btn
                        color="error"
                        @click="deleteUser"
                    >
                        Delete Account
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Toolbar from './Toolbar'
import { validationMixin } from 'vuelidate'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
var request = require('./request.js')
var auth = require('./auth.js')

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
    currentPassword: { required },
    password: { required, minLength: minLength(8) },
    repeatPassword: { required, minLength: minLength(8), sameAs: sameAs('password') }
  },

  components: {
    Toolbar
  },

  data: () => ({
    name: '',
    email: '',
    currentPassword: '',
    password: '',
    repeatPassword: '',
    show: false,
    showC: false,
    validP: false,
    validU: false,
    error: '',
    id: ''
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
    currentPasswordErrors () {
      const errors = []
      if (!this.$v.currentPassword.$dirty) return errors
      !this.$v.currentPassword.required && errors.push('Password is required')
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

  mounted: async function () {
    this.id = localStorage.getItem('user-id')
    var response = await request.getAPI(this.$urlAPI + '/users/' + this.id)
    this.name = response.data.name
    this.email = response.data.email
  },

  methods: {
    deleted () {
      auth.logout()
      this.$router.push('/?deleted=true')
    },
    updateInfo () {
      request.putAPI(this.$urlAPI + '/users/' + this.id,
        'name=' + encodeURIComponent(this.name) + '&' +
        'email=' + encodeURIComponent(this.email)
      )
        .then(response => {
          if (response.data == null) {
            this.error = 'Email already in use! Try again...'
          } else {
            this.$router.push('/userSettings/' + this.id + '?updinfo=true')
            this.validU = false
          }
        })
        .catch(e => { this.error = 'Error while updating user info. Try again...' })
    },
    updatePass () {
      request.putAPI(this.$urlAPI + '/users/updPass/' + this.id,
        'prevPass=' + encodeURIComponent(this.currentPassword) + '&' +
        'newPass=' + encodeURIComponent(this.password)
      )
        .then(response => {
          if (response.data == null) {
            this.error = 'Wrong current password! Try again...'
          } else {
            this.$router.push('/userSettings/' + this.id + '?updpass=true')
            this.validP = false
            this.currentPassword = ''
            this.password = ''
            this.repeatPassword = ''
          }
        })
        .catch(e => { this.error = 'Error while updating user password. Try again...' })
    },
    deleteUser () {
      request.deleteAPI(this.$urlAPI + '/users/' + this.id)
        .then(response => this.deleted())
        .catch(e => { this.error = 'Error while deleting user. Try again...' })
    }
  }
}
</script>

<style>

</style>
