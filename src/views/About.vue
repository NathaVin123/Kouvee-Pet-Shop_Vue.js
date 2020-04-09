<template>
    <!--Untuk detail kelompok-->    
    <div id="app">
      <br><br>
          <center>
            <h1 class="subheading grey--text">DEVELOPER TEAM</h1>
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
            <h1 class="subheading grey--text">ABOUT US</h1>
          </center>
          
              <v-container class="my-5">
                    <h2 class="subheading grey--text"><p class="text-left">What is Lyric Libs ?</p></h2>
                    <br>
                    LyricLibs makes it easy for you to find the right lyric for every song you hear on your cellphone, your computer, your tablet, and others.
                    There are millions of lyric that you are ready to access anytime and anywhere. So even if you are driving, exercising, partying, or relaxing, LyricLibs will always accompany you when listening to music.
                    <br><br>
                    You can also add lyrics that are not yet on LyricLibs, and your friends can also see the lyrics you have made. LyricLibs will faithfully accompany when listening to your song. Because life needs words.
              </v-container>
          
          
          <v-container class="my-5">
            <h2 class="subheading grey--text">Our Lovely Office</h2>
            <br>
              <p class="text-left" mb-3>Babarsari Street Number 43, Janti, Caturtunggal, Depok, Sleman Regency, Special Region of Yogyakarta 55281
                <small color="error"><br>*this is not our actual office, cause we all are students</small></p>
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
            {{ new Date().getFullYear() }} — <strong>Made by Love ❤</strong>
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