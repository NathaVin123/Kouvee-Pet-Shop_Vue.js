<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
              <h1 class="subheading grey-darken--text">Data Hewan</h1>
              </v-container>
            </v-flex>
            <v-flex xs6 class="text-right">
              <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialogTambah()">
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Hewan
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
            >
            <template v-slot:body="{ items }" >
              <tbody>
                <tr v-for="(item, index) in items" :key="item.id_hewan">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.id_hewan }}</td>
                  <td>{{ item.nama_hewan }}</td>
                  <td>{{ item.id_jenisHewan }}</td>
                  <td>{{ item.tglLahir_hewan }}</td>
                  <td>{{ item.id_customer }}</td>
                  <td>{{ item.createLog_at }}</td>
                  <td>{{ item.updateLog_by }}</td>
                  <td class="text-center">
                    <v-btn icon color="indigo" light @click="editHandler(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="error" light v-on="on" @click="deleteRow(item)">
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
          <span class="headline">Tambah Hewan</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                 label="Nama Hewan*" 
                 v-model="form.nama_hewan" 
                 required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.id_jenisHewan"
                  required
                  :items="jenishewans"
                  :filter="customFilter"
                  item-value="id_jenis_hewan"
                  color="white"
                  item-text="nama"
                  label="Jenis Hewan*"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.id_customer"
                  required
                  auto-select-first
                  :items="pelanggans"
                  :filter="customFilter"
                  item-value="id_customer"
                  color="white"
                  item-text="nama"
                  label="Nama Pemilik Hewan*"
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
                        label="Tanggal Lahir Hewan*"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="form.tglLahir_hewan"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1960-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              <!-- <v-col cols="12">
                <v-text-field label="ID Customer" v-model="form.id_customer" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="ID Jenis Hewan" v-model="form.id_jenisHewan" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Update Log By (NIP)" v-model="form.updateLog_by" required></v-text-field>
              </v-col> -->
            </v-row>
          </v-container>
          <small>*indicates required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="cekKosong()">Save</v-btn>
        </v-card-actions>
      </v-card>
      <div class="text-center">
        <v-dialog width="500" v-model="deleteDialog">
          <v-card>
            <v-card-title class="headline Red lighten-2" primary-title>
              Konfirmasi Hapus
            </v-card-title>
            <v-card-text>
              Data yang akan dihapus, Lanjutkan ?
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="deleteDialog = false">
                Batal
              </v-btn>
              <v-btn color="primary" text @click="deleteData(deleteId)">
                Hapus
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
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
      rules: [(value) => !!value || 'field Wajib diisi !'],
      dialog: false,
      deleteDialog: false,
      on: '',
      keyword: '',
      tanggal: false,
      users: [],
      jenishewans: [],
      pelanggans: [],
      hewans: [],
      headers: [
        {
          text: 'No',
          value: 'index',
        },
        {
          text: 'ID Hewan',
          value: 'id_hewan'
        },
        {
          text: 'Nama Hewan',
          value: 'nama_hewan'
        },
        {
          text: 'Jenis Hewan',
          value: 'nama_jenisHewan'
        },
        {
          text: 'Tanggal Lahir Hewan',
          value: 'tglLahir_hewan'
        },
        {
          text: 'Nama Pemilik Hewan',
          value: 'nama_customer',
        },
        {
          text: 'Tanggal dibuat',
          value: 'createLog_at',
        },
        {
          text: 'Diubah Oleh',
          value: 'updateLog_by'
        },
        {
          text: 'Action',
          value: null,
          sortable : false
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
      user: new FormData,
      hewan: new FormData(),
      typeInput: 'new',
      errors: '',
      updatedId: '',
      deleteId: '',
    }
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
      var uri = this.$apiUrl4 + '/hewan/getWithJoin'
      this.$http.get(uri).then(response => {
        this.users = response.data.message
      })
    },
    getPelanggan() {
      var uri = this.$apiUrl4 + 'pelanggan';
      this.$http.get(uri).then((response) => {
        this.pelanggans = response.data.message;
      });
    },
    getJenisHewan() {
      var uri = this.$apiUrl4 + 'jenisHewan';
      this.$http.get(uri).then((response) => {
        this.jenishewans = response.data.message;
      });
    },
    dialogTambah(){
      this.resetForm();
      this.dialog = true;
      this.tambah = true;
    },
    sendData() {
      this.user.append('nama_hewan', this.form.nama_hewan);
      this.user.append('id_jenisHewan', this.form.id_jenisHewan);
      this.user.append('tglLahir_hewan', this.form.tglLahir_hewan);
      this.user.append('id_customer', this.form.id_customer);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/user'
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
      this.user.append('nama_hewan', this.form.nama_hewan);
      this.user.append('id_jenisHewan', this.form.id_jenisHewan);
      this.user.append('tglLahir_hewan', this.form.tglLahir_hewan);
      this.user.append('id_customer', this.form.id_customer);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/user/' + this.updatedId;
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
      this.form.nama_hewan = item.nama_hewan;
      this.form.id_jenisHewan = item.id_jenisHewan;
      this.form.tglLahir_hewan = item.tglLahir_hewan;
      this.form.id_customer = item.id_customer;
      this.form.updateLog_by = item.updateLog_by;
      this.updatedId = item.id_hewan;
    },
    deleteRow(item) {
      this.deleteId = item.id_hewan;
      this.deleteDialog = true;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl4 + 'Hewan' + '/delete/' + deleteId; //data dihapus berdasarkan id
      this.load = true;
      this.$http
        .post(uri, this.user)
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
          this.text = 'Try Again';
          this.color = 'red';
        });
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
        nama_hewan: '',
        id_jenisHewan:'',
        tglLahir_hewan: '',
        id_customer: '',
        updateLog_by: sessionStorage.getItem('Nama'),
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
    this.getPelanggan();
    this.getJenisHewan();
  }
}
</script>