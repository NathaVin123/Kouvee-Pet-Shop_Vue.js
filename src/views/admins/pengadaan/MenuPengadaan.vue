<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-bottom-navigation :value="activeBtn" grow color="green">
          <v-btn @click="Pengadaan()">
            <span>Konfirmasi Pemesanan</span>
            <v-icon>mdi-history</v-icon>
          </v-btn>

          <v-btn @click="PengadaanDiproses()">
            <span>Proses Pemesanan</span>
            <v-icon>mdi-truck</v-icon>
          </v-btn>

          <v-btn @click="PengadaanSelesai()">
            <span>Pemesanan Selesai</span>
            <v-icon>mdi-checkbox-multiple-marked-outline</v-icon>
          </v-btn>
        </v-bottom-navigation>
        <v-card>
          <!-- <v-container grid-list-md mb-20> -->
          <div class="pa-5">
            <h2 class="subheading grey-darken--text">Pengadaan Produk</h2>
            <v-layout row wrap style="margin:10px">
              <v-flex xs6>
                <v-btn
                  color="green accent-3"
                  depressed
                  rounded
                  dark
                  class="mb-2"
                  v-on="on"
                  @click="(dialog = true), resetDynamic()"
                >
                  <v-icon color="white" size="14" class="mr-2">mdi-pencil-plus</v-icon>Tambah
                  Pengadaan
                </v-btn>
              </v-flex>
              <!-- <v-flex xs6 class="text-right">
            <v-text-field
              v-model="keyword"
              append-icon="mdi-search"
              label="Cari"
              hide-details="auto"
              outlined
              clearable
            >
            </v-text-field>
              </v-flex>-->
            </v-layout>
            <v-data-table :headers="headers" :items="filterProgres(pengadaans)">
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="(item, index) in items" :key="item.no_order">
                    <td>{{ index + 1 }}</td>
                    <td
                      class="underlinetext"
                      @click="showDetail(item)"
                      style="cursor:pointer"
                    >{{ item.no_order }}</td>
                    <td>{{ item.nama_supplier }}</td>
                    <td>{{ item.total_harga }}</td>
                    <td>{{ item.status_pengadaan }}</td>
                    <td>{{ item.createLog_at }}</td>
                    <td>{{ item.updateLog_at }}</td>

                    <!-- <td>{{ item.delete_by }}</td>
                    <td>{{ item.delete_at }}</td>-->

                    <td>
                      <div>
                        <v-btn icon color="blue darken-1" light @click="editHandlerPengadaan(item)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </div>

                      <div>
                        <v-btn color="blue darken-1" icon @click="updateSedangDiproses(item)">
                          <v-icon>mdi-arrow-right-box</v-icon>
                        </v-btn>
                      </div>
                      <div>
                        <v-btn icon color="red lighten-2" dark v-on="on" @click="cetakStruk(item)">
                          <v-icon>mdi-pdf-box</v-icon>
                        </v-btn>
                      </div>
                      <div>
                        <v-btn
                          icon
                          color="red lighten-2"
                          dark
                          v-on="on"
                          @click="
                            deleteRowPengadaan(item), getDetailPengadaanId(item)
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
          <!-- </v-container> -->
        </v-card>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
    <!-- --------------------Dialog Tambah Pengadaan------------------------------------------ -->
    <v-dialog v-model="dialog" persistent width="1500px">
      <v-card>
        <v-card-title>
          <h2 class="text-center">Tambah Pengadaan Produk</h2>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="form-group">
                  <label for="Supplier">Supplier :</label>
                  <v-autocomplete
                    v-model="id_supplier"
                    required
                    :items="suppliers"
                    :filter="customFilter"
                    item-value="id_supplier"
                    color="purple"
                    item-text="nama_supplier"
                    outlined
                    :search-input.sync="form.empty"
                  ></v-autocomplete>
                </div>
              </v-col>
            </v-row>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <h3>Data Produk</h3>
                </v-list-item-title>
                <v-card>
                  <div class="form-row" v-for="(tambah, index) in detailTambah" :key="index">
                    <v-row>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="tambah.id_produk"
                          required
                          width
                          :items="produks"
                          item-value="id_produk"
                          item-text="nama_produk"
                          label="Nama Produk*"
                          outlined
                          color="purple"
                          :filter="customFilter"
                          hide-selected
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          label="Jumlah*"
                          v-model="tambah.jumlah_stok_pengadaan"
                          color="purple"
                          type="number"
                          outlined
                          single-line
                          clearable
                          @keyup="setTotal(index), setSubtotal()"
                          @change="setTotal(index), setSubtotal()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          label="Harga*"
                          v-model="tambah.harga"
                          color="purple"
                          type="number"
                          outlined
                          single-line
                          clearable
                          prefix="Rp."
                          @keyup="setTotal(index), setSubtotal()"
                          @change="setTotal(index), setSubtotal()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          label="Total Harga*"
                          v-model="tambah.total_harga"
                          value
                          outlined
                          readonly
                          color="purple"
                          prefix="Rp."
                        ></v-text-field>
                      </v-col>
                      <v-col cols="1">
                        <v-btn
                          outlined
                          color="red lighten-2"
                          x-large
                          @click="deleteRow(tambah), setSubtotal()"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12">
                        <v-divider light></v-divider>
                      </v-col>
                    </v-row>
                  </div>

                  <v-row>
                    <v-col class="text-right">
                      <v-btn outlined color="green" x-large fab @click="addTambah" class="tombol">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-list-item-content>
            </v-list-item>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined text @click="sendDataPengadaan()">Save</v-btn>
          <v-btn
            color="blue darken-1"
            outlined
            text
            @click="(dialog = false), resetDynamic()"
          >Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!-- --------------------Dialog Add Produk------------------------------------------ -->
    <v-dialog v-model="dialogAddProduk" persistent width="1500px">
      <v-card>
        <v-card-title>
          <h2 class="text-center">Tambah Pengadaan Produk</h2>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <h3>Data Produk</h3>
                </v-list-item-title>
                <v-card>
                  <div class="form-row" v-for="(tambah, index) in detailTambah" :key="index">
                    <v-row>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="tambah.id_produk"
                          required
                          width
                          :items="produks"
                          item-value="id_produk"
                          item-text="nama_produk"
                          label="Nama Produk*"
                          outlined
                          color="purple"
                          :filter="customFilter"
                          hide-selected
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          label="Jumlah*"
                          v-model="tambah.jumlah_stok_pengadaan"
                          color="purple"
                          type="number"
                          outlined
                          single-line
                          clearable
                          @keyup="setTotal(index)"
                          @change="setTotal(index)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          label="Harga*"
                          v-model="tambah.harga"
                          color="purple"
                          type="number"
                          outlined
                          single-line
                          clearable
                          prefix="Rp."
                          @keyup="setTotal(index)"
                          @change="setTotal(index)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          label="Total Harga*"
                          v-model="tambah.total_harga"
                          value
                          outlined
                          readonly
                          color="purple"
                          prefix="Rp."
                        ></v-text-field>
                      </v-col>
                      <v-col cols="1">
                        <v-btn outlined color="red lighten-2" x-large @click="deleteRow(tambah)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12">
                        <v-divider light></v-divider>
                      </v-col>
                    </v-row>
                  </div>

                  <v-row>
                    <v-col class="text-right">
                      <v-btn outlined color="green" x-large fab @click="addTambah" class="tombol">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-list-item-content>
            </v-list-item>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined text @click="addDataDetailPengadaan()">Save</v-btn>
          <v-btn
            color="blue darken-1"
            outlined
            text
            @click="(dialogAddProduk = false), resetDynamic()"
          >Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!-- --------------------Dialog Edit Produk------------------------------------------ -->
    <v-dialog v-model="dialogEditProduk" persistent width="1500px">
      <v-card>
        <v-card-title>
          <h2 class="text-center">Tambah Pengadaan Produk</h2>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <h3>Data Produk</h3>
                </v-list-item-title>
                <v-card>
                  <div class="form-row">
                    <v-row>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.id_produk"
                          required
                          width
                          :items="produks"
                          item-value="id_produk"
                          item-text="nama_produk"
                          label="Nama Produk*"
                          outlined
                          color="purple"
                          :filter="customFilter"
                          hide-selected
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          label="Jumlah*"
                          v-model="form.jumlah_stok_pengadaan"
                          color="purple"
                          type="number"
                          outlined
                          single-line
                          clearable
                          @keyup="setTotal2()"
                          @change="setTotal2()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          label="Harga*"
                          v-model="form.harga"
                          color="purple"
                          type="number"
                          outlined
                          single-line
                          clearable
                          prefix="Rp."
                          @keyup="setTotal2()"
                          @change="setTotal2()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          label="Total Harga*"
                          v-model="form.total_harga"
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
                  </div>
                </v-card>
              </v-list-item-content>
            </v-list-item>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined text @click="updateDataProduk()">Save</v-btn>
          <v-btn
            color="blue darken-1"
            outlined
            text
            @click="(dialogEditProduk = false), resetForm()"
          >Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!-- --------------------Dialog Edit Pengadaan------------------------------------------ -->
    <v-dialog v-model="dialogEditPengadaan" persistent width="1500px">
      <v-card>
        <v-card-title>
          <h2 class="text-center">Edit Pengadaan Produk</h2>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="form-group">
                  <label for="Supplier">Supplier :</label>
                  <v-autocomplete
                    v-model="id_supplier"
                    required
                    :items="suppliers"
                    :filter="customFilter"
                    item-value="id_supplier"
                    color="purple"
                    item-text="nama_supplier"
                    outlined
                    :search-input.sync="form.empty"
                  ></v-autocomplete>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined text @click="updateDataPengadaan()">Save</v-btn>
          <v-btn
            color="blue darken-1"
            outlined
            text
            @click="(dialogEditPengadaan = false), resetDynamic()"
          >Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!------------------------  Dialog detail pengadaan------------------------>
    <template>
      <v-dialog v-model="dialogDetailPengadaanProduk" persistent max-width="1300px">
        <v-card>
          <v-card-title>
            <v-spacer />
            <h2 class="text-md-center">{{ 'ID Pengadaan Produk: ' + detailItem.no_order }}</h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <!-- <v-container> -->
            <v-simple-table height="50%">
              <thead>
                <tr>
                  <th class="text-left">ID Detail Layanan</th>
                  <th class="text-left">Nama Produk</th>
                  <th class="text-left">Jumlah Stok</th>
                  <th class="text-left">Harga Produk</th>
                  <th class="text-left">Total Harga</th>
                  <th class="text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredItems2(detailItem)" :key="item.id_detailpengadaan">
                  <td>{{ item.id_detailpengadaan }}</td>
                  <td>{{ item.nama_produk }}</td>
                  <td>{{ item.jumlah_stok_pengadaan }}</td>
                  <td>{{ item.harga }}</td>
                  <td>{{ item.total_harga }}</td>
                  <td>
                    <div>
                      <v-btn
                        icon
                        color="blue"
                        light
                        outlined
                        class="tombol"
                        @click="editHandlerProduk(item)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </div>
                    <div>
                      <v-btn
                        icon
                        color="red darken"
                        light
                        class="tombol"
                        outlined
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

            <div class="text-right">
              <v-simple-table>
                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ 'Total : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.total_harga }}</h3>
                    </td>
                  </tr>
                </td>

                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  width="50px"
                  height="50px"
                  light
                  icon
                  outlined
                  @click="setIdPengadaan(detailItem), (dialogAddProduk = true)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-simple-table>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              outlined
              @click="dialogDetailPengadaanProduk = false"
            >Tutup</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- ------------------------------------------------------------------------- -->
    <!-- ------------------Dialog untuk konfirmasi delete-------------------------------------- -->
    <div class="text-center">
      <v-dialog width="500" v-model="deleteDialog">
        <v-card>
          <v-card-title class="headline Red lighten-2" primary-title>Konfirmasi Hapus</v-card-title>
          <v-card-text>Data yang akan dihapus, Lanjutkan ?</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="resetArray(), (deleteDialog = false)">Batal</v-btn>

            <v-btn
              color="primary"
              text
              @click="deleteDataProduk(deletedId), resetArray()"
            >Hapus Transaksi</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- ------------------------------------------------------------------------- -->
    <!-- ----------------------------Dialog Delete Detail Pengadaan--------------------------------------------- -->
    <div class="text-center">
      <v-dialog width="500" v-model="deleteDetailDialog">
        <v-card>
          <v-card-title class="headline Red lighten-2" primary-title>Konfirmasi Hapus</v-card-title>
          <v-card-text>Data yang akan dihapus, Lanjutkan ?</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteDetailDialog = false">Batal</v-btn>

            <v-btn color="primary" text @click="deleteDataDetailProduk(deletedId)">Hapus Produk</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- ------------------------------------------------------------------------- -->
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
        dialogEditPengadaan: false,
        headers: [
          {
            text: 'No',
            value: 'index',
          },
          {
            text: 'No Order',
            value: 'no_order',
          },
          {
            text: 'Nama Supplier',
            value: 'nama_supplier',
          },
          {
            text: 'Total',
            value: 'total_harga',
          },
          {
            text: 'Status',
            value: 'status_pengadaan',
          },
          {
            text: 'Tanggal Dibuat',
            value: 'createLog_at',
          },
          {
            text: 'Tanggal Diubah',
            value: 'updateLog_at',
          },
          {
            text: 'Aksi',
            value: null,
          },
        ],

        updatedId: '',
        deletedId: '',
        dialog: false,
        deleteDialog: false,
        editedIndex: -1,
        activeBtn: 0,
        produks: [],
        pengadaans: [],
        detailPengadaans: [],
        suppliers: [],
        detailTambah: [],
        detailIdPengadaanFiltered: [],
        detailIdPengadaanFilteredDelete: [],
        id_supplier: null,
        empty: null,
        dialogDetailPengadaanProduk: false,
        dialogEditProduk: false,
        dialogAddProduk: false,
        deleteDetailDialog: false,
        detailItem: '',
        on: '',
        user: new FormData(),
        user2: new FormData(),
        status_pengadaan: new FormData(),
        deleteProduk: new FormData(),
        form: {
          no_order: '',
          id_produk: '',
          jumlah_stok_pengadaan: '',
          total_harga: '',
          harga: '',
          total_harga: '',
          id_supplier: '',
          subtotal: 0,
          status_pengadaan: 'Sedang Diproses',
          
        },
        typeInput: 'new',
        search: '',
        snackbar: false,
        color: null,
        text: '',
        load: false,
      };
    },
    watch: {
      id_supplier() {
        this.empty = 'null';
      },
    },

    methods: {
      Pengadaan() {
        this.$router.push({ name: 'pengadaan_Admin' });
      },
      PengadaanDiproses() {
        this.$router.push({ name: 'pengadaan_Diproses' });
      },
      PengadaanSelesai() {
        this.$router.push({ name: 'pengadaan_Selesai' });
      },
      getSupplier() {
        var uri = this.$apiUrl4 + 'Supplier';
        this.$http.get(uri).then((response) => {
          this.suppliers = response.data.message;
        });
      },
      getProduk() {
        var uri = this.$apiUrl4 + 'Produk/' + 'all';
        this.$http.get(uri).then((response) => {
          this.produks = response.data.message;
        });
      },
      getPengadaan() {
        var uri = this.$apiUrl4 + 'Pengadaan/' + 'getWithJoin';
        this.$http.get(uri).then((response) => {
          this.pengadaans = response.data.message;
        });
      },
      getDetailPengadaan() {
        var uri = this.$apiUrl4 + 'DetailPengadaan/' + 'getWithJoin';
        this.$http.get(uri).then((response) => {
          this.detailPengadaans = response.data.message;
        });
      },
      setTotal(index) {
        this.detailTambah[index].total_harga =
          this.detailTambah[index].jumlah_stok_pengadaan * this.detailTambah[index].harga;
      },
      setTotal2() {
        this.form.total_harga = this.form.jumlah_stok_pengadaan * this.form.harga;
      },
      setSubtotal() {
        this.form.subtotal = 0;
        for (var i = 0; i < this.detailTambah.length; i++) {
          this.form.subtotal =
            this.form.subtotal + this.detailTambah[i].total_harga;
        }
      },
      setIdPengadaan(detailItem) {
        this.form.no_order = detailItem.no_order;
      },
      addTambah() {
        this.detailTambah.push({
          no_order: '',
          id_detailpengadaan: '',
          id_supplier: '',
          id_produk: '',
          jumlah_stok_pengadaan: '',
          harga: '',
          total_harga: '',
          createLog_at: '',
          updateLog_at: '',
        });
      },
      deleteRow(tambah) {
        this.detailTambah.splice(this.detailTambah.indexOf(tambah), 1);
      },
      resetDynamic() {
        while (this.detailTambah.length != 0) {
          for (var i = 0; i < this.detailTambah.length; i++) {
            this.detailTambah.splice(this.detailTambah[i], 1);
          }
        }
        this.id_supplier = null;
      },
      filterProgres() {
        return this.pengadaans.filter((pengadaan) => {
          return pengadaan.status_pengadaan.match('Belum Datang');
        });
      },
      filteredItems2(value) {
        return this.detailPengadaans.filter((i) => {
          return (
            !value.no_order ||
            i.no_order === value.no_order
          );
        });
      },
      showDetail(item) {
        this.detailItem = item;
        this.dialogDetailPengadaanProduk = true;
      },

      sendDataPengadaan() {
        this.user.append('id_supplier', this.id_supplier);
        var uri = this.$apiUrl4 + 'Pengadaan';

        this.load = true;
        this.$http
          .post(uri, this.user)
          .then((response) => {
            this.sendDataDetailPengadaan(response.data.message);
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      sendDataDetailPengadaan(no_order) {
        for (let i = 0; i < this.detailTambah.length; i++) {
          this.detailTambah[i].no_order = no_order;
        }
        this.user2.append(
          'detailpengadaans',
          JSON.stringify(this.detailTambah)
        );
        var uri = this.$apiUrl4 + 'DetailPengadaan/insertMultiple';
        this.load = true;
        this.$http
          .post(uri, this.user2)
          .then((response) => {
            this.snackbar = true;
            this.color = 'green';
            this.text = response.data.message;
            this.load = false;
            this.dialog = false;
            this.id_supplier = null;
            this.getPengadaan();
            this.getDetailPengadaan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      addDataDetailPengadaan() {
        for (let i = 0; i < this.detailTambah.length; i++) {
          this.detailTambah[
            i
          ].id_detailpengadaan = this.form.id_detailpengadaan;
        }
        this.user2.append(
          'detailpengadaans',
          JSON.stringify(this.detailTambah)
        );
        var uri = this.$apiUrl4 + 'DetailPengadaan/insertMultiple';
        this.load = true;
        this.$http
          .post(uri, this.user2)
          .then((response) => {
            this.snackbar = true;
            this.color = 'green';
            this.text = response.data.message;
            this.load = false;
            this.dialogAddProduk = false;
            this.id_supplier = null;
            this.getPengadaan();
            this.getDetailPengadaan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },

      updateSedangDiproses(item) {
        this.status_pengadaan.append('id_supplier', item.id_supplier);
        this.status_pengadaan.append('status_pengadaan', item.status_pengadaan);
        console.log(this.form.status_pengadaan);
        var uri =
          this.$apiUrl4 +
          'Pengadaan/' +
          'updateStatusToProses/' +
          item.no_order;
        this.load = true;
        this.$http
          .post(uri, this.status_pengadaan)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan ke snackba r
            this.load = false;
            this.dialogDetailPengadaanProduk = false;
            this.getPengadaan();
            this.getDetailPengadaan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = error;
            // this.text = 'Try Again';
            this.color = 'red';
            this.load = false;
          });
      },
      updateDataPengadaan() {
        this.user.append('id_supplier', this.id_supplier);
        this.user.append('total_harga', this.form.total_harga);
        

        var uri = this.$apiUrl4 + 'Pengadaan/update/' + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.user)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan ke snackba r
            this.load = false;
            this.dialogEditPengadaan = false;
            this.getPengadaan();
            this.getDetailPengadaan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = error;
            // this.text = 'Try Again';
            this.color = 'red';
            this.load = false;
          });
      },
      updateDataProduk() {
        this.user2.append('id_produk', this.form.id_produk);
        this.user2.append('jumlah_stok_pengadaan', this.form.jumlah_stok_pengadaan);
        this.user2.append('harga', this.form.harga);
        this.user2.append('total_harga', this.form.total_harga);
        

        var uri = this.$apiUrl4 + 'DetailPengadaan/update/' + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.user2)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan ke snackba r
            this.load = false;
            this.dialogEditProduk = false;
            this.getPengadaan();
            this.getDetailPengadaan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = error;
            // this.text = 'Try Again';
            this.color = 'red';
            this.load = false;
          });
      },
      deleteDataProduk(deletedId) {
        var uri = this.$apiUrl4 + 'Pengadaan/' + deletedId; //data dihapus berdasarkan id
        this.$http
          .delete(uri)
          .then((response) => {
            this.deleteMultipleDataDetailPengadaan(response.data.message);
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Try Again';
            this.color = 'red';
          });
      },

      deleteMultipleDataDetailPengadaan() {
        this.deleteProduk.append(
          'id_detailpengadaan',
          JSON.stringify(this.detailIdPengadaanFilteredDelete)
        );
        var uri = this.$apiUrl4 + 'DetailPengadaan/' + 'deleteMultiple';
        this.load = true;
        this.$http
          .post(uri, this.deleteProduk)
          .then(() => {
            this.snackbar = true;
            this.color = 'green';
            this.text = 'Berhasil';
            this.load = false;
            this.deleteDialog = false;
            this.getPengadaan();
            this.getDetailPengadaan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },

      async deleteDataDetailProduk(deletedId) {
        var uri = this.$apiUrl4 + 'DetailPengadaan/' + deletedId; //data dihapus berdasarkan id
        await this.$http
          .delete(uri)
          .then((response) => {
            this.snackbar = true;
            this.text = response.data.message;
            this.color = 'green';
            this.deleteDetailDialog = false;
            this.getPengadaan();
            this.getDetailPengadaan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Try Again';
            this.color = 'red';
          });
      },
      deleteRowDetailProduk(item) {
        this.deletedId = item.id_detailpengadaan;
        console.log(item.id_detailpengadaan);
        this.deleteDetailDialog = true;
      },
      deleteRowPengadaan(item) {
        this.deletedId = item.no_order;
        this.deleteDialog = true;
      },
      getDetailPengadaanId(item) {
        var uri =
          this.$apiUrl4 +
          'DetailPengadaan/' +
          'getByIdPengadaan/' +
          item.no_order;
        this.$http.get(uri).then((response) => {
          this.detailIdPengadaanFiltered = response.data.message;
          for (var i = 0; i < this.detailIdPengadaanFiltered.length; i++) {
            this.detailIdPengadaanFilteredDelete[
              i
            ] = this.detailIdPengadaanFiltered[i].no_order;
          }
          console.log(this.detailIdPengadaanFilteredDelete);
        });
      },
      resetArray() {
        this.detailIdPengadaanFiltered = [];
        this.detailIdPengadaanFilteredDelete = [];
      },
      editHandlerPengadaan(item) {
        this.updatedId = item.no_order;
        this.id_supplier = item.id_supplier;
        this.form.total_harga = item.total_harga;
        console.log(item.total_harga);
        this.dialogEditPengadaan = true;
      },
      editHandlerProduk(item) {
        this.updatedId = item.id_detailpengadaan;
        this.form.id_produk = item.id_produk;
        this.form.total_harga = item.total_harga;
        this.form.harga = item.harga;
        this.form.jumlah_stok_pengadaan = item.jumlah_stok_pengadaan;
        this.dialogEditProduk = true;
      },
      resetForm() {
        this.id_supplier = null;
        this.form.no_order = '';
        this.form.id_produk = '';
        this.form.jumlah_stok_pengadaan = '';
        this.form.harga = '';
        this.form.total_harga = '';
        this.form.id_supplier = '';
        this.form.subtotal = 0;
        this.form.status_pengadaan = 'Sedang Diproses';
        
        
      },
      customFilter(item, queryText) {
        const textOne = item.nama_produk.toLowerCase();
        const textTwo = item.nama_supplier.toLowerCase();
        const searchText = queryText.toLowerCase();

        return (
          textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
        );
      },
      cetakStruk(item) {
        var uri =
          this.$apiUrl4 +
          'Struk/pengadaanProduk/' +
          item.no_order;
        window.open(uri, '_blank');
        console.log(item.no_order);
      },
    },
    mounted() {
      this.getProduk();
      this.getSupplier();
      this.getPengadaan();
      this.getDetailPengadaan();
    },
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
</style>