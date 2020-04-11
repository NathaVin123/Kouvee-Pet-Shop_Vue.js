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
                                        Kouvee Pet Shop
                                    </div>
                                    <div id="tagline">
                                        Silahkan Login                                    
                                    </div>
                                </div>
                                <div class="form">
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

          <small>Belum punya akun ? </small>
          <v-btn
          v-for="item in signin"
          :key="item.text" 
          text small color="primary"
          class="mr-4"
          router :to="item.route"
        >
         Daftar disini
        </v-btn>
        
        <v-btn @click="login()" rounded block class="elevation-0" color="primary" height=50 dark>Submit</v-btn>
        </div>
                                
        </v-col>
        
        <v-col cols="6" md="6" style="padding:0px">
            <v-img :src="require('@/assets/scene_05_-_door_dribbble.gif')" width="425px" height="545px"></v-img>
        </v-col>
        </v-row>
        </v-card>
                </v-col>
            </v-row>
          </v-container>
      </v-content>
  </v-app>
</template>

<script>

export default {
    data () {
        return {
            valid: true,
            checkbox: false,
            form : {
                email : null,
                password : null,
            },
            email: '',
            
            signin: [
            { text: 'Home', route: '/views/signUp'}
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
        }
    },
    methods :{
        login(){
            var url = this.$apiUrl + '/auth'
            this.user = new FormData()
            this.user.append('email', this.form.email)
            this.user.append('password', this.form.password)
            this.$http.post(url,this.user).then(response =>{
                if(this.form.email == "admin@admin.lr" && this.form.password == "adminadmin"){
                this.$router.push({name: 'welcomeAdmin'})
                alert('Login sebagai admin, sukses !')
            }
                else if(response.data.token){
                    localStorage.setItem("token", response.data.token)
                    this.$router.push({name : 'produkUser'})
                    alert('Sukses, Selamat datang di Kouvee PetShop !')
                }else{
                    alert('Failed')
                }
            })
        }
    },
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