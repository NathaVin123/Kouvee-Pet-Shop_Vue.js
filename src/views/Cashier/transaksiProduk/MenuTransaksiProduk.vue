<template>
  <div class="ma-3">
    <!-- ------------------Menu Transaksi Produk-------------------------------------- -->
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
          <h2 class="text-md-center">Data Transaksi Produk Kouvee Petshop</h2>
          <v-layout row wrap style="margin: 10px;">
            <v-flex xs6 class="text-right">
              <v-text-field
                v-model="keyword"
                append-icon="mdi-search"
                label="Cari Data Transaksi Produk"
                hide-details="auto"
                outlined
                clearable
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="filterProgress(transaksiProduks)"
            :search="keyword"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  v-for="(item, index) in items"
                  :key="item.id_transaksi_produk"
                >
                  <td>{{ index + 1 }}</td>
                  <td
                    class="underlinetext"
                    @click="showDetail2(item)"
                    style="cursor: pointer;"
                  >
                    {{ item.id_transaksi_produk }}
                  </td>
                  <td>{{ item.nama_pelanggan }}</td>
                  <td>{{ item.nama_hewan }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.status }}</td>
                  <td>{{ item.created_at }}</td>
                  <td>{{ item.created_by }}</td>
                  <td>{{ item.modified_at }}</td>
                  <td>{{ item.modified_by }}</td>
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
          <h2 class="text-md-center">Data Transaksi Produk Kouvee Petshop</h2>
          <v-layout row wrap style="margin: 10px;">
            <v-flex xs6 class="text-right">
              <v-text-field
                v-model="keyword"
                append-icon="mdi-search"
                label="Cari Data Transaksi Produk"
                hide-details="auto"
                outlined
                clearable
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="filterProgress2(transaksiProduks)"
            :search="keyword"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  v-for="(item, index) in items"
                  :key="item.id_transaksi_produk"
                >
                  <td>{{ index + 1 }}</td>
                  <td
                    class="underlinetext"
                    @click="showDetail2(item)"
                    style="cursor: pointer;"
                  >
                    {{ item.id_transaksi_produk }}
                  </td>
                  <td>{{ item.nama_pelanggan }}</td>
                  <td>{{ item.nama_hewan }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.status }}</td>
                  <td>{{ item.created_at }}</td>
                  <td>{{ item.created_by }}</td>
                  <td>{{ item.modified_at }}</td>
                  <td>{{ item.modified_by }}</td>
                  <!-- <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td>-->

                  <td>
                    <div>
                      <v-btn
                        icon
                        color="blue"
                        light
                        @click="editHandlerTransaksiProduk(item)"
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
                          deleteRowProduk(item),
                            getDetailTransaksiProdukById(item)
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
              @click="deleteDataProduk(deleteId), resetArray()"
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
              @click="deleteDataDetailProduk(deleteId)"
              >Hapus Produk</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- ---------------------Dialog Edit Detil Produk-------------------------------- -->
    <v-row justify="center">
      <v-dialog v-model="dialogEditProduk" persistent max-width="1300px">
        <v-card>
          <div v-if="this.detilJudulProduk == 1">
            <v-card-title>
              <span class="headline">Tambah Detail Transaksi Produk</span>
            </v-card-title>
          </div>
          <div v-if="this.detilJudulProduk == 0">
            <v-card-title>
              <span class="headline">Ubah Detail Transaksi Produk</span>
            </v-card-title>
          </div>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="formProduk.id_produk"
                    required
                    width
                    :items="produks"
                    @keyup="getHargaEditProduk(), setTotalEditProduk()"
                    @change="getHargaEditProduk(), setTotalEditProduk()"
                    item-value="id_produk"
                    item-text="nama"
                    label="Nama Produk*"
                    outlined
                    color="purple"
                    :filter="customFilter"
                    hide-selected=""
                  ></v-autocomplete>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Jumlah*"
                    v-model="formProduk.jumlah"
                    color="purple"
                    type="number"
                    outlined
                    single-line
                    clearable
                    @keyup="getHargaEditProduk(), setTotalEditProduk()"
                    @change="getHargaEditProduk(), setTotalEditProduk()"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Harga Produk*"
                    v-model="formProduk.harga"
                    value
                    outlined
                    readonly
                    color="purple"
                    prefix="Rp."
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Subtotal*"
                    v-model="formProduk.total_harga"
                    value
                    outlined
                    readonly
                    color="purple"
                    prefix="Rp."
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
              @click="(dialogEditProduk = false), resetFormProduk()"
              >Tutup</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="setFormProduk(), (dialogEditProduk = false)"
              >Simpan</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- ---------------------Dialog Edit Transaksi Produk-------------------------------- -->
    <v-row justify="center">
      <v-dialog
        v-model="dialogEditTransaksiProduk"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Ubah Transaksi Produk</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="formProduk.id_hewan"
                    required
                    width
                    :items="hewans"
                    item-value="id_hewan"
                    item-text="nama"
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
                    v-model="formProduk.diskon"
                    color="purple"
                    type="number"
                    outlined
                    clearable
                    @change="setNewEditTotal()"
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
              @click="(dialogEditTransaksiProduk = false), resetFormProduk()"
              >Tutup</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="
                updateDataTransaksi(), (dialogEditTransaksiProduk = false)
              "
              >Simpan</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!------------------------ Detail Produk  Dialog ------------------------>
    <template>
      <v-dialog
        v-model="dialogDetailTransaksiProduk"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <v-spacer />
            <h2 class="text-md-center">
              {{ "Id Transaksi Produk: " + detailItem.id_transaksi_produk }}
            </h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <!-- <v-container> -->
            <v-simple-table height="50%">
              <thead>
                <tr>
                  <th class="text-left">Id Detail Transaksi</th>
                  <th class="text-left">Nama Produk</th>
                  <th class="text-left">Ukuran Hewan</th>
                  <th class="text-left">Harga Satuan</th>
                  <th class="text-left">Jumlah</th>
                  <th class="text-left">Total Harga</th>
                  <th class="text-left">Tanggal Dibuat</th>
                  <th class="text-left">Dibuat Oleh</th>
                  <th class="text-left">Tanggal Diubah</th>
                  <th class="text-left">Diubah Oleh</th>
                  <th v-if="detailItem.status != 'Lunas'" class="text-left">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in filteredItems2(detailItem)"
                  :key="item.id_detail_transaksi_produk"
                >
                  <td>{{ item.id_detail_transaksi_produk }}</td>
                  <td>{{ item.nama_produk }}</td>
                  <td>{{ item.ukuran_hewan }}</td>
                  <td>{{ item.harga }}</td>
                  <td>{{ item.jumlah }}</td>
                  <td>{{ item.total_harga }}</td>
                  <td>{{ item.created_at }}</td>
                  <td>{{ item.created_by }}</td>
                  <td>{{ item.modified_at }}</td>
                  <td>{{ item.modified_by }}</td>
                  <td v-if="detailItem.status != 'Lunas'">
                    <div>
                      <v-btn
                        icon
                        color="blue"
                        light
                        class="tombol"
                        outlined=""
                        @click="editHandlerProduk(item)"
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
                        @click="deleteRowDetailProduk(item)"
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
              v-if="detailItem.status != 'Lunas'"
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
                  setIdTransaksiProduk(detailItem), (dialogEditProduk = true)
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
                      <h3>{{ detailItem.nama_pelanggan }}</h3>
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
                      <h3>{{ detailItem.jenis_hewan }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ "Nomor Telpon : " }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.telp }}</h3>
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
                    (dialogDetailTransaksiProduk = false),
                      updateStatusProduk(detailItem)
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
              @click="dialogDetailTransaksiProduk = false"
              >Tutup</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

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
      tabs: 0,
      dialog: false,
      cekHewans: false,
      detilTransaksis: [],
      detailTransaksiProduks: [],
      detailIdTransaksiProduksFiltered: [],
      dialogEditProduk: false,
      dialogEditTransaksiProduk: false,
      selectedIndex: 0,
      detailItem: "",
      transaksiProduks: [],
      keyword: "",
      jenishewans: [],
      ukurans: [],
      hewans: [],
      pelanggans: [],
      produks: [],
      bottomNav: 1,
      menu: false,
      on: "",
      deleteDialog: "",
      deleteDetailDialog: "",
      submit: "",
      headers: [
        {
          text: "No",
          value: "index",
        },
        {
          text: "Id Transaksi Produk",
          value: "id_transaksi_produk",
        },
        {
          text: "Nama Pelanggan",
          value: "nama_pelanggan",
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
          text: "Status",
          value: "status",
        },
        {
          text: "Tanggal Dibuat",
          value: "created_at",
        },
        {
          text: "Dibuat Oleh",
          value: "created_by",
        },
        {
          text: "Tanggal Diubah",
          value: "modified_by",
        },
        {
          text: "Diubah Oleh",
          value: "modified_by",
        },
        {
          text: "Aksi",
          value: null,
        },
      ],
      layananTab: null,
      detilJudulProduk: 0,
      dialogWarning: "",
      dialogEdit: "",
      dialogPassword: "",
      dialogDetailTransaksiProduk: false,
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
      formProduk: {
        id_hewan: "",
        total: "",
        diskon: "",
        id_transaksi_produk: "",
        subtotal: "",
        harga: "",
        total_harga: "",
        id_produk: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama"),
        id_customer_service: sessionStorage.getItem("Id"),
      },
      user: new FormData(),
      detil: new FormData(),
      transaksiProduk: new FormData(),
      deleteProduk: new FormData(),
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
    isGuestProduk() {
      for (var i = 0; i < this.transaksiProduks.length; i++) {
        if (this.transaksiProduks[i].id_hewan == null) {
          this.transaksiProduks[i].nama_hewan = "-";
          this.transaksiProduks[i].jenis_hewan = "-";
          this.transaksiProduks[i].nama_pelanggan = "Guest";
          this.transaksiProduks[i].telp = "-";
          this.transaksiProduks[i].diskon = "0";
        }
      }
    },
    isHaveKasirProduk() {
      for (var i = 0; i < this.transaksiProduks.length; i++) {
        if (this.transaksiProduks[i].id_kasir == null) {
          this.transaksiProduks[i].id_kasir = "-";
          this.transaksiProduks[i].nama_kasir = "-";
        }
      }
    },
    isHaveDiskonProduk() {
      for (var i = 0; i < this.transaksiProduks.length; i++) {
        if (this.transaksiProduks[i].diskon == null) {
          this.transaksiProduks[i].diskon = "0";
        }
      }
    },
    filterProgress() {
      return this.transaksiProduks.filter((transaksiProduk) => {
        return transaksiProduk.status.match("Lunas");
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
      return this.transaksiProduks.filter((transaksiProduk) => {
        return transaksiProduk.status.match("Menunggu Pembayaran");
      });
    },
    selectTabs(selectedTabs) {
      this.tabs = selectedTabs;
    },
    deleteRow(_detilTransaksi) {
      this.detilTransaksis.splice(
        this.detilTransaksis.indexOf(_detilTransaksi),
        1
      );
    },
    resetArray() {
      this.detailIdTransaksiProduksFiltered = [];
    },
    resetDynamic() {
      while (this.detilTransaksis.length != 0) {
        for (var i = 0; i < this.detilTransaksis.length; i++) {
          this.detilTransaksis.splice(this.detilTransaksis[i], 1);
        }
      }
      this.resetForm();
    },
    filteredProduk(index) {
      var uri =
        this.$apiUrl +
        "Produk/" +
        "search/" +
        this.detilTransaksis[index].id_produk;
      this.$http.get(uri).then((response) => {
        this.detilTransaksis[index].harga = response.data.message.harga;
        this.detilTransaksis[index].total_harga =
          this.detilTransaksis[index].harga *
          this.detilTransaksis[index].jumlah;
      });
    },
    getHargaEditProduk() {
      var uri =
        this.$apiUrl + "Produk/" + "search/" + this.formProduk.id_produk;
      this.$http.get(uri).then((response) => {
        this.formProduk.harga = response.data.message.harga;
        this.formProduk.total_harga =
          this.formProduk.harga * this.formProduk.jumlah;
      });
    },

    setIdTransaksiProduk(item) {
      this.detilJudulProduk = 1;
      this.formProduk.id_transaksi_produk = item.id_transaksi_produk;
      console.log(this.formProduk.id_transaksi_produk);
    },
    setTotalEditProduk() {
      this.formProduk.total_harga =
        this.formProduk.harga * this.formProduk.jumlah;
    },
    setTotal(index) {
      this.detilTransaksis[index].total_harga =
        this.detilTransaksis[index].harga * this.detilTransaksis[index].jumlah;
    },
    setNewEditTotal() {
      this.formProduk.total = this.formProduk.subtotal - this.formProduk.diskon;
    },
    setSubtotal() {
      this.form.subtotal = 0;
      for (var i = 0; i < this.detilTransaksis.length; i++) {
        this.form.subtotal =
          this.form.subtotal + this.detilTransaksis[i].total_harga;
      }
      this.form.subtotal = this.form.subtotal - this.form.diskon;
      if (this.form.subtotal < 0) {
        this.form.subtotal = 0;
      }
    },
    getDataProduk() {
      var uri = this.$apiUrl + "TransaksiProduk/" + "getWithJoin";
      this.$http.get(uri).then((response) => {
        this.transaksiProduks = response.data.message;
        this.isGuestProduk();
        this.isHaveKasirProduk();
        this.isHaveDiskonProduk();
      });
    },
    getDataTransaksiProduk() {
      var uri = this.$apiUrl + "DetailTransaksiProduk/" + "getWithJoin";
      this.$http.get(uri).then((response) => {
        this.detailTransaksiProduks = response.data.message;
      });
    },
    getHewan() {
      var uri = this.$apiUrl + "Hewan/" + "all";
      this.$http.get(uri).then((response) => {
        this.hewans = response.data.message;
      });
    },
    getJenisHewan() {
      var uri = this.$apiUrl + "JenisHewan";
      this.$http.get(uri).then((response) => {
        this.jenishewans = response.data.message;
      });
    },
    cek() {
      console.log(this.hewans);
    },
    getPelanggan() {
      var uri = this.$apiUrl + "Pelanggan/" + "all";
      this.$http.get(uri).then((response) => {
        this.pelanggans = response.data.message;
      });
    },
    getProduk() {
      var uri = this.$apiUrl + "Produk/" + "all";
      this.$http.get(uri).then((response) => {
        this.produks = response.data.message;
      });
    },
    getDetailTransaksiProdukById(item) {
      this.updatedId = item.id_transaksi_produk;
      var uri =
        this.$apiUrl +
        "DetailTransaksiProduk/" +
        "getByTransactionId/" +
        this.updatedId;
      this.$http.get(uri).then((response) => {
        this.detailIdTransaksiProduks = response.data.message;
        for (var i = 0; i < this.detailIdTransaksiProduks.length; i++) {
          this.detailIdTransaksiProduksFiltered[
            i
          ] = this.detailIdTransaksiProduks[i].id_detail_transaksi_produk;
        }
        console.log(this.detailIdTransaksiProduksFiltered);
      });
    },
    editHandlerProduk(item) {
      this.typeInput = "edit";
      this.detilJudulProduk = 0;
      this.dialogEditProduk = true;
      this.formProduk.id_produk = item.id_produk;
      this.formProduk.jumlah = item.jumlah;
      this.formProduk.harga = item.harga;
      this.formProduk.total_harga = item.total_harga;
      this.formProduk.id_transaksi_produk = item.id_transaksi_produk;
      console.log(this.formProduk.id_transaksi_produk);
      this.updatedId = item.id_detail_transaksi_produk;
    },
    editHandlerTransaksiProduk(item) {
      this.typeInput = "edit";
      this.dialogEditTransaksiProduk = true;
      this.formProduk.id_hewan = item.id_hewan;
      this.formProduk.subtotal = item.subtotal;
      this.formProduk.total = item.total;
      this.formProduk.diskon = item.diskon;
      this.formProduk.id_transaksi_produk = item.id_transaksi_produk;
      this.updatedId = item.id_transaksi_produk;
    },
    setFormProduk() {
      if (this.typeInput === "new") {
        this.addProdukDetil();
      } else {
        console.log("data berhasil diubah");
        this.updateDataDetilTransaksi();
      }
    },
    updateStatusProduk(detailItem) {
      this.updatedId = detailItem.id_transaksi_produk;
      this.transaksiProduk.append("id_kasir", sessionStorage.getItem("Id"));
      this.transaksiProduk.append(
        "modified_by",
        sessionStorage.getItem("Nama")
      );
      console.log(detailItem.id_transaksi_produk);
      var uri =
        this.$apiUrl + "TransaksiProduk/" + "updateStatus/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.transaksiProduk)
        .then(() => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = "Produk Berhasil Dibayar"; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialogEdit = false;
          this.getDataProduk();
          this.getDataTransaksiProduk(); //mengambil data transaksi layanan
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
    updateDataDetilTransaksi() {
      this.user.append("id_produk", this.formProduk.id_produk);
      this.user.append("jumlah", this.formProduk.jumlah);
      this.user.append("total_harga", this.formProduk.total_harga);
      this.user.append("modified_by", this.formProduk.modified_by);
      var uri =
        this.$apiUrl + "DetailTransaksiProduk/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.user)
        .then((response) => {
          this.snackbar = true;
          this.color = "green";
          this.text = response.data.message;
          this.load = false;
          this.dialogEdit = false;
          this.getDataTransaksiProduk();
          this.getDataProduk();
          this.resetFormProduk();
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
    updateDataTransaksi() {
      this.detil.append("id_hewan", this.formProduk.id_hewan);
      this.detil.append("diskon", this.formProduk.diskon);
      this.detil.append("subtotal", this.formProduk.subtotal);
      this.detil.append("total", this.formProduk.total);
      this.detil.append("modified_by", this.formProduk.modified_by);
      var uri = this.$apiUrl + "TransaksiProduk/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.detil)
        .then((response) => {
          this.snackbar = true;
          this.color = "green";
          this.text = response.data.message;
          this.load = false;
          this.dialogEditTransaksiProduk = false;
          this.getDataTransaksiProduk();
          this.getDataProduk();
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
    showDetail2(item) {
      this.detailItem = item;
      this.dialogDetailTransaksiProduk = true;
    },
    deleteDataProduk(deleteId) {
      var uri = this.$apiUrl + "TransaksiProduk/" + deleteId; //data dihapus berdasarkan id
      this.$http
        .delete(uri)
        .then((response) => {
          this.text = response.data.message;
          this.deleteMultipleDataDetailProduk();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
        });
    },
    deleteMultipleDataDetailProduk() {
      this.deleteProduk.append(
        "id_detail_transaksi_produk",
        JSON.stringify(this.detailIdTransaksiProduksFiltered)
      );
      var uri = this.$apiUrl + "DetailTransaksiProduk/" + "deleteMultiple";
      this.load = true;
      this.$http
        .post(uri, this.deleteProduk)
        .then(() => {
          this.snackbar = true;
          this.color = "green";
          this.text = "Berhasil";
          this.load = false;
          this.deleteDialog = false;
          this.getDataProduk();
          this.getDataTransaksiProduk();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
        });
    },
    async deleteDataDetailProduk(deleteId) {
      var uri = this.$apiUrl + "DetailTransaksiProduk/" + deleteId; //data dihapus berdasarkan id
      await this.$http
        .delete(uri)
        .then((response) => {
          this.snackbar = true;
          this.text = response.data.message;
          this.color = "green";
          this.deleteDetailDialog = false;
          this.getDataProduk();
          this.getDataTransaksiProduk();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
        });
    },
    deleteRowProduk(item) {
      this.deleteId = item.id_transaksi_produk;
      this.deleteDialog = true;
    },
    deleteRowDetailProduk(item) {
      this.deleteId = item.id_detail_transaksi_produk;
      this.deleteDetailDialog = true;
    },

    customFilter(item, queryText) {
      const textOne = item.nama.toLowerCase();
      const textTwo = item.nama.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    addProdukDetil() {
      this.user.append(
        "id_transaksi_produk",
        this.formProduk.id_transaksi_produk
      );
      this.user.append("id_produk", this.formProduk.id_produk);
      this.user.append("created_by", this.formProduk.created_by);
      this.user.append("total_harga", this.formProduk.total_harga);
      this.user.append("jumlah", this.formProduk.jumlah);
      var uri = this.$apiUrl + "DetailTransaksiProduk";
      this.load = true;
      this.$http
        .post(uri, this.user)
        .then((response) => {
          this.snackbar = true;
          this.color = "green";
          this.text = response.data.message;
          this.load = false;
          this.getDataProduk();
          this.getDataTransaksiProduk();
          this.resetFormProduk();
          this.dialogEditProduk = false;
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
        });
    },
    resetFormProduk() {
      this.formProduk = {
        id_hewan: "",
        total: "",
        diskon: "",
        id_transaksi_produk: "",
        subtotal: "",
        harga: "",
        total_harga: "",
        id_produk: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama"),
        id_customer_service: sessionStorage.getItem("Id"),
      };
    },
    cetakStruk(item) {
      var uri =
        this.$apiUrl + "CetakStruk/transaksiProduk/" + item.id_transaksi_produk;
      window.open(uri, "_blank");
      console.log(item.id_transaksi_produk);
    },
  },

  editHandlerTransaksiProduk(item) {
    this.typeInput = "edit";
    this.dialogEditTransaksiProduk = true;
    this.formProduk.id_hewan = item.id_hewan;
    this.formProduk.subtotal = item.subtotal;
    this.formProduk.total = item.total;
    this.formProduk.diskon = item.diskon;
    this.formProduk.id_transaksi_produk = item.id_transaksi_produk;
    this.updatedId = item.id_transaksi_produk;
  },
  mounted() {
    this.getDataProduk();
    this.getHewan();
    this.getJenisHewan();
    this.getProduk();
    this.getDataTransaksiProduk();
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
