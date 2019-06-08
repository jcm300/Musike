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
                            <h1>Area - {{ area.name }}</h1>
                        </v-flex>
                        <v-flex xs4>
                            <v-btn
                                color="warning"
                                large
                                :href="'https://musicbrainz.org/area/' + this.id.split('_')[1]"
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
                                <v-icon color="deep-orange lighten-1">fas fa-map-marker-alt</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Name:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ area.name }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-card
                            v-if="area.aliases != null && area.aliases.length > 0"
                            class="elevation-0"
                        >
                            <v-card-title>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <v-icon color="deep-orange lighten-1">fas fa-equals</v-icon>
                                <span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aliases:
                                </span>
                            </v-card-title>

                            <v-card-text>
                                {{ area.aliases }}
                            </v-card-text>
                        </v-card>
                        <v-list-tile>
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-tag</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Type:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ area.type }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-if="area.beginDate != null">
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-calendar</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Creation Date:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ area.beginDate }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-if="area.endDate != null">
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-calendar-times</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Extension Date:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ area.endDate }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-card
                            v-if="area.about != null && area.about != ''"
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
                                {{ area.about }}
                            </v-card-text>
                        </v-card>
                        <v-list-tile v-if="area.disambiguation != null && area.disambiguation != ''">
                            <v-list-tile-avatar>
                                <v-icon color="deep-orange lighten-1">fas fa-info</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                Disambiguation:
                            </v-list-tile-content>

                            <v-list-tile-content>
                                {{ area.disambiguation }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-group
                            v-if="area.parts != null && area.parts.length > 0"
                            prepend-icon="fas fa-map-marker"
                        >
                            <v-list-tile slot='activator'>
                                <v-list-tile-title>Has parts:</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile
                                v-for="areaP in area.parts"
                                :key="areaP.id"
                                avatar
                                @click="$router.push('/areas/' + areaP.id.split('#')[1]); $router.go()"
                            >
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-map-marker</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ areaP.name }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ areaP.type }}</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-icon right color="info">fas fa-info-circle</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                        <v-list-group
                            v-if="area.partOfs != null && area.partOfs.length > 0"
                            prepend-icon="fas fa-map-marker"
                        >
                            <v-list-tile slot='activator'>
                                <v-list-tile-title>Part Of:</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile
                                v-for="areaP in area.partOfs"
                                :key="areaP.id"
                                avatar
                                @click="$router.push('/areas/' + areaP.id.split('#')[1]); $router.go()"
                            >
                                <v-list-tile-avatar>
                                    <v-icon color="deep-orange lighten-1">fas fa-map-marker</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ areaP.name }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ areaP.type }}</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-icon right color="info">fas fa-info-circle</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                        <v-list-group
                            v-if="area.urls != null && area.urls.length > 0"
                            prepend-icon="fas fa-link"
                        >
                            <v-list-tile slot='activator'>
                                <v-list-tile-title>URLs:</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile
                                v-for="url in area.urls"
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
    area: {},
    loading: true
  }),

  mounted: async function () {
    try {
      var response = await request.getAPI(this.$urlAPI + '/areas/' + this.id)
      this.area = response.data[0]

      response = await request.getAPI(this.$urlAPI + '/areas/' + this.id + '/aliases')
      this.area.aliases = response.data.map(e => e.alias).join(', ')

      response = await request.getAPI(this.$urlAPI + '/areas/' + this.id + '/parts')
      this.area.parts = response.data

      response = await request.getAPI(this.$urlAPI + '/areas/' + this.id + '/partOf')
      this.area.partOfs = response.data

      response = await request.getAPI(this.$urlAPI + '/areas/' + this.id + '/urls')
      this.area.urls = response.data

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
