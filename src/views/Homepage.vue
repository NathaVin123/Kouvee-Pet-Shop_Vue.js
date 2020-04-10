<template>
  <div>
        <nav>
      <!-- untuk navbar-->
      <v-toolbar flat app>
        <img src = "../assets/AW419642_01.gif" style="width:110px;height:48px" class="mr-2">
        <v-toolbar-title class="text-uppercase grey--text" light>
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
          <span>Sign In</span>
          <v-icon dark right small>mdi-login-variant</v-icon>
        </v-btn>
      </v-toolbar> 
    </nav>
    <VContent >
      <router-view />
    </VContent>
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
        { icon:'mdi-format-align-justify', title: 'Lyric List', route: '/views/dashboard' },
        { icon:'mdi-information', title: 'About Us', route: '/views/about' }
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