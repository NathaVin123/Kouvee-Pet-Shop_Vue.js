<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      color="#424242"
      dark
      app
      clipped
      fixed
      temporary
    >
      <v-list-item>
        <img src="../../assets/dog.png" style="height: 35px; width: 35px;" />
        <v-list-item-content>
          <v-list-item-title class="title" style="margin-left: 10px;">
            Kouvee Pet Shop
          </v-list-item-title>
          <v-list-item-subtitle style="margin-left: 10px;">
            Administrator
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          router
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="#c0392b" block rounded @click="logout()">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar dark app fixed clipped-left height="70px" color="#424242">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <VSpacer />
      <v-toolbar-title>
        Kouvee Pet Shop
      </v-toolbar-title>

      <v-menu offset-y offset-x>
        <template v-slot:activator="{ on }">
          <v-badge
            :content="messages"
            :value="messages"
            color="red"
            overlap
            offset-y="22px"
            offset-x="15px"
          >
            <v-btn icon="" link="" v-on="on">
              <v-icon>mdi-bell-alert</v-icon>
            </v-btn>
          </v-badge>
        </template>

        <v-list max-width="420px" three-line>
          <v-list-item
            v-for="(item, index) in produks"
            :key="index"
            @click="$router.push(item.to).catch((error) => {})"
            :disabled="checkOpened(item.id_notifikasi)"
          >
            <v-list-item-icon>
              <v-img
                :src="$apiUrl5 + 'produk/' + item.gambar"
                contain
                class="white"
                max-height="50"
                max-width="50"
              ></v-img>
            </v-list-item-icon>
            <v-list-item-content @click="updateStatus(item.id_notifikasi)">
              <v-list-item-title>
                {{ item.nama }}
              </v-list-item-title>
              <v-list-item-subtitle class="notifikasi-message">
                Segera lakukan pengadaan produk <br />untuk menambahkan stok
                yang tersedia.
              </v-list-item-subtitle>
              <v-list-item-subtitle class="notifikasi-message">
                {{ item.created_at }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <VContent>
      <router-view />
    </VContent>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        {
          title: "Layanan",
          icon: "mdi-dog-service",
          route: "/admins/layanan/MenuLayanan",
        },
        {
          title: "Produk",
          icon: "mdi-package-variant-closed",
          route: "/admins/produk/MenuProduk",
        },
        {
          title: "Stok Produk",
          icon: "mdi-dropbox",
          route: "/admins/produk/Stok",
        },
        {
          title: "Pegawai",
          icon: "mdi-badge-account",
          route: "/admins/pegawai/MenuPegawai",
        },
        {
          title: "Supplier",
          icon: "mdi-account-convert",
          route: "/admins/supplier/MenuSupplier",
        },
        {
          title: "Jenis Hewan",
          icon: "mdi-axis-arrow",
          route: "/admins/jenisHewan/MenuJenisHewan",
        },
        {
          title: "Ukuran Hewan",
          icon: "mdi-size-xxl",
          route: "/admins/ukuran/MenuUkuran",
        },
        {
          title: "Pengadaan",
          icon: "mdi-update",
          route: "/admins/pengadaan/MenuPengadaan",
        },
        {
          title: "Laporan",
          icon: "mdi-file-pdf-outline",
          route: "/admins/pengadaan/LaporanPengadaan",
        },
        // { title: 'Customer', icon: 'mdi-account', route: '/admins/adminContents/customer_Admin'},
        // { title: 'Hewan', icon: 'mdi-dog-side', route: '/admins/adminContents/hewan_Admin'},
        // { title: 'Penjualan Layanan', icon: 'mdi-bank-transfer', route: '/admins/adminContents/penjualanLayanan_Admin'},
        // { title: 'Penjualan Produk', icon: 'mdi-cash-multiple', route: '/admins/adminContents/penjualanProduk_Admin'},
      ],
      produks: [],
      formProduks: new FormData(),
      messages: 0,
      opened: [],
      disabled: false,
    };
  },
  methods: {
    checkNotification() {
      for (let i = 0; i < this.produks.length; i++) {
        if (this.produks[i].status == 0) {
          this.messages++;
        } else {
          this.opened.push(this.produks[i].id_notifikasi);
        }
      }
      console.log(this.opened);
    },
    checkOpened(id_notifikasi) {
      for (let i = 0; i < this.opened.length; i++) {
        if (id_notifikasi === this.opened[i]) {
          return (this.disabled = true);
        }
      }
    },
    getDataNotifikasi() {
      var uri = this.$apiUrl4 + "/pemberitahuan/" + "getWithJoin";
      this.$http.get(uri).then((response) => {
        this.produks = response.data.message;
        this.checkNotification();
      });
    },
    updateStatus(id_notifikasi) {
      var uri = this.$apiUrl4 + "/pemberitahuan/" + "updateStatus/" + id_notifikasi;
      this.load = true;
      this.$http
        .post(uri)
        .then((response) => {
          this.load = false;
          this.messages--;
          this.getDataNotifikasi();
        })
        .catch((error) => {
          this.load = false;
        });
    },
    logout() {
      this.$router.push({ name: "Welcome" });
      alert("Berhasil Logout!");
    },
    mounted() {
      this.getDataNotifikasi();
    },
  },
};
</script>
