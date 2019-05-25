<template>
    <div>
        <Toolbar page="none" />
        <v-layout
            row wrap
            fill-height
            justify-center
            align-center
            v-if="!loading"
        >
            <v-layout
                row wrap
                fill-height
                justify-center
                align-center
            >
                <v-flex xs8>
                    <v-card>
                        <v-card-title>
                            <h1>Recording - {{ recording.title }}</h1>
                        </v-card-title>

                        <v-divider></v-divider>

                        <v-list dense>
                            <v-list-tile>
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-music</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    Title:
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    {{ recording.title }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-group
                                v-if="recording.artistsCredit != null && recording.artistsCredit.length > 0"
                                prepend-icon="fas fa-podcast"
                            >
                                <v-list-tile slot='activator'>
                                    <v-list-tile-title>Artists:</v-list-tile-title>
                                </v-list-tile>

                                <v-list-tile
                                    v-for="artist in recording.artistsCredit"
                                    :key="artist.id"
                                    avatar
                                    @click="$router.push('/artists/' + artist.id.split('#')[1])"
                                >
                                    <v-list-tile-avatar>
                                        <v-icon color="deep-orange lighten-1">fas fa-podcast</v-icon>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ artist.name }}</v-list-tile-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-icon right color="info">fas fa-info-circle</v-icon>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </v-list-group>
                            <v-list-group
                                v-if="recording.albums != null && recording.albums.length > 0"
                                prepend-icon="fas fa-compact-disc"
                            >
                                <v-list-tile slot='activator'>
                                    <v-list-tile-title>Albums:</v-list-tile-title>
                                </v-list-tile>

                                <v-list-tile
                                    v-for="album in recording.albums"
                                    :key="album.id"
                                    avatar
                                    @click="$router.push('/albums/' + album.id.split('#')[1])"
                                >
                                    <v-list-tile-avatar>
                                        <v-icon color="deep-orange lighten-1">fas fa-compact-disc</v-icon>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ album.title }}</v-list-tile-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-icon right color="info">fas fa-info-circle</v-icon>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </v-list-group>

                            <v-list-tile v-if="recording.duration != null && recording.duration != ''">
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-clock</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    Duration:
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    {{ recording.duration }} milliseconds (~{{ recording.durationM }} minutes)
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-star</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    Users Rating:
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    (Rated by {{ recording.nRating }} users)
                                </v-list-tile-content>
                                <v-list-tile-content>
                                    <v-rating
                                        dense
                                        readonly
                                        half-increments
                                        :value="recording.rating"
                                        color="yellow darken-3"
                                    ></v-rating>
                                </v-list-tile-content>
                                <v-list-tile-content>
                                    ({{ recording.rating }})
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile @click="newRating()">
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-star</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    My Rating:
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    <v-rating
                                        dense
                                        v-model="userRating"
                                        color="yellow darken-3"
                                    ></v-rating>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-headphones</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    Views:
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    {{ recording.views }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile v-if="recording.tags != null && recording.tags != ''">
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-tag</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    Tags:
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    {{ recording.tags }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile v-if="recording.languages != null && recording.languages != ''">
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-language</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    Languages:
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    {{ recording.languages }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile v-if="recording.about != null && recording.about != ''">
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-info</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    About:
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    {{ recording.about }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile v-if="recording.disambiguation != null && recording.disambiguation != ''">
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-info</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    Disambiguation:
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    {{ recording.disambiguation }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-group
                                v-if="recording.urls != null && recording.urls.length > 0"
                                prepend-icon="fas fa-link"
                            >
                                <v-list-tile slot='activator'>
                                    <v-list-tile-title>URLs:</v-list-tile-title>
                                </v-list-tile>

                                <v-list-tile
                                    v-for="url in recording.urls"
                                    :key="url.label"
                                    avatar
                                    :href="url.value"
                                >
                                    <v-list-tile-avatar>
                                        <v-icon color="deep-orange lighten-1">fas fa-link</v-icon>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ url.label }}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{ url.value }}</v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-icon right color="info">fas fa-info-circle</v-icon>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
            <YouTube
                :query="query"
                @ended="addView"
            />
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
import YouTube from './YouTube'
var request = require('./request.js')
var auth = require('./auth.js')

export default {
  props: ['id'],
  components: {
    Toolbar,
    YouTube
  },

  data: () => ({
    recording: {},
    loading: true,
    query: '',
    userRating: 0
  }),

  mounted: async function () {
    try {
      var response = await request.getAPI(this.$urlAPI + '/recordings/' + this.id)
      this.recording = response.data[0]
      this.recording.durationM = ((response.data[0].duration / 1000) / 60).toFixed(2)

      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.id + '/artistsCredit')
      this.recording.artistsCredit = response.data

      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.id + '/albums')
      this.recording.albums = response.data

      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.id + '/tags')
      this.recording.tags = response.data.map(e => e.tag).join(', ')

      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.id + '/languages')
      this.recording.languages = response.data.map(e => e.language).join(', ')

      response = await request.getAPI(this.$urlAPI + '/stats/' + this.id)
      this.recording.views = response.data.views
      this.recording.rating = response.data.avgRating * response.data.nRating
      this.recording.nRating = response.data.nRating

      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.id + '/urls')
      this.recording.urls = response.data

      var id = localStorage.getItem('user-id')
      response = await request.getAPI(this.$urlAPI + '/users/' + id + '/stats?idRec=' + this.id)
      this.userRating = response.data

      this.query = this.recording.artistsCredit[0].name + '-' + this.recording.title
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
    addView (ended) {
      if (ended) {
        var id = localStorage.getItem('user-id')
        request.putAPI(this.$urlAPI + '/users/views/' + id, 'idMusic=' + encodeURIComponent(this.id))
          .then(response => this.$router.go())
          .catch(e => console.log(e))
      }
    },
    newRating () {
      var id = localStorage.getItem('user-id')
      request.putAPI(this.$urlAPI + '/users/rating/' + id, 'idMusic=' + encodeURIComponent(this.id) + '&rating=' + encodeURIComponent(this.userRating))
        .then(response => this.$router.go())
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>

</style>
