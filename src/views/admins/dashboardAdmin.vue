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
                    Admin                
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
                    { title: 'Dashboard', icon: 'mdi-dashboard', route: '/admins/dashboardAdmin'},
                    { title: 'Layanan', icon: 'mdi-dashboard', route: '/admins/adminContents/layanan_Admin'},
                    { title: 'User List', icon: 'mdi-dashboard', route: '/admins/adminContents/userAdmin'},
                    { title: 'Lyric List', icon: 'mdi-dashboard', route: '/admins/adminContents/lyricAdmin'},      
                    { title: 'Comment List', icon: 'mdi-dashboard', route: '/admins/adminContents/commentAdmin'},  
                    { title: 'Logout', icon: 'mdi-dashboard', route: '/'}   
                ],       
            }     
        },   
    } 
    </script> 