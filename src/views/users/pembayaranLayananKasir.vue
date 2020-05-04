<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
              <h1 class="subheading grey-darken--text">Pembayaran Layanan</h1>
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
                  <td>{{ item.id_layanan }}</td>
                  <td>{{ item.nama_layanan }}</td>
                  <td>{{ item.id_customer }}</td>
                  <td>{{ item.nama_customer }}</td>
                  <td>{{ item.id_Kasir }}</td>
                  <td>{{ item.nama_kasir }}</td>
                  <td>{{ item.status_transaksi }}</td>
                  <td>{{ item.status_pembayaran }}</td>
                  <td>{{ item.tgl_transaksi_layanan }}</td>
                  <td>{{ item.jml_transaksi_Layanan }}</td>
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
          text: 'ID Layanan',
          value: 'id_layanan'
        },
        {
          text: 'Nama Layanan',
          value: 'nama_layanan'
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
          text: 'Tanggal Transaksi Layanan',
          value: 'tgl_transaksi_layanan'
        },
        {
          text: 'Jumlah Transaksi Layanan',
          value: 'jml_transaksi_layanan'
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
        id_layanan: '',
        tgl_transaksi_layanan: '',
        jml_transaksi_layanan: '',
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
      var uri = this.$apiUrl4 + '/TransaksiLayanan';
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
      this.user.append('id_layanan', this.form.id_layanan);
      this.user.append('tgl_transaksi_layanan', this.form.tgl_transaksi_layanan);
      this.user.append('jml_transaksi_layanan', this.form.jml_transaksi_layanan);
      this.user.append('subtotal', this.form.subtotal);
      var uri = this.$apiUrl4 + '/detaillayanan'
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
      this.user.append('id_layanan', this.form.id_layanan);
      this.user.append('tgl_transaksi_layanan', this.form.tgl_transaksi_layanan);
      this.user.append('jml_transaksi_layanan', this.form.jml_transaksi_layanan);
      this.user.append('subtotal', this.form.subtotal);
      var uri = this.$apiUrl4 + '/detaillayanan/' + this.updatedId;
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
      this.form.id_layanan = item.id_layanan;
      this.form.tgl_transaksi_layanan = item.tgl_transaksi_layanan;
      this.form.jml_transaksi_layanan = item.jml_transaksi_layanan;
      this.form.subtotal = item.subtotal;
      this.updatedId = item.id_layanan;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl4 + '/detaillayanan/' + deleteId;
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
        id_layanan: '',
        tgl_transaksi_layanan: '',
        jml_transaksi_layanan: '',
        subtotal:''
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>