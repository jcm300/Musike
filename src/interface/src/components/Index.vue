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
                    centered
                    grow
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
                            centered
                            grow
                            slider-color="deep-orange lighten-1"
                        >
                            <v-tab ripple>
                                Most recordings
                            </v-tab>
                            <v-tab ripple>
                                Most artists
                            </v-tab>
                            <v-tab ripple>
                                Most albums
                            </v-tab>
                            <v-tab ripple>
                                Most tags
                            </v-tab>
                            <v-tab ripple>
                                Countries with Most
                            </v-tab>

                            <v-tab-item>
                                <v-tabs
                                    color="primary"
                                    dark
                                    centered
                                    grow
                                    slider-color="deep-orange lighten-1"
                                >
                                    <v-tab ripple>
                                        By Views
                                    </v-tab>
                                    <v-tab ripple>
                                        By Rating
                                    </v-tab>

                                    <v-tab-item>
                                        <v-data-table
                                            :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                            :items="tenMostRecordingsViews"
                                            class="elevation-1"
                                            :total-items=10
                                            rows-per-page-text=10
                                            hide-actions
                                        >
                                            <template v-slot:items="props">
                                                <tr :active="props.selected" @click="$router.push('/recordings/' + props.item.id)">
                                                    <td class="text-xs-center">
                                                        <v-icon left color="deep-orange lighten-1">fas fa-music</v-icon>
                                                        {{ props.item.title }} by {{ props.item.artists.map(e => e.name).join(", ") }}
                                                    </td>
                                                    <td class="text-xs-center">{{ props.item.views }}</td>
                                                </tr>
                                            </template>
                                        </v-data-table>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-data-table
                                            :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Rating', align:'center', sortable: false, value: 'rating'}, {text: 'Number of User Votes', align:'center', sortable: false, value: 'numberRating'}]"
                                            :items="tenMostRecordingsRating"
                                            class="elevation-1"
                                            :total-items=10
                                            rows-per-page-text=10
                                            hide-actions
                                        >
                                            <template v-slot:items="props">
                                                <tr :active="props.selected" @click="$router.push('/recordings/' + props.item.id)">
                                                    <td class="text-xs-center">
                                                        <v-icon left color="deep-orange lighten-1">fas fa-music</v-icon>
                                                        {{ props.item.title }} by {{ props.item.artists.map(e => e.name).join(", ") }}
                                                    </td>
                                                    <td class="text-xs-center">{{ props.item.avgRating }}</td>
                                                    <td class="text-xs-center">{{ props.item.nRating }}</td>
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
                                    centered
                                    grow
                                    slider-color="deep-orange lighten-1"
                                >
                                    <v-tab ripple>
                                        By Views
                                    </v-tab>
                                    <v-tab ripple>
                                        By Rating
                                    </v-tab>

                                    <v-tab-item>
                                        <v-data-table
                                            :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                            :items="tenMostArtistsViews"
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
                                            :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Rating (average of all recording ratings)', align:'center', sortable: false, value: 'rating'}, {text: 'Number of User Votes', align:'center', sortable: false, value: 'numberRating'}]"
                                            :items="tenMostArtistsRating"
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
                                                    <td class="text-xs-center">{{ props.item.avgRating }}</td>
                                                    <td class="text-xs-center">{{ props.item.nRating }}</td>
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
                                    centered
                                    grow
                                    slider-color="deep-orange lighten-1"
                                >
                                    <v-tab ripple>
                                        By Views
                                    </v-tab>
                                    <v-tab ripple>
                                        By Rating
                                    </v-tab>

                                    <v-tab-item>
                                        <v-data-table
                                            :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                            :items="tenMostAlbumsViews"
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
                                            :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Rating (average of all recording ratings)', align:'center', sortable: false, value: 'rating'}, {text: 'Number of User Votes', align:'center', sortable: false, value: 'numberRating'}]"
                                            :items="tenMostAlbumsRating"
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
                                                    <td class="text-xs-center">{{ props.item.avgRating }}</td>
                                                    <td class="text-xs-center">{{ props.item.nRating }}</td>
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
                                    centered
                                    grow
                                    slider-color="deep-orange lighten-1"
                                >
                                    <v-tab ripple>
                                        By Views
                                    </v-tab>
                                    <v-tab ripple>
                                        By Rating
                                    </v-tab>

                                    <v-tab-item>
                                        <v-data-table
                                            :headers="[{text: 'Tag', align:'center', sortable: false, value: 'tag'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                            :items="tenMostTagsViews"
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
                                            :headers="[{text: 'Tag', align:'center', sortable: false, value: 'tag'}, {text: 'Rating (average of all recording ratings)', align:'center', sortable: false, value: 'rating'}, {text: 'Number of User Votes', align:'center', sortable: false, value: 'numberRating'}]"
                                            :items="tenMostTagsRating"
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
                                                <td class="text-xs-center">{{ props.item.avgRating }}</td>
                                                <td class="text-xs-center">{{ props.item.nRating }}</td>
                                            </template>
                                        </v-data-table>
                                    </v-tab-item>
                                </v-tabs>
                            </v-tab-item>

                            <v-tab-item>
                                <v-tabs
                                    color="primary"
                                    dark
                                    centered
                                    grow
                                    slider-color="deep-orange lighten-1"
                                >
                                    <v-tab ripple>
                                        Views
                                    </v-tab>
                                    <v-tab ripple>
                                        Rating
                                    </v-tab>
                                    <v-tab ripple>
                                        Artists
                                    </v-tab>
                                    <v-tab ripple>
                                        Albums
                                    </v-tab>
                                    <v-tab ripple>
                                        Recordings
                                    </v-tab>

                                    <v-tab-item>
                                        <v-data-table
                                            :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                            :items="countriesTenMostViews"
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

                                    <v-tab-item>
                                        <v-data-table
                                            :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Rating (average of all recording ratings)', align:'center', sortable: false, value: 'rating'}, {text: 'Number of User Votes', align:'center', sortable: false, value: 'numberRating'}]"
                                            :items="countriesTenMostRating"
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
                                                    <td class="text-xs-center">{{ props.item.avgRating }}</td>
                                                    <td class="text-xs-center">{{ props.item.nRating }}</td>
                                                </tr>
                                            </template>
                                        </v-data-table>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-text-field
                                            v-model="searchArtists"
                                            append-icon="search"
                                            label="Search"
                                            single-line
                                            hide-details
                                        ></v-text-field>
                                        <v-data-table
                                            :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Number of Artists', align:'center', sortable: false, value: 'numberArtists'}]"
                                            :items="countriesWithMostArtists"
                                            class="elevation-1"
                                            :search="searchArtists"
                                        >
                                            <template v-slot:items="props">
                                                <tr :active="props.selected" @click="$router.push('/areas/' + props.item.area.split('#')[1])">
                                                    <td class="text-xs-center">
                                                        <v-icon left color="deep-orange lighten-1">fas fa-map-marker-alt</v-icon>
                                                        {{ props.item.name }}
                                                    </td>
                                                    <td class="text-xs-center">{{ props.item.artists }}</td>
                                                </tr>
                                            </template>
                                            <template v-slot:no-results>
                                                <v-alert :value="true" color="error" icon="warning">
                                                  Your search for "{{ search }}" found no results.
                                                </v-alert>
                                            </template>
                                        </v-data-table>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-text-field
                                            v-model="searchAlbums"
                                            append-icon="search"
                                            label="Search"
                                            single-line
                                            hide-details
                                        ></v-text-field>
                                        <v-data-table
                                            :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Number of Albums', align:'center', sortable: false, value: 'numberAlbums'}]"
                                            :items="countriesWithMostAlbums"
                                            class="elevation-1"
                                            :search="searchAlbums"
                                        >
                                            <template v-slot:items="props">
                                                <tr :active="props.selected" @click="$router.push('/areas/' + props.item.area.split('#')[1])">
                                                    <td class="text-xs-center">
                                                        <v-icon left color="deep-orange lighten-1">fas fa-map-marker-alt</v-icon>
                                                        {{ props.item.name }}
                                                    </td>
                                                    <td class="text-xs-center">{{ props.item.albums }}</td>
                                                </tr>
                                            </template>
                                            <template v-slot:no-results>
                                                <v-alert :value="true" color="error" icon="warning">
                                                  Your search for "{{ search }}" found no results.
                                                </v-alert>
                                            </template>
                                        </v-data-table>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-text-field
                                            v-model="searchRecordings"
                                            append-icon="search"
                                            label="Search"
                                            single-line
                                            hide-details
                                        ></v-text-field>
                                        <v-data-table
                                            :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Number of Recordings', align:'center', sortable: false, value: 'numberRecordings'}]"
                                            :items="countriesWithMostRecordings"
                                            class="elevation-1"
                                            :search="searchRecordings"
                                        >
                                            <template v-slot:items="props">
                                                <tr :active="props.selected" @click="$router.push('/areas/' + props.item.area.split('#')[1])">
                                                    <td class="text-xs-center">
                                                        <v-icon left color="deep-orange lighten-1">fas fa-map-marker-alt</v-icon>
                                                        {{ props.item.name }}
                                                    </td>
                                                    <td class="text-xs-center">{{ props.item.recordings }}</td>
                                                </tr>
                                            </template>
                                            <template v-slot:no-results>
                                                <v-alert :value="true" color="error" icon="warning">
                                                  Your search for "{{ search }}" found no results.
                                                </v-alert>
                                            </template>
                                        </v-data-table>
                                    </v-tab-item>
                                </v-tabs>
                            </v-tab-item>
                        </v-tabs>
                    </v-tab-item>

                    <v-tab-item>
                        <v-tabs
                            color="primary"
                            dark
                            centered
                            grow
                            slider-color="deep-orange lighten-1"
                        >
                            <v-tab ripple>
                                Most recordings
                            </v-tab>
                            <v-tab ripple>
                                Most artists
                            </v-tab>
                            <v-tab ripple>
                                Most albums
                            </v-tab>

                            <v-tab-item>
                                <v-tabs
                                    color="primary"
                                    dark
                                    centered
                                    grow
                                    slider-color="deep-orange lighten-1"
                                >
                                    <v-tab ripple>
                                        By Views
                                    </v-tab>
                                    <v-tab ripple>
                                        By Rating
                                    </v-tab>

                                    <v-tab-item>
                                        <v-data-table
                                            :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                            :items="userTenMostRecordingsViews"
                                            class="elevation-1"
                                            :total-items=10
                                            rows-per-page-text=10
                                            hide-actions
                                        >
                                            <template v-slot:items="props">
                                                <tr :active="props.selected" @click="$router.push('/recordings/' + props.item.id)">
                                                    <td class="text-xs-center">
                                                        <v-icon left color="deep-orange lighten-1">fas fa-music</v-icon>
                                                        {{ props.item.title }} by {{ props.item.artists.map(e => e.name).join(", ") }}
                                                    </td>
                                                    <td class="text-xs-center">{{ props.item.views }}</td>
                                                </tr>
                                            </template>
                                        </v-data-table>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-data-table
                                            :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Rating', align:'center', sortable: false, value: 'rating'}]"
                                            :items="userTenMostRecordingsRating"
                                            class="elevation-1"
                                            :total-items=10
                                            rows-per-page-text=10
                                            hide-actions
                                        >
                                            <template v-slot:items="props">
                                                <tr :active="props.selected" @click="$router.push('/recordings/' + props.item.id)">
                                                    <td class="text-xs-center">
                                                        <v-icon left color="deep-orange lighten-1">fas fa-music</v-icon>
                                                        {{ props.item.title }} by {{ props.item.artists.map(e => e.name).join(", ") }}
                                                    </td>
                                                    <td class="text-xs-center">{{ props.item.rating }}</td>
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
                                    centered
                                    grow
                                    slider-color="deep-orange lighten-1"
                                >
                                    <v-tab ripple>
                                        By Views
                                    </v-tab>
                                    <v-tab ripple>
                                        By Rating
                                    </v-tab>

                                    <v-tab-item>
                                        <v-data-table
                                            :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                            :items="userTenMostArtistsViews"
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
                                            :headers="[{text: 'Name', align:'center', sortable: false, value: 'name'}, {text: 'Rating (average of all recording ratings)', align:'center', sortable: false, value: 'rating'}, {text: 'Number of User Votes', align:'center', sortable: false, value: 'numberRating'}]"
                                            :items="userTenMostArtistsRating"
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
                                                    <td class="text-xs-center">{{ props.item.avgRating }}</td>
                                                    <td class="text-xs-center">{{ props.item.nRating }}</td>
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
                                    centered
                                    grow
                                    slider-color="deep-orange lighten-1"
                                >
                                    <v-tab ripple>
                                        By Views
                                    </v-tab>
                                    <v-tab ripple>
                                        By Rating
                                    </v-tab>

                                    <v-tab-item>
                                        <v-data-table
                                            :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Views', align:'center', sortable: false, value: 'views'}]"
                                            :items="userTenMostAlbumsViews"
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
                                            :headers="[{text: 'Title', align:'center', sortable: false, value: 'title'}, {text: 'Rating (average of all recording ratings)', align:'center', sortable: false, value: 'rating'}, {text: 'Number of User Votes', align:'center', sortable: false, value: 'numberRating'}]"
                                            :items="userTenMostAlbumsRating"
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
                                                    <td class="text-xs-center">{{ props.item.avgRating }}</td>
                                                    <td class="text-xs-center">{{ props.item.nRating }}</td>
                                                </tr>
                                            </template>
                                        </v-data-table>
                                    </v-tab-item>
                                </v-tabs>
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

