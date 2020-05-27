<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
              <h1 class="subheading grey-darken--text">Data Jenis Hewan</h1>
              </v-container>
            </v-flex>
            <v-flex xs6 class="text-right">
              <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialogTambah()">
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Jenis Hewan
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
                <tr v-for="(item, index) in items" :key="item.id_jenisHewan">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.id_jenisHewan }}</td>
                  <td>{{ item.nama_jenisHewan }}</td>
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
            <v-btn color="primary" text @click="deleteData(deleteId)"
              >Hapus</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Jenis Hewan</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nama Jenis Hewan*"
                    v-model="form.nama_jenisHewan"
                    required
                    :rules="rules"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12">
                  <v-text-field
                    label="Diubah Oleh*"
                    v-model="form.updateLog_by"
                    required
                    :rules="rules"
                  ></v-text-field>
                </v-col> -->
              </v-row>
            </v-form>
          </v-container>
          <small>*berarti wajib diisi</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="resetForm(), reset(), (dialog = false)"
            >Close</v-btn
          >
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
      rules: [(value) => !!value || 'field Wajib diisi!'],
      dialog: false,
      keyword: '',
      users: [],
      headers: [
        {
          text: 'No',
          value: 'index'
        },
        {
          text: 'ID Jenis Hewan',
          value: 'id_jenisHewan'
        },
        {
          text: 'Nama Jenis Hewan',
          value: 'nama_jenisHewan'
        },
        {
          text: 'Update Log By (NIP)',
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
        nama_jenisHewan: '',
        updateLog_by: sessionStorage.getItem('Nama'),
      },
      user: new FormData(),
      deleteDialog: false,
      typeInput: 'new',
      errors: '',
      updatedId: '',
    }
  },
  methods: {
    cekKosong() {
        if (this.form.nama_jenisHewan === '') {
          this.dialogWarning = true;
        } else {
          this.setForm();
          this.resetForm();
          this.reset();
          this.dialog = false;
        }
    },
    getData() {
      var uri = this.$apiUrl4 + '/jenishewan'
      this.$http.get(uri).then(response => {
        this.users = response.data.message;
      })
    },
    dialogTambah(){
      this.resetForm();
      this.dialog = true;
      this.tambah = true;
    },
    sendData() {
      this.user.append('nama_jenisHewan', this.form.nama_jenisHewan);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + 'jenishewan'
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
          this.text = 'Try Again!';
          this.color = 'red';
          this.load = false;
        })
    },
    updateData() {
      this.user.append('nama_jenisHewan', this.form.nama_jenisHewan);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/jenishewan/' + 'update/' + this.updatedId;
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
      this.form.id_jenisHewan = item.id_jenisHewan;
      this.form.nama_jenisHewan = item.nama_jenisHewan;
      this.form.updateLog_by = item.updateLog_by;
      this.updatedId = item.id_jenisHewan;
    },
    deleteRow(item) {
      this.deleteId = item.id_jenisHewan;
      this.deleteDialog = true;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl4 + 'jenishewan' + '/delete/' + deleteId;
      this.load = true;
      this.$http
        .post(uri, this.jenishewan)
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
    reset() {
      this.$refs.form.resetValidation();
    },
    resetForm() {
      this.form = {
          nama_jenisHewan: '',
          updateLog_by: sessionStorage.getItem('Nama'),
        };
    }
  },
  mounted() {
    this.getData();
  }
}
</script>