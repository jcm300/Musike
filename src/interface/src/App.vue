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
                    <span
                        v-for="(icon, index) in icons"
                        :key="index"
                    >
                        <a :href="links[index]">
                            <v-btn dark icon class="mx-3">
                                <v-icon size="24px">
                                    {{ icon }}
                                </v-icon>
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
    icons: [
      'fab fa-linkedin',
      'fab fa-github'
    ],
    links: [
      'https://www.linkedin.com/in/jose-carlos-martins/',
      'https://github.com/jcm300/Musike'
    ]
  })
}
</script>

<style>

</style>
