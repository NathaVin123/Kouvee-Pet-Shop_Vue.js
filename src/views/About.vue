<template>
  <!--Untuk detail kelompok-->
  <div id="app mt-12">
    <br />
    <br />
    <br />
    <center class="mt-12">
      <h1>Developer Kouvee Pet Shop</h1>
    </center>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flat class="text-center">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div>{{ person.role }}</div>
              <div>{{ person.id_number }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <center>
      <h1>Tentang Kami</h1>
    </center>

    <v-container class="my-5">
      <h2>
        <p class="text-center">Siapa Kami?</p>
      </h2>
      <p class="text-center">
        Kami adalah mahasiswa prodi Informatika Universitas Atma Jaya Yogyakarta
        yang sedang membuat proyek untuk mata kuliah 
        <br/>
        Projek Pengembangan
        Perangkat Lunak
      </p>
      <br />
    </v-container>

    <v-container class="my-5">
      <h2 class="text-center">Kampus Kami</h2>
      <br />
      <p class="text-center">
        Jalan Babarsari No 43, Caturtunggal, Depok, Yogyakarta
      </p>
      <br />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1397.630617600131!2d110.41532473896422!3d-7.7796082313804185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59f1fb2f2b45%3A0x20986e2fe9c79cdd!2sUniversitas%20Atma%20Jaya%20Yogyakarta%20-%20Kampus%203%20Gedung%20Bonaventura%20Babarsari!5e0!3m2!1sid!2sid!4v1590827631830!5m2!1sid!2sid"
        width="1160"
        height="450"
        frameborder="0"
        style="border: 0;"
        margin="auto"
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      ></iframe>
    </v-container>
    <v-footer padless dark>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — Kouvee Pet Shop
        <strong>Made with ❤ by P3L G 3</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {
          name: "Lawrence Adi Noman",
          id_number: "170709410",
          role: "Mobile Developer",
          avatar: "/olen.jpg",
        },
        {
          name: "Nathaniel Vincent Wibowo",
          id_number: "170709127",
          role: "Desktop Developer",
          avatar: "/vincent.jpg",
        },
        {
          name: "Benedictus Gladdenata A",
          id_number: "170709160",
          role: "Desktop Developer",
          avatar: "/gladd.jpg",
        },
        {
          name: "Alfarau Al Ababil",
          id_number: "170709435",
          role: "Backend Web Developer",
          avatar: "/avatar-4.png",
        },
        {
          name: "Afiq Satrio Nurahman",
          id_number: "17070926",
          role: "Frontend Web Designer",
          avatar: "/afiq.jpg",
        },
      ],
      center: { lat: -7.7793301, lng: 110.4159397 },
      Zoom: "100000",
      mapTypeId: "roadmap",
      markers: [{ position: { lat: -7.7793301, lng: 110.4159397 } }],
    };
  },
};
</script>
<style lang="scss" scoped>
.vue-map-container {
  height: 450px;
  max-width: 992px;
  width: 100%;
}
</style>
