<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
              <h1 class="subheading grey-darken--text">Pembayaran Produk</h1>
              </v-container>
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
                  <td>{{ item.tgl_transaksi_penjualan }}</td>
                  <td>{{ item.id_produk }}</td>
                  <td>{{ item.nama_produk }}</td>
                  <td>{{ item.id_customer }}</td>
                  <td>{{ item.nama_customer }}</td>
                  <td>{{ item.id_Kasir }}</td>
                  <td>{{ item.nama_kasir }}</td>
                  <td>{{ item.status_transaksi }}</td>
                  <td>{{ item.status_pembayaran }}</td>
                  <td>{{ item.tgl_transaksi_produk }}</td>
                  <td>{{ item.jml_transaksi_produk }}</td>
                  <td>{{ item.subtotal }}</td>
                  <td>{{ item.total }}</td>
                  <td class="text-center">
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-container>
      </v-container>
    </v-card>
    
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
          text: 'Tanggal Transaksi Penjualan',
          value: 'tgl_transaksi_penjualan'
        },
        {
          text: 'ID Produk',
          value: 'id_produk'
        },
        {
          text: 'Nama Produk',
          value: 'nama_produk'
        },
        {
          text: 'ID Customer',
          value: 'id_customer'
        },
        {
          text: 'Nama Customer',
          value: 'nama_customer'
        },
        {
          text: 'ID Kasir',
          value: 'id_Kasir'
        },
        {
          text: 'Nama Kasir',
          value: 'nama_kasir'
        },
        {
          text: 'Status Transaksi',
          value: 'status_transaksi'
        },
        {
          text: 'Status Pembayaran',
          value: 'status_pembayaran'
        },
        {
          text: 'Tanggal Transaksi Produk',
          value: 'tgl_transaksi_produk'
        },
        {
          text: 'Jumlah Transaksi Produk',
          value: 'jml_transaksi_produk'
        },
        {
          text: 'Subtotal',
          value: 'subtotal'
        },
        {
          text: 'Total',
          value: 'total'
        },
      ],
      users: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        kode_layanan: '',
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
      var uri = this.$apiUrl4 + '/TransaksiProduk';
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
      var uri = this.$apiUrl4 + '/detailproduk/' + this.updatedId;
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
        kode_layanan: '',
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