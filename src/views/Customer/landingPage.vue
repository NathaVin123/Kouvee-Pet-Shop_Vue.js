<template>
  <div>
      <!-- untuk navbar-->
      <v-app-bar app fixed clipped-left>
        <img src = "../../assets/AW419642_01.gif" style="width:110px;height:48px" class="mr-2">
        <v-toolbar-title style="font-size: 21px;" class="secondary--text ml-3">
          <span class="font-weight-light">Kouvee</span>
          <span>PetShop</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        
        <!-- untuk dropdown-->
        <v-menu
        offset-y
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            flat 
            slot="activator"
            v-on="on"
            text small color="primary"
          >
          <v-icon left small>mdi-file-document-box-outline</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in links"
            :key="item.text"
            router :to="item.route"
          >
            <v-icon small left>{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

        <!-- untuk button navbar-->     
        <v-btn
          v-for="item in signin"
          :key="item.text" 
          flat color="primary"
          router :to="item.route"
          small
        >
          <span>Log In</span>
          <v-icon dark right small>mdi-login-variant</v-icon>
        </v-btn>
      </v-app-bar> 
  
    <VContent >
      <router-view />
    </VContent>
    <div class="mt-5">
      <v-container class="my-5">
        <v-carousel
          cycle
          height="350"
          hide-delimiter-background
          show-arrows-on-hover
          interval:3000
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-sheet
              :color="colors[i]"
              height="100%"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
              <center>
                <div class="display-1">{{ slide }}</div>
              </center>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    <div class="mt-8">
      <v-container class="my-5">
            <h1 class="subheading grey--text"><p class="text-center">RAONO AFIQ RAPOPO apa itu Kouvee Pet Shop ?</p></h1>
            <br>
            Kouvee Pet Shop merupakan pet shop ternama di yogyakarta. Kami menyediakan berbagai macam produk dan layanan untuk hewan kesayangan Anda.
      </v-container>
      <!-- <v-container class="my-5">
            You can also add lyrics that are not yet on LyricLibs, and your friends can also see the lyrics you have made. LyricLibs will faithfully accompany when listening to your song. Because life needs words.
      </v-container> -->
    </div>
    <div class="mt-6">
      <v-container class="my-5">
        <v-card
        color="#385F73"
        dark
        mt-5>
          <center>
            <v-container class="my-5">
              <h1 class="subheading grey--text"><p class="text-center">Nikmati Berbagai Layanan Kouvee Pet Shop</p></h1>
              <br>
              Currently KouveePetShop is still in the development stage, to enjoy it you don't need to pay for it.
               To support us, write in the comments column what is still a weakness of the KouveePetShop website.
               We are very happy and thankful, because of all of you we can continue to accompany you in listening to music.
               <br><br>
            </v-container>
          </center>
        </v-card>
      </v-container>
    </div>
  
  <v-footer padless dark>
    <v-col
      class="text-center"
      cols="12"
    > 
    {{ new Date().getFullYear() }}  — Kouvee Pet Shop <strong>Made with ❤ by P3L G 3</strong>
    </v-col>
  </v-footer>
  
  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        dialog:false,
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
        links: [
        { icon:'mdi-home', title: 'Home', route: '/' },
        { icon:'mdi-format-align-justify', title: 'Daftar Produk', route: '/views/DaftarProduk' },
        { icon:'mdi-information', title: 'Tentang kami ', route: '/views/about' }
      ],
      signin: [
        { text: 'Home', route: '/views/signin'}
      ],
      keyword: '',
      headers: [
        {
          text: 'Name',
          value: 'title',
          sortable: false
        },
        {
          text: 'Comment',
          value: 'artist',
          sortable: false
        },
        
      ],
      users: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        name: '',
        comment: ''
      },
      user: new FormData,
      typeInput: 'new',
      errors: '',
      updateId: '',
      }
    },
    methods: {
    getData() {
      var uri = this.$apiUrl3 + '/comment'
      this.$http.get(uri).then(response => {
        this.users = response.data.message
      })
    },
    sendData() {
      this.user.append('name', this.form.name);
      this.user.append('comment', this.form.comment);
      var uri = this.$apiUrl3 + '/comment'
      this.load = true
      this.$http.post(uri, this.user).then(response => {
          this.snackbar = true;
          this.color = 'green';
          this.text = response.data.message;

          this.load = false;
          this.dialog = false
          this.getData();
          this.resetForm();
        })
        .catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
        })
    },
    setForm() {
      if (this.typeInput === 'new') {
        this.sendData()
      } else {
        //console.log("dddd")
        this.updateData()
      }
    },
    resetForm() {
      this.form = {
        name: '',
        comment: '',
      }
    }
  },
  mounted() {
    this.getData();
  }
  }
</script>