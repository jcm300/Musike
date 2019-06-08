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
            <v-flex xs8>
                <v-card>
                    <v-card-title>
                        <v-flex xs8>
                            <h1>Album - {{ album.title }}</h1>
                        </v-flex>
                        <v-flex xs4>
                            <v-btn
                                color="warning"
                                large
                                :href="'https://musicbrainz.org/release-group/' + this.id.split('_')[1]"
                            >
                                See at&nbsp;&nbsp;
                                <v-img
                                    src="/static/musicbrainz.png"
                                    height="40"
                                    width="60"
                                ></v-img>
                            </v-btn>
                        </v-flex>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-compact-disc</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Title:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ album.title }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-group
                            v-if="album.artistsCredit != null && album.artistsCredit.length > 0"
                            prepend-icon="fas fa-podcast"
                        >
                            <v-list-tile slot='activator'>
                                <v-list-tile-title>Artists:</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile
                                v-for="artist in album.artistsCredit"
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
                        <v-list-tile>
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-star</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Rating (average of all recording ratings):
                            </v-list-tile-content>

                            <v-list-tile-content>
                                (Rated by {{ album.nRating }} users)
                            </v-list-tile-content>

                            <v-list-tile-content>
                                <v-rating
                                    dense
                                    readonly
                                    half-increments
                                    :value="album.rating"
                                    color="yellow darken-3"
                                ></v-rating>
                            </v-list-tile-content>

                            <v-list-tile-content>
                                ({{ album.rating }})
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-headphones</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Total Views:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ album.views }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-headphones</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Total Duration:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ album.totalDuration }} milliseconds (~{{ album.totalDurationM }} minutes)
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-card
                            v-if="album.tags != null && album.tags != ''"
                            class="elevation-0"
                        >
                            <v-card-title>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <v-icon color="deep-orange lighten-1">fas fa-tag</v-icon>
                                <span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tags:
                                </span>
                            </v-card-title>

                            <v-card-text>
                                {{ album.tags }}
                            </v-card-text>
                        </v-card>
                        <v-list-tile v-if="album.firstReleaseDate != null && album.firstReleaseDate != ''">
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-calendar</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                First Release:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ album.firstReleaseDate }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-card
                            v-if="album.about != null && album.about != ''"
                            class="elevation-0"
                        >
                            <v-card-title>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <v-icon color="deep-orange lighten-1">fas fa-info</v-icon>
                                <span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;About:
                                </span>
                            </v-card-title>

                            <v-card-text>
                                {{ album.about }}
                            </v-card-text>
                        </v-card>
                        <v-list-tile v-if="album.disambiguation != null && album.disambiguation != ''">
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-info</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Disambiguation:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ album.disambiguation }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-group
                            v-if="album.recordings != null && album.recordings.length > 0"
                            prepend-icon="fas fa-music"
                        >
                            <v-list-tile slot='activator'>
                                <v-list-tile-title>Recordings:</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile
                                v-for="recording in album.recordings"
                                :key="recording.id"
                                avatar
                                @click="$router.push('/recordings/' + recording.id.split('#')[1])"
                            >
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-music</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ recording.title }}
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <v-flex v-if="recording.disambiguation != null">
                                            &nbsp;({{ recording.disambiguation }})
                                        </v-flex>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-icon right color="info">fas fa-info-circle</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                        <v-list-group
                            v-if="album.urls != null && album.urls.length > 0"
                            prepend-icon="fas fa-link"
                        >
                            <v-list-tile slot='activator'>
                                <v-list-tile-title>URLs:</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile
                                v-for="url in album.urls"
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
  props: ['id'],
  components: {
    Toolbar
  },

  data: () => ({
    album: {},
    loading: true
  }),

  mounted: async function () {
    try {
      var response = await request.getAPI(this.$urlAPI + '/albums/' + this.id)
      this.album = response.data[0]

      response = await request.getAPI(this.$urlAPI + '/albums/' + this.id + '/artistsCredit')
      this.album.artistsCredit = response.data

      response = await request.getAPI(this.$urlAPI + '/albums/' + this.id + '/tags')
      this.album.tags = response.data.map(e => e.tag).join(', ')

      response = await request.getAPI(this.$urlAPI + '/albums/' + this.id + '/tracks')
      this.album.recordings = response.data

      response = await request.getAPI(this.$urlAPI + '/albums/' + this.id + '/urls')
      this.album.urls = response.data

      this.album.totalDuration = 0
      this.album.rating = 0
      this.album.nRating = 0
      this.album.views = 0

      var stats = await request.getAPI(this.$urlAPI + '/stats')
      stats = stats.data

      for (var i = 0; i < this.album.recordings.length; i++) {
        this.album.totalDuration += this.album.recordings[i].duration != null ? parseInt(this.album.recordings[i].duration) : 0
        var index = stats.findIndex(s => s.id === this.album.recordings[i].id.split('#')[1])
        if (index !== -1) {
          this.album.views += stats[index].views
          if (stats[index].nRating > 0) {
            this.album.rating = (this.album.rating * this.album.nRating + stats[index].avgRating * stats[index].nRating) / (this.album.nRating + stats[index].nRating)
            this.album.nRating += stats[index].nRating
          }
        }
      }

      this.album.totalDurationM = ((this.album.totalDuration / 1000) / 60).toFixed(2)

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
