/* eslint-disable vue/no-unused-vars */
<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <h1 class="subheading grey-darken--text">Data Layanan</h1>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <v-btn
              depressed
              dark
              rounded
              style="text-transform: none !important;"
              color="green accent-3"
              @click="createMultiform()"
            >
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
              Tambah Layanan
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
        <v-data-table :headers="headers" :items="layanans" :search="keyword">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_layanan">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_layanan }}</td>
                <td
                  class="underlinetext"
                  @click="showDetail(item)"
                  style="cursor:pointer"
                >
                  {{ item.nama_layanan }}
                </td>
                <td>{{ item.createLog_at }}</td>
                <td>{{ item.updateLog_at }}</td>
                <td>{{ item.updateLog_by }}</td>
                <!-- <td>{{ item.delete_by }}</td>
                <td>{{ item.deleteLog_at }}</td> -->
                <td>
                  <div>
                    <v-btn
                      icon
                      color="blue"
                      light
                      @click="editHandlerLayanan(item)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <v-btn
                      icon
                      color="red lighten-2"
                      dark
                      v-on="on"
                      @click="deleteRow(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
    <!------------------------ Detail Layanan Dialog ------------------------>
    <template>
      <v-dialog v-model="dialogDetailLayanan" persistent max-width="1300px">
        <v-card>
          <v-card-title>
            <v-spacer />
            <span class="headline">{{ detailItem.nama_layanan }}</span>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-simple-table height="50%">
                <thead>
                  <tr>
                    <th class="text-left">Id Harga Layanan</th>
                    <th class="text-left">Ukuran Hewan</th>
                    <th class="text-left">Harga</th>
                    <th class="text-left">Tanggal Dibuat</th>
                    <th class="text-left">Tanggal Diubah</th>
                    <th class="text-left">Diubah Oleh</th>
                    <th class="text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in filteredItems(detailItem)"
                    :key="item.id_layananHarga"
                  >
                    <td>{{ item.id_layananHarga }}</td>
                    <td
                      v-if="
                        searchUkuranHewan(item.id_ukuranHewan) != undefined
                      "
                    >
                      {{ searchUkuranHewan(item.id_ukuranHewan).nama_ukuranHewan }}
                    </td>
                    <td>{{ item.harga }}</td>
                    <td>{{ item.createLog_at }}</td>
                    <td>{{ item.updateLog_at }}</td>
                    <td>{{ item.updateLog_by }}</td>
                    <td>
                      <div>
                        <v-btn
                          icon
                          color="blue"
                          light
                          class="tombol"
                          outlined=""
                          @click="editHandlerHargaLayanan(item)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogDetailLayanan = false"
              >Tutup</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- ------------------Dialog untuk konfirmasi delete-------------------------------------- -->
    <div class="text-center">
      <v-dialog width="500" v-model="deleteDialog">
        <v-card>
          <v-card-title class="headline Red lighten-2" primary-title
            >Konfirmasi Hapus</v-card-title
          >
          <v-card-text>Data yang akan dihapus, Lanjutkan ?</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteDialog = false"
              >Batal</v-btn
            >
            <v-btn color="primary" text @click="deleteDataLayanan(deleteId)"
              >Hapus</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!------------------Dialog untuk Tambah Layanan------------------>
    <v-dialog v-model="dialogAddLayanan" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Tambah Layanan</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nama*"
                    v-model="form.nama"
                    required
                    outlined
                    :rules="rules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row
                v-for="row in hargalayananrows"
                :key="row.id_layananHarga"
                required
              >
                <v-col cols="8">
                  <div>
                    <p
                      class="title"
                      v-if="searchUkuranHewan(row.id_ukuranHewan) != undefined"
                    >
                      {{ searchUkuranHewan(row.id_ukuranHewan).nama_ukuranHewan }}
                    </p>
                  </div>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Harga**"
                    v-model="row.harga"
                    required
                    outlined
                    :rules="rules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*wajib diisi</small>
          <br />
          <small>**isikan dengan 0 jika layanan tidak tersedia</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="resetForm(), reset(), closeForm()"
            >Tutup</v-btn
          >
          <v-btn color="blue darken-1" text @click="cekKosong()">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-----------------------Dialog untuk ubah Layanan------------------------>
    <v-dialog v-model="dialogUbahLayanan" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Ubah Layanan</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nama Layanan*"
                  v-model="form.nama_layanan"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*wajib diisi</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeForm()">Tutup</v-btn>
          <v-btn color="blue darken-1" text @click="updateDataLayanan()"
            >Simpan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    <!-----------------------Dialog untuk edit Harga Layanan------------------------>
    <v-dialog v-model="dialogUbahHargaLayanan" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Ubah Harga Layanan</span>
          <v-spacer />
        </v-card-title>
        <v-card-title>
          <v-spacer />
          <span
            class="title"
            v-if="
              searchUkuranHewan(editHargaLayananItem.id_ukuranHewan) !=
                undefined
            "
            >{{
              detailItem.nama_layanan +
                ' ' +
                searchUkuranHewan(editHargaLayananItem.id_ukuranHewan).nama_ukuranHewan
            }}</span
          >
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Harga*"
                  v-model="formHargaLayanan.harga"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*wajib diisi</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeFormUbahHarga()"
            >Tutup</v-btn
          >
          <v-btn color="blue darken-1" text @click="updateDataHargaLayanan()"
            >Simpan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="true"
      :timeout="3000"
    >
      {{ text }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        rules: [(value) => !!value || 'Wajib diisi.'],
        dialog: false,
        dialogAddLayanan: false,
        dialogWarning: '',
        keyword: '',
        deleteDialog: '',
        dialogDetailLayanan: false,
        dialogUbahLayanan: false,
        dialogUbahHargaLayanan: false,
        detailItem: '',
        editHargaLayananItem: '',
        nama_ukuranHewan: '',
        on: '',
        headers: [
          {
            text: 'No',
          },
          {
            text: 'Id Layanan',
            value: 'id_layanan',
          },
          {
            text: 'Nama Layanan',
            value: 'nama_layanan',
          },
          {
            text: 'Tanggal Dibuat',
            value: 'createLog_at',
          },
          {
            text: 'Tanggal Diubah',
            value: 'updateLog_by',
          },
          {
            text: 'Diubah Oleh',
            value: 'updateLog_by',
          },
          // {
          //   text: "Delete At",
          //   value: "deleteLog_at"
          // },
          // {
          //   text: "Delete By",
          //   value: "delete_by"
          // },
          // {
          //   text: "Aktif",
          //   value: "aktif"
          // },
          {
            text: 'Aksi',
            value: null,
          },
        ],
        layanans: [],
        hargalayanans: [],
        ukurans: [
          {
            nama_ukuranHewan: '',
          },
        ],
        ukuransAktif: [],
        snackbar: false,
        dialogEdit: '',
        dialogPassword: '',
        dialogEditLayanan: '',
        pesan: '',
        item: '',
        search: '',
        color: null,
        text: '',
        load: false,
        form: {
          nama: '',
          updateLog_by: sessionStorage.getItem('Nama'),
        },
        formHargaLayanan: {
          harga: '',
          updateLog_by: sessionStorage.getItem('Nama'),
        },
        layanan: new FormData(),
        layananharga: new FormData(),
        hargalayananrows: [],
        ukuranrows: [],
        typeInput: 'new',
        errors: '',
        updatedId: '',
      };
    },
    methods: {
      cekKosong() {
        if (this.form.nama_layanan === '') {
          this.dialogWarning = true;
        } else {
          this.sendDataLayanan();
          this.resetForm();
          this.reset();
          this.dialog = false;
        }
      },
      reset() {
        this.$refs.form.resetValidation();
        this.show = false;
      },
      closeForm() {
        this.resetForm();
        this.hargalayananrows = [];
        this.dialogAddLayanan = false;
        this.dialogUbahLayanan = false;
      },
      closeFormUbahHarga() {
        this.resetForm();
        this.dialogUbahHargaLayanan = false;
      },
      createMultiform() {
        this.getUkuran();
        var count = 0;
        this.ukuransAktif.forEach((e) => {
          this.hargalayananrows.push({
            id_layananHarga: count,
            id_layanan: '',
            id_ukuranHewan: e.id_ukuranHewan,
            harga: '',
            createLog_at: '',
            created_by: sessionStorage.getItem('Nama'),
            updateLog_at: '',
            updateLog_by: '',
            deleteLog_at: '',
            delete_by: '',
            aktif: 0,
          });
          count++;
        });
        console.log(this.hargalayananrows);
        this.dialogAddLayanan = true;
      },
      filteredItems(value) {
        return this.hargalayanans.filter((i) => {
          return !value.id_layanan || i.id_layanan === value.id_layanan;
        });
      },
      getData() {
        var uri = this.$apiUrl4 + 'layananharga/getWithJoin';
        this.$http.get(uri).then((response) => {
          this.hargalayanans = response.data.message;
        });
      },
      getLayanan() {
        var uri = this.$apiUrl4 + 'Layanan';
        this.$http.get(uri).then((response) => {
          this.layanans = response.data.message;
        });
      },
      getAllUkuran() {
        var uri = this.$apiUrl4 + 'UkuranHewan/all';
        this.$http.get(uri).then((response) => {
          this.ukurans = response.data.message;
        });
      },
      getUkuran() {
        var uri = this.$apiUrl4 + 'UkuranHewan';
        this.$http.get(uri).then((response) => {
          this.ukuransAktif = response.data.message;
        });
      },
      sendDataLayanan() {
        this.layanan.append('nama_layannan', this.form.nama);
        this.layanan.append('updateLog_by', this.form.updateLog_by);

        var uri = this.$apiUrl4 + 'Layanan';
        this.load = true;
        this.$http
          .post(uri, this.layanan)
          .then((response) => {
            this.sendDataHargaLayanan(response.data.message);
          })
          .catch((error) => {
            console.log('masuk error data layanan');
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      sendDataHargaLayanan(id_layanan) {
        for (let index = 0; index < this.hargalayananrows.length; index++) {
          this.hargalayananrows[index].id_layanan = id_layanan;
        }
        this.layananharga.append(
          'harga_layanan',
          JSON.stringify(this.hargalayananrows)
        );

        var uri = this.$apiUrl4 + 'layananharga/insertMultiple';
        this.load = true;
        this.$http
          .post(uri, this.layananharga)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan kesnackbar
            this.load = false;
            this.dialog = false;
            this.getLayanan();
            this.getData();
            this.closeForm(); //mengambil [harga layanan]
          })
          .catch((error) => {
            console.log('masuk error data harga layanan');
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      updateDataLayanan() {
        this.layanan.append('nama_layanan', this.form.nama_layanan);
        this.layanan.append('updateLog_by', this.form.updateLog_by);
        var uri = this.$apiUrl4 + 'Layanan/' + 'update/' + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.layanan)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan kesnackbar
            this.load = false;
            this.getLayanan();
            this.closeForm();
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
      updateDataHargaLayanan() {
        this.layananharga.append(
          'id_layanan',
          this.editHargaLayananItem.id_layanan
        );
        this.layananharga.append(
          'id_ukuranHewan',
          this.editHargaLayananItem.id_ukuranHewan
        );
        this.layananharga.append('harga', this.formHargaLayanan.harga);
        this.layananharga.append('updateLog_by', this.form.updateLog_by);
        var uri = this.$apiUrl4 + 'layananharga/' + 'update/' + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.layananharga)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan kesnackbar
            this.load = false;
            this.getData();
            this.closeFormUbahHarga();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      showDetail(item) {
        this.detailItem = item;
        this.dialogDetailLayanan = true;
      },
      editHandlerLayanan(item) {
        this.form.nama = item.nama;
        this.updatedId = item.id_layanan;
        this.dialogUbahLayanan = true;
      },
      editHandlerHargaLayanan(item) {
        this.editHargaLayananItem = item;
        this.formHargaLayanan.harga = item.harga;
        this.updatedId = item.id_layananHarga;
        this.dialogUbahHargaLayanan = true;
      },
      deleteRow(item) {
        this.deleteId = item.id_layanan;
        this.deleteDialog = true;
      },
      deleteDataLayanan(deleteId) {
        //mengahapus data
        this.layanan.append('delete_by', this.form.delete_by);
        var uri = this.$apiUrl4 + 'Layanan' + '/delete/' + deleteId; //data dihapus berdasarkan id
        this.load = true;
        this.$http
          .post(uri, this.layanan)
          .then((response) => {
            this.snackbar = true;
            this.text = response.data.message;
            this.color = 'green';
            this.deleteDialog = false;
            this.getLayanan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
          });
      },
      deleteLayananPermanent(deleteId) {
        //mengahapus data
        var uri = this.$apiUrl4 + 'Layanan/' + deleteId; //data dihapus berdasarkan id
        this.load = true;
        this.$http
          .delete(uri)
          .then((response) => {
            console.log(response.data.message);
            console.log('berhasil menghapus layanan ber id: ' + deleteId);
          })
          .catch((error) => {
            console.log(error);
            console.log('gagal menghapus layanan ber id: ' + deleteId);
          });
      },
      setIdLayanan(item) {
        this.form.id_layanan = item.id_layanan;
        console.log(this.form.id_layanan);
      },
      resetForm() {
        this.form = {
          nama: '',
          updateLog_by: sessionStorage.getItem('Nama'),
        };
        this.updatedId = '';
        this.formHargaLayanan = {
          harga: '',
          updateLog_by: sessionStorage.getItem('Nama'),
        };
      },
      searchUkuranHewan(id_ukuranHewan) {
        return this.ukurans.find((x) => x.id_ukuranHewan === id_ukuranHewan);
      },
    },
    mounted() {
      this.getData();
      this.getLayanan();
      this.getAllUkuran();
      this.getUkuran();
    },
  };
</script>

<style>
  .tombol {
    margin: 2px;
  }
  .underlinetext {
    text-decoration: underline;
  }
</style>
