<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <v-container class="my-5">
          <v-layout row wrap style="margin: 10px;">
            <v-flex xs6>
              <v-container class="my-5">
                <h1 class="subheading grey-darken--text">Data Ukuran Hewan</h1>
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
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Ukuran Hewan
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
                <tr v-for="(item, index) in items" :key="item.id_ukuranHewan">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.id_ukuranHewan }}</td>
                  <td>{{ item.nama_ukuranHewan }}</td>
                  <td>{{ item.createLog_at }}</td>
                  <td>{{ item.updateLog_by }}</td>
                  <td class="text-center">
                    <v-btn icon color="indigo" light @click="editHandler(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="error"
                      light
                      v-on="on"
                      @click="deleteRow(item)"
                    >
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
          <span class="headline">Tambah Ukuran Hewan</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nama Ukuran Hewan*"
                  v-model="form.nama_ukuranHewan"
                  required
                  :rules="rules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
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
    <v-dialog v-model="dialogEdit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Ubah Ukuran Hewan</span>
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
                    outlined=""
                    :rules="rules"
                  ></v-text-field>
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
            @click="resetForm(), reset(), (dialogEdit = false)"
            >Tutup</v-btn
          >
          <v-btn color="blue darken-1" text @click="cekKosong()">Simpan</v-btn>
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
      <v-btn dark text @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      rules: [(value) => !!value || "field Wajib diisi !"],
      dialog: false,
      keyword: "",
      on: "",
      deleteDialog: "",
      headers: [
        {
          text: "No",
          value: "index",
        },
        {
          text: "ID Ukuran Hewan",
          value: "id_ukuranHewan",
        },
        {
          text: "Nama Ukuran Hewan",
          value: "nama_ukuranHewan",
        },
        {
          text: "Tanggal Dibuat",
          value: "createLog_at",
        },
        {
          text: "Diubah oleh",
          value: "updateLog_by",
        },
        {
          text: "Action",
          value: null,
          sortable: false,
        },
      ],
      users: [],
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        nama_ukuranHewan: "",
        updateLog_by: sessionStorage.getItem("Nama"),
      },
      user: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: "",
    };
  },
  methods: {
    cekKosong() {
      if (this.form.nama_ukuranHewan === "") {
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
      var uri = this.$apiUrl4 + "/ukuranhewan/" + "getAll";
      this.$http.get(uri).then((response) => {
        this.users = response.data.message;
      });
    },
    dialogTambah() {
      this.resetForm();
      this.dialog = true;
      this.tambah = true;
    },
    sendData() {
      this.user.append("nama_ukuranHewan", this.form.nama_ukuranHewan);
      this.user.append("updateLog_by", this.form.updateLog_by);
      var uri = this.$apiUrl4 + "/ukuranhewan";
      this.load = true;
      this.$http
        .post(uri, this.user)
        .then((response) => {
          this.snackbar = true;
          this.color = "green";
          this.text = response.data.message;
          this.load = false;
          this.dialog = false;
          this.getData();
          this.resetForm();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Try Again";
          this.color = "red";
          this.load = false;
        });
    },
    updateData() {
      this.user.append("nama_ukuranHewan", this.form.nama_ukuranHewan);
      this.user.append("updateLog_by", this.form.updateLog_by);
      var uri = this.$apiUrl4 + "ukuranhewan/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.user)
        .then((response) => {
          this.snackbar = true;
          this.color = "green";
          this.text = response.data.message;
          this.load = false;
          this.dialog = false;
          this.getData();
          this.resetForm();
          this.typeInput = "new";
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Try Again";
          this.color = "red";
          this.load = false;
          this.typeInput = "new";
        });
    },
    editHandler(item) {
      this.typeInput = "edit";
      this.tambah = false;
      this.dialog = true;
      this.form.nama_ukuranHewan = item.nama_ukuranHewan;
      this.updatedId = item.id_ukuranHewan;
    },
    deleteRow(item) {
      this.deleteId = item.id_ukuranHewan;
      this.deleteDialog = true;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl4 + "ukuranhewan" + "/delete/" + deleteId;
      this.load = true;
      this.$http
        .post(uri, this.user)
        .then((response) => {
          this.snackbar = true;
          this.text = response.data.message;
          this.color = "green";
          this.deleteDialog = false;
          this.getData();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Try Again";
          this.color = "red";
        });
    },
    setForm() {
      if (this.typeInput === "new") {
        this.sendData();
      } else {
        this.updateData();
      }
    },
    resetForm() {
      this.form = {
        nama: "",
        updateLog_by: sessionStorage.getItem("Nama"),
      };
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
