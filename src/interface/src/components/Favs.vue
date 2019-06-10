<template>
    <div>
        <Toolbar
            page="favs"
        />
        <v-layout
            row wrap
            fill-height
            justify-center
            align-center
            v-if="!loading"
        >
            <v-flex xs12>
                <v-layout v-if="favs.length>0">
                    <v-flex xs12>
                        <v-list two-line>
                            <v-list-tile
                                v-for="fav in favs"
                                :key="fav.id"
                                avatar
                            >
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-music</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title>{{ fav.artists.map(e => e.name).join(", ") }} - {{ fav.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title v-if="fav.disambiguation != ''"> {{ fav.disambiguation }}</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-btn icon flat @click="removeFav(fav.id)">
                                    <v-icon color="deep-orange lighten-1">fas fa-trash-alt</v-icon>
                                </v-btn>

                                <v-btn icon flat @click="$router.push('/recordings/' + fav.id)">
                                    <v-icon color="info">fas fa-info-circle</v-icon>
                                </v-btn>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
                <v-alert
                    :value="favs.length==0"
                    type="warning"
                    dismissible
                >
                    You don't have any favourite recordings!
                </v-alert>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12>
                <div class="text-xs-center">
                    <br><br><br>
                    <div class="display-1 font-weight-black primary--text">
                        Loading
                    </div>
                    <br>
                    <v-progress-circular
                        :size="100"
                        :width="10"
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Toolbar from './Toolbar'
var request = require('./request.js')
var auth = require('./auth.js')

export default {
  components: {
    Toolbar
  },

  data: () => ({
    favs: [],
    loading: true
  }),

  mounted: async function () {
    try {
      // get favs
      var id = localStorage.getItem('user-id')
      var response = await request.getAPI(this.$urlAPI + '/users/' + id + '/favs')
      var favs = response.data

      for (var i = 0; i < favs.length; i++) {
        response = await request.getAPI(this.$urlAPI + '/recordings/' + favs[i])
        this.favs[i] = {}
        this.favs[i].id = favs[i]
        this.favs[i].title = response.data[0].title
        this.favs[i].disambiguation = response.data[0].disambiguation
        response = await request.getAPI(this.$urlAPI + '/recordings/' + favs[i] + '/artistsCredit')
        this.favs[i].artists = response.data
      }

      this.loading = false
    } catch (e) {
      this.logout()
    }
  },

  methods: {
    logout () {
      auth.logout()
      this.$router.push('/')
    },
    removeFav (idMusic) {
      var id = localStorage.getItem('user-id')
      request.putAPI(this.$urlAPI + '/users/removeFav/' + id, 'idMusic=' + encodeURIComponent(idMusic))
        .then(response => this.$router.go())
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>

</style>
