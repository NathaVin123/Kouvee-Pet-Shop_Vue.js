<template v-slot:body="{ items }">
  <div class="dashboard">
    <br/>
    <v-container class="mt-12">
      <h1 class="text-md-center mt-12">Daftar Produk Kouvee Pet Shop</h1>
    </v-container>
    <v-container grid-list-md mb-0>
      <v-text-field
        class="mx-0"
        flat
        hide-details
        label="Search"
        v-model="keyword"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      ></v-text-field>

      <v-data-table
        :headers="headers"
        :items="users"
        :search="keyword"
        :loading="load"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id_produk">
              <td>{{ index + 1 }}</td>
              <v-img
                :src="$apiUrl5 + 'produk/' + item.gambar"
                contain
                class="white"
                max-height="100"
                max-width="100"
              />
              <td class="subtitle-1 font-weight-bold">{{ item.nama_produk }}</td>
              <td>{{ item.harga_produk }}</td>
              <td>{{ item.stok_produk }}</td>
              <td>{{ item.satuan_produk }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      keyword: "",
      headers: [
        {
          text: "No",
          value: "index",
        },
        {
          text: "Gambar Produk",
          value: "gambar",
        },
        {
          text: "Nama Produk",
          value: "nama_produk",
        },
        {
          text: "Harga Produk",
          value: "harga_produk",
        },
        {
          text: "Jumlah Stok",
          value: "stok_produk",
        },
        {
          text: "Satuan Produk",
          value: "satuan_produk",
        },
      ],
      signin: [{ text: "Home", route: "/views/signin" }],
      signup: [{ text: "Home", route: "/views/signup" }],
      users: [],
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        title: "",
        artist: "",
        genre: "",
        lyric: "",
      },
      user: new FormData(),
      typeInput: "new",
      errors: "",
      updateId: "",
    };
  },
  methods: {
    getData() {
      var uri = this.$apiUrl4 + "/produk";
      this.$http.get(uri).then((response) => {
        this.users = response.data.message;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
