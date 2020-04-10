<template>
  <v-app>
      <v-content>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="8" md="8">
                    <v-card>
                        <v-row>
                            <v-col cols="6">
                                <div class="header">
                                  <div id="title">
                                        Join With Us.!  
                                    </div>
                                    <div id="tagline">
                                        Kouvee Pet Shop                                
                                    </div>
                                    <div id="tagline">                                   </div>
                                </div>
                                <div class="form">

                                    <v-text-field
                                      v-model="form.name"
                                      label="Name"
                                      :rules="nameRules"
                                      hint="Input your valid name"      
                                      outlined
                                      height=50
                                    ></v-text-field>    
                                                                    
                                    <v-text-field
                                      v-model="form.email"
                                      label="Email"
                                      :rules="emailRules"
                                      hint="Input your valid email"      
                                      outlined
                                      height=50
                                    ></v-text-field>

                                    <v-text-field
                                      v-model="form.password"
                                      label="Password"
                                      type="password"
                                      :rules="[rules.required, rules.min]"
                                      outlined
                                      hint="At least 8 characters"
                                      height=50
                                    ></v-text-field>

                                    <small>Already have an account ? </small>
                                    
                                    <v-btn
                                      v-for="item in signin"
                                      :key="item.text" 
                                      text small color="primary"
                                      class="mr-4"
                                      router :to="item.route"
                                    >
                                    Sign In Here
                                    </v-btn>

                                    <br><br>
                                <v-btn  @click="setForm()" rounded block class="elevation-0" color="primary" height=50 dark>SIGN UP NOW</v-btn>
                               </div>
                              </v-col>
                            <v-col cols="6" md="6" style="padding:0px">
                                <v-img :src="require('@/assets/scene_05_-_door_dribbble.gif')" width="425px" height="590px"></v-img>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
      <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
        {{ text }}
        <v-btn dark text @click="snackbar = false"> Close </v-btn>
      </v-snackbar>            
          </v-container>
      </v-content>
  </v-app>
</template>

<script>
export default {
    data () {
        return {
            valid: true,
            form : {
                email : null,
                password : null,
            },
            email: '',
            signin: [
                { text: 'Home', route: '/signin'}
            ],

            nameRules: [
                  v => !!v || 'Name is required',
                  v => (v && v.length <= 20) || 'Name must be less than 20 characters',
            ],
            
            emailRules: [
                  v => !!v || 'E-mail is required',
                  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            
            password: 'Password',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => ('The email and password you entered don\'t match'),
            },
            user: new FormData,         
            typeInput: 'new',   
        }
    },
    methods :{
      getData() {
        var uri = this.$apiUrl + '/user'
        this.$http.get(uri).then(response => {
          this.users = response.data.message
        })
      },        
      sendData() {
        this.user = new FormData()
        this.user.append('name', this.form.name);
        this.user.append('email', this.form.email);
        this.user.append('password', this.form.password);
        var uri = this.$apiUrl + '/user'
        this.load = true
        this.$http.post(uri, this.user).then(response => {
            this.sncakbar = true;
            this.color = 'green';
            this.text = response.data.message;
  
            this.load = false;
            this.dialog = false
            this.getData();
            this.resetForm();
            alert('YAY.! BERHASIL MENDAFTAR.!')
            
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
          this.resetForm()
         
        } else {
           /* eslint-disable-next-line */
          console.log(this.sendData)
        }
      },
      resetForm(){             
        this.form = {                
          name : '',               
          email : '',               
          password : ''             
          }         
     }   
    },
        mounted() {
      this.getData();
    }
}
</script>

<style>
    .header{
        margin-left: 47px;
        margin-top: 50px;
    }

    #title{
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 56px;
    }

    .form{
        margin-top: 47px;
        margin-left: 38px;
        margin-bottom: 50px;
        margin-right: 38px;
    }
</style>