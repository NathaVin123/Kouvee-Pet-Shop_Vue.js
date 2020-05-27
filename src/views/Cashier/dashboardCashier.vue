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
                    Kasir
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
                { title: 'Transaksi Produk', icon: 'mdi-cash-multiple', route: '/Cashier/transaksiLayanan/MenuTransaksiLayanan'},
                { title: 'Transaksi Layanan', icon: 'mdi-bank-transfer', route: '/Cashier/transaksiProduk/MenuTransaksiProduk'},
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