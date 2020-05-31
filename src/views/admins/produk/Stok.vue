<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-20>
        <h1 class="subheading grey-darken--text">Stok Produk</h1>
        <v-layout row wrap style="margin: 10px;"> </v-layout>
        <v-text-field
          class="mx-0"
          flat
          hide-details
          label="Search"
          v-model="keyword"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
        ></v-text-field>
        <v-data-table :headers="headers" :items="produks" :search="keyword">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_produk">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_produk }}</td>
                <td>{{ item.nama_produk }}</td>
                <td>{{ item.min_stok_produk }}</td>
                <td>
                  <v-chip :color="getColor(items, index)" dark="">
                    {{ item.stok_produk }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-container>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="true"
      :timeout="3000"
    >
      {{ text }}
      <v-btn dark text @click="snackbar = false">Tutup</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      temp: [],
      temp2: 10,
      menu: false,
      on: "",
      deleteDialog: "",
      headers: [
        {
          text: "No",
          value: "index",
        },
        {
          text: "ID Produk",
          value: "id_produk",
        },
        {
          text: "Nama Produk",
          value: "nama_produk",
        },
        {
          text: "Stok Minimal Produk",
          value: "min_stok_produk",
        },
        {
          text: "Jumlah Stok Produk",
          value: "stok_produk",
        },
      ],
      produks: [],

      snackbar: false,
      color: null,
      text: "",
      load: false,

      errors: "",
    };
  },

  methods: {
    getData() {
      var uri = this.$apiUrl4 + "Produk/" + "all_get";
      this.$http.get(uri).then((response) => {
        this.produks = response.data.message;
      });
    },
    getColor(items, index) {
      this.temp[index] = parseInt(items[index].min_stok_produk) + parseInt(this.temp2);

      if (items[index].stok_produk < items[index].min_stok_produk) return "red";
      else if (
        items[index].stok_produk > items[index].min_stok_produk &&
        items[index].stok_produk < this.temp[index]
      )
        return "orange";
      else return "green";
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
