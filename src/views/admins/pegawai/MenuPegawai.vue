<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <template>
          <h1 class="subheading grey-darken--text">Data Pegawai</h1>
          <v-layout row wrap style="margin: 10px;">
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
                    >Tambah Pegawai</v-btn
                  >
                </template>

                <v-card>
                  <v-card-title>
                    <v-spacer />
                    <span class="headline">Tambah Pegawai</span>
                    <v-spacer />
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form ref="form">
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              label="NIP*"
                              v-model="form.NIP"
                              required
                              outlined
                              :rules="rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Nama Pegawai*"
                              v-model="form.nama_pegawai"
                              required
                              outlined
                              :rules="rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Alamat*"
                              v-model="form.alamat_pegawai"
                              outlined
                              required
                              :rules="rules"
                            ></v-text-field>
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
                                  v-model="form.tglLahir_pegawai"
                                  label="Tanggal Lahir*"
                                  readonly
                                  outlined
                                  :rules="rules"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                ref="picker"
                                v-model="form.tglLahir_pegawai"
                                :max="new Date().toISOString().substr(0, 10)"
                                min="1950-01-01"
                                @change="save"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Nomor Telepon*"
                              v-model="form.noTelp_pegawai"
                              required
                              outlined
                              :rules="rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-select
                              label="Role*"
                              v-model="form.stat"
                              :items="items"
                              required
                              outlined
                              :rules="rules"
                            ></v-select>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Password*"
                              v-model="form.password"
                              :type="show ? 'text' : 'password'"
                              required
                              outlined
                              :rules="rulesPassword"
                              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="show = !show"
                            ></v-text-field>
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
              <v-dialog v-model="dialogEdit" persistent max-width="600px">
                <v-card>
                  <v-card-title>
                    <v-spacer />
                    <span class="headline">Ubah Pegawai</span>
                    <v-spacer />
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="NIP*"
                            v-model="form.NIP"
                            required
                            outlined
                            :rules="rules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Nama Pegawai*"
                            v-model="form.nama_pegawai"
                            required
                            outlined
                            :rules="rules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Alamat*"
                            v-model="form.alamat_pegawai"
                            outlined
                            required
                            :rules="rules"
                          ></v-text-field>
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
                                v-model="form.tglLahir_pegawai"
                                label="Tanggal Lahir*"
                                readonly
                                outlined
                                :rules="rules"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              ref="picker"
                              v-model="form.tglLahir_pegawai"
                              :max="new Date().toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="save"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Nomor Telepon*"
                            v-model="form.noTelp_pegawai"
                            required
                            outlined
                            :rules="rules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            label="Role*"
                            v-model="form.stat"
                            :items="items"
                            required
                            outlined
                            :rules="rules"
                          ></v-select>
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
                    </v-container>
                    <small>*wajib diisi</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="resetForm(), (dialogEdit = false)"
                      >Tutup</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="cekKosongEdit()"
                      >Simpan</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>

              <v-divider class="mx-4" inset vertical></v-divider>
              <v-flex xs6 class="text-right"> </v-flex>
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
                      :src="$apiUrl5 + 'Pegawai/' + item.gambar"
                      contain
                      class="white"
                      height="200"
                    />

                    <v-card-title>
                      {{ item.nama_pegawai }}
                    </v-card-title>

                    <v-card-subtitle> NIP : {{ item.NIP }} </v-card-subtitle>

                    <v-card-actions>
                      <v-btn text @click="editHandler(item)"
                        >Ubah Pegawai</v-btn
                      >
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
                          item.NIP == munculke
                            ? "mdi-chevron-up"
                            : "mdi-chevron-down"
                        }}</v-icon>
                      </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                      <!-- <div v-show="show"> -->
                      <div v-if="item.NIP == munculke">
                        <v-divider></v-divider>

                        <v-card-text>
                          <v-card-subtitle>
                            Alamat Pegawai :{{ item.alamat_pegawai }}<br />
                            Tanggal Lahir : {{ item.tglLahir_pegawai }}<br />
                            Telepon : {{ item.noTelp_pegawai }}<br />
                            Role : {{ item.stat }}<br />
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
            >Data harap diisi semua</v-card-title
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
      rules: [(value) => !!value || "Wajib diisi."],
      rulesPassword: [(value) => !!value || "Password wajib diisi."],
      password: "Password",
      munculke: 0,
      dialogWarning: "",
      show: false,
      notShow: [],
      dialog: false,
      items: ["Kasir", "Customer Service"],
      keyword: "",
      on: "",
      deleteDialog: "",
      pegawais: [],
      pesan: "",
      dialogEdit: "",
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        NIP: "",
        nama_pegawai: "",
        alamat_pegawai: "",
        tglLahir_pegawai: "",
        noTelp_pegawai: "",
        stat: "",
        password: "",
        gambar: "",

        updateLog_by: sessionStorage.getItem("Nama"),
      },
      pegawai: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: "",
    };
  },
  computed: {
    filteredProduk: function () {
      return this.pegawais.filter((item) => {
        return item.nama_pegawai
          .toLowerCase()
          .match(this.keyword.toLowerCase());
      });
    },
  },

  methods: {
    cekKosong() {
      if (
        this.form.nama_pegawai === "" ||
        this.form.alamat_pegawai === "" ||
        this.form.tglLahir_pegawai === "" ||
        this.form.noTelp_pegawai === "" ||
        this.form.stat === "" ||
        this.form.password === "" ||
        this.form.gambar === ""
      ) {
        this.dialogWarning = true;
      } else {
        this.setForm();
        this.resetForm();
        this.reset();
        this.dialog = false;
      }
    },
    cekKosongEdit() {
      if (
        this.form.nama_pegawai === "" ||
        this.form.alamat_pegawai === "" ||
        this.form.tglLahir_pegawai === "" ||
        this.form.noTelp_pegawai === "" ||
        this.form.stat === ""
      ) {
        this.dialogWarning = true;
      } else {
        this.setForm();
        this.resetForm();
        this.reset();
        this.dialogEdit = false;
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
      var uri = this.$apiUrl4 + "Pegawai/" + "getAll";
      this.$http.get(uri).then((response) => {
        this.pegawais = response.data.message;
      });
    },
    updateMunculke(item) {
      if (this.munculke == 0) this.munculke = item.NIP;
      else if (this.munculke == item.NIP) this.munculke = 0;
      else this.munculke = item.NIP;
      // console.log(this.pegawais[i])
    },
    sendData() {
      this.pegawai.append("NIP", this.form.NIP);
      this.pegawai.append("nama_pegawai", this.form.nama_pegawai);
      this.pegawai.append("alamat_pegawai", this.form.alamat_pegawai);
      this.pegawai.append("tglLahir_pegawai", this.form.tglLahir_pegawai);
      this.pegawai.append("noTelp_pegawai", this.form.noTelp_pegawai);
      this.pegawai.append("stat", this.form.stat);
      this.pegawai.append("password", this.form.password);
      this.pegawai.append("gambar", this.form.gambar);
      this.pegawai.append("updateLog_by", this.form.updateLog_by);

      var uri = this.$apiUrl4 + "Pegawai";
      this.load = true;
      this.$http
        .post(uri, this.pegawai)
        .then((response) => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialog = false;
          this.getData(); //mengambil [pegawai]
          this.resetForm();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
        });
    },
    updateData() {
      this.pegawai.append("NIP", this.form.NIP);
      this.pegawai.append("nama_pegawai", this.form.nama_pegawai);
      this.pegawai.append("alamat_pegawai", this.form.alamat_pegawai);
      this.pegawai.append("tglLahir_pegawai", this.form.tglLahir_pegawai);
      this.pegawai.append("noTelp_pegawai", this.form.noTelp_pegawai);
      this.pegawai.append("stat", this.form.stat);
      this.pegawai.append("gambar", this.form.gambar);
      this.pegawai.append("updateLog_by", this.form.updateLog_by);
      var uri = this.$apiUrl4 + "Pegawai/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.pegawai)
        .then((response) => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialogEdit = false;
          this.getData(); //mengambil databong
          this.resetForm();
          this.typeInput = "new";
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
          this.typeInput = "new";
        });
    },
    editHandler(item) {
      this.typeInput = "edit";
      this.dialogEdit = true;
      this.form.NIP = item.NIP;
      this.form.nama_pegawai = item.nama_pegawai;
      this.form.alamat_pegawai = item.alamat_pegawai;
      this.form.tglLahir_pegawai = item.tglLahir_pegawai;
      this.form.noTelp_pegawai = item.noTelp_pegawai;
      this.form.stat = item.stat;
      this.form.gambar = item.gambar;
      this.updatedId = item.NIP;
    },
    deleteRow(item) {
      this.deleteId = item.NIP;
      this.deleteDialog = true;
    },
    deleteData(deleteId) {
      //mengahapus data

      var uri = this.$apiUrl4 + "Pegawai" + "/delete/" + deleteId; //data dihapus berdasarkan id
      this.load = true;
      this.$http
        .post(uri, this.pegawai)
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
          this.text = "Coba Lagi";
          this.color = "red";
        });
    },
    setForm() {
      if (this.typeInput === "new") {
        this.sendData();
      } else {
        console.log("data berhasil diubah");
        this.updateData();
      }
    },
    resetForm() {
      this.form = {
        NIP: "",
        nama_pegawai: "",
        alamat_pegawai: "",
        tglLahir_pegawai: "",
        noTelp_pegawai: "",
        stat: "",
        password: "",
        gambar: "",
        updateLog_by: sessionStorage.getItem("Nama"),
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
