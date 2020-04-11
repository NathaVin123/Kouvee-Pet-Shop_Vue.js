<template v-slot:body="{ items }">
  <div class="dashboard">
    <v-container class="my-5">
    <h1 class="subheading grey--text">Daftar Produk</h1>
    </v-container>
    <v-container class="my-5">
      <v-layout row justify-start class="mb-3">
        <v-flex xs6>
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" v-on="on">
                <v-icon size="18" class="mr-1">mdi-pencil-plus</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline">Kamu harus masuk / daftar dahulu</v-card-title>
                <v-card-text>
                  Kalau belum punya akun bisa 
                    <v-btn
                    v-for="item in signup"
                    :key="item.text" 
                    text small color="primary"
                    class="mr-4"
                    router :to="item.route"
                  >
                    Daftar Dahulu
                  </v-btn>                  
                  <br>Kalau udah punya bisa langsung 
                    
                    <v-btn
                    v-for="item in signin"
                    :key="item.text" 
                    text small color="success"
                    class="mr-4"
                    router :to="item.route"
                  >
                    Masuk Disini
                  </v-btn>                   
                  <br>jika kamu sudah punya akun</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialog = false">Tutup</v-btn>
                  </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        <v-flex xs6 class="text-right">
          <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
          </v-text-field>
        </v-flex>
      </v-layout>
            
      <v-data-table
        :headers="headers"
        :items="users"
        :search="keyword"
        :loading="load">
        <tbody>
          <tr v-for="(item) in items" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.artist }}</td>
            <td>{{ item.genre }}</td>
            <td class="text-center">
              <v-btn icon color="indigo" light @click="editHandler(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error" light @click="deleteData(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-data-table>
                
    </v-container>         
  </div>
</template>
      
<script>
export default {
  data() {
    return {
      dialog: false,
      keyword: '',
      headers: [
        {
          text: 'ID Produk',
          value: 'id_produk'
        },
        {
          text: 'Nama Produk',
          value: 'nama_produk'
        },
        {
          text: 'Harga Produk',
          value: 'harga_produk'
        },
        {
          text: 'Stok Produk',
          value: 'stok_produk'
        },
        {
          text: 'Min Stok Produk',
          value: 'min_stok_produk'
        },
        {
          text: 'Satuan Produk',
          value: 'satuan_produk'
        },
        {
          text: 'Gambar',
          value: 'gambar'
        },
        {
          text: 'Update Log By (NIP)',
          value: 'updateLog_by'
        },
      ],
      signin: [
        { text: 'Home', route: '/views/signin'}
      ],
      signup: [
        { text: 'Home', route: '/views/signup'}
      ],            
      users: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        title: '',
        artist: '',
        genre: '',
        lyric:''
      },
      user: new FormData,
      typeInput: 'new',
      errors: '',
      updateId: '',
    }
  },
  methods: {
    getData() {
      var uri = this.$apiUrl4 + '/produk'
      this.$http.get(uri).then(response => {
        this.users = response.data.message
      })
    },
    sendData() {
      this.user.append('title', this.form.title);
      this.user.append('artist', this.form.artist);
      this.user.append('genre', this.form.genre);
      this.user.append('lyric', this.form.lyric);
      var uri = this.$apiUrl2 + '/lyric'
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
        this.updateData()
      }
    },
    resetForm() {
      this.form = {
        title: '',
        artist: '',
        genre: '',
        lyric: ''
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>