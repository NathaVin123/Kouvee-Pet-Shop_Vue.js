<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
              <h1 class="subheading grey-darken--text">Data Penjualan Produk</h1>
              </v-container>
            </v-flex>
            <v-flex xs6 class="text-right">
              <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialogTambah()">
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah penjualan produk
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
                <tr v-for="(item) in items" :key="item.kode_penjualan">
                  <td>{{ item.kode_penjualan }}</td>
                  <td>{{ item.id_produk }}</td>
                  <td>{{ item.tgl_transaksi_produk }}</td>
                  <td>{{ item.jml_transaksi_produk }}</td>
                  <td>{{ item.subtotal }}</td>
                  <td class="text-center">
                    <v-btn icon color="indigo" light @click="editHandler(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="error" light @click="deleteData(item.kode_penjualan)">
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
          <span class="headline">Tambah Penjualan Produk</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Kode Penjualan" v-model="form.kode_penjualan" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="ID Produk" v-model="form.id_produk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="form.tgl_transaksi_produk"
                      label="Pilih Tanggal Transaksi"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="form.tgl_transaksi_produk" @input="tanggal = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Jumlah Transaksi" v-model="form.jml_transaksi_produk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Subtotal" v-model="form.subtotal" required></v-text-field>
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
      date: new Date().toISOString().substr(0, 10),
      tanggal: false,
      headers: [
        {
          text: 'Kode Penjualan',
          value: 'kode_penjualan'
        },
        {
          text: 'ID Layanan',
          value: 'id_produk'
        },
        {
          text: 'Tanggal Transaksi',
          value: 'tgl_transaksi_produk'
        },
        {
          text: 'ID Ukuran Hewan',
          value: 'jml_transaksi_produk'
        },
        {
          text: 'Subtotal',
          value: 'subtotal'
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
        kode_produk: '',
        id_produk: '',
        tgl_transaksi_produk: '',
        jml_transaksi_produk: '',
        subtotal:''
      },
      user: new FormData,
      typeInput: 'new',
      errors: '',
      updateId: '',
    }
  },
  methods: {
    getData() {
      var uri = this.$apiUrl4 + '/detailproduk'
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
      this.user.append('kode_penjualan', this.form.kode_penjualan);
      this.user.append('id_produk', this.form.id_produk);
      this.user.append('tgl_transaksi_produk', this.form.tgl_transaksi_produk);
      this.user.append('jml_transaksi_produk', this.form.jml_transaksi_produk);
      this.user.append('subtotal', this.form.subtotal);
      var uri = this.$apiUrl4 + '/detailproduk'
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
      this.user.append('kode_penjualan', this.form.kode_penjualan);
      this.user.append('id_produk', this.form.id_produk);
      this.user.append('tgl_transaksi_produk', this.form.tgl_transaksi_produk);
      this.user.append('jml_transaksi_produk', this.form.jml_transaksi_produk);
      this.user.append('subtotal', this.form.subtotal);
      var uri = this.$apiUrl4 + '/detailproduk'
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
      this.form.kode_penjualan = item.kode_penjualan;
      this.form.id_produk = item.id_produk;
      this.form.tgl_transaksi_produk = item.tgl_transaksi_produk;
      this.form.jml_transaksi_produk = item.jml_transaksi_produk;
      this.form.subtotal = item.subtotal;
      this.updatedId = item.id_produk;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl4 + '/detailproduk/' + deleteId;
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
        kode_produk: '',
        id_produk: '',
        tgl_transaksi_produk: '',
        jml_transaksi_produk: '',
        subtotal:''
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>