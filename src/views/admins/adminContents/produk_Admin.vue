<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
              <h1 class="subheading grey-darken--text">Data Produk</h1>
              </v-container>
            </v-flex>
            <v-flex xs6 class="text-right">
              <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialogTambah()">
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Produk
              </v-btn>
            </v-flex>
          </v-layout>

          <v-text-field
          class="mx-0"
          flat
          hide-details
          label="Search"
          v-model="keyword"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
        ></v-text-field>
        
        <br>
          
          <v-data-table
            :headers="headers"
            :items="users"
            :search="keyword"
            :loading="load">
            <template v-slot:body="{ items }" >
              <tbody>
                <tr v-for="(item) in items" :key="item.id_produk">
                  
                  <td>{{ item.id_produk }}</td>
                  <td>{{ item.nama_produk }}</td>
                  <td>{{ item.harga_produk }}</td>
                  <td>{{ item.stok_produk }}</td>
                  <td>{{ item.min_stok_produk }}</td>
                  <td>{{ item.satuan_produk }}</td>
                  <td> <v-img :src="$apiUrl4 + '/produk/' + item.gambar" contain class="grey lighten-2" width="75" height="75"/></td>
                  <td>{{ item.updateLog_by }}</td>
                  <td class="text-center">
                    <v-btn icon color="indigo" light @click="editHandler(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="error" light @click="deleteData(item.id_produk)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-container>
      </v-container>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Produk</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ID Produk" v-model="form.id_produk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nama Produk" v-model="form.nama_produk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Harga Produk" v-model="form.harga_produk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Stok Produk" v-model="form.stok_produk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Min Stok Produk" v-model="form.min_stok_produk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Satuan Produk" v-model="form.satuan_produk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input label="Pilih Gambar" accept="image/*">
                </v-file-input>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Update Log By (NIP)" v-model="form.updateLog_by" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
      {{ text }}
      <v-btn dark text @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
  </v-container>
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
        {
          text: 'Action',
          value: null,
          sortable : false
        },
      ],
      users: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        id_produk: '',
        nama_produk: '',
        harga_produk: '',
        stok_produk: '',
        min_stok_produk: '',
        satuan_produk: '',
        gambar: '',
        updateLog_by: ''
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
    dialogTambah(){
      this.resetForm();
      this.dialog = true;
      this.tambah = true;
    },
    sendData() {
      this.user.append('id_produk', this.form.id_produk);
      this.user.append('nama_produk', this.form.nama_produk);
      this.user.append('harga_produk', this.form.harga_produk);
      this.user.append('stok_produk', this.form.stok_produk);
      this.user.append('min_stok_produk', this.form.min_stok_produk);
      this.user.append('satuan_produk', this.form.satuan_produk);
      this.user.append('gambar', this.form.gambar);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/produk'
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
    updateData() {
      this.user.append('id_produk', this.form.id_produk);
      this.user.append('nama_produk', this.form.nama_produk);
      this.user.append('harga_produk', this.form.harga_produk);
      this.user.append('stok_produk', this.form.stok_produk);
      this.user.append('min_stok_produk', this.form.min_stok_produk);
      this.user.append('satuan_produk', this.form.satuan_produk);
      this.user.append('gambar', this.form.gambar);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/produk/' + this.updatedId;
      this.load = true
      this.$http
        .post(uri, this.user)
        .then(response => {
          this.snackbar = true;
          this.color = 'green';
          this.text = response.data.message;
          this.load = false;
          this.dialog = false
          this.getData();
          this.resetForm();
          this.typeInput = 'new';
        })
        .catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
          this.typeInput = 'new';
        })
    },
    editHandler(item) {
      this.typeInput = 'edit';
      this.tambah = false;
      this.dialog = true;
      this.form.id_produk = item.id_produk;
      this.form.nama_produk = item.nama_produk;
      this.form.harga_produk = item.harga_produk;
      this.form.stok_produk = item.stok_produk;
      this.form.min_stok_produk = item.min_stok_produk;
      this.form.satuan_produk = item.satuan_produk;
      this.form.gambar = item.gambar;
      this.form.updateLog_by = item.updateLog_by;
      this.updatedId = item.id_produk;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl4 + '/produk/' + deleteId;
      this.$http.delete(uri).then(response =>{
          this.snackbar = true;
          this.text = response.data.message;
          this.color = 'green'
          this.deleteDialog = false;
          this.getData();
        }).catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
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
        id_produk: '',
        nama_produk: '',
        harga_produk: '',
        stok_produk: '',
        min_stok_produk: '',
        satuan_produk: '',
        gambar: '',
        updateLog_by: ''
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>