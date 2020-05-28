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
          <div class="pa-5">
            <h2 class="subheading grey-darken--text">
              Pengadaan Produk Selesai
            </h2>
            <v-layout row wrap style="margin: 10px;">
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
                      style="cursor: pointer;"
                    >
                      {{ item.no_order }}
                    </td>
                    <td>{{ item.nama_supplier }}</td>
                    <td>{{ item.total_harga }}</td>
                    <td>{{ item.status_pengadaan }}</td>
                    <td>{{ item.createLog_at }}</td>
                    <td>{{ item.updateLog_at }}</td>
                    <!-- <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td>-->
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

    <!------------------------  Dialog detail pengadaan------------------------>
    <template>
      <v-dialog
        v-model="dialogDetailPengadaanProduk"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <v-spacer />
            <h2 class="text-md-center">
              {{ "No Order: " + detailItem.no_order }}
            </h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <!-- <v-container> -->
            <v-simple-table height="50%">
              <thead>
                <tr>
                  <th class="text-left">ID Detail Pengadaan</th>
                  <th class="text-left">Nama Produk</th>
                  <th class="text-left">Jumlah</th>
                  <th class="text-left">Harga</th>
                  <th class="text-left">Total Harga</th>
                  <th class="text-left">Tanggal Dibuat</th>
                  <th class="text-left">Dibuat Oleh</th>
                  <th class="text-left">Tanggal Diubah</th>
                  <th class="text-left">Diubah Oleh</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in filteredItems2(detailItem)"
                  :key="item.no_order"
                >
                  <td>{{ item.no_order }}</td>
                  <td>{{ item.nama_produk }}</td>
                  <td>{{ item.jumlah_stok_pengadaan }}</td>
                  <td>{{ item.harga }}</td>
                  <td>{{ item.total_harga }}</td>
                  <td>{{ item.createLog_at }}</td>
                  <td>{{ item.updateLog_at }}</td>
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
                      <h3>{{ "Total : Rp" }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.total_harga }}</h3>
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
              outlined=""
              @click="dialogDetailPengadaanProduk = false"
              >Tutup</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- ------------------------------------------------------------------------- -->

    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="true"
      :timeout="3000"
    >
      {{ text }}

      <v-btn dark text @click="snackbar = false">
        Tutup
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "No",
          value: "index",
        },
        {
          text: "No Order",
          value: "no_order",
        },
        {
          text: "Nama Supplier",
          value: "nama_supplier",
        },
        {
          text: "Total",
          value: "total_harga",
        },
        {
          text: "Status",
          value: "status_pengadaan",
        },
        {
          text: "Tanggal Dibuat",
          value: "createLog_at",
        },
        {
          text: "Tanggal Diubah",
          value: "updateLog_by",
        },
      ],
      activeBtn: 2,
      dialog: false,
      confirmationDialog: false,
      editedIndex: -1,
      produks: [],
      pengadaans: [],
      detailPengadaans: [],
      suppliers: [],
      detailTambah: [],
      detailIdPengadaanFilteredDelete: [],
      deleteDialog: false,
      id_supplier: null,
      empty: null,
      dialogDetailPengadaanProduk: false,
      detailItem: "",
      on: "",
      deletePengadaan: new FormData(),
      user: new FormData(),
      user2: new FormData(),
      form: {
        subtotal: 0,
      },
      typeInput: "new",
      search: "",
      snackbar: false,
      color: null,
      text: "",
      load: false,
    };
  },
  watch: {
    id_supplier() {
      this.empty = "null";
    },
  },

  methods: {
    Pengadaan() {
      this.$router.push({ name: "pengadaan_Admin" });
    },
    PengadaanDiproses() {
      this.$router.push({ name: "pengadaan_Diproses" });
    },
    PengadaanSelesai() {
      this.$router.push({ name: "pengadaan_Selesai" });
    },
    getSupplier() {
      var uri = this.$apiUrl4 + "Supplier";
      this.$http.get(uri).then((response) => {
        this.suppliers = response.data.message;
      });
    },
    getProduk() {
      var uri = this.$apiUrl4 + "Produk/" + "all";
      this.$http.get(uri).then((response) => {
        this.produks = response.data.message;
      });
    },
    getPengadaan() {
      var uri = this.$apiUrl4 + "Pengadaan/" + "getWithJoin";
      this.$http.get(uri).then((response) => {
        this.pengadaans = response.data.message;
      });
    },
    getDetailPengadaan() {
      var uri = this.$apiUrl4 + "DetailPengadaan/" + "getWithJoin";
      this.$http.get(uri).then((response) => {
        this.detailPengadaans = response.data.message;
      });
    },
    setTotal(index) {
      this.detailTambah[index].total_harga =
        this.detailTambah[index].jumlah_stok_pengadaan *
        this.detailTambah[index].harga;
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
        no_order: "",
        no_order: "",
        id_supplier: "",
        id_produk: "",
        jumlah_stok_pengadaan: "",
        harga: "",
        total_harga: "",
        createLog_at: "",
        updateLog_at: "",
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
        return pengadaan.status_pengadaan.match("Pesanan Selesai");
      });
    },
    filteredItems2(value) {
      return this.detailPengadaans.filter((i) => {
        return !value.no_order || i.no_order === value.no_order;
      });
    },
    showDetail(item) {
      this.detailItem = item;
      this.dialogDetailPengadaanProduk = true;
    },

    deleteDataProduk(deletedId) {
      var uri = this.$apiUrl4 + "Pengadaan/" + deletedId; //data dihapus berdasarkan id
      this.$http
        .delete(uri)
        .then((response) => {
          this.text = response.data.message;
          this.deleteMultipleDataDetailPengadaan();
          console.log(this.text);
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
        });
    },

    deleteMultipleDataDetailPengadaan() {
      this.deletePengadaan.append(
        "no_order",
        JSON.stringify(this.detailIdPengadaanFilteredDelete)
      );
      var uri = this.$apiUrl4 + "DetailPengadaan/" + "deleteMultiple";
      this.load = true;
      this.$http
        .post(uri, this.deletePengadaan)
        .then((response) => {
          this.snackbar = true;
          this.color = "green";
          this.text = response.data.message;
          this.load = false;
          this.deleteDialog = false;
          this.getPengadaan();
          this.getDetailPengadaan();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
        });
    },

    deleteRowPengadaan(item) {
      this.deletedId = item.no_order;
      this.deleteDialog = true;
    },
    getDetailPengadaanId(item) {
      var uri =
        this.$apiUrl4 +
        "DetailPengadaan/" +
        "getByIdPengadaan/" +
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
      this.updatedId = item.no_order;
      this.form.id_produk = item.id_produk;
      this.form.total_harga = item.total_harga;
      this.form.harga = item.harga;
      this.form.jumlah_stok_pengadaan = item.jumlah_stok_pengadaan;
      this.dialogEditProduk = true;
    },
    resetForm() {
      this.id_supplier = null;
      this.form.no_order = "";
      this.form.id_produk = "";
      this.form.jumlah_stok_pengadaan = "";
      this.form.harga = "";
      this.form.total_harga = "";
      this.form.id_supplier = "";
      this.form.subtotal = 0;
      this.form.status_pengadaan = "Sedang Diproses";
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
