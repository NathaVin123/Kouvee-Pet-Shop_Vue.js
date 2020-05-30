<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-card max-width="" class="text-md-center" justify-content-center>
            <v-container grid-list-md mb-5>
              <h1 class="text-md-center">Menu Laporan</h1>
              <v-spacer></v-spacer>
              <v-row>
                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Pengadaan Bulanan
                        </h2>
                        <div class="text--primary">
                          Untuk mencetak laporan pengadaan sesuai bulan dan tahun yang
                          dipilih.<br />
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            left
                            bottom=""
                            rounded=""
                            small
                            color="green accent-3"
                            @click="dialogPengadaanBulanan = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>

                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Pengadaan Tahunan
                        </h2>
                        <div class="text--primary">
                          Untuk mencetak laporan pengadaan sesuai tahun yang
                          dipilih.<br />
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            left
                            bottom=""
                            rounded=""
                            small
                            color="green accent-3"
                            @click="dialogPengadaanTahunan = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>

                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Pendapatan Bulanan
                        </h2>
                        <div class="text--primary">
                          Untuk mencetak laporan Pendapatan sesuai bulan dan tahun
                          yang dipilih.<br />
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            left
                            bottom=""
                            rounded=""
                            small
                            color="green accent-3"
                            @click="dialogPendapatanBulanan = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>

                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Pendapatan Tahunan
                        </h2>
                        <div class="text--primary">
                          Untuk mencetak laporan Pendapatan sesuai tahun yang
                          dipilih.<br />
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            left
                            bottom=""
                            rounded=""
                            small
                            color="green accent-3"
                            @click="dialogPendapatanTahunan = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>

                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Produk Terlaris
                        </h2>
                        <div class="text--primary">
                          Untuk mencetak laporan produk terlaris dalam satu tahun.<br />
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            left
                            bottom=""
                            rounded=""
                            small
                            color="green accent-3"
                            @click="dialogProdukTerlaris = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>

                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Layanan Terlaris
                        </h2>
                        <div class="text--primary">
                          Untuk mencetak laporan layanan terlaris dalam satu tahun.<br />
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            left
                            bottom=""
                            rounded=""
                            small
                            color="green accent-3"
                            @click="dialogLayananTerlaris = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogPengadaanBulanan"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Silakan pilih Tanggal Pengadaan</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-dialog
                              ref="dialog"
                              v-model="modal1"
                              :return-value.sync="date"
                              persistent
                              width="50%"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="date1"
                                  label="Tanggal Pengadaan"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-on="on"
                                  outlined=""
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="date1"
                                type="month"
                                scrollable
                                :landscape="$vuetify.breakpoint.smAndUp"
                                full-width=""
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="modal1 = false"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.dialog.save(date1)"
                                  >OK</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="resetForm(), (dialogPengadaanBulanan = false)"
                        >Close</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongLaporanPengadaan(date1)"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogPengadaanTahunan"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Silakan pilih Tahun Pengadaan</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              outlined
                              type="text"
                              class="form-control"
                              placeholder="Masukan tahun pengadaan"
                              :maxlength="max"
                              v-model="date4"
                              prepend-icon="mdi-calendar"
                              counter="4"
                              @input="onlyNumbers"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="resetForm(), (dialogPengadaanTahunan = false)"
                        >Close</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongLaporanPengadaanTahunan(date4)"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogPendapatanBulanan"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Silakan pilih Tanggal Pendapatan</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-dialog
                              ref="dialog"
                              v-model="modal2"
                              :return-value.sync="date2"
                              persistent
                              width="50%"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="date2"
                                  label="Tanggal Pendapatan"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-on="on"
                                  outlined=""
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="date2"
                                type="month"
                                scrollable
                                :landscape="$vuetify.breakpoint.smAndUp"
                                full-width=""
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="modal2 = false"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.dialog.save(date2)"
                                  >OK</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="resetForm(), (dialogPendapatanBulanan = false)"
                        >Close</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongPendapatanBulanan(date2)"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogProdukTerlaris"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Silakan pilih Tahun Transaksi</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              outlined
                              type="text"
                              class="form-control"
                              placeholder="Masukan tahun transaksi"
                              :maxlength="max"
                              v-model="date3"
                              prepend-icon="mdi-calendar"
                              counter="4"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="resetForm(), (dialogProdukTerlaris = false)"
                        >Close</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongProdukTerlaris(date3)"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogLayananTerlaris"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Silakan pilih Tahun Transaksi</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              outlined
                              type="text"
                              class="form-control"
                              placeholder="Masukan tahun transaksi"
                              :maxlength="max"
                              v-model="date3"
                              prepend-icon="mdi-calendar"
                              counter="4"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="resetForm(), (dialogLayananTerlaris = false)"
                        >Close</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongLayananTerlaris(date3)"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogPendapatanTahunan"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Silakan pilih Tahun Pendapatan</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              outlined
                              type="text"
                              class="form-control"
                              placeholder="Masukan tahun pendapatan"
                              :maxlength="max"
                              v-model="date4"
                              prepend-icon="mdi-calendar"
                              counter="4"
                              @input="onlyNumbers"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="resetForm(), (dialogPendapatanTahunan = false)"
                        >Close</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongPendapatanTahunan(date4)"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- ------------------Dialog untuk warning kosong-------------------------------------- -->
              <div class="text-center">
                <v-dialog width="500" v-model="dialogWarning">
                  <v-card>
                    <v-card-title class="headline Red lighten-2" primary-title
                      >Data Harus Diisi</v-card-title
                    >

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialogWarning = false"
                        >Close</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "12",
      max: 4,
      date1: null,
      date2: null,
      date3: null,
      date4: null,
      landscape: false,
      menu1: false,
      menu2: false,
      modal1: false,
      modal2: false,
      e13: 1,
      bulan: "",
      dialogPengadaanBulanan: false,
      dialogPengadaanTahunan: false,
      dialogPendapatanBulanan: false,
      dialogPendapatanTahunan: false,
      dialogProdukTerlaris: false,
      dialogLayananTerlaris: false,
      dialogWarning: false,
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    cekKosongProdukTerlaris(param) {
      if (param == null) {
        this.dialogWarning = true;
      } else {
        this.cetakProdukTerlaris(param);
        this.dialogProdukTerlaris = false;
      }
    },
    cekKosongLayananTerlaris(param) {
      if (param == null) {
        this.dialogWarning = true;
      } else {
        this.cetakLayananTerlaris(param);
        this.dialogLayananTerlaris = false;
      }
    },
    onlyNumbers: function () {
      this.message = this.message.replace(/[^0-9.]/g, "");
    },
    cekKosongLaporanPengadaan(param) {
      if (param == null) {
        this.dialogWarning = true;
      } else {
        this.cetakLaporanBulanan(param);
        this.dialogPengadaanBulanan = false;
      }
    },
    cekKosongLaporanPengadaanTahunan(param) {
      if (param == null) {
        this.dialogWarning = true;
      } else {
        this.cetakLaporanTahunan(param);
        this.dialogPengadaanTahunan = false;
      }
    },
    cekKosongPendapatanBulanan(param) {
      if (param == null) {
        this.dialogWarning = true;
      } else {
        this.cetakPendapatanBulanan(param);
        this.dialogPendapatanBulanan = false;
      }
    },
    cekKosongPendapatanTahunan(param) {
      if (param == null) {
        this.dialogWarning = true;
      } else {
        this.cetakPendapatanTahunan(param);
        this.dialogPendapatanTahunan = false;
      }
    },
    cetakLaporanBulanan(pengadaanBulanan) {
      var uri =
        this.$apiUrl4 + "Laporan/laporanPengadaanBulanan/" + pengadaanBulanan;
      window.open(uri, "_blank");
      this.resetForm();
    },
    cetakLaporanTahunan(pengadaanTahunan) {
      var uri =
        this.$apiUrl4 + "Laporan/laporanPengadaanTahunan/" + pengadaanTahunan;
      window.open(uri, "_blank");
      this.resetForm();
    },
    cetakPendapatanBulanan(pendapatanBulanan) {
      var uri =
        this.$apiUrl4 + "Laporan/laporanPendapatanBulanan/" + pendapatanBulanan;
      window.open(uri, "_blank");
      this.resetForm();
    },
    cetakProdukTerlaris(produkTerlaris) {
      var uri =
        this.$apiUrl4 + "Laporan/laporanProdukTerlaris/" + produkTerlaris;
      window.open(uri, "_blank");
      this.resetForm();
    },
    cetakLayananTerlaris(layananTerlaris) {
      var uri =
        this.$apiUrl4 + "Laporan/laporanLayananTerlaris/" + layananTerlaris;
      window.open(uri, "_blank");
      this.resetForm();
    },
    cetakPendapatanTahunan(pendapatanTahunan) {
      var uri =
        this.$apiUrl4 + "Laporan/laporanPendapatanTahunan/" + pendapatanTahunan;
      window.open(uri, "_blank");
      this.resetForm();
    },
    resetForm() {
      this.date1 = null;
      this.date2 = null;
      this.date3 = null;
      this.date4 = null;
    },
  },
  mounted() {},
};
</script>
<style scoped>
.text-md-center {
  font-family: "Raleway", sans-serif;
}
.text-center {
  font-family: "Raleway", sans-serif;
}
.v-card__title {
  color: black;
}

@import "~vue-snotify/styles/material.css";
</style>
