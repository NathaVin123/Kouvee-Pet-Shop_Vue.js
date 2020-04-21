<template>     
    <div>         
        <v-navigation-drawer         
        v-model="drawer"         
        class="grey darken-3"         
        dark         
        app         
        clipped         
        fixed         
        temporary         
        >             
            <v-list-item>                 
                <v-list-item-content>                 
                <v-list-item-title class="title">                     
                    Administrator                
                </v-list-item-title>                 
                <v-list-item-subtitle>                     
                    Kouvee Pet Shop
                </v-list-item-subtitle>                 
                </v-list-item-content>             
            </v-list-item> 
 
            <v-divider></v-divider>             
            <v-list>                 
                <v-list-item                 
                v-for="item in items"                 
                :key="item.title"
                router :to="item.route"                 
                link                 
                >                 
                <v-list-item-icon>                     
                    <v-icon>{{ item.icon }}</v-icon>                 
                </v-list-item-icon> 
     
                <v-list-item-content>                     
                    <v-list-item-title>{{ item.title }}</v-list-item-title>                 
                </v-list-item-content>                 
                </v-list-item>             
            </v-list>

            <template v-slot:append> 
            <div class="pa-2">
            <v-btn block rounded @click="logout()">Logout</v-btn>
            </div>
            </template>

        </v-navigation-drawer> 
     
        <v-app-bar             
            dark              
            app             
            fixed             
            clipped-left             
            height="70px"             
            color="grey darken-3">             
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> 
     
                <VSpacer />                                                              
                <v-toolbar-title                 
                    style="font-size: 21px;"                 
                    class="white--text ml-2"             
                >                  
                    Kouvee Pet Shop Admin System             
                </v-toolbar-title>
            </v-app-bar> 
 
            <VContent >             
                <router-view />         
            </VContent>
        </div>
        
    </template> 
     
<script>   
export default {     
    data () {       
        return {         
            drawer: null,         
            items: [           
                { title: 'Layanan', icon: 'mdi-dashboard', route: '/admins/adminContents/layanan_Admin'},
                { title: 'Produk', icon: 'mdi-dashboard', route: '/admins/adminContents/produk_Admin'},
                { title: 'Pegawai', icon: 'mdi-dashboard', route: '/admins/adminContents/pegawai_Admin'},
                { title: 'Customer', icon: 'mdi-dashboard', route: '/admins/adminContents/customer_Admin'},
                { title: 'Supplier', icon: 'mdi-dashboard', route: '/admins/adminContents/supplier_Admin'},
                { title: 'Hewan', icon: 'mdi-dashboard', route: '/admins/adminContents/hewan_Admin'},
                { title: 'Jenis Hewan', icon: 'mdi-dashboard', route: '/admins/adminContents/jenisHewan_Admin'}, 
                { title: 'Ukuran Hewan', icon: 'mdi-dashboard', route: '/admins/adminContents/ukuranHewan_Admin'},
                { title: 'Pengadaan', icon: 'mdi-dashboard', route: '/admins/adminContents/pengadaan_Admin'},
                { title: 'Penjualan Layanan', icon: 'mdi-dashboard', route: '/admins/adminContents/penjualanLayanan_Admin'},  
            ],       
        }     
    },
    methods:
    {
        logout() {
                    this.$router.push({ name: "Welcome" });
                    alert("Berhasil Logout!");
                },
    }  
} 
</script> 