async function titles (list, entity, url) {
  for (var i = 0; i < list.length; i++) {
    var response = await request.getAPI(url + '/' + entity + '/' + list[i].id)
    list[i].title = response.data[0].title
  }
}

function getViews (stats, listR, type, entity) {
  stats.forEach(s => {
    s[entity].forEach(a => {
      var index = -1
      if (entity !== 'tags') {
        index = listR.findIndex(e => e.id === a.id)
      } else {
        index = listR.findIndex(e => e.tag === a.tag)
      }
      if (index !== -1) {
        listR[index].views += s.views
      } else {
        var elem = { views: s.views }
        if (entity !== 'tags') {
          elem.id = a.id
        }
        elem[type] = a[type]
        listR.push(elem)
      }
    })
  })
}

function sortViews (list) {
  var sorted = list.sort((a, b) => { return b.views - a.views })
  return sorted.slice(0, 10)
}

function getRating (stats, listR, type, entity) {
  stats.forEach(s => {
    if (s.avgRating == null) {
      s.avgRating = s.rating
      s.nRating = 1
    }
    s[entity].forEach(a => {
      if (s.avgRating > 0) {
        var index = -1
        if (entity !== 'tags') {
          index = listR.findIndex(e => e.id === a.id)
        } else {
          index = listR.findIndex(e => e.tag === a.tag)
        }
        if (index !== -1) {
          listR[index].avgRating = (listR[index].avgRating * listR[index].nRating + s.avgRating * s.nRating) / (listR[index].nRating + s.nRating)
          listR[index].nRating += s.nRating
        } else {
          var elem = { avgRating: s.avgRating, nRating: s.nRating }
          if (entity !== 'tags') {
            elem.id = a.id
          }
          elem[type] = a[type]
          listR.push(elem)
        }
      }
    })
  })
}

