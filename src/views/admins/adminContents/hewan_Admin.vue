<template>
  <div style="margin:20px">
    <!-- <v-bottom-navigation v-model="bottomNav" dark shift>
      <v-btn>
        <span>Aktif</span>
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>

      <v-btn>
        <span>Non Aktif</span>
        <v-icon>mdi-delete-empty</v-icon>
      </v-btn>
    </v-bottom-navigation>-->
    <v-card>
      <div class="pt-5">
        <h1 class="subheading grey-darken--text">Data Hewan</h1>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <v-btn
              depressed
              dark
              rounded
              style="text-transform: none !important;"
              color="green accent-3"
              @click="showAddDialog"
            >
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>Tambah Hewan
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
        <v-data-table :headers="headers" :items="hewans" :search="keyword">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_hewans">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_hewan }}</td>
                <td>{{ item.nama_hewan }}</td>
                <td>{{ item.nama_jenisHewan }}</td>
                <td>{{ item.nama_customer }}</td>
                <td>{{ item.tglLahir_hewan }}</td>
                <td>{{ item.createLog_at }}</td>
                <td>{{ item.updateLog_at }}</td>
                <td>{{ item.updateLog_by }}</td>
                <!-- <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td>-->
                <!-- <td>{{ item.aktif }}</td> -->
                <td>
                  <div>
                    <v-btn icon color="blue" light @click="editHandler(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <v-btn icon color="red lighten-2" dark v-on="on" @click="deleteRow(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <!-- ------------------Dialog untuk konfirmasi delete-------------------------------------- -->
    <div class="text-center">
      <v-dialog width="500" v-model="deleteDialog">
        <v-card>
          <v-card-title class="headline Red lighten-2" primary-title>Konfirmasi Hapus</v-card-title>
          <v-card-text>Data yang akan dihapus, Lanjutkan ?</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteDialog = false">Batal</v-btn>
            <v-btn color="primary" text @click="deleteData(deleteId)">Hapus</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- ------------------Dialog untuk warning kosong-------------------------------------- -->
    <div class="text-center">
      <v-dialog width="500" v-model="dialogWarning">
        <v-card>
          <v-card-title class="headline Red lighten-2" primary-title>Data Harus Diisi Semua !</v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogWarning = false">Kembali</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- ---------------------Dialog----------------------------------- -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Tambah Hewan</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nama Hewan*"
                    v-model="form.nama_hewan"
                    required
                    outlined
                    :rules="rules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="form.id_jenisHewan"
                    required
                    :items="jenishewans"
                    :filter="customFilter"
                    item-value="id_jenisHewan"
                    color="white"
                    item-text="nama_jenisHewan"
                    label="Jenis Hewan*"
                    outlined
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="form.id_customer"
                    required
                    auto-select-first
                    :items="customers"
                    :filter="customFilter"
                    item-value="id_customer"
                    color="white"
                    item-text="nama_customer"
                    label="Nama Pemilik*"
                    outlined
                  ></v-autocomplete>
                </v-col>
                <v-col cols="20">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="form.tglLahir_hewan"
                        label="Tanggal Lahir*"
                        readonly
                        v-on="on"
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="form.tglLahir_hewan"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*wajib diisi</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="resetForm(), reset(), (dialog = false)">Tutup</v-btn>
          <v-btn color="blue darken-1" text @click="cekKosong()">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- -------------------------------------------------------- -->
    <v-dialog v-model="dialogEdit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Ubah Hewan</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nama Hewan*" v-model="form.nama_hewan" required outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.id_jenisHewan"
                  required
                  :items="jenishewans"
                  :filter="customFilter"
                  item-value="id_jenisHewan"
                  color="white"
                  item-text="nama_jenisHewan"
                  label="Jenis Hewan*"
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.id_customer"
                  required
                  auto-select-first
                  :items="customers"
                  :filter="customFilter"
                  item-value="id_customer"
                  color="white"
                  item-text="nama_customer"
                  label="Nama Pemilik*"
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-col cols="20">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="form.tglLahir_hewan"
                      label="Tanggal Lahir*"
                      readonly
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="form.tglLahir_hewan"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
          <small>*wajib diisi</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="resetForm(), reset(), (dialogEdit = false)"
          >Tutup</v-btn>
          <v-btn color="blue darken-1" text @click="setForm()">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
      {{ text }}
      <v-btn dark text @click="snackbar = false">Tutup</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rules: [(value) => !!value || 'Wajib diisi.'],
        dialogWarning: '',
        dialogEdit: '',
        on: '',
        dialog: false,
        deleteDialog: false,
        show: false,
        dialogLabel: 'Tambah Hewan',
        jenishewans: [],
        customers: [],
        hewans: [],
        keyword: '',
        bottomNav: 1,
        menu: false,
        headers: [
          {
            text: 'No',
            value: 'index',
          },
          {
            text: 'Id Hewan',
            value: 'id_hewan',
          },
          {
            text: 'Nama Hewan',
            value: 'nama_hewan',
          },
          {
            text: 'Jenis Hewan',
            value: 'nama_jenisHewan',
          },
          {
            text: 'Nama Pemilik',
            value: 'nama_customer',
          },
          {
            text: 'Tanggal Lahir',
            value: 'tglLahir_hewan',
          },
          {
            text: 'Tanggal Dibuat',
            value: 'createLog_at',
          },
          {
            text: 'Tanggal Diubah',
            value: 'updateLog_at',
          },
          {
            text: 'Diubah Oleh',
            value: 'updateLog_by',
          },
          {
            text: 'Aksi',
            value: null,
          },
        ],
        snackbar: false,
        color: null,
        text: '',
        load: false,
        form: {
          nama_hewan: '',
          id_jenisHewan: '',
          id_customer: '',
          tglLahir_hewan: '',
          updateLog_by: sessionStorage.getItem('Nama'),
        },
        hewan: new FormData(),
        typeInput: 'new',
        errors: '',
        updatedId: '',
        deleteId: '',
      };
    },
    watch: {
      menu(val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
      },
    },
    methods: {
      cekKosong() {
        if (this.form.nama_hewan === '') {
          this.dialogWarning = true;
        } else {
          this.setForm();
          this.resetForm();
          this.reset();
          this.dialog = false;
        }
      },
      save(date) {
        this.$refs.menu.save(date);
      },
      reset() {
        this.$refs.form.resetValidation();
        this.show = false;
      },
      getData() {
        var uri = this.$apiUrl4 + 'Hewan/getWithJoin';
        this.$http.get(uri).then((response) => {
          this.hewans = response.data.message;
        });
      },
      getPelanggan() {
        var uri = this.$apiUrl4 + 'Customer';
        this.$http.get(uri).then((response) => {
          this.customers = response.data.message;
        });
      },
      getJenisHewan() {
        var uri = this.$apiUrl4 + 'JenisHewan';
        this.$http.get(uri).then((response) => {
          this.jenishewans = response.data.message;
        });
      },
      sendData() {
        this.hewan.append('nama_hewan', this.form.nama_hewan);
        this.hewan.append('id_jenisHewan', this.form.id_jenisHewan);
        this.hewan.append('id_customer', this.form.id_customer);
        this.hewan.append('tglLahir_hewan', this.form.tglLahir_hewan);
        this.hewan.append('updateLog_by', this.form.updateLog_by);

        var uri = this.$apiUrl4 + 'Hewan';
        this.load = true;
        this.$http
          .post(uri, this.hewan)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan kesnackbar
            this.load = false;
            this.dialog = false;
            this.resetForm();
            this.getData();
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
        this.hewan.append('nama_hewan', this.form.nama_hewan);
        this.hewan.append('id_jenisHewan', this.form.id_jenisHewan);
        this.hewan.append('id_customer', this.form.id_customer);
        this.hewan.append('tglLahir_hewan', this.form.tglLahir_hewan);
        this.hewan.append('updateLog_by', this.form.updateLog_by);
        var uri = this.$apiUrl4 + 'Hewan/' + 'update/' + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.hewan)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan kesnackbar
            this.load = false;
            this.dialogEdit = false;
            this.getData(); //mengambil data hewan
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
      showAddDialog() {
        this.typeInput = 'new';
        (this.dialogLabel = 'Tambah Hewan'), this.resetForm();
        this.dialog = true;
      },
      editHandler(item) {
        this.typeInput = 'edit';
        this.dialogEdit = true;
        this.form.nama_hewan = item.nama_hewan;
        this.form.id_jenisHewan = item.id_jenisHewan;
        this.form.id_customer = item.id_customer;
        this.form.tglLahir_hewan = item.tglLahir_hewan;
        this.updatedId = item.id_hewan;
      },
      deleteRow(item) {
        this.deleteId = item.id_hewan;
        this.deleteDialog = true;
      },
      deleteData(deleteId) {
        //menghapus data
        this.hewan.append('updateLog_by', this.form.updateLog_by);
        var uri = this.$apiUrl4 + 'Hewan' + '/delete/' + deleteId; //data dihapus berdasarkan id
        this.load = true;
        this.$http
          .post(uri, this.hewan)
          .then((response) => {
            this.snackbar = true;
            this.text = response.data.message;
            this.color = 'green';
            this.deleteDialog = false;
            this.deleteId = '';
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
          this.updateData();
        }
      },
      resetForm() {
        this.form = {
          nama_hewan: '',
          id_jenisHewan: '',
          id_customer: '',
          tglLahir_hewan: '',
          updateLog_by: sessionStorage.getItem('Nama'),
        };
      },
      customFilter(item, queryText) {
        const textOne = item.nama_hewan.toLowerCase();
        const textTwo = item.nama_hewan.toLowerCase();
        const searchText = queryText.toLowerCase();

        return (
          textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
        );
      },
    },
    mounted() {
      this.getData();
      this.getPelanggan();
      this.getJenisHewan();
    },
  };
</script>
