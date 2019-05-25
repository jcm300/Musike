<template>
    <v-container>
        <v-layout class="text-xs-center">
            <v-flex xs12>
                <youtube
                    @ended="ended"
                    :player-vars="{ listType: 'search', list: query }"
                ></youtube>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
  props: ['query'],
  data: () => ({
  }),
  methods: {
    ended () {
      this.$emit('ended', true)
    }
  }
}

</script>

<style>

</style>
