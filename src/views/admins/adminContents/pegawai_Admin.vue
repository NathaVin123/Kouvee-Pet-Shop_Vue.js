<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
              <h1 class="subheading grey-darken--text">Data Pegawai</h1>
              </v-container>
            </v-flex>
            <v-flex xs6 class="text-right">
              <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3"  @click="dialogTambah()">
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Pegawai
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
                <tr v-for="(item) in items" :key="item.NIP">
                  <td>{{ item.NIP }}</td>
                  <td>{{ item.nama_pegawai }}</td>
                  <td>{{ item.alamat_pegawai }}</td>
                  <td>{{ item.tglLahir_pegawai }}</td>
                  <td>{{ item.noTelp_pegawai }}</td>
                  <td>{{ item.stat }}</td>
                  <!-- <td>{{ item.password }}</td> -->
                  <td> <v-img :src="$apiUrl4 + '/pegawai/' + item.gambar" contain class="grey lighten-2" width="75" height="75"/></td>
                  <td>{{ item.updateLog_by }}</td>
                  <td class="text-center">
                    <v-btn icon color="indigo" light @click="editHandler(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="error" light @click="deleteData(item.NIP)">
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
          <span class="headline">Tambah Pegawai</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="NIP" v-model="form.NIP" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nama Pegawai" v-model="form.nama_pegawai" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Alamat Pegawai" v-model="form.alamat_pegawai" required></v-text-field>
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
                      v-model="form.tglLahir_pegawai"
                      label="Pilih Tanggal Lahir Anda"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="form.tglLahir_pegawai" @input="tanggal = false"></v-date-picker>
                </v-menu>
                <!-- <v-text-field label="Tanggal Lahir" v-model="form.tglLahir_pegawai" required></v-text-field> -->
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nomor Telepon" v-model="form.noTelp_pegawai" required></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field label="Role" v-model="form.stat" required></v-text-field>
              </v-col> -->
              <v-col cols="12">
                <v-select
                  label="Role"
                  v-model="form.stat"
                  :items="items"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password" v-model="form.password" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input label="Pilih Gambar" accept="image/*">
                </v-file-input>
              </v-col>
              <!-- <v-col cols="12"> 
              <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
              ></v-file-input>
              </v-col> -->
              <v-col cols="12">
                <v-text-field label="Update Log By (NIP)" v-model="form.updateLog_by" required></v-text-field>
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
      date: new Date().toISOString().substr(0, 10),
      tanggal: false,
      headers: [
        {
          text: 'NIP',
          value: 'NIP'
        },
        {
          text: 'Nama Pegawai',
          value: 'nama_pegawai'
        },
        {
          text: 'Alamat Pegawai',
          value: 'alamat_pegawai'
        },
        {
          text: 'Tanggal Lahir',
          value: 'tglLahir_pegawai'
        },
        {
          text: 'Nomor Telepon',
          value: 'noTelp_pegawai'
        },
        {
          text: 'Status',
          value: 'stat'
        },
        // {
        //   text: 'Password',
        //   value: 'password'
        // },
        {
          text: 'Gambar',
          value: 'gambar'
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
      users: [],
      items: ["Kasir", "CS"],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        NIP: '',
        nama_pegawai: '',
        alamat_pegawai: '',
        tglLahir_pegawai: '',
        noTelp_pegawai: '',
        stat: '',
        password: '',
        gambar: '',
        updateLog_by: ''
      },
      user: new FormData,
      typeInput: 'new',
      errors: '',
      updateNIP: '',
    }
  },
  methods: {
    getData() {
      var uri = this.$apiUrl4 + '/pegawai'
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
      this.user.append('NIP', this.form.NIP);
      this.user.append('nama_pegawai', this.form.nama_pegawai);
      this.user.append('alamat_pegawai', this.form.alamat_pegawai);
      this.user.append('tglLahir_pegawai', this.form.tglLahir_pegawai);
      this.user.append('noTelp_pegawai', this.form.noTelp_pegawai);
      this.user.append('stat', this.form.stat);
      this.user.append('password', this.form.password);
      this.user.append('gambar', this.form.gambar);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/pegawai'
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
      this.user.append('NIP', this.form.NIP);
      this.user.append('nama_pegawai', this.form.nama_pegawai);
      this.user.append('alamat_pegawai', this.form.alamat_pegawai);
      this.user.append('tglLahir_pegawai', this.form.tglLahir_pegawai);
      this.user.append('noTelp_pegawai', this.form.noTelp_pegawai);
      this.user.append('stat', this.form.stat);
      this.user.append('password', this.form.password);
      this.user.append('gambar', this.form.gambar);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/pegawai/' + this.updatedId;
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
      this.form.NIP = item.NIP;
      this.form.nama_pegawai = item.nama_pegawai;
      this.form.alamat_pegawai = item.alamat_pegawai;
      this.form.noTelp_pegawai = item.noTelp_pegawai;
      this.form.tglLahir_pegawai = item.tglLahir_pegawai;
      this.form.stat = item.stat;
      this.form.password = item.password;
      this.form.gambar = item.gambar;
      this.form.updateLog_by = item.updateLog_by;
      this.updatedId = item.NIP;
    },
    deleteData(deleteNIP) {
      var uri = this.$apiUrl4 + '/pegawai/' + deleteNIP;
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
        NIP: '',
        nama_pegawai: '',
        alamat_pegawai: '',
        tglLahir_pegawai: '',
        noTelp_pegawai: '',
        stat: '',
        password: '',
        gambar: '',
        updateLog_by: ''
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>