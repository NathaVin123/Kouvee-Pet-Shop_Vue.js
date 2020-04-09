<template>
    <!--Untuk detail kelompok-->    
    <div id="app">
          <h1 class="subheading grey--text">Team</h1>
      
          <v-container class="my-5">
      
            <v-layout row wrap>
              <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
                <v-card flat class="text-center">
                    <v-responsive class="pt-4">
                        <v-avatar size="100" class="grey lighten-2">
                          <img :src="person.avatar">
                        </v-avatar>
                    </v-responsive>
                  <v-card-text>
                    <div class="subheading">{{ person.name }}</div>
                    <div class="grey--text">{{ person.role }}</div>
                    <div class="grey--text">{{ person.id_number }}</div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
      
          </v-container>

          <h1 class="subheading grey--text">About us</h1>
      
          <v-container class="my-5">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur consequatur quisquam incidunt! Ab, in. Ipsam doloribus officia, provident reiciendis eaque quaerat quis saepe praesentium quidem sint aspernatur nulla voluptatem dolor.
          </v-container>
          
          <h1 class="subheading grey--text">Our Lovely Office</h1>
      
          <v-container class="my-5">
              <p class="text-left" mb-3>Babarsari Rd No. 43, Janti, Caturtunggal, Depok, Sleman, Special Region of Yogyakarta 55281 
                <small color="error"><br>*this is not our actual office, cause we all are students</small></p>
                <gmap-map :center="center" :map-type-id="mapTypeId" :zoom="5">
                        <gmap-marker
                          v-for="(item, index) in markers"
                          :key="index"
                          :position="item.position"
                          @click="center = item.position"
                        />
                </gmap-map>
          </v-container>
          <v-footer padless dark>
            <v-col
              class="text-center"
              cols="12"
            >
              {{ new Date().getFullYear() }} — <strong>LyricLibs</strong>
            </v-col>
          </v-footer>
        </div>
        
      </template>
      
      <script>
      export default {
        data() {
          return {
            team: [
                { name: 'Hendry Roganda', id_number:'170709176', role: 'Web developer', avatar: '/avatar-2.png' },
                { name: 'Nathaniel Vincent', id_number:'170709127', role: 'Backend developer', avatar: '/avatar-1.png' },
                { name: 'Mathias Sebastian', id_number:'170709403', role: 'Tester', avatar: '/avatar-3.png' },
                { name: 'Anastasya Valya Miroku', id_number:'170709552',role: 'Graphic designer', avatar: '/avatar-4.png' }
        ],
        center: { lat: -7.7793301, lng: 110.4159397 },
        Zoom: "100000",
        mapTypeId: "roadmap",
        markers: [
        { position: { lat: -7.7793301, lng: 110.4159397 } }
      ]
          }
        }
      }
      </script>
      <style lang="scss" scoped>
          .vue-map-container {
            height: 450px;
            max-width: 992px;
            width: 100%;
          }
      </style>