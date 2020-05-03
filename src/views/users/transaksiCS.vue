<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
              <h1 class="subheading grey-darken--text">Penjualan Produk</h1>
              </v-container>
            </v-flex>
            <v-flex xs6 class="text-right">
              <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialogTambah()">
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Penjualan Produk
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
  
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="#2ecc71">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Penjualan Produk</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
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
                <v-text-field label="Jumlah Transaksi Produk" v-model="form.jml_transaksi_produk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Subtotal" v-model="form.subtotal" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required fields</small>
        </v-card-text>
        
        
      </v-card>
      <v-card>
        
        <v-list three-line subheader>
          <v-subheader>
            <h2>Pembelian Produk</h2> </v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-card>
                <v-row>
                  
                  
                  
                </v-row>
                <v-row>
                
                <v-col cols="4">
                   <v-text-field
                     v-model="form.total"
                      label="Total Pembelian"
                      readonly=""
                      shaped=""
                      color="purple"
                     prefix="Rp."
                    ></v-text-field>
                </v-col>
                </v-row>
              </v-card>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <h3>Data Produk</h3></v-list-item-title>
              <v-card>
                <div
                  class="form-row"
                  v-for="(detilTransaksi, index) in detilTransaksis"
                  :key="index"
                >
                  <v-row>
                    <v-col cols="3">
                      <v-autocomplete
                        v-model="detilTransaksi.id_produk"
                        required
                        width=""
                        :items="produks"
                        @change="filteredProduk(index),setSubtotal(index)"
                        item-value="id_produk"
                        item-text="nama"
                        label="Nama Produk*"
                        outlined
                         color="purple"
                          :filter="customFilter"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Jumlah*"
                        v-model="detilTransaksi.jumlah"
                        color="purple"
                        type="number"
                        outlined=""
                        single-line=""
                        clearable=""
                        @change="setSubtotal(index)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Harga Produk*"
                        v-model="detilTransaksi.harga"
                        value=""                        
                        outlined=""
                        readonly=""
                         color="purple"
                         prefix="Rp."
                         
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Subtotal*"
                        v-model="detilTransaksi.subtotal"
                        value=""                        
                        outlined=""
                        readonly=""
                         color="purple"
                         prefix="Rp."
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1">
                      <v-btn
                        outlined=""
                        color="red lighten-2"
                        x-large=""
                        @click="deleteRow(detilTransaksi)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12">
                      <v-divider light=""></v-divider>
                    </v-col>
                  </v-row>
                </div>

                <v-row>
                  <v-col class="text-right">
                    <v-btn
                      outlined=""
                      color="green"
                      x-large=""
                      fab=""
                      @click="addTransaksi"
                      class="tombol"
                    >
                      <v-icon>
                        mdi-plus
                      </v-icon>
                    </v-btn>

                    <v-btn
                      outlined=""
                      color="green"
                      x-large=""
                      fab=""
                      @click="submit"
                      class="tombol"
                    >
                      <v-icon>
                        mdi-content-save
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
              <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
        </v-card-actions>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
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
      cari:'',
      tabs: 0,
      dialog: false,
      detilTransaksis: [
        {
          nama: "",
          jumlah: "",
          subtotal: "",
          harga:""
        },
      ],
      selectedIndex:0,
      transaksiProduks: [],
      date: new Date().toISOString().substr(0, 10),
      tanggal: false,
      keyword: '',
      headers: [
        {
          text: 'Kode Penjualan',
          value: 'kode_penjualan'
        },
        {
          text: 'ID Produk',
          value: 'id_produk'
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
          text: 'Action',
          value: null,
          sortable : false
        },
      ],
      dialogWarning: "",
      dialogEdit: "",
      dialogPassword: "",
      pesan: "",
      search: "",
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        total:'',
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama"),
      },
      pegawai: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: "",
      users: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        kode_penjualan: '',
        id_produk: '',
        tgl_transaksi_produk: '',
        jml_transaksi_produk: '',
        subtotal: '',
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
    deleteRow(_detilTransaksi){
      this.detilTransaksis.splice(this.detilTransaksis.indexOf(_detilTransaksi),1)
    },

    addTransaksi() {
      this.detilTransaksis.push({
        nama: "",
        jumlah: "",
        subtotal:"",
        harga:""
      });
    },
    
    
    filteredProduk(index){
    var uri = this.$apiUrl + "Produk/" + "search/"+this.detilTransaksis[index].id_produk;
    this.$http.get(uri).then((response )=>{
      this.detilTransaksis[index].harga = response.data.message.harga
      this.detilTransaksis[index].subtotal = this.detilTransaksis[index].harga * this.detilTransaksis[index].jumlah
    })
    },
  
   setSubtotal(index){
        this.detilTransaksis[index].subtotal = this.detilTransaksis[index].harga * this.detilTransaksis[index].jumlah
      },

    getData() {
      var uri = this.$apiUrl4 + '/detailproduk'
      this.$http.get(uri).then(response => {
        this.users = response.data.message
      })
    },
    getProduk() {
      var uri = this.$apiUrl4 + '/produk';
      this.$http.get(uri).then((response) => {
        this.produks = response.data.message;
      
      });
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
        kode_penjualan: '',
        id_produk: '',
        tgl_transaksi_produk: '',
        jml_transaksi_produk: '',
        subtotal: '',
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama"),
      }
    },
    customFilter(item, queryText) {
      const textOne = item.nama.toLowerCase();
      const textTwo = item.nama.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
  },
  
  mounted() {
    this.getData();
    this.getProduk();
  },
};
</script>
<style scoped>
.tombol {
  margin: 2px;
}
.tab {
  margin: 10px;
}
.btn-clicked {
  color: #ffffff;
}
.btn-unclicked {
  color: #000000;
}
</style>