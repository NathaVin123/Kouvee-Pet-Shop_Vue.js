<template>
  <v-app class="grey lighten-4">

    <v-content>
      <router-view></router-view>
    </v-content>
    
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      data: {
      items: [],
      shippingPrice: 0
    }
    }
  }
}
</script>