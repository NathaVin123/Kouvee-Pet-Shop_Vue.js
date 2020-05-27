<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <template>
          <h1 class="subheading grey-darken--text">Data Produk</h1>
          <v-layout row wrap style="margin:10px">
            <v-toolbar flat color="white">
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="green accent-3"
                    depressed
                    rounded
                    dark
                    class="mb-2"
                    v-on="on"
                  >
                    <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon
                    >Tambah Produk</v-btn
                  >
                </template>

                <v-card>
                  <v-card-title>
                    <v-spacer />
                    <span class="headline">Tambah Produk</span>
                    <v-spacer />
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form ref="form">
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              label="Nama*"
                              v-model="form.nama_produk"
                              required
                              outlined=""
                              value="nama_produk"
                              :rules="rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Stok Minimal*"
                              v-model="form.min_stok_produk"
                              required
                              outlined=""
                              value="min_stok_produk"
                              :rules="rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Jumlah Stok*"
                              v-model="form.stok_produk"
                              required
                              outlined=""
                              value="stok_produk"
                              :rules="rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Harga*"
                              v-model="form.harga_produk"
                              required
                              value="harga_produk"
                              outlined=""
                              prefix="Rp. "
                              :rules="rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-select
                              label="Satuan*"
                              v-model="form.satuan_produk"
                              value="satuan_produk"
                              :items="items"
                              required
                              outlined=""
                              :rules="rules"
                            >
                            </v-select>
                          </v-col>
                          <v-col cols="12">
                            <template>
                              <v-file-input
                                accept="image/*"
                                label="File input"
                                show-size
                                v-model="form.gambar"
                              ></v-file-input>
                            </template>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                    <small>*wajib diisi</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="resetForm(), reset(), (dialog = false)"
                      >Tutup</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="cekKosong()"
                      >Simpan</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-flex xs6 class="text-right">
                
              </v-flex>
            </v-toolbar>
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
        </template>
        <v-layout class="mx-4">
          <v-flex>
            <template>
              <v-row>
                <v-col v-for="(item, i) in filteredProduk" :key="i" cols="3">
                  <v-card class="mx-auto" max-width="344">
                    <v-img
                      :src="$apiUrl5 + 'produk/' + item.gambar"
                      contain
                      class="white"
                      height="200"
                    />

                    <v-card-title>
                      {{ item.nama_produk }}
                    </v-card-title>

                    <v-card-subtitle>
                      ID Produk: {{ item.id_produk }}
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-btn text @click="editHandler(item)">Ubah Produk</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="red lighten-2"
                        text
                        v-on="on"
                        @click="deleteRow(item)"
                      >
                        Hapus
                      </v-btn>

                      <!-- ------------------Dialog untuk konfirmasi delete-------------------------------------- -->
                      <div class="text-center">
                        <v-dialog width="500" v-model="deleteDialog">
                          <v-card>
                            <v-card-title
                              class="headline Red lighten-2"
                              primary-title
                              >Konfirmasi Hapus</v-card-title
                            >
                            <v-card-text
                              >Data yang akan dihapus, Lanjutkan ?</v-card-text
                            >
                            <v-divider></v-divider>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="primary"
                                text
                                @click="deleteDialog = false"
                                >Batal</v-btn
                              >
                              <v-btn
                                color="primary"
                                text
                                @click="deleteData(deleteId)"
                                >Hapus</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                      <v-spacer></v-spacer>

                      <!-- <v-btn icon @click="show = !show"> -->
                      <v-btn icon @click="updateMunculke(item)">
                        <v-icon>{{
                          item.id_produk == munculke
                            ? 'mdi-chevron-up'
                            : 'mdi-chevron-down'
                        }}</v-icon>
                      </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                      <!-- <div v-show="show"> -->
                      <div v-if="item.id_produk == munculke">
                        <v-divider></v-divider>

                        <v-card-text>
                          <v-card-subtitle>
                            Jumlah Stok :{{ item.stok_produk }}<br />
                            Stok Minimal : {{ item.min_stok_produk }}<br />
                            Harga : {{ item.harga_produk }}<br />
                            Satuan : {{ item.satuan_produk }}<br />
                            Tanggal Dibuat : {{ item.createLog_at }}<br />
                            Diubah Oleh : {{ item.updateLog_by }}<br />
                          </v-card-subtitle>
                        </v-card-text>
                      </div>
                    </v-expand-transition>
                  </v-card>

                  <v-snackbar
                    v-model="snackbar"
                    :color="color"
                    :multi-line="true"
                    :timeout="3000"
                  >
                    {{ text }}
                    <v-btn dark text @click="snackbar = false"> Tutup </v-btn>
                  </v-snackbar>
                </v-col>
              </v-row>
            </template>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <!-- ------------------Dialog untuk warning kosong-------------------------------------- -->
    <div class="text-center">
      <v-dialog width="500" v-model="dialogWarning">
        <v-card>
          <v-card-title class="headline Red lighten-2" primary-title
            >Data Harus Diisi Semua !</v-card-title
          >

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogWarning = false"
              >Kembali</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
  export default {
    props: {
      value: {
        type: File,
      },
    },
    data() {
      return {
        rules: [(value) => !!value || 'Wajib diisi.'],
        munculke: 0,
        dialogWarning: '',
        show: false,
        notShow: [],
        dialog: false,
        items: ['Buah', 'Karung', 'Lusin', 'Kaleng', 'Sachet', 'Kardus'],
        keyword: '',
        on: '',
        deleteDialog: '',
        produks: [],
        pesan: '',

        snackbar: false,
        color: null,
        text: '',
        load: false,
        form: {
          nama_produk: '',
          satuan_produk: '',
          stok_produk: '',
          harga_produk: '',
          min_stok_produk: '',
          gambar: '',
          
          updateLog_by: sessionStorage.getItem('Nama'),
        },
        produk: new FormData(),
        typeInput: 'new',
        errors: '',
        updatedId: '',
      };
    },
    computed: {
      filteredProduk: function() {
        return this.produks.filter((item) => {
          return item.nama_produk.toLowerCase().match(this.keyword.toLowerCase());
        });
      },
    },

    methods: {
      cekKosong() {
        if (
          this.form.nama_produk === '' ||
          this.form.satuan_produk === '' ||
          this.form.stok_produk === '' ||
          this.form.min_stok_produk === '' ||
          this.form.satuan_produk === '' ||
          this.form.harga_produk === ''
        ) {
          this.dialogWarning = true;
        } else {
          this.setForm();
          this.resetForm();
          this.reset();
          this.dialog = false;
        }
      },
      reset() {
        this.$refs.form.resetValidation();
        this.show = false;
      },
      getData() {
        var uri = this.$apiUrl4 + 'Produk/' + 'getAll';
        this.$http.get(uri).then((response) => {
          this.produks = response.data.message;
        });
      },
      updateMunculke(item) {
        if (this.munculke == 0) this.munculke = item.id_produk;
        else if (this.munculke == item.id_produk) this.munculke = 0;
        else this.munculke = item.id_produk;
        // console.log(this.produks[i])
      },
      sendData() {
        this.produk.append('nama_produk', this.form.nama_produk);
        this.produk.append('satuan_produk', this.form.satuan_produk);
        this.produk.append('stok_produk', this.form.stok_produk);
        this.produk.append('harga_produk', this.form.harga_produk);
        this.produk.append('min_stok_produk', this.form.min_stok_produk);
        this.produk.append('gambar', this.form.gambar);
        this.produk.append('updateLog_by', this.form.updateLog_by);

        var uri = this.$apiUrl4 + 'Produk';
        this.load = true;
        this.$http
          .post(uri, this.produk)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan kesnackbar
            this.load = false;
            this.dialog = false;
            this.getData(); //mengambil [pegawai]
            this.resetForm();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      updateData() {
        this.produk.append('nama_produk', this.form.nama_produk);
        this.produk.append('satuan_produk', this.form.satuan_produk);
        this.produk.append('stok_produk', this.form.stok_produk);
        this.produk.append('harga_produk', this.form.harga_produk);
        this.produk.append('min_stok_produk', this.form.min_stok_produk);
        this.produk.append('gambar', this.form.gambar);
        this.produk.append('updateLog_by', this.form.updateLog_by);
        var uri = this.$apiUrl4 + 'Produk/' + 'update/' + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.produk)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan kesnackbar
            this.load = false;
            this.dialog = false;
            this.getData(); //mengambil databong
            this.resetForm();
            this.typeInput = 'new';
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
            this.typeInput = 'new';
          });
      },
      editHandler(item) {
        this.typeInput = 'edit';
        this.dialog = true;
        this.form.nama_produk = item.nama_produk;
        this.form.satuan_produk = item.satuan_produk;
        this.form.stok_produk = item.stok_produk;
        this.form.harga_produk = item.harga_produk;
        this.form.min_stok_produk = item.min_stok_produk;
        this.form.gambar = item.gambar;
        this.updatedId = item.id_produk;
      },
      deleteRow(item) {
        this.deleteId = item.id_produk;
        this.deleteDialog = true;
      },
      deleteData(deleteId) {
        //mengahapus data
        
        var uri = this.$apiUrl4 + 'Produk' + '/delete/' + deleteId; //data dihapus berdasarkan id
        this.load = true;
        this.$http
          .post(uri, this.produk)
          .then((response) => {
            this.snackbar = true;
            this.text = response.data.message;
            this.color = 'green';
            this.deleteDialog = false;
            this.getData();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
          });
      },
      setForm() {
        if (this.typeInput === 'new') {
          this.sendData();
        } else {
          console.log('data berhasil diubah');
          this.updateData();
        }
      },
      resetForm() {
        this.form = {
          nama_produk: '',
          satuan_produk: '',
          stok_produk: '',
          harga_produk: '',
          min_stok_produk: '',
          gambar: '',
          updateLog_by: sessionStorage.getItem('Nama'),
        };
      },
    },
    mounted() {
      this.getData();
    },
  };
</script>
<style scoped>
  /* .v-toolbar__content,
  .v-toolbar__extension {
    color: white;
  } */
</style>
