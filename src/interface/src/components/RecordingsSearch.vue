<template>
    <div>
        <Toolbar
            page="none"
        />
        <v-layout
            row wrap
            fill-height
            justify-center
            align-center
            v-if="!loading"
        >
            <v-flex xs12>
                <v-layout>
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
                                    <v-list-tile-title>{{ recording.name }} - {{ recording.title }}</v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-icon right color="info">fas fa-info-circle</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
                <v-layout v-if="recordings.length==0">
                    <v-flex xs12 class="display-1 font-weight-black">
                        <v-alert
                            type="warning"
                            dismissible
                        >
                            No Results!
                        </v-alert>
                    </v-flex>
                </v-layout>
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
    recordings: [],
    loading: true
  }),

  mounted: async function () {
    try {
      // get recordings
      var response = await request.getAPI(this.$urlAPI + '/recordings/search?name=' + this.$route.query.name + '&title=' + this.$route.query.title)
      this.recordings = response.data
      this.loading = false
    } catch (e) {
      this.logout()
    }
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