function sortRating (list) {
  var sorted = list.sort((a, b) => { return b.avgRating - a.avgRating })
  return sorted.slice(0, 10)
}

export default {
  components: {
    Toolbar
  },

  data: () => ({
    loading: true,
    tenMostRecordingsViews: [],
    tenMostArtistsViews: [],
    tenMostAlbumsViews: [],
    tenMostTagsViews: [],
    countriesTenMostViews: [],
    tenMostRecordingsRating: [],
    tenMostArtistsRating: [],
    tenMostAlbumsRating: [],
    tenMostTagsRating: [],
    countriesTenMostRating: [],
    musikeStats: [],
    userTenMostRecordingsViews: [],
    userTenMostArtistsViews: [],
    userTenMostAlbumsViews: [],
    userTenMostRecordingsRating: [],
    userTenMostArtistsRating: [],
    userTenMostAlbumsRating: [],
    userStats: [],
    countriesWithMostAlbums: [],
    countriesWithMostArtists: [],
    countriesWithMostRecordings: [],
    searchArtists: '',
    searchRecordings: '',
    searchAlbums: ''
  }),

  mounted: async function () {
    var response = await request.getAPI(this.$urlAPI + '/stats/mostViews')
    this.tenMostRecordingsViews = response.data
    titles(this.tenMostRecordingsViews, 'recordings', this.$urlAPI)
    for (var i = 0; i < this.tenMostRecordingsViews.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.tenMostRecordingsViews[i].id + '/artistsCredit')
      this.tenMostRecordingsViews[i].artists = response.data
    }

    response = await request.getAPI(this.$urlAPI + '/stats/mostRating')
    this.tenMostRecordingsRating = response.data
    titles(this.tenMostRecordingsRating, 'recordings', this.$urlAPI)
    for (i = 0; i < this.tenMostRecordingsRating.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.tenMostRecordingsRating[i].id + '/artistsCredit')
      this.tenMostRecordingsRating[i].artists = response.data
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

    // 10 Most artists with views
    getViews(this.musikeStats, this.tenMostArtistsViews, 'name', 'artists')

    // 10 Most artists with ratings
    getRating(this.musikeStats, this.tenMostArtistsRating, 'name', 'artists')

    // 10 Most countries with views
    for (i = 0; i < this.tenMostArtistsViews.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/artists/' + this.tenMostArtistsViews[i].id.split('#')[1])
      if (response.data[0].nameArea != null && response.data[0].nameArea !== '') {
        var index = this.countriesTenMostViews.findIndex(e => e.id === response.data[0].areaId.split('#')[1])
        if (index !== -1) {
          this.countriesTenMostViews[index].views += this.tenMostArtistsViews[i].views
        } else {
          this.countriesTenMostViews.push({ id: response.data[0].areaId.split('#')[1], name: response.data[0].nameArea, views: this.tenMostArtistsViews[i].views })
        }
      }
    }

    // 10 Most countries with ratings
    for (i = 0; i < this.tenMostArtistsRating.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/artists/' + this.tenMostArtistsRating[i].id.split('#')[1])
      if (response.data[0].nameArea != null && response.data[0].nameArea !== '') {
        index = this.countriesTenMostRating.findIndex(e => e.id === response.data[0].areaId.split('#')[1])
        if (index !== -1) {
          this.countriesTenMostRating[index].avgRating = (this.countriesTenMostRating[index].avgRating * this.countriesTenMostRating[index].nRating + this.tenMostArtistsRating[i].avgRating * this.tenMostArtistsRating[i].nRating) / (this.countriesTenMostRating[index].nRating + this.tenMostArtistsRating[i].nRating)
          this.countriesTenMostRating[index].nRating += this.tenMostArtistsRating[i].nRating
        } else {
          this.countriesTenMostRating.push({ id: response.data[0].areaId.split('#')[1], name: response.data[0].nameArea, avgRating: this.tenMostArtistsRating[i].avgRating, nRating: this.tenMostArtistsRating[i].nRating })
        }
      }
    }

    this.tenMostArtistsViews = sortViews(this.tenMostArtistsViews)
    this.tenMostArtistsRating = sortRating(this.tenMostArtistsRating)
    this.countriesTenMostViews = sortViews(this.countriesTenMostViews)
    this.countriesTenMostRating = sortRating(this.countriesTenMostRating)

    // 10 Most albums with views
    getViews(this.musikeStats, this.tenMostAlbumsViews, 'title', 'albums')
    this.tenMostAlbumsViews = sortViews(this.tenMostAlbumsViews)

    // 10 Most albums with rating
    getRating(this.musikeStats, this.tenMostAlbumsRating, 'title', 'albums')
    this.tenMostAlbumsRating = sortRating(this.tenMostAlbumsRating)

    // this.tenMostTags with Views
    getViews(this.musikeStats, this.tenMostTagsViews, 'tag', 'tags')
    this.tenMostTagsViews = sortViews(this.tenMostTagsViews)

    // this.tenMostTags with Rating
    getRating(this.musikeStats, this.tenMostTagsRating, 'tag', 'tags')
    this.tenMostTagsRating = sortRating(this.tenMostTagsRating)

    var id = localStorage.getItem('user-id')
    response = await request.getAPI(this.$urlAPI + '/users/' + id + '/statsMostViews')
    this.userTenMostRecordingsViews = response.data

    // titles userTenMostRecordingsViews
    titles(this.userTenMostRecordingsViews, 'recordings', this.$urlAPI)
    for (i = 0; i < this.userTenMostRecordingsViews.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.userTenMostRecordingsViews[i].id + '/artistsCredit')
      this.userTenMostRecordingsViews[i].artists = response.data
    }

    response = await request.getAPI(this.$urlAPI + '/users/' + id + '/statsMostRating')
    this.userTenMostRecordingsRating = response.data

    // titles userTenMostRecordingsRating
    titles(this.userTenMostRecordingsRating, 'recordings', this.$urlAPI)
    for (i = 0; i < this.userTenMostRecordingsRating.length; i++) {
      response = await request.getAPI(this.$urlAPI + '/recordings/' + this.userTenMostRecordingsRating[i].id + '/artistsCredit')
      this.userTenMostRecordingsRating[i].artists = response.data
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

    // 10 Most user artists with views
    getViews(this.userStats, this.userTenMostArtistsViews, 'name', 'artists')
    this.userTenMostArtistsViews = sortViews(this.userTenMostArtistsViews)

    // 10 Most user artists with rating
    getRating(this.userStats, this.userTenMostArtistsRating, 'name', 'artists')
    this.userTenMostArtistsRating = sortRating(this.userTenMostArtistsRating)

    // 10 Most user albums with views
    getViews(this.userStats, this.userTenMostAlbumsViews, 'title', 'albums')
    this.userTenMostAlbumsViews = sortViews(this.userTenMostAlbumsViews)

    // 10 Most user albums with rating
    getRating(this.userStats, this.userTenMostAlbumsRating, 'title', 'albums')
    this.userTenMostAlbumsRating = sortRating(this.userTenMostAlbumsRating)

    response = await request.getAPI(this.$urlAPI + '/areas/countriesWithMostArtists?cache=true')
    this.countriesWithMostArtists = response.data

    response = await request.getAPI(this.$urlAPI + '/areas/countriesWithMostRecordings?cache=true')
    this.countriesWithMostRecordings = response.data

    response = await request.getAPI(this.$urlAPI + '/areas/countriesWithMostAlbums?cache=true')
    this.countriesWithMostAlbums = response.data

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
