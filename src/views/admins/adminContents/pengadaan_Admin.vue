<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
              <h1 class="subheading grey-darken--text">Pengadaan Produk</h1>
              </v-container>
            </v-flex>
            <v-flex xs6 class="text-right">
              <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialog = true">
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Pengadaan
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
                <tr v-for="(item) in items" :key="item.no_order">
                  <td>{{ item.no_order }}</td>
                  <td>{{ item.tgl_pesan }}</td>
                  <td>{{ item.tgl_Cetak }}</td>
                  <td>{{ item.nama_stock }}</td>
                  <td>{{ item.satuan_stock }}</td>
                   <td>{{ item.id_supplier }}</td>
                  <td>{{ item.status_pengadaan }}</td>
                  <td>{{ item.total_harga }}</td>
                  <td class="text-center">
                    <v-btn icon color="indigo" light @click="editHandler(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="error" light @click="deleteData(item.no_order)">
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
          <span class="headline">Tambah Pengadaan</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="No Order" v-model="form.no_order" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Tanggal Pesan" v-model="form.tgl_pesan" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Tanggal Cetak" v-model="form.tgl_Cetak" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nama Stok" v-model="form.nama_stock" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Satuan Stok" v-model="form.satuan_stock" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="ID Supplier" v-model="form.id_supplier" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Status" v-model="form.status_pengadaan" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Total Harga" v-model="form.total_harga" required></v-text-field>
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
          text: 'No Order',
          value: 'no_order'
        },
        {
          text: 'Tanggal Pesan',
          value: 'tgl_pesan'
        },
        {
          text: 'Tanggal Cetak',
          value: 'tgl_Cetak'
        },
        {
          text: 'Nama Stok',
          value: 'nama_stock'
        },
        {
          text: 'Satuan Stok',
          value: 'satuan_stock'
        },
        {
          text: 'ID Supplier',
          value: 'id_supplier'
        },
        {
          text: 'Status',
          value: 'status_pengadaan'
        },
        {
          text: 'Total Harga',
          value: 'total_harga'
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
        no_order: '',
        tgl_pesan: '',
        tgl_Cetak: '',
        nama_stock: '',
        satuan_stock: '',
        id_supplier: '',
        status_pengadaan: '',
        total_harga: ''
      },
      user: new FormData,
      typeInput: 'new',
      errors: '',
      updateId: '',
    }
  },
  methods: {
    getData() {
      var uri = this.$apiUrl4 + '/pengadaan'
      this.$http.get(uri).then(response => {
        this.users = response.data.message
      })
    },
    sendData() {
      this.user.append('no_order', this.form.no_order);
      this.user.append('tgl_pesan', this.form.tgl_pesan);
      this.user.append('tgl_Cetak', this.form.tgl_Cetak);
      this.user.append('nama_stock', this.form.nama_stock);
      this.user.append('satuan_stock', this.form.satuan_stock);
      this.user.append('id_supplier', this.form.id_supplier);
      this.user.append('status_pengadaan', this.form.status_pengadaan);
      this.user.append('total_harga', this.form.total_harga);
      var uri = this.$apiUrl4 + '/pengadaan'
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
      this.user.append('no_order', this.form.no_order);
      this.user.append('tgl_pesan', this.form.tgl_pesan);
      this.user.append('tgl_Cetak', this.form.tgl_Cetak);
      this.user.append('nama_stock', this.form.nama_stock);
      this.user.append('satuan_stock', this.form.satuan_stock);
      this.user.append('id_supplier', this.form.id_supplier);
      this.user.append('status_pengadaan', this.form.status_pengadaan);
      this.user.append('total_harga', this.form.total_harga);
      var uri = this.$apiUrl4 + '/pengadaan/' + this.updatedId;
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
      this.dialog = true;
      this.form.no_order = item.no_order;
      this.form.tgl_pesan = item.tgl_pesan;
      this.form.tgl_Cetak = item.tgl_Cetak;
      this.form.nama_stock = item.nama_stock;
      this.form.satuan_stock = item.satuan_stock;
      this.form.id_supplier = item.id_supplier;
      this.form.status_pengadaan = item.status_pengadaan;
      this.form.total_harga = item.total_harga;
      this.updatedId = item.no_order;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl4 + '/pengadaan/' + deleteId;
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
        no_order: '',
        tgl_pesan: '',
        tgl_Cetak: '',
        nama_stock: '',
        satuan_stock: '',
        id_supplier: '',
        status_pengadaan: '',
        total_harga: ''
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>