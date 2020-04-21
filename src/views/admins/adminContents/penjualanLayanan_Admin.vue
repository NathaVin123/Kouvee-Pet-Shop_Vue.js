<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
              <h1 class="subheading grey-darken--text">Data Penjualan Layanan</h1>
              </v-container>
            </v-flex>
            <v-flex xs6 class="text-right">
              <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialog = true">
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah penjualan layanan
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
                <tr v-for="(item) in items" :key="item.id_layanan">
                  <td>{{ item.id_layanan }}</td>
                  <td>{{ item.nama_layanan }}</td>
                  <td>{{ item.harga_layanan }}</td>
                  <td>{{ item.id_ukuranHewan }}</td>
                  <td>{{ item.updateLog_by }}</td>
                  <td class="text-center">
                    <v-btn icon color="indigo" light @click="editHandler(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="error" light @click="deleteData(item.id_layanan)">
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
          <span class="headline">Tambah Layanan</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ID Layanan" v-model="form.id_layanan" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nama Layanan" v-model="form.nama_layanan" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Harga Layanan" v-model="form.harga_layanan" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="ID Ukuran Hewan" v-model="form.id_ukuranHewan" required></v-text-field>
              </v-col>
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
      headers: [
        {
          text: 'ID Layanan',
          value: 'id_layanan'
        },
        {
          text: 'Nama Layanan',
          value: 'nama_layanan'
        },
        {
          text: 'Harga Layanan',
          value: 'harga_layanan'
        },
        {
          text: 'ID Ukuran Hewan',
          value: 'id_ukuranHewan'
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
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        id_layanan: '',
        nama_layanan: '',
        harga_layanan: '',
        id_ukuranHewan:'',
        updateLog_by: ''
      },
      user: new FormData,
      typeInput: 'new',
      errors: '',
      updateId: '',
    }
  },
  methods: {
    getData() {
      var uri = this.$apiUrl4 + '/layanan'
      this.$http.get(uri).then(response => {
        this.users = response.data.message
      })
    },
    sendData() {
      this.user.append('id_layanan', this.form.id_layanan);
      this.user.append('nama_layanan', this.form.nama_layanan);
      this.user.append('harga_layanan', this.form.harga_layanan);
      this.user.append('id_ukuranHewan', this.form.id_ukuranHewan);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/layanan'
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
      this.user.append('id_layanan', this.form.id_layanan);
      this.user.append('nama_layanan', this.form.nama_layanan);
      this.user.append('harga_layanan', this.form.harga_layanan);
      this.user.append('id_ukuranHewan', this.form.id_ukuranHewan);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/layanan/' + this.updatedId;
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
      this.form.id_layanan = item.id_layanan;
      this.form.nama_layanan = item.nama_layanan;
      this.form.harga_layanan = item.harga_layanan;
      this.form.id_ukuranHewan = item.id_ukuranHewan;
      this.form.updateLog_by = item.updateLog_by;
      this.updatedId = item.id_layanan;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl4 + '/layanan/' + deleteId;
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
        id_layanan: '',
        nama_layanan: '',
        harga_layanan: '',
        id_ukuranHewan: '',
        updateLog_by: ''
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>