<template v-slot:body="{ items }">
  <div class="dashboard">
    <v-container class="my-5">
      <h1 class="text-md-center">Daftar Layanan Kouvee Pet Shop</h1>
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
        :items="layanans"
        :search="keyword"
        :loading="load"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id_layanan">
              <td>{{ index + 1 }}</td>
              <td class="subtitle-1 font-weight-bold">
                {{ item.nama_layanan }}
              </td>
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
          text: "Nama Layanan",
          value: "nama_layanan",
        },
      ],
      signin: [{ text: "Home", route: "/views/signin" }],
      signup: [{ text: "Home", route: "/views/signup" }],
      layanans: [],
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
      var uri = this.$apiUrl4 + "layananharga/getWithJoin";
      this.$http.get(uri).then((response) => {
        this.hargalayanans = response.data.message;
      });
    },
    getLayanan() {
      var uri = this.$apiUrl4 + "Layanan";
      this.$http.get(uri).then((response) => {
        this.layanans = response.data.message;
      });
    },
  },
  mounted() {
    this.getData();
    this.getLayanan();
  },
};
</script>
