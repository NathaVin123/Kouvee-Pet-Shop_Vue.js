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
                                    label="Nama Pegawai"
                                    name="nama_pegawai"
                                    prepend-icon="mdi mdi-account"
                                    :rules="NIPRules"
                                    hint="Masukkan Nama Pegawai yang telah terdaftar"      
                                    outlined
                                    height=50
                                    ></v-text-field>

                                    <v-text-field
                                    v-model="form.password"
                                    label="Password"
                                    type="password"
                                    prepend-icon="mdi mdi-lock"
                                    :rules="[rules.required, rules.min]"
                                    outlined
                                    hint="masukkan password yang sesuai"
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
            loading: false,
            load: false,
            snackbar: false,
            hidePassword: true,
            error: false,
            color: null,
            text: '',

            rules: {
                required: (value) => !!value || 'Required.',
            },
            user: new FormData(),
            pegawais: [],
            typeInput: 'new',
            errors: '',
            valid: true,
            checkbox: false,
            form : {
                NIP : null,
                password : null,
            },
            
            NIPRules: [
              v => !!v || 'Nama Pegawai harus dimasukkan',
            ],
            
            rules: {
                required: value => !!value || 'password harus diisi',
            },
        }
    },
    methods :{
        login(){
            if (this.form.NIP == 'admin') 
            {
          if (this.form.password == 'admin123') {
            sessionStorage.setItem('Nama', 'admin');
            this.snackbar = true;
            this.text = 'Login Berhasil';
            this.color = 'green';
            this.$router.push({ name: 'welcomeAdmin' });
            alert('Login sebagai admin, sukses !');
            console.log('admin');
          } 
          else 
          {
            this.snackbar = true;
            this.text = 'Login Gagal';
            alert('Gagal login sebagai admin, coba lagi !');
            this.color = 'red';
          }
        } 
        else 
        {
          this.user.append('nama_pegawai', this.form.NIP);
          this.user.append('password', this.form.password);
          var url = this.$apiUrl4 + 'Pegawai/' + 'auth';
          this.load = true;
          this.$http
            .post(url, this.user)
            .then((response) => {
              this.pegawais = response.data.message
                if (this.pegawais.stat.toLowerCase() == 'customer service') {
                  //login ke menu customer
                  // sessionStorage.setItem(
                  //   'Id',
                  //   response.data.message.NIP
                  // );
                  sessionStorage.setItem(
                    'Nama',
                    response.data.message.NIP
                  );
                  this.snackbar = true;
                  this.text = 'Login Berhasil';
                  this.color = 'green';
                  this.$router.push({ name: 'customer_Admin' });
                  alert('Login sebagai CS, sukses !');
                  console.log('customer service');
                } else 
                if (this.pegawais.stat.toLowerCase() == 'kasir') 
                {
                  //code untuk login ke kasir
                  // sessionStorage.setItem(
                  //   'Id',
                  //   response.data.message.NIP
                  // );
                  sessionStorage.setItem(
                    'Nama',
                    response.data.message.NIP
                  );
                  this.snackbar = true;
                  this.text = 'Login Berhasil';
                  this.color = 'green';
                  this.$router.push({ name: 'penjualanLayanan_Admin' });
                  alert('Login sebagai Kasir, sukses !');
                  console.log('customer service');
                } else {
                  this.snackbar = true;
                  this.text = 'Login Gagal';
                  alert('Gagal login sebagai CS atau Kasir, coba lagi !');
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
    mounted() {
      window.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          this.login();
        }
      });
    },
  };
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