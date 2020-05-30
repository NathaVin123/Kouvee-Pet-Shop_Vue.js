<template>
  <div>
    <v-carousel
      cycle
      height="768"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item, i) in colors"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
        class="image"
      >
      </v-carousel-item>
    </v-carousel>
    <div class="mt-8">
      <v-container class="my-5">
        <h1>
          <p class="display-2 text-center font-weight-bold">
            Selamat Datang di Kouvee Pet Shop
          </p>
        </h1>
        <br />
        <p class="text-justify subtitle-1">
          Kouvee Pet Shop merupakan sebuah toko hewan yang sudah berdiri sejak
          tahun 2018 menyediakan produk dan jasa layanan yang berada di Kota
          Yogyakarta. Kouvee Pet Shop menyediakan berbagai macam produk untuk
          hewan kesayangan anda seperti makanan, aksesoris, perlengkapan dan
          lain-lain sesuai kebutuhan hewan kesayangan anda. Selain menjual
          berbagai macam produk, Kouvee Pet Shop juga menyediakan jasa layanan
          seperti grooming dan penitipan hewan. Kouvee Pet Shop bekerja sama
          dengan beberapa supplier dalam penyediaan produk yang dijual. Kouvee
          Pet Shop memiliki lebih dari 15 pegawai dan juga memiliki lebih dari
          50 konsumen tetap.
        </p>
        <br />
        <p class="text-center headline font-weight-bold">
          Lokasi Kouvee Pet Shop:
          <br />
          --------------------------------------------
          <br />
        </p>
        <p class="text-center title font-weight-bold">
          Jl. Moses Gatotkaca No. 22 Yogyakarta 55281
          <br />
          No Telepon : (0274) 357735
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d988.2832793313931!2d110.39110782915002!3d-7.775706570875792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59c7c6c6c5d7%3A0x3aff6caee9cdb15b!2sJl.%20Moses%20Gatotkaca%20No.22%2C%20Mrican%2C%20Caturtunggal%2C%20Kec.%20Depok%2C%20Kabupaten%20Sleman%2C%20Daerah%20Istimewa%20Yogyakarta%2055281!5e0!3m2!1sid!2sid!4v1590846159230!5m2!1sid!2sid"
          width="1160"
          height="300"
          frameborder="0"
          style="border: 0;"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </v-container>
    </div>
    <div class="mt-6">
      <v-container class="my-5">
        <v-card color="#1565C0" dark mt-5>
          <center>
            <v-container class="my-5">
              <h1>
                <p class="text-center">
                  Nikmati Berbagai Produk dan Layanan
                  <br />dari <br />Kouvee Pet Shop
                </p>
              </h1>
              <p class="text-center subtitle-1">
                Kouvee Pet Shop memiliki berbagai produk dan layanan terbaik
                untuk Anda dan hewan peliharaan anda. Pengalaman kami selama ini
                membuat pelayanan kami semakin baik dan mendapatkan respon
                positif dari customer kami. Dengan motto
                <b>"Caring Your Beloving Pet"</b> kami siap memberikan yang
                terbaik untuk Anda. Jika Anda ingin melihat produk dan layanan
                yang kami sediakan silakan pilih pada tombol menu.
              </p>
              <br />
            </v-container>
          </center>
        </v-card>
      </v-container>
    </div>
    <v-footer padless dark>
      <v-col class="text-center" cols="12">
        ©️ {{ new Date().getFullYear() }} Kouvee Pet Shop <br />
        <strong>Dibuat dengan 💖 oleh Kelompok 3 P3L G</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      colors: ["indigo", "warning", "pink darken-5", "grey darken-2", "brown"],
      slides: ["Caring   ", "Your", "Beloving", "Pet", ":)"],
      keyword: "",
      headers: [
        {
          text: "Name",
          value: "title",
          sortable: false,
        },
        {
          text: "Comment",
          value: "artist",
          sortable: false,
        },
      ],
      colors: [
        {
          src:
            "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        },
        {
          src:
            "https://www.whiskasindonesia.com/Content/img/products/kitten.jpg",
        },
        {
          src:
            "https://www.whiskasindonesia.com/Content/img/products/7years.jpg",
        },
        {
          src:
            "https://images.unsplash.com/photo-1488015795646-7e22a773d72a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        },
        {
          src:
            "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        },
      ],
      users: [],
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        name: "",
        comment: "",
      },
      user: new FormData(),
      typeInput: "new",
      errors: "",
      updateId: "",
    };
  },
  methods: {
    getData() {
      var uri = this.$apiUrl3 + "/comment";
      this.$http.get(uri).then((response) => {
        this.users = response.data.message;
      });
    },
    sendData() {
      this.user.append("name", this.form.name);
      this.user.append("comment", this.form.comment);
      var uri = this.$apiUrl3 + "/comment";
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
    setForm() {
      if (this.typeInput === "new") {
        this.sendData();
      } else {
        //console.log("dddd")
        this.updateData();
      }
    },
    resetForm() {
      this.form = {
        name: "",
        comment: "",
      };
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
