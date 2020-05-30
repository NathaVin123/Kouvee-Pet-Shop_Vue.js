<template>
  <div class="ma-3">
    <!-- ------------------Menu Transaksi Layanan-------------------------------------- -->
    <v-card>
      <div class="pa-3">
        <div class="mb-3">
          <v-tabs v-model="layananTab" color="green accent-3" centered>
            <v-tabs-slider color="green accent-3"></v-tabs-slider>
            <v-tab href="#layananTab-1">Menunggu Pembayaran</v-tab>
            <v-tab href="#layananTab-2">Lunas</v-tab>
          </v-tabs>
        </div>
        <div v-if="this.layananTab == 'layananTab-2'">
          <h2 class="text-md-center">Data Transaksi Layanan</h2>
          <v-layout row wrap style="margin: 10px;">
            <v-flex xs6 class="text-right">
              <v-text-field
                v-model="keyword"
                append-icon="mdi-search"
                label="Cari Data Transaksi Layanan"
                hide-details="auto"
                outlined
                clearable
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers2"
            :items="filterProgress(transaksiLayanans2)"
            :search="keyword"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  v-for="(item, index) in items"
                  :key="item.kode_penjualan_layanan"
                >
                  <td>{{ index + 1 }}</td>
                  <td
                    class="underlinetext"
                    @click="showDetail(item)"
                    style="cursor: pointer;"
                  >
                    {{ item.kode_penjualan_layanan }}
                  </td>
                  <td>{{ item.nama_customer }}</td>
                  <td>{{ item.nama_hewan }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.status_transaksi }}</td>
                  <td>{{ item.createLog_at }}</td>
                  <td>{{ item.updateLog_at }}</td>
                  <!-- <td>{{ item.delete_by }}</td>
                  <td>{{ item.delete_at }}</td>-->
                  <td>
                    <div>
                      <v-btn
                        icon
                        color="red lighten-2"
                        dark
                        v-on="on"
                        @click="cetakStruk(item)"
                      >
                        <v-icon>mdi-pdf-box</v-icon>
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </div>
        <div v-if="this.layananTab == 'layananTab-1'">
          <h2 class="text-md-center">Data Transaksi Layanan</h2>
          <v-layout row wrap style="margin: 10px;">
            <v-flex xs6 class="text-right">
              <v-text-field
                v-model="keyword"
                append-icon="mdi-search"
                label="Cari Data Transaksi Layanan"
                hide-details="auto"
                outlined
                clearable
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers2"
            :items="filterProgress2(transaksiLayanans2)"
            :search="keyword"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  v-for="(item, index) in items"
                  :key="item.kode_penjualan_layanan"
                >
                  <td>{{ index + 1 }}</td>
                  <td
                    class="underlinetext"
                    @click="showDetail(item)"
                    style="cursor: pointer;"
                  >
                    {{ item.kode_penjualan_layanan }}
                  </td>
                  <td>{{ item.nama_customer }}</td>
                  <td>{{ item.nama_hewan }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.status_transaksi }}</td>
                  <td>{{ item.createLog_at }}</td>
                  <td>{{ item.updateLog_at }}</td>
                  <!-- <td>{{ item.delete_by }}</td>
                  <td>{{ item.delete_at }}</td>-->

                  <td>
                    <div>
                      <v-btn
                        icon
                        color="blue"
                        light
                        @click="editHandlerTransaksiLayanan(item)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </div>
                    <div>
                      <v-btn
                        icon
                        color="red lighten-2"
                        dark
                        v-on="on"
                        @click="
                          deleteRowLayanan(item),
                            getDetailTransaksiLayananById(item)
                        "
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-card>
    <!-- ------------------Dialog untuk konfirmasi delete-------------------------------------- -->
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
            <v-btn
              color="primary"
              text
              @click="resetArray(), (deleteDialog = false)"
              >Batal</v-btn
            >
            <v-btn
              color="primary"
              text
              @click="deleteDataLayanan(deleteId), resetArray()"
              >Hapus Transaksi</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- ------------------Dialog untuk konfirmasi delete detail produk/layanan-------------------------------------- -->
    <div class="text-center">
      <v-dialog width="500" v-model="deleteDetailDialog">
        <v-card>
          <v-card-title class="headline Red lighten-2" primary-title
            >Konfirmasi Hapus</v-card-title
          >
          <v-card-text>Data yang akan dihapus, Lanjutkan ?</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteDetailDialog = false"
              >Batal</v-btn
            >
            <v-btn
              color="primary"
              text
              @click="deleteDataDetailLayanan(deleteId)"
              >Hapus Layanan</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!------------------------ Detail Layanan Dialog ------------------------>
    <template>
      <v-dialog
        v-model="dialogDetailTransaksiLayanan"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <v-spacer />
            <h2 class="text-md-center">
              {{ "Id Transaksi Layanan: " + detailItem.kode_penjualan_layanan }}
            </h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <!-- <v-container> -->
            <v-simple-table height="50%">
              <thead>
                <tr>
                  <th class="text-left">Id Detil Layanan</th>
                  <th class="text-left">Nama Layanan</th>
                  <th class="text-left">Ukuran Hewan</th>
                  <th class="text-left">Harga Satuan</th>
                  <th class="text-left">Jumlah</th>
                  <th class="text-left">Total Harga</th>
                  <th class="text-left">Tanggal Dibuat</th>
                  <th class="text-left">Tanggal Diubah</th>
                  <th
                    v-if="detailItem.status_transaksi != 'Lunas'"
                    class="text-left"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in filteredItems(detailItem)"
                  :key="item.id_detaillayanan"
                >
                  <td>{{ item.id_detaillayanan }}</td>
                  <td>{{ item.nama_layanan }}</td>
                  <td>{{ item.nama_ukuranHewan }}</td>
                  <td>{{ item.harga }}</td>
                  <td>{{ item.jml_transaksi_layanan }}</td>
                  <td>{{ item.total_harga }}</td>
                  <td>{{ item.createLog_at }}</td>
                  <td>{{ item.updateLog_at }}</td>
                  <td v-if="detailItem.status_transaksi != 'Lunas'">
                    <div>
                      <v-btn
                        icon
                        color="blue"
                        light
                        class="tombol"
                        outlined=""
                        @click="editHandlerLayanan(item)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </div>
                    <div>
                      <v-btn
                        icon
                        color="red lighten-2"
                        light
                        class="tombol"
                        outlined=""
                        v-on="on"
                        @click="deleteRowDetailLayanan(item)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <!-- </v-container> -->
            <br />
            <div
              v-if="detailItem.status_transaksi != 'Lunas'"
              class="text-right"
              id="right"
            >
              <v-btn
                icon
                color="blue"
                light
                class="tombol"
                outlined=""
                @click="
                  setIdTransaksiLayanan(detailItem), (dialogEditLayanan = true)
                "
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="text-right">
              <v-simple-table>
                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ "Subtotal : Rp" }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.subtotal }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ "Diskon : Rp" }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.diskon }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ "Total : Rp" }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.total }}</h3>
                    </td>
                  </tr>
                </td>

                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ "Nama Pelanggan : " }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.nama_customer }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ "Nama Hewan : " }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.nama_hewan }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ "Jenis Hewan : " }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.nama_jenisHewan }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ "Nomor Telpon : " }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.noTelp_customer }}</h3>
                    </td>
                  </tr>
                  <tr v-if="this.layananTab == 'layananTab-2'">
                    <td>
                      <h3>{{ "Tanggal Lunas : " }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.tanggal_lunas }}</h3>
                    </td>
                  </tr>
                </td>

                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ "Id Customer Service : " }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.id_customer_service }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ "Id Kasir : " }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.id_kasir }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ "Nama Customer Service : " }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.nama_customer_service }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ "Nama Kasir : " }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.nama_kasir }}</h3>
                    </td>
                  </tr>
                </td>
              </v-simple-table>

              <div v-if="this.layananTab == 'layananTab-1'">
                <v-btn
                  depressed
                  dark
                  class="elevation-2"
                  x-large
                  style="text-transform: none !important;"
                  color="green accent-3"
                  @click="
                    (dialogDetailTransaksiLayanan = false),
                      updateStatusLayanan(detailItem)
                  "
                >
                  <v-icon size="18" class="mr-2">mdi-check-bold</v-icon>Bayar
                  Sekarang
                </v-btn>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogDetailTransaksiLayanan = false"
              >Tutup</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- ---------------------Dialog Edit Transaksi Layanan-------------------------------- -->
    <v-row justify="center">
      <v-dialog
        v-model="dialogEditTransaksiLayanan"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Ubah Detail Transaksi Layanan</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="formLayanan.id_hewan"
                    required
                    width
                    :items="hewans"
                    item-value="id_hewan"
                    item-text="nama_hewan"
                    label="Nama Hewan*"
                    outlined
                    color="purple"
                    :filter="customFilter"
                    hide-selected=""
                  ></v-autocomplete>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Diskon*"
                    v-model="formLayanan.diskon"
                    color="purple"
                    type="number"
                    outlined
                    single-line
                    clearable
                    @change="setNewEditTotal2()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-divider light></v-divider>
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
              @click="dialogEditTransaksiLayanan = false"
              >Tutup</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateDataLayanan(), (dialogEditTransaksiLayanan = false)"
              >Simpan</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- ---------------------Dialog Edit Detil Layanan-------------------------------- -->
    <v-row justify="center">
      <v-dialog v-model="dialogEditLayanan" persistent max-width="1300px">
        <v-card>
          <div v-if="this.detilJudulLayanan == 1">
            <v-card-title>
              <span class="headline">Tambah Detail Transaksi Layanan</span>
            </v-card-title>
          </div>
          <div v-if="this.detilJudulLayanan == 0">
            <v-card-title>
              <span class="headline">Ubah Detail Transaksi Layanan</span>
            </v-card-title>
          </div>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="formLayanan.id_layanan"
                    required
                    width=""
                    :items="layanans"
                    @change="setHargaLayananEdit()"
                    item-value="id_layanan"
                    item-text="nama_layanan"
                    label="Nama Layanan*"
                    outlined
                    color="purple"
                    hide-selected
                    :filter="customFilter"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="2">
                  <v-autocomplete
                    v-model="formLayanan.id_ukuran_hewan"
                    required
                    width=""
                    :items="ukurans"
                    @change="setHargaLayananEdit()"
                    item-value="id_ukuran_hewan"
                    item-text="nama_ukuranHewan"
                    label="Ukuran*"
                    outlined
                    color="purple"
                    hide-selected
                    :filter="customFilter"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Jumlah*"
                    v-model="formLayanan.jml_transaksi_layanan"
                    color="purple"
                    type="number"
                    outlined
                    single-line
                    clearable
                    @change="setSubtotalEditLayanan(), setHargaLayananEdit()"
                  ></v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-text-field
                    label="Harga Layanan*"
                    v-model="formLayanan.harga"
                    value=""
                    outlined=""
                    readonly=""
                    color="purple"
                    prefix="Rp."
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Subtotal*"
                    v-model="formLayanan.total_harga"
                    value=""
                    outlined=""
                    readonly=""
                    color="purple"
                    prefix="Rp."
                  ></v-text-field>
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
              @click="(dialogEditLayanan = false), resetFormLayanan()"
              >Tutup</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="setFormLayanan(), (dialogEditLayanan = false)"
              >Simpan</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- ----------------------------------------------------------------------------- -->

    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="true"
      :timeout="3000"
    >
      {{ text }}
      <v-btn dark text @click="snackbar = false">Tutup</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cari: "",
      dialog: false,
      cekHewans: false,
      detilTransaksis: [],
      detailTransaksiLayanans: [],
      selectedIndex: 0,
      detailItem: "",
      transaksiLayanans: [],
      transaksiLayanans2: [],
      dialogEditLayanan: false,
      dialogEditTransaksiLayanan: false,
      detailIdTransaksiLayanansFiltered: [],
      keyword: "",
      jenishewans: [],
      hewans: [],
      pelanggans: [],
      ukurans: [],
      layanans: [],
      bottomNav: 1,
      menu: false,
      on: "",
      submit: "",
      headers2: [
        {
          text: "No",
          value: "index",
        },
        {
          text: "Kode Penjualan Layanan",
          value: "kode_penjualan_layanan",
        },
        {
          text: "Nama Customer",
          value: "nama_customer",
        },
        {
          text: "Nama Hewan",
          value: "nama_hewan",
        },
        {
          text: "Total",
          value: "total",
        },
        {
          text: "Status Transaksi",
          value: "status_transaksi",
        },
        {
          text: "Tanggal Dibuat",
          value: "createLog_at",
        },
        {
          text: "Tanggal Diubah",
          value: "updateLog_at",
        },
        {
          text: "Aksi",
          value: null,
        },
      ],
      layananTab: null,
      detilJudulLayanan: 0,
      dialogWarning: "",
      dialogEdit: "",
      dialogPassword: "",
      dialogDetailTransaksiLayanan: false,
      deleteDialog: "",
      deleteDetailDialog: "",
      pesan: "",
      empty: null,
      id_hewan: null,
      search: "",
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        subtotal: "",
        diskon: "",
        id_jenis_hewan: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama"),
        id_customer_service: sessionStorage.getItem("Id"),
      },
      formLayanan: {
        id_hewan: "",
        total: "",
        diskon: "",
        kode_penjualan_layanan: "",
        subtotal: "",
        id_harga_layanan: "",
        total_harga: "",
        id_layanan: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama"),
        id_customer_service: sessionStorage.getItem("Id"),
      },
      user2: new FormData(),
      detil2: new FormData(),
      transaksiLayanan: new FormData(),
      deleteLayanan: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: "",
    };
  },
  watch: {
    id_hewan() {
      this.empty = "";
    },
  },

  methods: {
    isHaveHewan() {
      var hewan = false;
      this.hewans.forEach((item) => {
        if (item.id_hewan == this.id_hewan) {
          console.log(
            "id hewan: " + item.id_hewan + ", id input: " + this.id_hewan
          );
          this.cekHewans = true;
          hewan = true;
        }
      });
      if (!hewan) {
        this.form.diskon = 0;
        this.cekHewans = false;
      }
    },
    isGuestLayanan() {
      for (var i = 0; i < this.transaksiLayanans.length; i++) {
        if (this.transaksiLayanans[i].id_hewan == null) {
          this.transaksiLayanans[i].nama_hewan = "-";
          this.transaksiLayanans[i].nama_jenisHewan = "-";
          this.transaksiLayanans[i].nama_customer = "Guest";
          this.transaksiLayanans[i].noTelp_customer = "-";
          this.transaksiLayanans[i].diskon = "0";
        }
      }
    },
    isHaveKasirLayanan() {
      for (var i = 0; i < this.transaksiLayanans.length; i++) {
        if (this.transaksiLayanans[i].id_kasir == null) {
          this.transaksiLayanans[i].id_kasir = "-";
          this.transaksiLayanans[i].nama_kasir = "-";
        }
      }
    },
    isHaveDiskonLayanan() {
      for (var i = 0; i < this.transaksiLayanans.length; i++) {
        if (this.transaksiLayanans[i].diskon == null) {
          this.transaksiLayanans[i].diskon = "0";
        }
      }
    },
    filterProgress() {
      return this.transaksiLayanans.filter((transaksiLayanan) => {
        return (
          transaksiLayanan.status_transaksi.match("Lunas") &&
          transaksiLayanan.proses.match("Layanan Selesai")
        );
      });
    },
    filteredItems(value) {
      return this.detailTransaksiLayanans.filter((i) => {
        return (
          !value.kode_penjualan_layanan ||
          i.kode_penjualan_layanan === value.kode_penjualan_layanan
        );
      });
    },
    filteredItems2(value) {
      return this.detailTransaksiProduks.filter((i) => {
        return (
          !value.id_transaksi_produk ||
          i.id_transaksi_produk === value.id_transaksi_produk
        );
      });
    },
    filterProgress2() {
      return this.transaksiLayanans.filter((transaksiLayanan) => {
        return (
          transaksiLayanan.status_transaksi.match("Menunggu Pembayaran") &&
          transaksiLayanan.proses.match("Layanan Selesai")
        );
      });
    },
    selectTabs(selectedTabs) {
      this.tabs = selectedTabs;
    },
    deleteRow2(_detilTransaksi) {
      this.detilLayanans.splice(this.detilLayanans.indexOf(_detilTransaksi), 1);
    },
    resetArray() {
      this.detailIdTransaksiLayanansFiltered = [];
    },
    resetDynamic2() {
      while (this.detilLayanans.length != 0) {
        for (var i = 0; i < this.detilLayanans.length; i++) {
          this.detilLayanans.splice(this.detilLayanans[i], 1);
        }
      }
      this.resetForm();
    },
    getUkuran() {
      var uri = this.$apiUrl4 + "UkuranHewan";
      this.$http.get(uri).then((response) => {
        this.ukurans = response.data.message;
      });
    },
    addTransaksi() {
      this.getProduk();
      this.detilTransaksis.push({
        id_customer_service: sessionStorage.getItem("Id"),
        id_transaksi_produk: "",
        id_produk: "",
        jml_transaksi_layanan: "",
        total_harga: "",
        harga: "",
        createLog_at: "",
        created_by: sessionStorage.getItem("Nama"),
        updateLog_at: "",
        modified_by: "",
        delete_at: "",
        delete_by: "",
      });
    },

    filteredHargaLayanan(index) {
      var uri =
        this.$apiUrl4 +
        "layananharga/" +
        "searchByIdLayananUkuran/" +
        this.detilLayanans[index].id_layanan +
        "/" +
        this.detilLayanans[index].id_ukuran_hewan;
      this.$http.get(uri).then((response) => {
        this.detilLayanans[index].harga = response.data.message.harga;
        this.detilLayanans[index].id_harga_layanan =
          response.data.message.id_harga_layanan;
        this.detilLayanans[index].total_harga =
          this.detilLayanans[index].harga *
          this.detilLayanans[index].jml_transaksi_layanan;
      });
    },
    setHargaLayananEdit() {
      var uri =
        this.$apiUrl4 +
        "layananharga/" +
        "searchByIdLayananUkuran/" +
        this.formLayanan.id_layanan +
        "/" +
        this.formLayanan.id_ukuran_hewan;
      this.$http.get(uri).then((response) => {
        this.formLayanan.harga = response.data.message.harga;
        this.formLayanan.id_harga_layanan =
          response.data.message.id_harga_layanan;
        this.formLayanan.total_harga =
          this.formLayanan.harga * this.formLayanan.jml_transaksi_layanan;
        console.log(this.formLayanan.id_harga_layanan);
      });
    },
    setSubtotalEditLayanan() {
      this.formLayanan.total_harga =
        this.formLayanan.harga * this.formLayanan.jml_transaksi_layanan;
    },
    setNewEditTotal2() {
      this.formLayanan.total =
        this.formLayanan.subtotal - this.formLayanan.diskon;
    },
    getHewan() {
      var uri = this.$apiUrl4 + "Hewan/" + "all";
      this.$http.get(uri).then((response) => {
        this.hewans = response.data.message;
      });
    },
    getJenisHewan() {
      var uri = this.$apiUrl4 + "JenisHewan";
      this.$http.get(uri).then((response) => {
        this.jenishewans = response.data.message;
      });
    },
    getPelanggan() {
      var uri = this.$apiUrl4 + "Pelanggan/" + "all";
      this.$http.get(uri).then((response) => {
        this.pelanggans = response.data.message;
      });
    },
    getLayanan() {
      var uri = this.$apiUrl4 + "Layanan";
      this.$http.get(uri).then((response) => {
        this.layanans = response.data.message;
      });
    },
    getDataLayanan() {
      var uri = this.$apiUrl4 + "transaksipenjualanlayanan/" + "getWithJoin";
      this.$http.get(uri).then((response) => {
        this.transaksiLayanans = response.data.message;
        this.isGuestLayanan();
        this.isHaveKasirLayanan();
        this.isHaveDiskonLayanan();
      });
    },
    getDataTransaksiLayanan() {
      var uri = this.$apiUrl4 + "detailtransaksilayanan/" + "getWithJoin";
      this.$http.get(uri).then((response) => {
        this.detailTransaksiLayanans = response.data.message;
      });
    },
    getDetailTransaksiLayananById(item) {
      this.updatedId = item.kode_penjualan_layanan;
      var uri =
        this.$apiUrl4 +
        "detailtransaksilayanan/" +
        "getByTransactionId/" +
        this.updatedId;
      this.$http.get(uri).then((response) => {
        this.detailIdTransaksiLayanans = response.data.message;
        for (var i = 0; i < this.detailIdTransaksiLayanans.length; i++) {
          this.detailIdTransaksiLayanansFiltered[
            i
          ] = this.detailIdTransaksiLayanans[i].id_detaillayanan;
        }
        console.log(this.detailIdTransaksiLayanansFiltered);
      });
    },
    setIdTransaksiLayanan(item) {
      this.detilJudulLayanan = 1;
      this.formLayanan.kode_penjualan_layanan = item.kode_penjualan_layanan;
      console.log(this.formLayanan.kode_penjualan_layanan);
    },

    updateStatusLayanan(detailItem) {
      this.updatedId = detailItem.kode_penjualan_layanan;
      this.transaksiLayanan.append("id_kasir", sessionStorage.getItem("Nama"));
      this.transaksiLayanan.append(
        "modified_by",
        sessionStorage.getItem("Nama")
      );
      console.log(detailItem.kode_penjualan_layanan);
      var uri =
        this.$apiUrl4 +
        "transaksipenjualanlayanan/" +
        "updateStatus/" +
        this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.transaksiLayanan)
        .then(() => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = "Layanan Berhasil Dibayar"; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialogEdit = false;
          this.getDataLayanan();
          this.getDataTransaksiLayanan(); //mengambil data transaksi layanan
          this.typeInput = "new";
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
        });
    },
    editHandlerLayanan(item) {
      this.typeInput = "edit";
      this.detilJudulLayanan = 0;
      this.dialogEditLayanan = true;
      this.formLayanan.id_layanan = item.id_layanan;
      this.formLayanan.id_ukuran_hewan = item.id_ukuran_hewan;
      this.formLayanan.jml_transaksi_layanan = item.jml_transaksi_layanan;
      this.formLayanan.total_harga = item.total_harga;
      this.formLayanan.id_transaksi_Layanan = item.kode_penjualan_layanan;
      console.log(this.formLayanan.id_transaksi_Layanan);
      this.updatedId = item.id_detaillayanan;
    },
    editHandlerTransaksiLayanan(item) {
      this.typeInput = "edit";
      this.dialogEditTransaksiLayanan = true;
      this.formLayanan.id_hewan = item.id_hewan;
      this.formLayanan.subtotal = item.subtotal;
      this.formLayanan.total = item.total;
      this.formLayanan.diskon = item.diskon;
      this.formLayanan.kode_penjualan_layanan = item.kode_penjualan_layanan;
      this.updatedId = item.kode_penjualan_layanan;
    },
    deleteDataLayanan(deleteId) {
      var uri = this.$apiUrl4 + "transaksipenjualanlayanan/" + deleteId; //data dihapus berdasarkan id
      this.$http
        .delete(uri)
        .then((response) => {
          this.text = response.data.message;
          this.deleteMultipleDataDetailLayanan();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
        });
    },
    updateDataLayanan() {
      this.detil2.append("id_hewan", this.formLayanan.id_hewan);
      this.detil2.append("diskon", this.formLayanan.diskon);
      this.detil2.append("subtotal", this.formLayanan.subtotal);
      this.detil2.append("total", this.formLayanan.total);
      this.detil2.append("modified_by", this.formLayanan.modified_by);
      var uri =
        this.$apiUrl4 +
        "transaksipenjualanlayanan/" +
        "update/" +
        this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.detil2)
        .then((response) => {
          this.snackbar = true;
          this.color = "green";
          this.text = response.data.message;
          this.load = false;
          this.dialogEditTransaksiProduk = false;
          this.getDataTransaksiLayanan();
          this.getDataLayanan();
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
    updateDataDetilLayanan() {
      this.user2.append("id_harga_layanan", this.formLayanan.id_harga_layanan);
      this.user2.append("id_layanan", this.formLayanan.id_Layanan);
      this.user2.append(
        "jml_transaksi_layanan",
        this.formLayanan.jml_transaksi_layanan
      );
      this.user2.append("total_harga", this.formLayanan.total_harga);
      this.user2.append("modified_by", this.formLayanan.modified_by);
      var uri =
        this.$apiUrl4 + "detailtransaksilayanan/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.user2)
        .then((response) => {
          this.snackbar = true;
          this.color = "green";
          this.text = response.data.message;
          this.load = false;
          this.dialogEdit = false;
          this.getDataTransaksiLayanan();
          this.getDataLayanan();
          this.resetFormLayanan();
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
    deleteMultipleDataDetailLayanan() {
      this.deleteLayanan.append(
        "id_detaillayanan",
        JSON.stringify(this.detailIdTransaksiLayanansFiltered)
      );
      var uri = this.$apiUrl4 + "detailtransaksilayanan/" + "deleteMultiple";
      this.load = true;
      this.$http
        .post(uri, this.deleteLayanan)
        .then(() => {
          this.snackbar = true;
          this.color = "green";
          this.text = "Berhasil";
          this.load = false;
          this.deleteDialog = false;
          this.getDataLayanan();
          this.getDataTransaksiLayanan();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
        });
    },
    async deleteDataDetailLayanan(deleteId) {
      var uri = this.$apiUrl4 + "detailtransaksilayanan/" + deleteId; //data dihapus berdasarkan id
      await this.$http
        .delete(uri)
        .then((response) => {
          this.snackbar = true;
          this.text = response.data.message;
          this.color = "green";
          this.deleteDetailDialog = false;
          this.getDataLayanan();
          this.getDataTransaksiLayanan();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
        });
    },
    deleteRowLayanan(item) {
      this.deleteId = item.kode_penjualan_layanan;
      this.deleteDialog = true;
    },
    deleteRowDetailLayanan(item) {
      this.deleteId = item.id_detaillayanan;
      this.deleteDetailDialog = true;
    },
    setFormProduk() {
      if (this.typeInput === "new") {
        this.sendDataProduk();
      } else {
        console.log("data berhasil diubah");
        this.updateDataProduk();
      }
    },
    showDetail(item) {
      this.detailItem = item;
      this.dialogDetailTransaksiLayanan = true;
    },
    setFormLayanan() {
      if (this.typeInput === "new") {
        this.addLayananDetil();
      } else {
        console.log("data berhasil diubah");
        this.updateDataDetilLayanan();
      }
    },
    addLayananDetil() {
      this.user2.append(
        "kode_penjualan_layanan",
        this.formLayanan.kode_penjualan_layanan
      );
      this.user2.append("id_harga_layanan", this.formLayanan.id_harga_layanan);
      this.user2.append("id_layanan", this.formLayanan.id_Layanan);
      this.user2.append(
        "jml_transaksi_layanan",
        this.formLayanan.jml_transaksi_layanan
      );
      this.user2.append("total_harga", this.formLayanan.total_harga);
      this.user2.append("created_by", this.formLayanan.created_by);
      var uri = this.$apiUrl4 + "detailtransaksilayanan";
      this.load = true;
      this.$http
        .post(uri, this.user2)
        .then((response) => {
          this.snackbar = true;
          this.color = "green";
          this.text = response.data.message;
          this.load = false;
          this.getDataLayanan();
          this.getDataTransaksiLayanan();
          this.resetFormLayanan();
          this.dialogEditLayanan = false;
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
        });
    },
    customFilter(item, queryText) {
      const textOne = item.nama.toLowerCase();
      const textTwo = item.nama.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    resetFormLayanan() {
      this.formLayanan = {
        id_hewan: "",
        total: "",
        diskon: "",
        kode_penjualan_layanan: "",
        subtotal: "",
        id_harga_layanan: "",
        total_harga: "",
        id_layanan: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama"),
        id_customer_service: sessionStorage.getItem("Id"),
      };
    },
    cetakStruk(item) {
      var uri =
        this.$apiUrl4 + "Struk/transaksiLayanan/" + item.kode_penjualan_layanan;
      // this.$http.get(uri).then(() => {
      //     this.snackbar = true;
      //     this.color = 'green';
      //     this.text = 'Berhasil';
      //     this.load = false;
      //   })
      //   .catch((error) => {
      //     this.errors = error;
      //     this.snackbar = true;
      //     this.text = 'Coba Lagi';
      //     this.color = 'red';
      //     this.load = false;
      //   });
      window.open(uri, "_blank");
      console.log(item.kode_penjualan_layanan);
    },
  },

  mounted() {
    this.getDataLayanan();
    this.getHewan();
    this.getJenisHewan();
    this.getLayanan();
    this.getUkuran();
    this.getDataTransaksiLayanan();
  },
};
</script>
<style scoped>
.tombol {
  margin: 2px;
}
.tab {
  margin: 10px;
}
.btn-clicked {
  color: #ffffff;
}
.btn-unclicked {
  color: #000000;
}
.underlinetext {
  text-decoration: underline;
}
#right {
  margin-right: 17px;
}
</style>
