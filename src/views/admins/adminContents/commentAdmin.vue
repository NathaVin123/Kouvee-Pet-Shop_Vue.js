<template>   
    <v-container>     
        <v-card>       
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <h2 class = "text-md-center">Data Comment</h2>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <!-- <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialog = true">
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Comment
            </v-btn>-->
          </v-flex>
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
          <template v-slot:body="{ items }" >
            <tbody>
              <tr v-for="(item,index) in items" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.comment }}</td>
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
          </template>
        </v-data-table>
      </v-container>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Comment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name" v-model="form.name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Comment" v-model="form.comment"></v-text-field>
              </v-col>
              
            </v-row>
          </v-container>
          <small>*indicates required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
      {{ text }}
      <v-btn dark text @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
  </v-container>    
            </v-card>     
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Comment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name" v-model="form.name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Comment" v-model="form.comment"></v-text-field>
              </v-col>
              
            </v-row>
          </v-container>
          <small>*indicates required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
      {{ text }}
      <v-btn dark text @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
  </v-container>
</template>
                        <script> 
                        export default {    
                            data () {       
                                return {         
                                    dialog: false,         
                                    keyword: '',         
      headers: [
        {
          text: 'No',
          value: 'no',
        },
        {
          text: 'Name',
          value: 'title'
        },
        {
          text: 'Comment',
          value: 'artist'
        },
        {
          text: 'Aksi',
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
                                        name : '',           
                                        email : '',           
                                        password : ''         
                                    },         
                                    user : new FormData,         
                                    typeInput: 'new',         
                                    errors : '',         
                                    updatedId : '',       
                                }     
                            },     
  methods: {
    getData() {
      var uri = this.$apiUrl3 + '/comment'
      this.$http.get(uri).then(response => {
        this.users = response.data.message
      })
    },
    sendData() {
      this.user.append('name', this.form.name);
      this.user.append('comment', this.form.comment);
      var uri = this.$apiUrl3 + '/comment'
      this.load = true
      this.$http.post(uri, this.user).then(response => {
          this.snackbar = true;
          this.color = 'green';
          this.text = response.data.message;

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
      this.user.append('name', this.form.name);
      this.user.append('comment', this.form.comment);
      var uri = this.$apiUrl3 + '/comment/' + this.updatedId;
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
      this.form.name = item.name;
      this.form.comment = item.comment;
      this.updatedId = item.id;
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl3 + '/comment/' + deleteId;
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
        //console.log("dddd")
        this.updateData()
      }
    },
    resetForm() {
      this.form = {
        name: '',
        comment: '',
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>