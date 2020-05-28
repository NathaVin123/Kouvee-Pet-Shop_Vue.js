<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
                <h1 class="subheading grey-darken--text">Data Customer</h1>
              </v-container>
            </v-flex>
            <v-flex xs6 class="text-right">
              <v-btn
                depressed
                dark
                rounded
                style="text-transform: none !important;"
                color="green accent-3"
                @click="dialogTambah()"
              >
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>Tambah Customer
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

          <br />

          <v-data-table :headers="headers" :items="users" :search="keyword">
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="item.id_customer">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.id_customer }}</td>
                  <td>{{ item.nama_customer }}</td>
                  <td>{{ item.alamat_customer }}</td>
                  <td>{{ item.tglLahir_customer }}</td>
                  <td>{{ item.noTelp_customer }}</td>
                  <td>{{ item.createLog_at }}</td>
                  <td>{{ item.updateLog_by }}</td>
                  <td class="text-center">
                    <v-btn icon color="indigo" light @click="editHandler(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="error" light @click="deleteRow(item)">
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
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Customer</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nama Customer*" v-model="form.nama_customer" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Alamat Custumer" v-model="form.alamat_customer" required></v-text-field>
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
                      v-model="form.tglLahir_customer"
                      label="Tanggal Lahir Customer*"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="form.tglLahir_customer"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1960-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor Telepon Customer*"
                  v-model="form.noTelp_customer"
                  required
                ></v-text-field>
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
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      keyword: '',
      tanggal: false,
      on: '',
      deleteDialog: '',
      headers: [
        {
          text: 'No',
          value: 'index',
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
          text: 'Alamat Customer',
          value: 'alamat_customer'
        },
        {
          text : 'Tanggal Lahir',
          value: 'tglLahir_customer'
        },
        {
          text: 'Nomor Telepon',
          value: 'noTelp_customer'
        },
        {
          text: 'Tanggal Dibuat',
          value: 'createLog_at'
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
      users: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        nama_customer: '',
        alamat_customer: '',
        tglLahir_customer: '',
        noTelp_customer: '',
        updateLog_by: sessionStorage.getItem('Nama'),
      },
      user: new FormData,
      typeInput: 'new',
      errors: '',
      updateId: '',
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
  },
  methods: {
    cekKosong() {
      if (
        this.form.nama_customer === '' ||
        this.form.alamat_customer === '' ||
        this.form.tglLahir_customer === '' ||
        this.form.noTelp_customer === ''
      ) {
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
      var uri = this.$apiUrl4 + '/customer'
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
      this.user.append('nama_customer', this.form.nama_customer);
      this.user.append('alamat_customer', this.form.alamat_customer);
      this.user.append('tglLahir_customer', this.form.tglLahir_customer);
      this.user.append('noTelp_customer', this.form.noTelp_customer);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/customer'
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
      this.user.append('nama_customer', this.form.nama_customer);
      this.user.append('alamat_customer', this.form.alamat_customer);
      this.user.append('tglLahir_customer', this.form.tglLahir_customer);
      this.user.append('noTelp_customer', this.form.noTelp_customer);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + 'customer/' + 'update/' + this.updatedId;
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
      this.form.nama_customer = item.nama_customer;
      this.form.alamat_customer = item.alamat_customer;
      this.form.tglLahir_customer = item.tglLahir_customer;
      this.form.noTelp_customer = item.noTelp_customer;
      this.updatedId = item.id_customer;
    },
    deleteRow(item) {
      this.deleteId = item.id_customer;
      this.deleteDialog = true;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl4 + 'customer' + '/delete/' + deleteId; //data dihapus berdasarkan id
      this.load = true;
      this.$http
        .post(uri, this.user)
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
        nama_customer: '',
        alamat_customer: '',
        tglLahir_customer: '',
        noTelp_customer: '',
        updateLog_by: sessionStorage.getItem('Nama'),
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>