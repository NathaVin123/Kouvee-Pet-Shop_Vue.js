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
                                    v-model="form.NIP"
                                    label="NIP"
                                    :rules="emailRules"
                                    hint="Masukkan NIP yang telah terdaftar"      
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

          <!-- <small>Belum punya akun ? </small>
          <v-btn
          v-for="item in signin"
          :key="item.text" 
          text small color="primary"
          class="mr-4"
          router :to="item.route"
        >
         Daftar disini
        </v-btn> -->
        
        <v-btn @click="login()" rounded block class="elevation-0" color="primary" height=50 dark>Login</v-btn>
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
                NIP : null,
                password : null,
            },
            NIP: '',
            
            signin: [
            { text: 'Home', route: '/views/signUp'}
            ],
            
            emailRules: [
              v => !!v || 'NIP harus dimasukkan',
            ],
            
            password: 'Password',
            rules: {
                required: value => !!value || 'password harus diisi',
            },

            user: new FormData,
        }
    },
    methods :{
        login(){
            // var url = this.$apiUrl + '/auth'
            // this.user = new FormData()
            // this.user.append('NIP', this.form.NIP)
            // this.user.append('password', this.form.password)
            // this.$http.post(url,this.user).then(response =>{
            // if(this.form.NIP == "admin" && this.form.password == "adminadmin"){
            //     this.$router.push({name: 'welcomeAdmin'})
            //     alert('Berhasil login sebagai admin!')
            // }
            // else if(response.data.token){
            //     localStorage.setItem("token", response.data.token)
            //     this.$router.push({name : 'produkUser'})
            //     alert('Sukses, Selamat datang di Kouvee PetShop !')
            // }else{
            //     alert('Failed')
            // }
            // })

            if (this.form.username == 'admin') {
          if (this.form.password == 'admin123') {
            sessionStorage.setItem('Nama', 'admin');
            this.snackbar = true;
            this.text = 'Login Berhasil';
            this.color = 'green';
            this.$router.push({ name: 'Pegawai' });
            console.log('admin');
          } else {
            this.snackbar = true;
            this.text = 'Login Gagal';
            this.color = 'red';
          }
        } else {
          this.user.append('NIP', this.form.NIP);
          this.user.append('password', this.form.password);
          var url = this.$apiUrl + 'Pegawai/' + 'auth';
          this.load = true;
          this.$http
            .post(url, this.user)
            .then((response) => {
              this.pegawai = response.data.message;
              if (this.pegawai.id_pegawai != null) {
                if (this.pegawai.role.toLowerCase() == 'customer service') {
                  //login ke menu customer
                  sessionStorage.setItem(
                    'Id',
                    response.data.message.id_pegawai
                  );
                  sessionStorage.setItem(
                    'Nama',
                    response.data.message.username
                  );
                  this.snackbar = true;
                  this.text = 'Login Berhasil';
                  this.color = 'green';
                  this.$router.push({ name: 'Pelanggan' });
                  console.log('customer service');
                } else if (this.pegawai.role.toLowerCase() == 'kasir') {
                  //code untuk login ke kasir
                  sessionStorage.setItem(
                    'Id',
                    response.data.message.id_pegawai
                  );
                  sessionStorage.setItem(
                    'Nama',
                    response.data.message.username
                  );
                  this.snackbar = true;
                  this.text = 'Login Berhasil';
                  this.color = 'green';
                  this.$router.push({ name: 'TransaksiProduk' });
                  console.log('customer service');
                } else {
                  this.snackbar = true;
                  this.text = 'Login Gagal';
                  this.color = 'red';
                }
              } else {
                this.snackbar = true;
                this.text = 'Login Gagal';
                this.color = 'red';
              }
            })
            .catch((error) => {
              this.errors = error;
              this.snackbar = true;
              this.text = 'Try Again';
              this.color = 'red';
            });
        }
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