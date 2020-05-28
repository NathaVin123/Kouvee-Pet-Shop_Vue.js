<template>
  <div class="ma-3">
    <div class="text-md-center">
      <v-btn
        class="tab"
        color="green accent-3"
        style="text-transform: none !important;"
        :class="tabs ? 'btn-unclicked' : 'btn-clicked'"
        @click="selectTabs(0)"
        >Produk</v-btn
      >
      <v-btn
        class="tab"
        color="green accent-3"
        style="text-transform: none !important;"
        :class="tabs ? 'btn-clicked' : 'btn-unclicked'"
        @click="selectTabs(1)"
        >Layanan</v-btn
      >
    </div>
    <!-- ------------------Menu Transaksi Produk-------------------------------------- -->
    <v-card v-if="this.tabs == 0">
      <!-- <v-container grid-list-md mb-20> -->
      <div class="pa-3">
        <h2 class="text-md-left">Data Transaksi Produk</h2>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <v-btn
              depressed
              dark
              rounded
              class="elevation-2"
              x-large
              style="text-transform: none !important;"
              color="green accent-3"
              @click="(dialog = true), resetDynamic()"
            >
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>Tambah
              Transaksi
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
        <v-data-table
          :headers="headers"
          :items="filterProgress3(transaksiProduks)"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="(item, index) in items"
                :key="item.kode_penjualan_produk"
              >
                <td>{{ index + 1 }}</td>
                <td
                  class="underlinetext"
                  @click="showDetail2(item)"
                  style="cursor:pointer"
                >
                  {{ item.kode_penjualan_produk }}
                </td>
                <td>{{ item.nama_customer }}</td>
                <td>{{ item.nama_hewan }}</td>
                <td>{{ item.total }}</td>
                <td>{{ item.status_transaksi }}</td>
                <td>{{ item.createLog_at }}</td>
                <td>{{ item.updateLog_at }}</td>

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
      <!-- </v-container> -->
    </v-card>
    <!-- ------------------Menu Transaksi Layanan-------------------------------------- -->
    <v-card v-if="this.tabs == 1">
      <div class="pa-3">
        <!-- <v-container grid-list-md mb-20> -->
        <div>
          <v-tabs v-model="layananTab" color="green accent-3" centered>
            <v-tabs-slider color="green accent-3"></v-tabs-slider>
            <v-tab href="#layananTab-1">Diproses</v-tab>
            <v-tab href="#layananTab-2">Selesai</v-tab>
          </v-tabs>
        </div>
        <div v-if="this.layananTab == 'layananTab-1'">
          <h2 class="text-md-left">Data Transaksi Layanan</h2>
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-btn
                depressed
                dark
                rounded
                class="elevation-2"
                x-large
                style="text-transform: none !important;"
                color="green accent-3"
                @click="(dialog2 = true), resetDynamic2()"
              >
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>Tambah
                Transaksi
              </v-btn>
            </v-flex>
            <!-- <v-flex xs6 class="text-right">
              <v-text-field
                v-model="keyword2"
                append-icon="mdi-search"
                label="Cari"
                hide-details="auto"
                outlined
                clearable
              >
              </v-text-field>
            </v-flex>-->
          </v-layout>
          <v-data-table
            :headers="headers2"
            :items="filterProgress(transaksiLayanans)"
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
                    style="cursor:pointer"
                  >
                    {{ item.kode_penjualan_layanan }}
                  </td>
                  <td>{{ item.nama_customer }}</td>
                  <td>{{ item.nama_hewan }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.proses }}</td>
                  <td>{{ item.status_transaksi }}</td>
                  <td>{{ item.created_at }}</td>
                  <td>{{ item.updateLog_at }}</td>

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
        <div v-if="this.layananTab == 'layananTab-2'">
          <h2 class="text-md-left">Data Transaksi Layanan</h2>
          <v-layout row wrap style="margin:10px">
            <v-flex xs6 />
          </v-layout>
          <v-data-table
            :headers="headers2"
            :items="filterProgress2(transaksiLayanans)"
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
                    style="cursor:pointer"
                  >
                    {{ item.kode_penjualan_layanan }}
                  </td>
                  <td>{{ item.nama_customer }}</td>
                  <td>{{ item.nama_hewan }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.proses }}</td>
                  <td>{{ item.status_transaksi }}</td>
                  <td>{{ item.createLog_at }}</td>
                  <td>{{ item.updateLog_at }}</td>

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
        <!-- </v-container> -->
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
            <div v-if="this.tabs == 0">
              <v-btn
                color="primary"
                text
                @click="deleteDataProduk(deleteId), resetArray()"
                >Hapus Transaksi</v-btn
              >
            </div>
            <div v-if="this.tabs == 1">
              <v-btn
                color="primary"
                text
                @click="deleteDataLayanan(deleteId), resetArray()"
                >Hapus Transaksi</v-btn
              >
            </div>
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
            <div v-if="this.tabs == 0">
              <v-btn
                color="primary"
                text
                @click="deleteDataDetailProduk(deleteId)"
                >Hapus Produk</v-btn
              >
            </div>
            <div v-if="this.tabs == 1">
              <v-btn
                color="primary"
                text
                @click="deleteDataDetailLayanan(deleteId)"
                >Hapus Layanan</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- ------------------Dialog untuk warning kosong-------------------------------------- -->
    <div class="text-center">
      <v-dialog width="500" v-model="dialogWarning">
        <v-card>
          <v-card-title class="headline Red lighten-2" primary-title
            >Data Harus Diisi Semua !</v-card-title
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
              {{ 'Kode Transaksi Layanan: ' + detailItem.kode_penjualan_layanan }}
            </h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <!-- <v-container> -->
            <v-simple-table height="50%">
              <thead>
                <tr>
                  <th class="text-left">Id Detail Layanan</th>
                  <th class="text-left">Nama Layanan</th>
                  <th class="text-left">Ukuran Hewan</th>
                  <th class="text-left">Harga Satuan</th>
                  <th class="text-left">Jumlah</th>
                  <th class="text-left">Total Harga</th>
                  <th class="text-left">Tanggal Dibuat</th>
                  <!-- <th class="text-left">Dibuat Oleh</th> -->
                  <th class="text-left">Tanggal Diubah</th>
                  <!-- <th class="text-left">Diubah Oleh</th> -->
                  <th class="text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in filteredItems(detailItem)"
                  :key="item.id_detaillayanan"
                >
                  <td>{{ item.id_detaillayanan }}</td>
                  <td>{{ item.nama_layanan }}</td>
                  <td>{{ item.id_ukuranHewan }}</td>
                  <td>{{ item.harga }}</td>
                  <td>{{ item.jml_transaksi_layanan }}</td>
                  <td>{{ item.total_harga }}</td>
                  <td>{{ item.createLog_at }}</td>
                  <td>{{ item.updateLog_at }}</td>
                  <td>
                    <div>
                      <v-btn
                        icon
                        color="blue"
                        light
                        class="tombol"
                        outlined
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
                        v-on="on"
                        class="tombol"
                        outlined
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
                      <h3>{{ 'Subtotal : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.subtotal }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Diskon : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.diskon }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Total : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.total }}</h3>
                    </td>
                  </tr>
                </td>

                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ 'Nama Customer : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.nama_customer }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Nama Hewan : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.nama_hewan }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Jenis Hewan : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.nama_jenisHewan }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Nomor Telpon : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.noTelp_customer }}</h3>
                    </td>
                  </tr>
                </td>

                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ 'Id Customer Service : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.id_cs }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Id Kasir : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.id_kasir }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Nama Customer Service : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.nama_customer_service }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Nama Kasir : ' }}</h3>
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
                      updateProgressLayanan(detailItem)
                  "
                >
                  <v-icon size="18" class="mr-2">mdi-check-bold</v-icon>Layanan
                  Selesai
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
    <!------------------------ Detail Produk Dialog ------------------------>
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
              {{ 'Kode Penjualan Produk: ' + detailItem2.kode_penjualan_produk }}
            </h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <!-- <v-container> -->
            <v-simple-table height="50%">
              <thead>
                <tr>
                  <th class="text-left">Id Detail Produk</th>
                  <th class="text-left">Nama Produk</th>
                  <th class="text-left">Harga Satuan</th>
                  <th class="text-left">Jumlah</th>
                  <th class="text-left">Total Harga</th>
                  <th class="text-left">Tanggal Dibuat</th>
                  <!-- <th class="text-left">Dibuat Oleh</th> -->
                  <th class="text-left">Tanggal Diubah</th>
                  <!-- <th class="text-left">Diubah Oleh</th> -->
                  <th class="text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in filteredItems2(detailItem2)"
                  :key="item.id_detailproduk"
                >
                  <td>{{ item.id_detailproduk }}</td>
                  <td>{{ item.nama_produk }}</td>
                  <td>{{ item.id_produkHarga }}</td>
                  <td>{{ item.jml_transaksi_produk }}</td>
                  <td>{{ item.total_harga }}</td>
                  <td>{{ item.createLog_at }}</td>
                  <td>{{ item.updateLog_at }}</td>
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
                        color="red lighten-2"
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
            <div
              v-if="detailItem.status_transaksi != 'Lunas'"
              class="text-right"
              id="right-2"
            >
              <v-btn
                icon
                color="blue"
                light
                class="tombol"
                outlined=""
                @click="
                  setIdTransaksiProduk(detailItem2), (dialogEditProduk = true)
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
                      <h3>{{ 'Subtotal : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.subtotal }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Diskon : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.diskon }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Total : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.total }}</h3>
                    </td>
                  </tr>
                </td>

                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ 'Nama Pelanggan : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.nama_customer }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Nama Hewan : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.nama_hewan }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Jenis Hewan : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.id_jenisHewan }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Nomor Telpon : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.noTelp_customer }}</h3>
                    </td>
                  </tr>
                </td>

                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ 'Id Customer Service : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.id_cs }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Id Kasir : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.id_kasir }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Nama Customer Service : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.nama_customer_service }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Nama Kasir : ' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.nama_kasir }}</h3>
                    </td>
                  </tr>
                </td>
              </v-simple-table>
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
                    @change="getHargaEditProduk(), setTotalEditProduk()"
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
                    v-model="formProduk.jml_transaksi_produk"
                    color="purple"
                    type="number"
                    outlined
                    single-line
                    clearable
                    @change="getHargaEditProduk(), setTotalEditProduk()"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Harga Produk*"
                    v-model="formProduk.harga_produk"
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
    <!-- ----------------------------------------------------------------------------- -->
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
                    item-text="nama_hewan"
                    label="Nama Hewan*"
                    outlined
                    color="purple"
                    :filter="customFilter"
                    hide-selected
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
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ---------------------Dialog Edit Transaksi Layanan-------------------------------- -->
    <v-row justify="center">
      <v-dialog
        v-model="dialogEditTransaksiLayanan"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Ubah Transaksi Layanan</span>
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
                    hide-selected
                  ></v-autocomplete>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Diskon*"
                    v-model="formLayanan.diskon"
                    color="purple"
                    type="number"
                    outlined
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
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ---------------------Dialog Tambah Produk----------------------------------- -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="green accent-3">
          <v-btn icon @click="(dialog = false), resetDynamic()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Menu Tambah Transaksi Produk</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
            <v-btn text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>-->
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>
            <h2>Data Pembelian</h2>
          </v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-card>
                <v-row>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="id_hewan"
                      required
                      :items="hewans"
                      :filter="customFilter"
                      item-value="id_hewan"
                      color="purple"
                      item-text="nama_hewan"
                      label="Nama Hewan*"
                      outlined
                      rounded
                      @keyup="isHaveHewan()"
                      @change="isHaveHewan()"
                      :search-input.sync="form.empty"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="form.created_by"
                      label="Customer Service"
                      readonly
                      color="purple"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="form.id_cs"
                      label="ID Customer Service"
                      outlined
                      color="purple"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <h2>Total Pembelian :</h2>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="form.subtotal"
                      label="Total Pembelian"
                      readonly
                      shaped
                      color="purple"
                      prefix="Rp. "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <h2>Diskon Pembelian:</h2>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="form.diskon"
                      :disabled="!cekHewans"
                      label="Diskon"
                      @keyup="setSubtotal()"
                      @change="setSubtotal()"
                      shaped
                      color="purple"
                      prefix="Rp. "
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <h3>Data Produk</h3>
              </v-list-item-title>
              <v-card>
                <div
                  class="form-row"
                  v-for="(detilTransaksi, index) in detilTransaksis"
                  :key="index"
                >
                  <v-row>
                    <v-col cols="3">
                      <v-autocomplete
                        v-model="detilTransaksi.id_produk"
                        required
                        width
                        :items="produks"
                        @change="filteredProduk(index), setTotal(index)"
                        item-value="nama_produk"
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
                        v-model="detilTransaksi.jml_transaksi_produk"
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
                        label="Harga Produk*"
                        v-model="detilTransaksi.harga_produk"
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
                        v-model="detilTransaksi.total_harga"
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
                        @click="deleteRow(detilTransaksi), setSubtotal()"
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
                    <v-btn
                      outlined
                      color="green"
                      x-large
                      fab
                      @click="addTransaksi"
                      class="tombol"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>

                    <v-btn
                      outlined
                      color="green"
                      x-large
                      fab
                      @click="sendDataTransaksi(), setSubtotal()"
                      class="tombol"
                    >
                      <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    <!-- -------------------------------------------------------- -->
    <!-- ---------------------Dialog Tambah Layanan----------------------------------- -->
    <v-dialog
      v-model="dialog2"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="green accent-3">
          <v-btn icon @click="(dialog2 = false), resetDynamic2()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Menu Tambah Transaksi Layanan</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>
            <h2>Data Pembelian</h2>
          </v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-card>
                <v-row>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="id_hewan"
                      required
                      :items="hewans"
                      :filter="customFilter"
                      item-value="id_hewan"
                      color="purple"
                      item-text="nama_hewan"
                      label="Nama Hewan*"
                      outlined
                      rounded
                      @keyup="isHaveHewan()"
                      @change="isHaveHewan()"
                      :search-input.sync="form.empty"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="form.created_by"
                      label="Customer Service"
                      readonly
                      color="purple"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="form.id_cs"
                      label="ID Customer Service"
                      outlined
                      color="purple"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <h2>Total Pembelian:</h2>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="form.subtotal"
                      label="Total Pembelian"
                      readonly
                      shaped
                      color="purple"
                      prefix="Rp. "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <h2>Diskon Pembelian:</h2>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="form.diskon"
                      :disabled="!cekHewans"
                      label="Diskon"
                      @keyup="setSubtotal2()"
                      @change="setSubtotal2()"
                      shaped
                      color="purple"
                      prefix="Rp. "
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <h3>Data Layanan</h3>
              </v-list-item-title>
              <v-card>
                <div
                  class="form-row"
                  v-for="(detilLayanan, index) in detilLayanans"
                  :key="index"
                >
                  <v-row>
                    <v-col cols="3">
                      <v-autocomplete
                        v-model="detilLayanan.id_layanan"
                        required
                        width
                        :items="layanans"
                        @change="filteredHargaLayanan(index), setTotal2(index)"
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
                        v-model="detilLayanan.id_ukuranHewan"
                        required
                        width
                        :items="ukurans"
                        @change="filteredHargaLayanan(index), setTotal2(index)"
                        item-value="id_ukuranHewan"
                        item-text="nama_ukuranHewan"
                        label="Ukuran*"
                        outlined
                        color="purple"
                        hide-selected
                        :filter="customFilter"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="1">
                      <v-text-field
                        label="Jumlah*"
                        v-model="detilLayanan.jml_transaksi_layanan"
                        color="purple"
                        type="number"
                        outlined
                        single-line
                        clearable
                        @keyup="setTotal2(index), setSubtotal2()"
                        @change="setTotal2(index), setSubtotal2()"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="2">
                      <v-text-field
                        label="Harga Layanan*"
                        v-model="detilLayanan.layananharga"
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
                        v-model="detilLayanan.total_harga"
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
                        @click="deleteRow2(detilLayanan), setSubtotal2()"
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
                    <v-btn
                      outlined
                      color="green"
                      x-large
                      fab
                      @click="addLayanan()"
                      class="tombol"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>

                    <v-btn
                      outlined
                      color="green"
                      x-large
                      fab
                      @click="sendDataLayanan(), setSubtotal2()"
                      class="tombol"
                    >
                      <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    <!-- -------------------------------------------------------- -->
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
                    width
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
                    v-model="formLayanan.id_ukuranHewan"
                    required
                    width
                    :items="ukurans"
                    @change="setHargaLayananEdit()"
                    item-value="id_ukuranHewan"
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
                    v-model="formLayanan.layananharga"
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
                    v-model="formLayanan.total_harga"
                    value
                    outlined
                    readonly
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
        cari: '',
        tabs: 0,
        dialog: false,
        dialog2: false,
        cekHewans: false,
        detilTransaksis: [],
        detilLayanans: [],
        temps: [],
        dialogEditProduk: false,
        dialogEditLayanan: false,
        dialogEditTransaksiProduk: false,
        dialogEditTransaksiLayanan: false,
        layanans: [],
        ukurans: [],
        detailTransaksiLayanans: [],
        detailTransaksiProduks: [],
        detailIdTransaksiProduksFiltered: [],
        detailIdTransaksiLayanansFiltered: [],
        selectedIndex: 0,
        detailItem: '',
        detailItem2: '',
        transaksiProduks: [],
        transaksiLayanans: [],
        keyword: '',
        jenishewans: [],
        hewans: [],
        pelanggans: [],
        produks: [],
        bottomNav: 1,
        menu: false,
        on: '',
        deleteDialog: '',
        deleteDetailDialog: '',
        submit: '',
        headers: [
          {
            text: 'No',
            value: 'index',
          },
          {
            text: 'Kode Penjualan Produk',
            value: 'kode_penjualan_produk',
          },
          {
            text: 'Nama Customer',
            value: 'nama_customer',
          },
          {
            text: 'Nama Hewan',
            value: 'nama_hewan',
          },
          {
            text: 'Total',
            value: 'total',
          },
          {
            text: 'Status Transaksi',
            value: 'status_transaksi',
          },
          {
            text: 'Tanggal Dibuat',
            value: 'created_at',
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
        headers2: [
          {
            text: 'No',
            value: 'index',
          },
          {
            text: 'Kode Transaksi Layanan',
            value: 'kode_penjualan_layanan',
          },
          {
            text: 'Nama Customer',
            value: 'nama_customer',
          },
          {
            text: 'Nama Hewan',
            value: 'nama_hewan',
          },
          {
            text: 'Total',
            value: 'total',
          },
          {
            text: 'Proses',
            value: 'proses',
          },
          {
            text: 'Status Transaksi',
            value: 'status_transaksi',
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
        layananTab: null,
        detilJudulLayanan: 0,
        detilJudulProduk: 0,
        dialogWarning: '',
        dialogEdit: '',
        dialogPassword: '',
        dialogDetailTransaksiLayanan: false,
        dialogDetailTransaksiProduk: false,
        pesan: '',
        empty: null,
        id_hewan: null,
        snackbar: false,
        color: null,
        text: '',
        load: false,
        form: {
          subtotal: '',
          diskon: '',
          id_hewan: '',
          created_by: sessionStorage.getItem('Nama'),
          delete_by: sessionStorage.getItem('Nama'),
          modified_by: sessionStorage.getItem('Nama'),
          id_cs: sessionStorage.getItem('Id'),
        },
        formProduk: {
          id_hewan: '',
          total: '',
          diskon: '',
          kode_penjualan_produk: '',
          subtotal: '',
          harga_produk: '',
          total_harga: '',
          id_produk: '',
          // created_by: sessionStorage.getItem('Nama'),
          // delete_by: sessionStorage.getItem('Nama'),
          // modified_by: sessionStorage.getItem('Nama'),
          id_cs: sessionStorage.getItem('Id'),
        },
        formLayanan: {
          id_hewan: '',
          total: '',
          diskon: '',
          kode_penjualan_layanan: '',
          subtotal: '',
          id_harga_layanan: '',
          total_harga: '',
          id_layanan: '',
          created_by: sessionStorage.getItem('Nama'),
          delete_by: sessionStorage.getItem('Nama'),
          modified_by: sessionStorage.getItem('Nama'),
          id_cs: sessionStorage.getItem('Id'),
        },
        user: new FormData(),
        user2: new FormData(),
        detil: new FormData(),
        detil2: new FormData(),
        deleteProduk: new FormData(),
        deleteLayanan: new FormData(),
        transaksiLayanan: new FormData(),
        typeInput: 'new',
        errors: '',
        updatedId: '',
      };
    },
    computed: {
      // cekHewans: function(){
      // //   // return this.hewans.filter((hewans)=>{
      // //   //   return this.hewans.id_hewan.match(this.id_hewan)
      // //   // });
      //   this.hewans.forEach(item => {
      //     if(item.id==this.id_hewan){
      //       return true;
      //     }
      //   });
      //   return false;
      // }
    },
    watch: {
      id_hewan() {
        this.empty = '';
      },
    },

    methods: {
      isHaveHewan() {
        var hewan = false;
        this.hewans.forEach((item) => {
          if (item.id_hewan == this.id_hewan) {
            console.log(
              'id hewan: ' + item.id_hewan + ', id input: ' + this.id_hewan
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
            this.transaksiLayanans[i].nama_hewan = '-';
            this.transaksiLayanans[i].jenis_hewan = '-';
            this.transaksiLayanans[i].nama_customer = 'Guest';
            this.transaksiLayanans[i].telp = '-';
            this.transaksiLayanans[i].diskon = '0';
          }
        }
      },
      isGuestProduk() {
        for (var i = 0; i < this.transaksiProduks.length; i++) {
          if (this.transaksiProduks[i].id_hewan == null) {
            this.transaksiProduks[i].nama_hewan = '-';
            this.transaksiProduks[i].jenis_hewan = '-';
            this.transaksiProduks[i].nama_customer = 'Guest';
            this.transaksiProduks[i].telp = '-';
            this.transaksiProduks[i].diskon = '0';
          }
        }
      },
      isHaveDiskonProduk() {
        for (var i = 0; i < this.transaksiProduks.length; i++) {
          if (this.transaksiProduks[i].diskon == null) {
            this.transaksiProduks[i].diskon = '0';
          }
        }
      },
      isHaveDiskonLayanan() {
        for (var i = 0; i < this.transaksiLayanans.length; i++) {
          if (this.transaksiLayanans[i].diskon == null) {
            this.transaksiLayanans[i].diskon = '0';
          }
        }
      },
      isHaveKasirProduk() {
        for (var i = 0; i < this.transaksiProduks.length; i++) {
          if (this.transaksiProduks[i].id_kasir == null) {
            this.transaksiProduks[i].id_kasir = '-';
            this.transaksiProduks[i].nama_kasir = '-';
          }
        }
      },
      isHaveKasirLayanan() {
        for (var i = 0; i < this.transaksiLayanans.length; i++) {
          if (this.transaksiLayanans[i].id_kasir == null) {
            this.transaksiLayanans[i].id_kasir = '-';
            this.transaksiLayanans[i].nama_kasir = '-';
          }
        }
      },
      //memfilter transaksi layanan yang progressnya sedang diproses dan statusnya menunggu pembayaran
      filterProgress() {
        return this.transaksiLayanans.filter((transaksiLayanan) => {
          return (
            transaksiLayanan.proses.match('Dalam Proses') &&
            transaksiLayanan.status_transaksi.match('Menunggu Pembayaran')
          );
        });
      },
      //memfilter transaksi layanan yang progressnya sudah selesai diproses dan statusnya menunggu pembayaran
      filterProgress2() {
        return this.transaksiLayanans.filter((transaksiLayanan) => {
          return (
            transaksiLayanan.proses.match('Layanan Selesai') &&
            transaksiLayanan.status_transaksi.match('Menunggu Pembayaran')
          );
        });
      },
      //memfilter transaksi produk yang statusnya menunggu pembayaran
      filterProgress3() {
        return this.transaksiProduks.filter((transaksiProduk) => {
          return transaksiProduk.status_transaksi.match('Belum Selesai');
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
            !value.kode_penjualan_produk ||
            i.kode_penjualan_produk === value.kode_penjualan_produk
          );
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
      deleteRow2(_detilTransaksi) {
        this.detilLayanans.splice(
          this.detilLayanans.indexOf(_detilTransaksi),
          1
        );
      },

      resetDynamic() {
        while (this.detilTransaksis.length != 0) {
          for (var i = 0; i < this.detilTransaksis.length; i++) {
            this.detilTransaksis.splice(this.detilTransaksis[i], 1);
          }
        }
        this.resetForm();
      },

      resetDynamic2() {
        while (this.detilLayanans.length != 0) {
          for (var i = 0; i < this.detilLayanans.length; i++) {
            this.detilLayanans.splice(this.detilLayanans[i], 1);
          }
        }
        this.resetForm();
      },

      resetForm() {
        this.form = {
          subtotal: '',
          diskon: '',
          id_hewan: '',
          id_cs: sessionStorage.getItem('Id'),
          created_by: sessionStorage.getItem('Nama'),
          delete_by: sessionStorage.getItem('Nama'),
          modified_by: sessionStorage.getItem('Nama'),
        };
      },
      resetFormProduk() {
        this.formProduk = {
          id_hewan: '',
          total: '',
          diskon: '',
          kode_penjualan_produk: '',
          subtotal: '',
          harga_produk: '',
          total_harga: '',
          id_produk: '',
          created_by: sessionStorage.getItem('Nama'),
          delete_by: sessionStorage.getItem('Nama'),
          modified_by: sessionStorage.getItem('Nama'),
          id_cs: sessionStorage.getItem('Id'),
        };
      },
      resetFormLayanan() {
        this.formLayanan = {
          id_hewan: '',
          total: '',
          diskon: '',
          kode_penjualan_layanan: '',
          subtotal: '',
          id_harga_layanan: '',
          total_harga: '',
          id_layanan: '',
          created_by: sessionStorage.getItem('Nama'),
          delete_by: sessionStorage.getItem('Nama'),
          modified_by: sessionStorage.getItem('Nama'),
          id_cs: sessionStorage.getItem('Id'),
        };
      },
      addTransaksi() {
        this.getProduk();
        this.detilTransaksis.push({
          id_cs: sessionStorage.getItem('Id'),
          kode_penjualan_produk: '',
          id_produk: '',
          jumlah: '',
          total_harga: '',
          harga_produk: '',
          created_at: '',
          created_by: sessionStorage.getItem('Nama'),
          updateLog_at: '',
          modified_by: '',
          delete_at: '',
          delete_by: '',
        });
      },
      addLayanan() {
        this.detilLayanans.push({
          id_cs: sessionStorage.getItem('Id'),
          kode_penjualan_layanan: '',
          id_harga_layanan: '',
          jumlah: '',
          total_harga: '',
          harga: '',
          created_at: '',
          created_by: sessionStorage.getItem('Nama'),
          updateLog_at: '',
          modified_by: '',
          delete_at: '',
          delete_by: '',
        });
      },

      filteredProduk(index) {
        var uri =
          this.$apiUrl4 +
          'produk/' +
          'search/' +
          this.detilTransaksis[index].id_produk;
        this.$http.get(uri).then((response) => {
          this.detilTransaksis[index].harga_produk = response.data.message.harga_produk;
          this.detilTransaksis[index].total_harga =
            this.detilTransaksis[index].harga_produk *
            this.detilTransaksis[index].jml_transaksi_produk;
        });
      },
      getHargaEditProduk() {
        var uri =
          this.$apiUrl4 + 'Produk/' + 'search/' + this.formProduk.id_produk;
        this.$http.get(uri).then((response) => {
          this.formProduk.harga_produk = response.data.message.harga_produk;
          this.formProduk.total_harga =
            this.formProduk.harga_produk * this.formProduk.jml_transaksi_produk;
        });
      },

      setIdTransaksiProduk(item) {
        this.detilJudulProduk = 1;
        this.formProduk.kode_penjualan_produk = item.kode_penjualan_produk;
        console.log(this.formProduk.kode_penjualan_produk);
      },
      setIdTransaksiLayanan(item) {
        this.detilJudulLayanan = 1;
        this.formLayanan.kode_penjualan_layanan = item.kode_penjualan_layanan;
        console.log(this.formLayanan.kode_penjualan_layanan);
      },

      setTotalEditProduk() {
        this.formProduk.total_harga =
          this.formProduk.harga_produk * this.formProduk.jml_transaksi_produk;
      },

      filteredHargaLayanan(index) {
        var uri =
          this.$apiUrl4 +
          'layananharga/' +
          'searchByIdLayananUkuran/' +
          this.detilLayanans[index].id_layanan +
          '/' +
          this.detilLayanans[index].id_ukuran_hewan;
        this.$http.get(uri).then((response) => {
          this.detilLayanans[index].harga = response.data.message.harga;
          this.detilLayanans[index].id_harga_layanan =
            response.data.message.id_harga_layanan;
          this.detilLayanans[index].total_harga =
            this.detilLayanans[index].harga * this.detilLayanans[index].jumlah;
        });
      },
      setHargaLayananEdit() {
        var uri =
          this.$apiUrl4 +
          'layananharga/' +
          'searchByIdLayananUkuran/' +
          this.formLayanan.id_layanan +
          '/' +
          this.formLayanan.id_ukuran_hewan;
        this.$http.get(uri).then((response) => {
          this.formLayanan.harga = response.data.message.harga;
          this.formLayanan.id_harga_layanan =
            response.data.message.id_harga_layanan;
          this.formLayanan.total_harga =
            this.formLayanan.harga * this.formLayanan.jumlah;
          console.log(this.formLayanan.id_harga_layanan);
        });
      },
      setTotal(index) {
        this.detilTransaksis[index].total_harga =
          this.detilTransaksis[index].harga *
          this.detilTransaksis[index].jumlah;
      },
      setSubtotalEditLayanan() {
        this.formLayanan.total_harga =
          this.formLayanan.harga * this.formLayanan.jumlah;
      },
      setTotal2(index) {
        this.detilLayanans[index].total_harga =
          this.detilLayanans[index].harga * this.detilLayanans[index].jumlah;
      },
      setNewEditTotal() {
        this.formProduk.total =
          this.formProduk.subtotal - this.formProduk.diskon;
      },
      setNewEditTotal2() {
        this.formLayanan.total =
          this.formLayanan.subtotal - this.formLayanan.diskon;
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
      setSubtotal2() {
        this.form.subtotal = 0;
        for (var i = 0; i < this.detilLayanans.length; i++) {
          this.form.subtotal =
            this.form.subtotal + this.detilLayanans[i].total_harga;
        }
        this.form.subtotal = this.form.subtotal - this.form.diskon;
        if (this.form.subtotal < 0) {
          this.form.subtotal = 0;
        }
      },
      getDataProduk() {
        var uri = this.$apiUrl4 + 'transaksipenjualanproduk/' + 'getWithJoin';
        this.$http.get(uri).then((response) => {
          this.transaksiProduks = response.data.message;
          this.isGuestProduk();
          this.isHaveKasirProduk();
          this.isHaveDiskonProduk();
        });
      },
      getDataTransaksiProduk() {
        var uri = this.$apiUrl4 + 'detailtransaksiproduk/' + 'getWithJoin';
        this.$http.get(uri).then((response) => {
          this.detailTransaksiProduks = response.data.message;
        });
      },
      getHewan() {
        var uri = this.$apiUrl4 + 'Hewan';
        this.$http.get(uri).then((response) => {
          this.hewans = response.data.message;
        });
      },
      getJenisHewan() {
        var uri = this.$apiUrl4 + 'JenisHewan';
        this.$http.get(uri).then((response) => {
          this.jenishewans = response.data.message;
        });
      },
      cek() {
        console.log(this.hewans);
      },
      getPelanggan() {
        var uri = this.$apiUrl4 + 'Pelanggan/' + 'all';
        this.$http.get(uri).then((response) => {
          this.pelanggans = response.data.message;
        });
      },
      getProduk() {
        var uri = this.$apiUrl4 + 'Produk/' + 'all';
        this.$http.get(uri).then((response) => {
          this.produks = response.data.message;
        });
      },
      getDataLayanan() {
        var uri = this.$apiUrl4 + 'transaksipenjualanlayanan/' + 'getWithJoin';
        this.$http.get(uri).then((response) => {
          this.transaksiLayanans = response.data.message;
          this.isGuestLayanan();
          this.isHaveKasirLayanan();
          this.isHaveDiskonLayanan();
        });
      },
      getDataTransaksiLayanan() {
        var uri = this.$apiUrl4 + 'DetailTransaksiLayanan/' + 'getWithJoin';
        this.$http.get(uri).then((response) => {
          this.detailTransaksiLayanans = response.data.message;
        });
      },
      getLayanan() {
        var uri = this.$apiUrl4 + 'Layanan';
        this.$http.get(uri).then((response) => {
          this.layanans = response.data.message;
        });
      },
      getUkuran() {
        var uri = this.$apiUrl4 + 'UkuranHewan';
        this.$http.get(uri).then((response) => {
          this.ukurans = response.data.message;
        });
      },
      getDetailTransaksiProdukById(item) {
        this.updatedId = item.kode_penjualan_produk;
        var uri =
          this.$apiUrl4 +
          'DetailTransaksiProduk/' +
          'getByTransactionId/' +
          this.updatedId;
        this.$http.get(uri).then((response) => {
          this.detailIdTransaksiProduks = response.data.message;
          for (var i = 0; i < this.detailIdTransaksiProduks.length; i++) {
            this.detailIdTransaksiProduksFiltered[
              i
            ] = this.detailIdTransaksiProduks[i].id_detailproduk;
          }
          console.log(this.detailIdTransaksiProduksFiltered);
        });
      },
      getDetailTransaksiLayananById(item) {
        this.updatedId = item.kode_penjualan_layanan;
        var uri =
          this.$apiUrl4 +
          'DetailTransaksiLayanan/' +
          'getByTransactionId/' +
          this.updatedId;
        this.$http.get(uri).then((response) => {
          this.detailIdTransaksiLayanans = response.data.message;
          for (var i = 0; i < this.detailIdTransaksiLayanans.length; i++) {
            this.detailIdTransaksiLayanansFiltered[
              i
            ] = this.detailIdTransaksiLayanans[i].id_detail_transaksi_layanan;
          }
          console.log(this.detailIdTransaksiLayanansFiltered);
        });
      },
      resetArray() {
        this.detailIdTransaksiLayanansFiltered = [];
        this.detailIdTransaksiProduksFiltered = [];
      },
      addProdukDetil() {
        this.user.append(
          'kode_penjualan_produk',
          this.formProduk.kode_penjualan_produk
        );
        this.user.append('id_produk', this.formProduk.id_produk);
        // this.user.append('created_by', this.formProduk.created_by);
        this.user.append('total_harga', this.formProduk.total_harga);
        this.user.append('jml_transaksi_produk', this.formProduk.jml_transaksi_produk);
        var uri = this.$apiUrl4 + 'detailtransaksiproduk';
        this.load = true;
        this.$http
          .post(uri, this.user)
          .then((response) => {
            this.snackbar = true;
            this.color = 'green';
            this.text = response.data.message;
            this.load = false;
            this.getDataProduk();
            this.getDataTransaksiProduk();
            this.resetFormProduk();
            this.dialog = false;
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      addLayananDetil() {
        this.user2.append(
          'kode_penjualan_layanan',
          this.formLayanan.kode_penjualan_layanan
        );
        this.user2.append(
          'id_harga_layanan',
          this.formLayanan.id_harga_layanan
        );
        this.user2.append('id_layanan', this.formLayanan.id_Layanan);
        this.user2.append('jumlah', this.formLayanan.jumlah);
        this.user2.append('total_harga', this.formLayanan.total_harga);
        this.user2.append('created_by', this.formLayanan.created_by);
        var uri = this.$apiUrl4 + 'detailtransaksilayanan';
        this.load = true;
        this.$http
          .post(uri, this.user2)
          .then((response) => {
            this.snackbar = true;
            this.color = 'green';
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
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },

      sendDataTransaksi() {
        this.detil.append('id_cs', this.form.id_cs);
        this.detil.append('created_by', this.form.created_by);
        this.detil.append('subtotal', this.form.subtotal);
        if (this.diskon != null) {
          this.detil.append('diskon', this.form.diskon);
        } else {
          this.detil.delete('diskon');
        }
        if (this.id_hewan != null) {
          this.detil.append('id_hewan', this.id_hewan);
        } else {
          this.detil.delete('id_hewan');
        }

        var uri = this.$apiUrl4 + 'transaksipenjualanproduk';

        this.load = true;
        this.$http
          .post(uri, this.detil)
          .then((response) => {
            this.sendDataDetilTransaksi(response.data.message);
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      sendDataDetilTransaksi(kode_penjualan_produk) {
        for (let i = 0; i < this.detilTransaksis.length; i++) {
          this.detilTransaksis[i].kode_penjualan_produk = kode_penjualan_produk;
        }
        this.user.append(
          'detailtransaksiproduks',
          JSON.stringify(this.detilTransaksis)
        );
        var uri = this.$apiUrl4 + 'detailtransaksiproduk/' + 'insertMultiple';
        this.load = true;
        this.$http
          .post(uri, this.user)
          .then((response) => {
            this.snackbar = true;
            this.color = 'green';
            this.text = response.data.message;
            this.load = false;
            this.dialog = false;
            this.id_hewan = null;
            this.getDataProduk();
            this.getDataTransaksiProduk();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      sendDataLayanan() {
        this.detil2.append(
          'id_cs',
          this.form.id_cs
        );
        this.detil2.append('created_by', this.form.created_by);
        this.detil2.append('subtotal', this.form.subtotal);
        if (this.diskon != null) {
          this.detil2.append('diskon', this.form.diskon);
        } else {
          this.detil2.delete('diskon');
        }
        if (this.id_hewan != null) {
          this.detil2.append('id_hewan', this.id_hewan);
        } else {
          this.detil2.delete('id_hewan');
        }
        console.log(this.id_hewan);
        var uri = this.$apiUrl4 + 'transaksipenjualanlayanan';

        this.load = true;
        this.$http
          .post(uri, this.detil2)
          .then((response) => {
            this.sendDataDetilLayanan(response.data.message);
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      sendDataDetilLayanan(kode_penjualan_layanan) {
        for (let i = 0; i < this.detilLayanans.length; i++) {
          this.detilLayanans[i].kode_penjualan_layanan = kode_penjualan_layanan;
        }
        this.user2.append(
          'detail_transaksi_layanan',
          JSON.stringify(this.detilLayanans)
        );
        var uri = this.$apiUrl4 + 'DetailTransaksiLayanan/insertMultiple';
        this.load = true;
        this.$http
          .post(uri, this.user2)
          .then((response) => {
            this.snackbar = true;
            this.color = 'green';
            this.text = response.data.message;
            this.load = false;
            this.dialog2 = false;
            this.id_hewan = null;
            this.getDataLayanan();
            this.getDataTransaksiLayanan();
            this.typeInput = 'new';
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },

      updateProgressLayanan(detailItem) {
        this.updatedId = detailItem.kode_penjualan_layanan;
        this.transaksiLayanan.append(
          'modified_by',
          sessionStorage.getItem('Nama')
        );
        console.log(detailItem.kode_penjualan_layanan);
        var uri =
          this.$apiUrl4 +
          'transaksipenjualanlayanan/' +
          'updateProgress/' +
          this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.transaksiLayanan)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan kesnackbar
            this.load = false;
            this.dialogEdit = false;
            this.getDataLayanan();
            this.getDataTransaksiLayanan(); //mengambil data transaksi layanan
            this.typeInput = 'new';
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      editHandlerProduk(item) {
        this.typeInput = 'edit';
        this.detilJudulProduk = 0;
        this.dialogEditProduk = true;
        this.formProduk.id_produk = item.id_produk;
        this.formProduk.jumlah = item.jumlah;
        this.formProduk.harga_produk = item.harga_produk;
        this.formProduk.total_harga = item.total_harga;
        this.formProduk.kode_penjualan_produk = item.kode_penjualan_produk;
        console.log(this.formProduk.kode_penjualan_produk);
        this.updatedId = item.id_detailproduk;
      },
      editHandlerLayanan(item) {
        this.typeInput = 'edit';
        this.detilJudulLayanan = 0;
        this.dialogEditLayanan = true;
        this.formLayanan.id_layanan = item.id_layanan;
        this.formLayanan.id_ukuran_hewan = item.id_ukuran_hewan;
        this.formLayanan.jumlah = item.jumlah;
        this.formLayanan.total_harga = item.total_harga;
        this.formLayanan.kode_penjualan_layanan = item.kode_penjualan_layanan;
        console.log(this.formLayanan.kode_penjualan_layanan);
        this.updatedId = item.id_detail_transaksi_layanan;
      },
      editHandlerTransaksiProduk(item) {
        this.typeInput = 'edit';
        this.dialogEditTransaksiProduk = true;
        this.formProduk.id_hewan = item.id_hewan;
        this.formProduk.subtotal = item.subtotal;
        this.formProduk.total = item.total;
        this.formProduk.diskon = item.diskon;
        this.formProduk.kode_penjualan_produk = item.kode_penjualan_produk;
        this.updatedId = item.kode_penjualan_produk;
      },
      editHandlerTransaksiLayanan(item) {
        this.typeInput = 'edit';
        this.dialogEditTransaksiLayanan = true;
        this.formLayanan.id_hewan = item.id_hewan;
        this.formLayanan.subtotal = item.subtotal;
        this.formLayanan.total = item.total;
        this.formLayanan.diskon = item.diskon;
        this.formLayanan.kode_penjualan_layanan = item.kode_penjualan_layanan;
        this.updatedId = item.kode_penjualan_layanan;
      },
      updateDataDetilTransaksi() {
        this.user.append('id_produk', this.formProduk.id_produk);
        this.user.append('jumlah', this.formProduk.jumlah);
        this.user.append('total_harga', this.formProduk.total_harga);
        this.user.append('modified_by', this.formProduk.modified_by);
        var uri =
          this.$apiUrl4 + 'DetailTransaksiProduk/' + 'update/' + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.user)
          .then((response) => {
            this.snackbar = true;
            this.color = 'green';
            this.text = response.data.message;
            this.load = false;
            this.dialogEdit = false;
            this.getDataTransaksiProduk();
            this.getDataProduk();
            this.resetFormProduk();
            this.typeInput = 'new';
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
            this.typeInput = 'new';
          });
      },
      updateDataTransaksi() {
        this.detil.append('id_hewan', this.formProduk.id_hewan);
        this.detil.append('diskon', this.formProduk.diskon);
        this.detil.append('subtotal', this.formProduk.subtotal);
        this.detil.append('total', this.formProduk.total);
        this.detil.append('modified_by', this.formProduk.modified_by);
        var uri =
          this.$apiUrl4 + 'transaksipenjualanproduk/' + 'update/' + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.detil)
          .then((response) => {
            this.snackbar = true;
            this.color = 'green';
            this.text = response.data.message;
            this.load = false;
            this.dialogEditTransaksiProduk = false;
            this.getDataTransaksiProduk();
            this.getDataProduk();
            this.typeInput = 'new';
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
            this.typeInput = 'new';
          });
      },
      updateDataLayanan() {
        this.detil2.append('id_hewan', this.formLayanan.id_hewan);
        this.detil2.append('diskon', this.formLayanan.diskon);
        this.detil2.append('subtotal', this.formLayanan.subtotal);
        this.detil2.append('total', this.formLayanan.total);
        this.detil2.append('modified_by', this.formLayanan.modified_by);
        var uri =
          this.$apiUrl4 + 'transaksipenjualanlayanan/' + 'update/' + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.detil2)
          .then((response) => {
            this.snackbar = true;
            this.color = 'green';
            this.text = response.data.message;
            this.load = false;
            this.dialogEditTransaksiProduk = false;
            this.getDataTransaksiLayanan();
            this.getDataLayanan();
            this.typeInput = 'new';
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
            this.typeInput = 'new';
          });
      },
      updateDataDetilLayanan() {
        this.user2.append(
          'id_harga_layanan',
          this.formLayanan.id_harga_layanan
        );
        this.user2.append('id_layanan', this.formLayanan.id_Layanan);
        this.user2.append('jumlah', this.formLayanan.jumlah);
        this.user2.append('total_harga', this.formLayanan.total_harga);
        this.user2.append('modified_by', this.formLayanan.modified_by);
        var uri =
          this.$apiUrl4 + 'DetailTransaksiLayanan/' + 'update/' + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.user2)
          .then((response) => {
            this.snackbar = true;
            this.color = 'green';
            this.text = response.data.message;
            this.load = false;
            this.dialogEdit = false;
            this.getDataTransaksiLayanan();
            this.getDataLayanan();
            this.resetFormLayanan();
            this.typeInput = 'new';
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
            this.typeInput = 'new';
          });
      },
      setFormProduk() {
        if (this.typeInput === 'new') {
          this.addProdukDetil();
        } else {
          console.log('data berhasil diubah');
          this.updateDataDetilTransaksi();
        }
      },
      setFormLayanan() {
        if (this.typeInput === 'new') {
          this.addLayananDetil();
        } else {
          console.log('data berhasil diubah');
          this.updateDataDetilLayanan();
        }
      },
      showDetail(item) {
        this.detailItem = item;
        this.dialogDetailTransaksiLayanan = true;
      },
      showDetail2(item) {
        this.detailItem2 = item;
        this.dialogDetailTransaksiProduk = true;
      },
      deleteDataProduk(deleteId) {
        var uri = this.$apiUrl4 + 'transaksipenjualanproduk/' + deleteId; //data dihapus berdasarkan id
        this.$http
          .delete(uri)
          .then((response) => {
            this.text = response.data.message;
            this.deleteMultipleDataDetailProduk();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
          });
      },
      deleteMultipleDataDetailProduk() {
        this.deleteProduk.append(
          'id_detailproduk',
          JSON.stringify(this.detailIdTransaksiProduksFiltered)
        );
        var uri = this.$apiUrl4 + 'DetailTransaksiProduk/' + 'deleteMultiple';
        this.load = true;
        this.$http
          .post(uri, this.deleteProduk)
          .then(() => {
            this.snackbar = true;
            this.color = 'green';
            this.text = 'Berhasil';
            this.load = false;
            this.deleteDialog = false;
            this.getDataProduk();
            this.getDataTransaksiProduk();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      async deleteDataDetailProduk(deleteId) {
        var uri = this.$apiUrl4 + 'DetailTransaksiProduk/' + deleteId; //data dihapus berdasarkan id
        await this.$http
          .delete(uri)
          .then((response) => {
            this.snackbar = true;
            this.text = response.data.message;
            this.color = 'green';
            this.deleteDetailDialog = false;
            this.getDataProduk();
            this.getDataTransaksiProduk();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Try Again';
            this.color = 'red';
          });
      },
      deleteRowProduk(item) {
        this.deleteId = item.kode_penjualan_produk;
        this.deleteDialog = true;
      },
      deleteRowDetailProduk(item) {
        this.deleteId = item.id_detailproduk;
        this.deleteDetailDialog = true;
      },
      deleteDataLayanan(deleteId) {
        var uri = this.$apiUrl4 + 'transaksipenjualanlayanan/' + deleteId; //data dihapus berdasarkan id
        this.$http
          .delete(uri)
          .then((response) => {
            this.text = response.data.message;
            this.deleteMultipleDataDetailLayanan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Try Again';
            this.color = 'red';
          });
      },
      deleteMultipleDataDetailLayanan() {
        this.deleteLayanan.append(
          'id_detail_transaksi_layanan',
          JSON.stringify(this.detailIdTransaksiLayanansFiltered)
        );
        var uri = this.$apiUrl4 + 'DetailTransaksiLayanan/' + 'deleteMultiple';
        this.load = true;
        this.$http
          .post(uri, this.deleteLayanan)
          .then(() => {
            this.snackbar = true;
            this.color = 'green';
            this.text = 'Berhasil';
            this.load = false;
            this.deleteDialog = false;
            this.getDataLayanan();
            this.getDataTransaksiLayanan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      async deleteDataDetailLayanan(deleteId) {
        var uri = this.$apiUrl4 + 'DetailTransaksiLayanan/' + deleteId; //data dihapus berdasarkan id
        await this.$http
          .delete(uri)
          .then((response) => {
            this.snackbar = true;
            this.text = response.data.message;
            this.color = 'green';
            this.deleteDetailDialog = false;
            this.getDataLayanan();
            this.getDataTransaksiLayanan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Try Again';
            this.color = 'red';
          });
      },
      deleteRowLayanan(item) {
        this.deleteId = item.kode_penjualan_layanan;
        this.deleteDialog = true;
      },
      deleteRowDetailLayanan(item) {
        this.deleteId = item.id_detail_transaksi_layanan;
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
    },
    mounted() {
      this.getDataProduk();
      this.getDataLayanan();
      this.getHewan();
      this.getJenisHewan();
      this.getProduk();
      this.getDataTransaksiLayanan();
      this.getDataTransaksiProduk();
      this.getLayanan();
      this.getUkuran();
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
  #right-2 {
    margin-right: 22px;
  }
</style>
