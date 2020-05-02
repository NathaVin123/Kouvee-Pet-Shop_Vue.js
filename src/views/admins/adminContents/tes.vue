<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Pemesanan Produk</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialogTambah()">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Data
                        </v-btn>
                        <v-btn depressed rounded style="text-transform: none !important;" color="red accent-3"
                            @click="pdf()" class="ml-5">
                            <v-icon size="18" class="mr-2">mdi-file-pdf</v-icon>
                            Convert to PDF
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-magnify" label="Cari" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="requests" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.no_PO }}</td>
                                <td>{{ item.tgl_pemesanan }}</td>
                                <td>{{ item.id_supplier }}</td>
                                <td>{{ item.status }}</td>
                                
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
                    <span class="headline">Pengadaan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                
                               
                                
                                
                                <v-select :items="supplier_nama" label="Supplier" v-model="form.id_supplier"></v-select>
                                    
                            </v-col>
                        </v-row>
                        <small>*indicates required field</small>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
            {{ text }}
            <v-btn dark text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>

export default {    
    data () {       
        return {         
            dialog: false,
            tambah: false,
            menu: false,
            showPassword : false,     
            keyword: '',         
            headers: [             
                {               
                    text: 'ID',               
                    value: 'id',             
                },             
                {               
                    text: 'No PO',               
                    value: 'no_PO'             
                },  
                {               
                    text: 'Tanggal Pemesanan',               
                    value: 'tgl_pemesanan',             
                },             
                {               
                    text: 'Id Supplier',               
                    value: 'id_supplier'             
                }, 
                {               
                    text: 'Status',               
                    value: 'status'             
                },
                 
                {               
                    text: 'Aksi',               
                    value: null             
                },                                
            ],
            requests: [],

            supplier: [],
            supplier_nama: [],

            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {                            
                
                id_supplier : '',
              
            },         
            request : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '', 
            imageUrl : null,          
        }     
    },
    
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/Pemesanan'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message             
            })               
        },

        getSupplier(){             
            var uri = this.$apiUrl + '/Supplier'             
            this.$http.get(uri).then(response =>{
                this.supplier=response.data.message;
                this.supplier_nama=response.data.message.map(x => x.nama);
            })
        },

        dialogTambah(){
            this.resetForm();
            this.dialog = true;
            this.tambah = true;
        },

        sendData(){
            var i;
            var supplier_selected;

            for(i = 0; i < this.supplier.length; i++) {
                if (this.supplier.map(x => x.nama)[i] === this.form.id_supplier) {
                    supplier_selected = this.supplier.map(x => x.id)[i];
                }
            }

             
            this.request.append('id_supplier', supplier_selected);
            this.request.append('created_by', 'Yosafat9204');               
            var uri =this.$apiUrl + '/Pemesanan' 
            var uri =this.$apiUrl + '/Pemesanan/storeNoPO'               
            this.load = true             
            this.$http.post(uri,this.request).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();  
                this.$router.push({
                 path: "/dashboardAdmin/produkPemesanan"
        });         
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },

        updateData(){
            var i;
            var supplier_selected;

            for(i = 0; i < this.supplier.length; i++) {
                if (this.supplier.map(x => x.nama)[i] === this.form.id_supplier) {
                    supplier_selected = this.supplier.map(x => x.id)[i];
                }
            }

            this.request.append('id_supplier', supplier_selected);

            this.request.append('updated_by', 'Yosafat9204');
            var uri = this.$apiUrl + '/Pemesanan/' + this.updatedId;             
            this.load = true             
            this.$http.post(uri,this.request).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();               
                this.typeInput = 'new';           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;               
                this.typeInput = 'new';           
            })         
        },   

        editHandler(item){           
            this.typeInput = 'edit';
            this.tambah = false;      
            this.dialog = true;   
            this.form.tgl_pemesanan = item.tgl_pemesanan;
            this.form.id_supplier = item.id_supplier;       
            this.form.status
        }
    }
}