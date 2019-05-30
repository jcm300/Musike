<template>
    <div>
        <Toolbar
            page="recordings"
            @filterSended="filterResults"
        />
        <v-layout
            row wrap
            fill-height
            justify-center
            align-center
            v-if="recordings.length > 0 && error==''"
        >
            <v-flex xs12>
                <v-list two-line>
                    <v-list-tile
                        v-for="recording in recordings"
                        :key="recording.id"
                        avatar
                        @click="$router.push('/recordings/' + recording.id.split('#')[1])"
                    >
                        <v-list-tile-avatar>
                            <!--<img src="">-->
                            <v-icon color="deep-orange lighten-1">fas fa-music</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ recording.title }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ recording.artistsCredit }}</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-icon right color="info">fas fa-info-circle</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
                <v-layout v-if="this.recordings.length % 50 == 0">
                    <v-flex xs12>
                        <v-btn
                            block
                            color="secondary"
                            @click="more"
                            :loading="loadingMore"
                            :disabled="loadingMore"
                        >
                            More
                            <v-icon right>fas fa-chevron-circle-down</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap fill-height justify-center align-center v-else>
            <v-flex xs12>
                <v-layout v-if="error != ''">
                    <v-flex xs12 class="display-1 font-weight-black">
                        <v-alert
                            :value="error != ''"
                            type="error"
                            @click="filterResults('')"
                            dismissible
                        >
                            {{ error }}
                        </v-alert>
                    </v-flex>
                </v-layout>
                <v-layout v-else>
                    <v-flex xs12>
                        <v-layout v-if="noResults">
                            <v-flex xs12 class="display-1 font-weight-black">
                                <v-alert
                                    :value="noResults"
                                    type="warning"
                                    @click="filterResults('')"
                                    dismissible
                                >
                                    No Results!
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
                    </v-flex>
                </v-layout>
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
    recordings: [],
    offset: 50,
    filter: '',
    error: '',
    loadingMore: false,
    noResults: false
  }),

  mounted: async function () {
    try {
      // get recordings
      var response = await request.getAPI(this.$urlAPI + '/recordings')
      var recordings = response.data

      // get artists
      for (var index = 0; index < recordings.length; index++) {
        response = await request.getAPI(this.$urlAPI + '/recordings/' + recordings[index].id.split('#')[1] + '/artistsCredit')
        recordings[index].artistsCredit = 'by ' + response.data.map(e => e.name).join(', ')
      }
      alert(JSON.stringify(response.data))
      // store
      this.recordings = recordings
    } catch (e) {
      alert(JSON.stringify(e))
      this.logout()
    }
  },

  methods: {
    logout () {
      auth.logout()
      this.$router.push('/')
    },
    more: async function () {
      this.loadingMore = true
      try {
        // get recordings
        var response = await request.getAPI(this.$urlAPI + '/recordings?offset=' + this.offset + '&filter=' + encodeURIComponent(this.filter))
        var recordings = response.data

        // get artists
        for (var index = 0; index < recordings.length; index++) {
          response = await request.getAPI(this.$urlAPI + '/recordings/' + recordings[index].id.split('#')[1] + '/artistsCredit')
          recordings[index].artistsCredit = 'by ' + response.data.map(e => e.name).join(', ')
        }

        // store
        this.offset += 50
        this.recordings = this.recordings.concat(recordings)
      } catch (e) {
        this.logout()
      }
      this.loadingMore = false
    },
    filterResults: async function (filter) {
      this.recordings = []
      this.error = ''
      this.noResults = false
      this.filter = filter
      try {
        // get recordings
        var response = await request.getAPI(this.$urlAPI + '/recordings?filter=' + encodeURIComponent(filter))
        if (response.data.indexOf('ERROR') > -1) {
          this.error = 'Search pattern used incorrect! Try again or dismiss this message to get all results!'
        } else {
          var recordings = response.data

          // get artists
          for (var index = 0; index < recordings.length; index++) {
            response = await request.getAPI(this.$urlAPI + '/recordings/' + recordings[index].id.split('#')[1] + '/artistsCredit')
            recordings[index].artistsCredit = 'by ' + response.data.map(e => e.name).join(', ')
          }

          // store
          this.recordings = recordings
          if (this.recordings.length === 0) {
            this.noResults = true
          }
        }
      } catch (e) {
        this.logout()
      }
    }
  }
}
</script>

<style>

</style>
