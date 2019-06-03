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
                <v-tabs
                    color="primary"
                    dark
                    slider-color="deep-orange lighten-1"
                >
                    <v-tab ripple>
                        <h3>Musike Statistics</h3>
                    </v-tab>
                    <v-tab ripple>
                        <h3>User Statistics</h3>
                    </v-tab>

                    <v-tab-item>
                        <v-tabs
                            color="primary"
                            dark
                            slider-color="deep-orange lighten-1"
                        >
                            <v-tab ripple>
                                More viewed recordings
                            </v-tab>
                            <v-tab ripple>
                                More viewed artists
                            </v-tab>
                            <v-tab ripple>
                                More viewed albums
                            </v-tab>
                            <v-tab ripple>
                                More viewed tags
                            </v-tab>
                            <v-tab ripple>
                                Countries with more "views"
                            </v-tab>

                            <v-tab-item>
                                <v-data-table
                                    :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="tenMoreRecordingsViews"
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
                            </v-tab-item>

                            <v-tab-item>
                                <v-data-table
                                    :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="tenMoreArtistsViews"
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
                            </v-tab-item>

                            <v-tab-item>
                                <v-data-table
                                    :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="tenMoreAlbumsViews"
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
                            </v-tab-item>

                            <v-tab-item>
                                <v-data-table
                                    :headers="[{text: 'Tag', align:'center', sortable: false, value: 'tag'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="tenMoreTagsViews"
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
                            </v-tab-item>

                            <v-tab-item>
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
                            </v-tab-item>
                        </v-tabs>
                    </v-tab-item>

                    <v-tab-item>
                        <v-tabs
                            color="primary"
                            dark
                            slider-color="deep-orange lighten-1"
                        >
                            <v-tab ripple>
                                More viewed recordings
                            </v-tab>
                            <v-tab ripple>
                                More viewed artists
                            </v-tab>
                            <v-tab ripple>
                                More viewed albums
                            </v-tab>

                            <v-tab-item>
                                <v-data-table
                                    :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="userTenMoreRecordingsViews"
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
                            </v-tab-item>

                            <v-tab-item>
                                <v-data-table
                                    :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="userTenMoreArtistsViews"
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
                            </v-tab-item>

                            <v-tab-item>
                                <v-data-table
                                    :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                    :items="userTenMoreAlbumsViews"
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
                            </v-tab-item>
                        </v-tabs>
                    </v-tab-item>
                </v-tabs>
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
    tenMoreRecordingsViews: [],
    tenMoreArtistsViews: [],
    tenMoreAlbumsViews: [],
    tenMoreTagsViews: [],
    countriesTenMoreViews: [],
    musikeStats: [],
    userTenMoreRecordingsViews: [],
    userTenMoreArtistsViews: [],
    userTenMoreAlbumsViews: [],
    userStats: []
  }),

  mounted: async function () {
    var response = await request.getAPI(this.$urlAPI + '/stats/more')
    this.tenMoreRecordingsViews = response.data

    // titles for tenMoreRecordingsViews
    for (var i = 0; i < this.tenMoreRecordingsViews.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.tenMoreRecordingsViews[i].id)
      this.tenMoreRecordingsViews[i].title = response.data[0].title
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
        var index = this.tenMoreArtistsViews.findIndex(e => e.id === a.id)
        if (index !== -1) {
          this.tenMoreArtistsViews[index].views += s.views
        } else {
          this.tenMoreArtistsViews.push({ id: a.id, name: a.name, views: s.views })
        }
      })
    })

    // 10 more countries with views
    for (i = 0; i < this.tenMoreArtistsViews.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/artists/' + this.tenMoreArtistsViews[i].id.split('#')[1])
      if (response.data[0].nameArea != null && response.data[0].nameArea !== '') {
        var index = this.countriesTenMoreViews.findIndex(e => e.id === response.data[0].areaId.split('#')[1])
        if (index !== -1) {
          this.countriesTenMoreViews[index].views += this.tenMoreArtistsViews[i].views
        } else {
          this.countriesTenMoreViews.push({ id: response.data[0].areaId.split('#')[1], name: response.data[0].nameArea, views: this.tenMoreArtistsViews[i].views })
        }
      }
    }

    var sorted = this.tenMoreArtistsViews.sort((a, b) => { return b.views - a.views })
    this.tenMoreArtistsViews = sorted.slice(0, 10)

    sorted = this.countriesTenMoreViews.sort((a, b) => { return b.views - a.views })
    this.countriesTenMoreViews = sorted.slice(0, 10)

    // 10 more albums
    this.musikeStats.forEach(s => {
      s.albums.forEach(a => {
        var index = this.tenMoreAlbumsViews.findIndex(e => e.id === a.id)
        if (index !== -1) {
          this.tenMoreAlbumsViews[index].views += s.views
        } else {
          this.tenMoreAlbumsViews.push({ id: a.id, title: a.title, views: s.views })
        }
      })
    })

    sorted = this.tenMoreAlbumsViews.sort((a, b) => { return b.views - a.views })
    this.tenMoreAlbumsViews = sorted.slice(0, 10)

    // this.tenMoreTags
    this.musikeStats.forEach(s => {
      s.tags.forEach(a => {
        var index = this.tenMoreTagsViews.findIndex(e => e.tag === a.tag)
        if (index !== -1) {
          this.tenMoreTagsViews[index].views += s.views
        } else {
          this.tenMoreTagsViews.push({ tag: a.tag, views: s.views })
        }
      })
    })

    sorted = this.tenMoreTagsViews.sort((a, b) => { return b.views - a.views })
    this.tenMoreTagsViews = sorted.slice(0, 10)

    var id = localStorage.getItem('user-id')
    response = await request.getAPI(this.$urlAPI + '/users/' + id + '/statsMore')
    this.userTenMoreRecordingsViews = response.data

    // titles userTenMoreRecordingsViews
    for (i = 0; i < this.userTenMoreRecordingsViews.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.userTenMoreRecordingsViews[i].id)
      this.userTenMoreRecordingsViews[i].title = response.data[0].title
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
        var index = this.userTenMoreArtistsViews.findIndex(e => e.id === a.id)
        if (index !== -1) {
          this.userTenMoreArtistsViews[index].views += s.views
        } else {
          this.userTenMoreArtistsViews.push({ id: a.id, name: a.name, views: s.views })
        }
      })
    })

    sorted = this.userTenMoreArtistsViews.sort((a, b) => { return b.views - a.views })
    this.userTenMoreArtistsViews = sorted.slice(0, 10)

    // 10 more user albums
    this.userStats.forEach(s => {
      s.albums.forEach(a => {
        var index = this.userTenMoreAlbumsViews.findIndex(e => e.id === a.id)
        if (index !== -1) {
          this.userTenMoreAlbumsViews[index].views += s.views
        } else {
          this.userTenMoreAlbumsViews.push({ id: a.id, title: a.title, views: s.views })
        }
      })
    })

    sorted = this.userTenMoreAlbumsViews.sort((a, b) => { return b.views - a.views })
    this.userTenMoreAlbumsViews = sorted.slice(0, 10)

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
