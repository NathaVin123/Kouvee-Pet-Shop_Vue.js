<template>
    <!--Untuk detail kelompok-->    
    <div id="app">
      <br><br>
          <center>
            <h1 class="subheading grey--text">P3L TEAM</h1>
          </center>
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
          <center>
            <h1 class="subheading grey--text">Tentang Kami</h1>
          </center>
          
              <v-container class="my-5">
                    <h2 class="subheading grey--text"><p class="text-left">Siapa Kami?</p></h2>
                    <br>
                    Kami adalah mahasiswa Universitas Atma Jaya Yogyakarta
                    <br><br>
              </v-container>
          
          
          <v-container class="my-5">
            <h2 class="subheading grey--text">Kantor Kami</h2>
            <br>
              <p class="text-left" mb-3>Jalan Babarsari No 43, Caturtunggal, Depok, Yogyakarta
                <small color="error"><br>*ini belum kantor sebenarnya, karena kami masih mahasiswa</small></p>
                <br>
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
            {{ new Date().getFullYear() }} — <strong>P3L G kel 3</strong>
            </v-col>
          </v-footer>
        </div>
        
      </template>
      
      <script>
      export default {
        data() {
          return {
            team: [
                { name: 'Lawrence Adi Noman', id_number:'170709410', role: 'Mobile Developer', avatar: '/olen.jpg' },
                { name: 'Nathaniel Vincent Wibowo', id_number:'170709127', role: 'Desktop Developer', avatar: '/vincent.jpg' },
                { name: 'Benedictus Gladdenata A', id_number:'170709160', role: 'Desktop Developer', avatar: '/gladd.jpg' },
                { name: 'Alfarau Al Ababil', id_number:'170709435',role: 'Backend Web Developer', avatar: '/avatar-4.png' },
                { name: 'Afiq Satrio Nurahman', id_number:'17070926',role: 'Frontend Web Designer', avatar: '/afiq.jpg' }
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