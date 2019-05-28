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
                        <v-flex xs9>
                            <h1>Artist - {{ artist.name }}</h1>
                        </v-flex>
                        <v-flex xs3>
                            <v-btn
                                color="warning"
                                large
                                :href="'https://musicbrainz.org/artist/' + this.id.split('_')[1]"
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
                                <v-icon color="deep-orange lighten-1">fas fa-podcast</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Name:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ artist.name }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-if="artist.aliases != null && artist.aliases.length > 0">
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-equals</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Aliases:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ artist.aliases }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-tag</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Type:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ artist.type }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-if="artist.gender != null">
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-venus-mars</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Gender:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ artist.gender }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile
                            v-if="artist.nameArea != null"
                            @click="$router.push('/areas/' + artist.areaId.split('#')[1])"
                        >
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-flag</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                From:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ artist.nameArea }}
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-icon right color="info">fas fa-info-circle</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-list-tile v-if="artist.beginDate != null">
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-calendar</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Born/Started:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ artist.beginDate }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-if="artist.endDate != null">
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-calendar-times</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Died/Ended:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ artist.endDate }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-star</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Rating (average of all recording ratings):
                            </v-list-tile-content>

                            <v-list-tile-content>
                                (Rated by {{ artist.nRating }} users)
                            </v-list-tile-content>

                            <v-list-tile-content>
                                <v-rating
                                    dense
                                    readonly
                                    half-increments
                                    :value="artist.rating"
                                    color="yellow darken-3"
                                ></v-rating>
                            </v-list-tile-content>

                            <v-list-tile-content>
                                ({{ artist.rating }})
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
                                {{ artist.views }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-card
                            v-if="artist.tags != null && artist.tags != ''"
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
                                    {{ artist.tags }}
                                </v-card-text>
                        </v-card>
                        <v-list-group
                            v-if="artist.albums != null && artist.albums.length > 0"
                            prepend-icon="fas fa-compact-disc"
                        >
                            <v-list-tile slot='activator'>
                                <v-list-tile-title>Albums:</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile
                                v-for="album in artist.albums"
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
                        <v-card
                            v-if="artist.about != null && artist.about != ''"
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
                                {{ artist.about }}
                            </v-card-text>
                        </v-card>
                        <v-list-tile v-if="artist.disambiguation != null && artist.disambiguation != ''">
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-info</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Disambiguation:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ artist.disambiguation }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-group
                            v-if="artist.urls != null && artist.urls.length > 0"
                            prepend-icon="fas fa-link"
                        >
                            <v-list-tile slot='activator'>
                                <v-list-tile-title>URLs:</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile
                                v-for="url in artist.urls"
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
    artist: {},
    loading: true
  }),

  mounted: async function () {
    try {
      var response = await request.getAPI(this.$urlAPI + '/artists/' + this.id)
      this.artist = response.data[0]

      response = await request.getAPI(this.$urlAPI + '/artists/' + this.id + '/aliases')
      this.artist.aliases = response.data.map(e => e.alias).join(', ')

      response = await request.getAPI(this.$urlAPI + '/artists/' + this.id + '/albums')
      this.artist.albums = response.data

      response = await request.getAPI(this.$urlAPI + '/artists/' + this.id + '/tags')
      this.artist.tags = response.data.map(e => e.tag).join(', ')

      response = await request.getAPI(this.$urlAPI + '/artists/' + this.id + '/urls')
      this.artist.urls = response.data

      this.artist.rating = 0
      this.artist.nRating = 0
      this.artist.views = 0

      var recordings = await request.getAPI(this.$urlAPI + '/artists/' + this.id + '/recordings')
      recordings = recordings.data
      var stats = await request.getAPI(this.$urlAPI + '/stats')
      stats = stats.data

      for (var i = 0; i < recordings.length; i++) {
        var index = stats.findIndex(s => s.id === recordings[i].id.split('#')[1])
        if (index !== -1) {
          this.artist.views += stats[index].views
          if (stats[index].nRating > 0) {
            this.artist.rating = (this.artist.rating * this.artist.nRating + stats[index].avgRating * stats[index].nRating) / (this.artist.nRating + stats[index].nRating)
            this.artist.nRating += stats[index].nRating
          }
        }
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
    }
  }
}
</script>

<style>

</style>
