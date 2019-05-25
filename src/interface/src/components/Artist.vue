<template>
    <div>
        <Toolbar
            filterEnable=false
            page="none"
        />
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
                        <h1>Album - {{ album.title }}</h1>
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
                                Rating:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                <v-rating
                                    readonly
                                    :value="album.rating"
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
                                {{ album.views }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-tag</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Tags:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ album.tags }}
                            </v-list-tile-content>
                        </v-list-tile>
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
                        <v-list-tile v-if="album.about != null && album.about != ''">
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-info</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                About:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ album.about }}
                            </v-list-tile-content>
                        </v-list-tile>
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
                                :key="recording.title"
                                avatar
                                @click="$router.push('/recordings/' + recording.id.split('#')[1])"
                            >
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-music</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ recording.title }}</v-list-tile-title>
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
