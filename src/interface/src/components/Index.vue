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
                        <h1>Musike Statistics</h1>
                    </v-card-title>

                    <v-divider></v-divider>

                     <v-layout
                        row wrap
                        fill-height
                        justify-center
                        align-center
                    >
                        <v-flex xs10>
                            <v-card>
                                <v-card-title>
                                    <h3 class="text-xs-center">More viewed recordings</h3>
                                </v-card-title>

                                <v-data-table
                                    :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="tenMoreRecordings"
                                    class="elevation-1"
                                    :total-items=10
                                    rows-per-page-text=10
                                    hide-actions
                                >
                                    <template v-slot:items="props">
                                        <tr :active="props.selected" @click="$router.push('/recordings/' + props.item.id)">
                                            <td class="text-xs-center">
                                                <v-icon left color="deep-orange lighten-1">fas fa-music</v-icon>
                                                {{ props.item.title }}
                                            </td>
                                            <td class="text-xs-center">{{ props.item.views }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <br>

                    <v-layout
                        row wrap
                        fill-height
                        justify-center
                        align-center
                    >
                        <v-flex xs10>
                            <v-card>
                                <v-card-title>
                                    <h3 class="text-xs-center">More viewed artists</h3>
                                </v-card-title>

                                <v-data-table
                                    :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="tenMoreArtists"
                                    class="elevation-1"
                                    :total-items=10
                                    rows-per-page-text=10
                                    hide-actions
                                >
                                    <template v-slot:items="props">
                                        <tr :active="props.selected" @click="$router.push('/artists/' + props.item.id.split('#')[1])">
                                            <td class="text-xs-center">
                                                <v-icon left color="deep-orange lighten-1">fas fa-podcast</v-icon>
                                                {{ props.item.name }}
                                            </td>
                                            <td class="text-xs-center">{{ props.item.views }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <br>

                    <v-layout
                        row wrap
                        fill-height
                        justify-center
                        align-center
                    >
                        <v-flex xs10>
                            <v-card>
                                <v-card-title>
                                    <h3 class="text-xs-center">More viewed albums</h3>
                                </v-card-title>

                                <v-data-table
                                    :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="tenMoreAlbums"
                                    class="elevation-1"
                                    :total-items=10
                                    rows-per-page-text=10
                                    hide-actions
                                >
                                <template v-slot:items="props">
                                        <tr :active="props.selected" @click="$router.push('/albums/' + props.item.id.split('#')[1])">
                                            <td class="text-xs-center">
                                                <v-icon left color="deep-orange lighten-1">fas fa-compact-disc</v-icon>
                                                {{ props.item.title }}
                                            </td>
                                            <td class="text-xs-center">{{ props.item.views }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <br>

                    <v-layout
                        row wrap
                        fill-height
                        justify-center
                        align-center
                    >
                        <v-flex xs10>
                            <v-card>
                                <v-card-title>
                                    <h3 class="text-xs-center">More viewed tags</h3>
                                </v-card-title>

                                <v-data-table
                                    :headers="[{text: 'Tag', align:'center', sortable: false, value: 'tag'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="tenMoreTags"
                                    class="elevation-1"
                                    :total-items=10
                                    rows-per-page-text=10
                                    hide-actions
                                >
                                    <template v-slot:items="props">
                                        <td class="text-xs-center">
                                            <v-icon left color="deep-orange lighten-1">fas fa-tag</v-icon>
                                            {{ props.item.tag }}
                                        </td>
                                        <td class="text-xs-center">{{ props.item.views }}</td>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <br>

                    <v-layout
                        row wrap
                        fill-height
                        justify-center
                        align-center
                    >
                        <v-flex xs10>
                            <v-card>
                                <v-card-title>
                                    <h3 class="text-xs-center">Countries with more "views"</h3>
                                </v-card-title>

                                <v-data-table
                                    :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="countriesTenMoreViews"
                                    class="elevation-1"
                                    :total-items=10
                                    rows-per-page-text=10
                                    hide-actions
                                >
                                <template v-slot:items="props">
                                        <tr :active="props.selected" @click="$router.push('/areas/' + props.item.id)">
                                            <td class="text-xs-center">
                                                <v-icon left color="deep-orange lighten-1">fas fa-map-marker-alt</v-icon>
                                                {{ props.item.name }}
                                            </td>
                                            <td class="text-xs-center">{{ props.item.views }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <br>
                </v-card>
                <br>
                <v-card>
                    <v-card-title>
                        <h1>User Statistics</h1>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-layout
                        row wrap
                        fill-height
                        justify-center
                        align-center
                    >
                        <v-flex xs10>
                            <v-card>
                                <v-card-title>
                                    <h3 class="text-xs-center">More viewed recordings</h3>
                                </v-card-title>

                                <v-data-table
                                    :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="userTenMoreRecordings"
                                    class="elevation-1"
                                    :total-items=10
                                    rows-per-page-text=10
                                    hide-actions
                                >
                                    <template v-slot:items="props">
                                        <tr :active="props.selected" @click="$router.push('/recordings/' + props.item.id)">
                                            <td class="text-xs-center">
                                                <v-icon left color="deep-orange lighten-1">fas fa-music</v-icon>
                                                {{ props.item.title }}
                                            </td>
                                            <td class="text-xs-center">{{ props.item.views }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <br>

                    <v-layout
                        row wrap
                        fill-height
                        justify-center
                        align-center
                    >
                        <v-flex xs10>
                            <v-card>
                                <v-card-title>
                                    <h3 class="text-xs-center">More viewed artists</h3>
                                </v-card-title>

                                <v-data-table
                                    :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="userTenMoreArtists"
                                    class="elevation-1"
                                    :total-items=10
                                    rows-per-page-text=10
                                    hide-actions
                                >
                                    <template v-slot:items="props">
                                        <tr :active="props.selected" @click="$router.push('/artists/' + props.item.id.split('#')[1])">
                                            <td class="text-xs-center">
                                                <v-icon left color="deep-orange lighten-1">fas fa-podcast</v-icon>
                                                {{ props.item.name }}
                                            </td>
                                            <td class="text-xs-center">{{ props.item.views }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <br>

                    <v-layout
                        row wrap
                        fill-height
                        justify-center
                        align-center
                    >
                        <v-flex xs10>
                            <v-card>
                                <v-card-title>
                                    <h3 class="text-xs-center">More viewed albums</h3>
                                </v-card-title>

                                <v-data-table
                                    :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="userTenMoreAlbums"
                                    class="elevation-1"
                                    :total-items=10
                                    rows-per-page-text=10
                                    hide-actions
                                >
                                    <template v-slot:items="props">
                                        <tr :active="props.selected" @click="$router.push('/albums/' + props.item.id.split('#')[1])">
                                            <td class="text-xs-center">
                                                <v-icon left color="deep-orange lighten-1">fas fa-compact-disc</v-icon>
                                                {{ props.item.title }}
                                            </td>
                                            <td class="text-xs-center">{{ props.item.views }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <br>
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
        <br>
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
    loading: true,
    tenMoreRecordings: [],
    tenMoreArtists: [],
    tenMoreAlbums: [],
    tenMoreTags: [],
    countriesTenMoreViews: [],
    musikeStats: [],
    userTenMoreRecordings: [],
    userTenMoreArtists: [],
    userTenMoreAlbums: [],
    userStats: []
  }),

  mounted: async function () {
    var response = await request.getAPI(this.$urlAPI + '/stats/more')
    this.tenMoreRecordings = response.data

    // titles for tenMoreRecordings
    for (var i = 0; i < this.tenMoreRecordings.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.tenMoreRecordings[i].id)
      this.tenMoreRecordings[i].title = response.data[0].title
    }

    response = await request.getAPI(this.$urlAPI + '/stats')
    this.musikeStats = response.data

    // get artists and albums
    for (i = 0; i < this.musikeStats.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.musikeStats[i].id)
      this.musikeStats[i].title = response.data[0].title

      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.musikeStats[i].id + '/artistsCredit')
      this.musikeStats[i].artists = response.data

      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.musikeStats[i].id + '/albums')
      this.musikeStats[i].albums = response.data

      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.musikeStats[i].id + '/tags')
      this.musikeStats[i].tags = response.data
    }

    // 10 more artists
    this.musikeStats.forEach(s => {
      s.artists.forEach(a => {
        var index = this.tenMoreArtists.findIndex(e => e.id === a.id)
        if (index !== -1) {
          this.tenMoreArtists[index].views += s.views
        } else {
          this.tenMoreArtists.push({ id: a.id, name: a.name, views: s.views })
        }
      })
    })

    // 10 more countries with views
    for (i = 0; i < this.tenMoreArtists.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/artists/' + this.tenMoreArtists[i].id.split('#')[1])
      if (response.data[0].nameArea != null && response.data[0].nameArea !== '') {
        var index = this.countriesTenMoreViews.findIndex(e => e.id === response.data[0].areaId.split('#')[1])
        if (index !== -1) {
          this.countriesTenMoreViews[index].views += this.tenMoreArtists[i].views
        } else {
          this.countriesTenMoreViews.push({ id: response.data[0].areaId.split('#')[1], name: response.data[0].nameArea, views: this.tenMoreArtists[i].views })
        }
      }
    }

    var sorted = this.tenMoreArtists.sort((a, b) => { return b.views - a.views })
    this.tenMoreArtists = sorted.slice(0, 10)

    sorted = this.countriesTenMoreViews.sort((a, b) => { return b.views - a.views })
    this.countriesTenMoreViews = sorted.slice(0, 10)

    // 10 more albums
    this.musikeStats.forEach(s => {
      s.albums.forEach(a => {
        var index = this.tenMoreAlbums.findIndex(e => e.id === a.id)
        if (index !== -1) {
          this.tenMoreAlbums[index].views += s.views
        } else {
          this.tenMoreAlbums.push({ id: a.id, title: a.title, views: s.views })
        }
      })
    })

    sorted = this.tenMoreAlbums.sort((a, b) => { return b.views - a.views })
    this.tenMoreAlbums = sorted.slice(0, 10)

    // this.tenMoreTags
    this.musikeStats.forEach(s => {
      s.tags.forEach(a => {
        var index = this.tenMoreTags.findIndex(e => e.tag === a.tag)
        if (index !== -1) {
          this.tenMoreTags[index].views += s.views
        } else {
          this.tenMoreTags.push({ tag: a.tag, views: s.views })
        }
      })
    })

    sorted = this.tenMoreTags.sort((a, b) => { return b.views - a.views })
    this.tenMoreTags = sorted.slice(0, 10)

    var id = localStorage.getItem('user-id')
    response = await request.getAPI(this.$urlAPI + '/users/' + id + '/statsMore')
    this.userTenMoreRecordings = response.data

    // titles userTenMoreRecordings
    for (i = 0; i < this.userTenMoreRecordings.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.userTenMoreRecordings[i].id)
      this.userTenMoreRecordings[i].title = response.data[0].title
    }

    response = await request.getAPI(this.$urlAPI + '/users/' + id + '/stats')
    this.userStats = response.data

    // get artists and albums for user
    for (i = 0; i < this.userStats.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.userStats[i].id)
      this.userStats[i].title = response.data[0].title

      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.userStats[i].id + '/artistsCredit')
      this.userStats[i].artists = response.data

      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.userStats[i].id + '/albums')
      this.userStats[i].albums = response.data
    }

    // 10 more user artists
    this.userStats.forEach(s => {
      s.artists.forEach(a => {
        var index = this.userTenMoreArtists.findIndex(e => e.id === a.id)
        if (index !== -1) {
          this.userTenMoreArtists[index].views += s.views
        } else {
          this.userTenMoreArtists.push({ id: a.id, name: a.name, views: s.views })
        }
      })
    })

    sorted = this.userTenMoreArtists.sort((a, b) => { return b.views - a.views })
    this.userTenMoreArtists = sorted.slice(0, 10)

    // 10 more user albums
    this.userStats.forEach(s => {
      s.albums.forEach(a => {
        var index = this.userTenMoreAlbums.findIndex(e => e.id === a.id)
        if (index !== -1) {
          this.userTenMoreAlbums[index].views += s.views
        } else {
          this.userTenMoreAlbums.push({ id: a.id, title: a.title, views: s.views })
        }
      })
    })

    sorted = this.userTenMoreAlbums.sort((a, b) => { return b.views - a.views })
    this.userTenMoreAlbums = sorted.slice(0, 10)

    this.loading = false
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
