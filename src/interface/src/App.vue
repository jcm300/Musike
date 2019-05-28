<template>
    <v-app>
        <v-content>
            <router-view/>
        </v-content>
        <v-footer height="auto" fixed app>
            <v-card
                class="flex"
                flat
                tile
            >
                <v-card-title class="primary justify-center" dark>
                    <span class="white--text">
                        <strong>Powered by:</strong>
                        <a href="https://musicbrainz.org/">
                            <v-btn dark icon class="mx-3">
                                <v-img
                                    src="/static/musicbrainz.png"
                                    contain
                                ></v-img>
                            </v-btn>
                        </a>
                        <a href="https://www.musixmatch.com">
                            <v-btn dark icon class="mx-3">
                                <v-img
                                    src="/static/musixmatch.png"
                                    contain
                                ></v-img>
                            </v-btn>
                        </a>
                    </span>

                    <v-divider
                        dark
                        class="mx-3"
                        inset
                        vertical
                    ></v-divider>

                    <span class="white--text">
                        <strong>Made with love by:</strong>
                        <a href="https://www.linkedin.com/in/jose-carlos-martins/">
                            <v-btn dark icon class="mx-3">
                                <v-icon size="24px">fab fa-linkedin</v-icon>
                            </v-btn>
                        </a>
                    </span>

                    <v-divider
                        dark
                        class="mx-3"
                        inset
                        vertical
                    ></v-divider>

                    <span class="white--text">
                        <strong>Code available at:</strong>
                        <a href="https://github.com/jcm300/Musike">
                            <v-btn dark icon class="mx-3">
                                <v-icon size="24px">fab fa-github</v-icon>
                            </v-btn>
                        </a>
                    </span>
                </v-card-title>

                <v-card-actions class="accent justify-center">
                    &copy;2019 - <strong>Musike</strong>
                </v-card-actions>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script>
export default {
  name: 'Musike',
  data: () => ({
  })
}
</script>

<style>

</style>
