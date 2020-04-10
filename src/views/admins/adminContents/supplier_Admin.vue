<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-container class="my-5">
              <h1 class="subheading grey-darken--text">Data Supplier</h1>
              </v-container>
            </v-flex>
            <v-flex xs6 class="text-right">
              <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialog = true">
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Supplier
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
                <tr v-for="(item) in items" :key="item.id_supplier">
                  <td>{{ item.id_supplier }}</td>
                  <td>{{ item.nama_supplier }}</td>
                  <td>{{ item.alamat_supplier }}</td>
                  <td>{{ item.telepon_supplier }}</td>
                  <td>{{ item.stok_supplier }}</td>
                  <td>{{ item.updateLog_by }}</td>
                  <td class="text-center">
                    <v-btn icon color="indigo" light @click="editHandler(item.id_supplier)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="error" light @click="deleteData(item.id_supplier)">
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
          <span class="headline">Tambah Supplier</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ID Supplier" v-model="form.id_supplier" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nama Supplier" v-model="form.nama_supplier" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Alamat Supplier" v-model="form.alamat_supplier" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Telepon Supplier" v-model="form.telepon_supplier" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Stok Supplier" v-model="form.stok_supplier" required></v-text-field>
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
          text: 'ID Supplier',
          value: 'id_supplier'
        },
        {
          text: 'Nama supplier',
          value: 'nama_supplier'
        },
        {
          text: 'Telepon Supplier',
          value: 'telepon_supplier'
        },
        {
          text: 'Stok Supplier',
          value: 'stok_supplier'
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
        id_supplier: '',
        nama_supplier: '',
        alamat_supplier: '',
        telepon_supplier: '',
        stok_supplier: '',
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
      var uri = this.$apiUrl4 + '/supplier'
      this.$http.get(uri).then(response => {
        this.users = response.data.message
      })
    },
    sendData() {
      this.user.append('id_supplier', this.form.id_supplier);
      this.user.append('nama_supplier', this.form.nama_supplier);
      this.user.append('alamat_supplier', this.form.alamat_supplier);
      this.user.append('telepon_supplier', this.form.telepon_supplier);
      this.user.append('stok_supplier', this.form.stok_supplier);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/supplier'
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
      this.user.append('id_supplier', this.form.id_supplier);
      this.user.append('nama_supplier', this.form.nama_supplier);
      this.user.append('alamat_supplier', this.form.alamat_supplier);
      this.user.append('telepon_supplier', this.form.telepon_supplier);
      this.user.append('stok_supplier', this.form.stok_supplier);
      this.user.append('updateLog_by', this.form.updateLog_by);
      var uri = this.$apiUrl4 + '/supplier/' + this.updatedId;
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
      this.form.id_supplier = item.id_supplier;
      this.form.nama_supplier = item.nama_supplier;
      this.form.alamat_supplier = item.alamat_supplier;
      this.form.telepon_supplier = item.telepon_supplier;
      this.form.stok_supplier = item.stok_supplier;
      this.form.updateLog_by = item.updateLog_by;
      this.updatedId = item.id_supplier;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl4 + '/supplier/' + deleteId;
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
        id_supplier: '',
        nama_supplier: '',
        alamat_supplier: '',
        telepon_supplier: '',
        stok_supplier: '',
        updateLog_by: ''
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>