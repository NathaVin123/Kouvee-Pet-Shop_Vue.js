<template>     
    <div>         
        <v-navigation-drawer         
        v-model="drawer"         
        color="#424242"         
        dark         
        app         
        clipped         
        fixed         
        temporary         
        >             
            <v-list-item>
                <img src="../../assets/dog.png"
                style="height:35px;width:35px"
                />         
                <v-list-item-content>                 
                <v-list-item-title class="title" style="margin-left:10px;">                     
                    Kouvee Pet Shop                
                </v-list-item-title>                 
                <v-list-item-subtitle style="margin-left:10px;">                     
                    Administrator
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
                    <v-btn color="#c0392b" block rounded @click="logout()">Logout</v-btn>
                </div>
            </template>

        </v-navigation-drawer> 
     
        <v-app-bar             
            dark              
            app             
            fixed             
            clipped-left             
            height="70px"             
            color="#424242">             
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> 
     
                <VSpacer />                                                              
                <v-toolbar-title                 
                    style="font-size: 21px;"                 
                    class="white--text ml-2"             
                >                  
                    Kouvee Pet Shop             
                </v-toolbar-title>
            </v-app-bar> 
 
            <VContent >             
                <router-view />         
            </VContent>
        </div>    
</template>

<script> 
export default {
    data() {       
        return {         
            drawer: null,         
            items: [           
                { title: 'Layanan', icon: 'mdi-dog-service', route: '/admins/adminContents/layanan_Admin'},
                { title: 'Produk', icon: 'mdi-package-variant-closed', route: '/admins/adminContents/produk_Admin'},
                { title: 'Pegawai', icon: 'mdi-badge-account', route: '/admins/adminContents/pegawai_Admin'},
                { title: 'Customer', icon: 'mdi-account', route: '/admins/adminContents/customer_Admin'},
                { title: 'Supplier', icon: 'mdi-account-convert', route: '/admins/adminContents/supplier_Admin'},
                { title: 'Hewan', icon: 'mdi-dog-side', route: '/admins/adminContents/hewan_Admin'},
                { title: 'Jenis Hewan', icon: 'mdi-axis-arrow', route: '/admins/adminContents/jenisHewan_Admin'}, 
                { title: 'Ukuran Hewan', icon: 'mdi-size-xxl', route: '/admins/adminContents/ukuranHewan_Admin'},
                { title: 'Pengadaan', icon: 'mdi-update', route: '/admins/adminContents/pengadaan_Admin'},
                { title: 'Penjualan Layanan', icon: 'mdi-bank-transfer', route: '/admins/adminContents/penjualanLayanan_Admin'},  
                { title: 'Penjualan Produk', icon: 'mdi-cash-multiple', route: '/admins/adminContents/penjualanProduk_Admin'},  
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