<template>
    <div>
        <v-toolbar
            dark
            color="primary"
            fixed
            app
            scroll-off-screen
            row wrap
        >
            <v-flex xs2>
                <v-toolbar-side-icon>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <v-btn @click="$router.push('/index')" flat>
                        <v-img height="40" width="40" src="/static/favicon.png" contains />
                        <span>&nbsp;&nbsp;<strong>Musike</strong></span>
                    </v-btn>
                </v-toolbar-side-icon>
            </v-flex>

            <v-spacer></v-spacer>

            <v-flex v-if="page != 'none' && page != 'userSettings' && page != 'favs'">
                <v-text-field
                    v-model="filter"
                    type="text"
                    label="Search"
                    prepend-inner-icon="fas fa-search"
                    append-outer-icon="fas fa-paper-plane"
                    solo-inverted
                    color="secondary"
                    flat
                    @click:append-outer="$emit('filterSended',filter)"
                ></v-text-field>
            </v-flex>

            <v-flex v-if="page == 'none' || page == 'favs'">
                <v-text-field
                    v-model="filter"
                    type="text"
                    label="Search: Artist - Recording"
                    prepend-inner-icon="fas fa-search"
                    append-outer-icon="fas fa-paper-plane"
                    solo-inverted
                    color="secondary"
                    flat
                    @click:append-outer="search()"
                ></v-text-field>
            </v-flex>

            <v-spacer></v-spacer>

            <v-btn
                @click="$router.push('/favs')"
                :color="page == 'favs' ? 'secondary' : ''"
                :flat="page != 'favs'"
            >
                Favs
            </v-btn>

            <v-btn
                @click="$router.push('/albums')"
                :color="page == 'albums' ? 'secondary' : ''"
                :flat="page != 'albums'"
            >
                Albums
            </v-btn>

            <v-btn
                @click="$router.push('/recordings')"
                :color="page == 'recordings' ? 'secondary' : ''"
                :flat="page != 'recordings'"
            >
                Recordings
            </v-btn>

            <v-btn
                @click="$router.push('/artists')"
                :color="page == 'artists' ? 'secondary' : ''"
                :flat="page != 'artists'"
            >
                Artists
            </v-btn>

            <v-btn
                @click="$router.push('/areas')"
                :color="page == 'areas' ? 'secondary' : ''"
                :flat="page != 'areas'"
            >
                Areas
            </v-btn>

            <v-btn
                @click="$router.push('/userSettings/' + id)"
                :color="page == 'userSettings' ? 'secondary' : ''"
                :flat="page != 'userSettings'"
            >
                User Settings
            </v-btn>

            <v-btn @click="logout" flat>
                Logout
            </v-btn>
        </v-toolbar>
        <v-alert
            :value="error!=''"
            type="error"
            @click="error=''"
            dismissible
        >
            {{ error }}
        </v-alert>
    </div>
</template>

<script>
var auth = require('./auth.js')

export default {
  props: ['page'],
  methods: {
    logout () {
      auth.logout()
      this.$router.push('/')
    },
    search () {
      if (/^.*-.*$/.test(this.filter)) {
        var s = this.filter.split('-')
        this.$router.push('/recordingsSearch?name=' + encodeURIComponent(s[0]) + '&title=' + encodeURIComponent(s[1]))
      } else {
        this.error = 'Wrong pattern. Should be: Artist-Recording!'
      }
    }
  },

  mounted: async function () {
    this.id = localStorage.getItem('user-id')
  },

  data: () => ({
    filter: '',
    id: '',
    error: ''
  })
}
</script>

<style>

</style>
