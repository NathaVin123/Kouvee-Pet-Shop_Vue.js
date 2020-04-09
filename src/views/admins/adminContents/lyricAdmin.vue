<template v-slot:body="{ items }">
        <div class="dashboard">
          <h2 class="text-md-center">Lyric List</h2>
      
          <v-container class="my-5">
      
            <v-layout row justify-start class="mb-3">
                <v-flex xs6 class="text-right">
                  <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
                  </v-text-field>
                </v-flex>
            </v-layout>
            
            <v-data-table
            :headers="headers"
            :items="users"
            :search="keyword"
            :loading="load">
              <tbody>
                <tr v-for="(item) in items" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.artist }}</td>
                  <td>{{ item.genre }}</td>
                  <td class="text-center">
                    <v-btn icon color="indigo" light @click="editHandler(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="error" light @click="deleteData(item.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
          </v-data-table>
                
          </v-container>         
        </div>
      </template>
      
<script>
export default {
  data() {
    return {
      dialog: false,
      keyword: '',
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        },
        {
          text: 'Genre',
          value: 'genre'
        },
        {
          text: 'Lyric',
          value: 'lyric'
        },
        {
          text: 'Action',
          value: null,
          sortable : false
        },
      ],
      users: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        title: '',
        artist: '',
        genre: '',
        lyric:''
      },
      user: new FormData,
      typeInput: 'new',
      errors: '',
      updateId: '',
    }
  },
  methods: {
    getData() {
      var uri = this.$apiUrl2 + '/lyric'
      this.$http.get(uri).then(response => {
        this.users = response.data.message
      })
    },
    sendData() {
      this.user.append('title', this.form.title);
      this.user.append('artist', this.form.artist);
      this.user.append('genre', this.form.genre);
      this.user.append('lyric', this.form.lyric);
      var uri = this.$apiUrl2 + '/lyric'
      this.load = true
      this.$http.post(uri, this.user).then(response => {
          this.snackbar = true;
          this.color = 'green';
          this.text = 'Lyric Added';

          this.load = false;
          this.dialog = false
          this.getData();
          this.resetForm();
        })
        .catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
        })
    },
    updateData() {
      this.user.append('title', this.form.title);
      this.user.append('artist', this.form.artist);
      this.user.append('genre', this.form.genre);
      this.user.append('lyric', this.form.lyric);
      var uri = this.$apiUrl2 + '/lyric/' + this.updatedId;
      this.load = true
      this.$http
        .post(uri, this.user)
        .then(response => {
          this.snackbar = true;
          this.color = 'green';
          this.text = response.data.message;
          this.load = false;
          this.dialog = false
          this.getData();
          this.resetForm();
          this.typeInput = 'new';
        })
        .catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
          this.typeInput = 'new';
        })
    },
    editHandler(item) {
      this.typeInput = 'edit';
      this.dialog = true;
      this.form.title = item.title;
      this.form.artist = item.artist;
      this.form.genre = item.genre;
      this.form.lyric = item.lyric;
      this.updatedId = item.id;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl2 + '/lyric/' + deleteId;
      this.$http.delete(uri).then(response =>{
          this.snackbar = true;
          this.text = response.data.message;
          this.color = 'green'
          this.deleteDialog = false;
          this.getData();
        }).catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
        })
    },
    setForm() {
      if (this.typeInput === 'new') {
        this.sendData()
      } else {
        this.updateData()
      }
    },
    resetForm() {
      this.form = {
        title: '',
        artist: '',
        genre: '',
        lyric: ''
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>