<template>
  <div class="mt-5">
      <v-container class="my-5">
        <v-carousel
          cycle
          height="350"
          hide-delimiter-background
          show-arrows-on-hover
          interval:3000
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-sheet
              :color="colors[i]"
              height="100%"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
              <center>
                <div class="display-1">{{ slide }}</div>
              </center>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    <div class="mt-8">
      <v-container class="my-5">
            <h1 class="subheading grey--text"><p class="text-center">Apa itu Kouvee Pet Shop ?</p></h1>
            <br>
            Kouvee Pet Shop merupakan pet shop ternama di yogyakarta. Kami menyediakan berbagai macam produk dan layanan untuk hewan kesayangan Anda.
      </v-container>
      <!-- <v-container class="my-5">
            You can also add lyrics that are not yet on LyricLibs, and your friends can also see the lyrics you have made. LyricLibs will faithfully accompany when listening to your song. Because life needs words.
      </v-container> -->
    </div>
    <div class="mt-6">
      <v-container class="my-5">
        <v-card
        color="#385F73"
        dark
        mt-5>
          <center>
            <v-container class="my-5">
              <h1 class="subheading grey--text"><p class="text-center">Nikmati Berbagai Layanan Kouvee Pet Shop</p></h1>
              <br>
              Currently LyricLibs is still in the development stage, to enjoy it you don't need to pay for it.
               To support us, write in the comments column what is still a weakness of the LyricLibs website.
               We are very happy and thankful, because of all of you we can continue to accompany you in listening to music.
               <br><br>
               <!-- <v-btn
                v-for="item in dashboard"
                :key="item.text" 
                text small color="warning"
                class="mr-4"
                router :to="item.route"
              >FIND THE LYRICS</v-btn> -->
            </v-container>
          </center>
        </v-card>
      </v-container>
    </div>
    <!-- <v-container grid-list-md mb-0>
        <br><br>
        <center>
            <h1 class="subheading grey--text"><p class="text-center">COMMENT</p></h1>  
        </center>       
        <v-layout row wrap style="margin:10px">   
          <v-flex xs6>
          </v-flex>        
          <v-flex xs6 class="text-right">               
              <v-btn            
                depressed               
                dark               
                rounded               
                style="text-transform: none !important;"               
                color = "blue accent-3"               
                @click="dialog = true"               
                >               
                <v-icon size="18" >mdi-pencil-plus</v-icon>                   
                    Add Comment              
              </v-btn>           
          </v-flex>           
          <v-flex xs6 class="text-right">      
          </v-flex>         
        </v-layout> 
        <v-data-table             
            :headers="headers"             
            :items="users"               
            :loading="load"           
            >             
              <template v-slot:body="{ items }">               
                <tbody>                 
                  <tr v-for="(item) in items" :key="item.id">                   
                    <td>{{ item.name }}</td>                   
                    <td>{{ item.comment}}</td>               
                  </tr>               
                </tbody>             
            </template>           
        </v-data-table>   
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Comment</span>
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>   -->
  
  <v-footer padless dark>
  <v-col
    class="text-center"
    cols="12"
  > 
  {{ new Date().getFullYear() }}  — Kouvee Pet Shop <strong>Made with ❤ by P3L G 3</strong>
  </v-col>
  </v-footer>
  
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog:false,
        colors: [
          'indigo',
          'warning',
          'pink darken-5',
          'grey darken-2',
          'brown',
        ],
        slides: [
          'Caring Your Beloving Pet',
          'Caring Your Beloving Pet',
          'Caring Your Beloving Pet',
          'Caring Your Beloving Pet',
          'Caring Your Beloving Pet',
          ],
      keyword: '',
      headers: [
        {
          text: 'Name',
          value: 'title',
          sortable: false
        },
        {
          text: 'Comment',
          value: 'artist',
          sortable: false
        },
        
      ],
      users: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        name: '',
        comment: ''
      },
      user: new FormData,
      typeInput: 'new',
      errors: '',
      updateId: '',
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