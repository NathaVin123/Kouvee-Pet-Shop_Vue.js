import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/////////////////// dashboard (sidebar) untuk tiap role /////////////////////
const dashboardAdmin = () => import('./views/admins/dashboardAdmin.vue');
const dashboardCS = () => import('./views/Customer_service/dashboardCS.vue');
const dashboardCashier = () => import('./views/Cashier/dashboardCashier.vue');

////////////////// login dan landing page ////////////////////////
const loginLayout = () => import('./views/SignIn.vue');
const landingPageLayout = () => import('./views/Customer/landingPage.vue');

///////////////// load gemblung sebelum dibenerin ////////////////////
const navbarBeforeLogin = () => import('./views/navbarHome.vue')  
const navbarAfterLogin = () => import('./views/users/navbarHome.vue')


function loadView(view) {
  return () => import(`./views/admins/adminContents/${view}.vue`) 
}

function loadViewBefore(view) {
  return () => import(`./views/${view}.vue`) 
}

function loadViewAfter(view) {
  return () => import(`./views/users/${view}.vue`) 
}

////////////////////// load tiap fungsi data master dan transaksi //////////////////////////////
function loadJenis(view) {
  return () => import(`./views/admins/jenisHewan/${view}.vue`);
}
function loadLayanan(view) {
  return () => import(`./views/admins/layanan/${view}.vue`);
}
function loadPegawai(view) {
  return () => import(`./views/admins/pegawai/${view}.vue`);
}
function loadPengadaan(view) {
  return () => import(`./views/admins/pengadaan/${view}.vue`);
}
function loadProduk(view) {
  return () => import(`./views/admins/produk/${view}.vue`);
}
function loadSupplier(view) {
  return () => import(`./views/admins/supplier/${view}.vue`);
}
function loadUkuran(view) {
  return () => import(`./views/admins/ukuran/${view}.vue`);
}
function loadHewan(view) {
  return () => import(`./views/Customer_service/hewan/${view}.vue`);
}
function loadCustomer(view) {
  return () =>
    import(`./views/Customer_service/customer/${view}.vue`);
}
function loadTransaksi(view) {
  return () =>
    import(`./views/Customer_service/transaksi/${view}.vue`);
}
function loadTransaksiProduk(view) {
  return () =>
    import(`./views/Cashier/transaksiProduk/${view}.vue`);
}
function loadTransaksiLayanan(view) {
  return () =>
    import(`./views/Cashier/transaksiLayanan/${view}.vue`);
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: navbarBeforeLogin,
      children: [
        {
          path: '/',
          name: 'Welcome',
          component: loadViewBefore('Welcome')           
        },
        {
          path: '/views/DaftarProduk',
          name: 'DaftarProduk',
          component: loadViewBefore('DaftarProduk')           
        },
        {
          path: '/views/signin',
          name: 'SignIn',
          component: loadViewBefore('SignIn')
        },
        {
          path: '/views/signup',
          name: 'SignUp',
          component: loadViewBefore('SignUp')
        },
        {
          path: '/views/about',
          name: 'about',
          component: loadViewBefore('About')
        },
      ]
    },
    {
      path: '/views/users',
      component: navbarAfterLogin,
      children: [
        {
          path: '/views/users',
          name: 'Welcome',
          component: loadViewAfter('Welcome')           
        },
        {
          path: '/views/users/produkUser',
          name: 'produkUser',
          component: loadViewAfter('produkUser')
        },
        {
          path: '/views/users/layananUser',
          name: 'layananUser',
          component: loadViewAfter('layananUser')           
        },
        {
          path: '/views/users/transaksiLayananCS',
          name: 'transaksiLayananCS',
          component: loadViewAfter('transaksiLayananCS')           
        },
        {
          path: '/views/users/transaksiProdukCS',
          name: 'transaksiProdukCS',
          component: loadViewAfter('transaksiProdukCS')           
        },
        {
          path: '/views/users/pembayaranProdukKasir',
          name: 'pembayaranProdukKasir',
          component: loadViewAfter('pembayaranProdukKasir')           
        },
        {
          path: '/views/users/pembayaranLayananKasir',
          name: 'pembayaranLayananKasir',
          component: loadViewAfter('pembayaranLayananKasir')           
        },
        {
          path: '/views/users/aboutUser',
          name: 'aboutUser',
          component: loadViewAfter('About')
        },
      ]
    },    
    {       
      path: '/admins/dashboardAdmin',       
      component: dashboardAdmin,       
      children: [         
          {           
            name: 'userAdmin',           
            path: '/admins/adminContents/userAdmin',           
            component: loadView('userAdmin')         
          },
          {           
            name: 'welcomeAdmin',           
            path: '/admins/adminContents/welcomeAdmin',           
            component: loadView('welcomeAdmin')         
          },
          {           
            name: 'lyricAdmin',           
            path: '/admins/adminContents/lyricAdmin',           
            component: loadView('lyricAdmin')         
          },
          {           
            name: 'commentAdmin',           
            path: '/admins/adminContents/commentAdmin',           
            component: loadView('commentAdmin')         
          },
          {           
            name: 'layanan_Admin',           
            path: '/admins/layanan/MenuLayanan',           
            component: loadLayanan('MenuLayanan')         
          },
          {
            name: 'produk_Admin',           
            path: '/admins/produk/MenuProduk',           
            component: loadProduk('MenuProduk')
          },
          {
            name: 'pegawai_Admin',           
            path: '/admins/pegawai/MenuPegawai',           
            component: loadPegawai('MenuPegawai')
          },
          {
            name: 'supplier_Admin',           
            path: '/admins/supplier/MenuSupplier',           
            component: loadSupplier('MenuSupplier')
          },
          {
            name: 'jenisHewan_Admin',           
            path: '/admins/jenisHewan/MenuJenisHewan',           
            component: loadJenis('MenuJenisHewan')
          },
          {
            name: 'ukuranHewan_Admin',           
            path: '/admins/ukuran/MenuUkuran',           
            component: loadUkuran('MenuUkuran')
          },
          {
            name: 'pengadaan_Admin',           
            path: '/admins/pengadaan/MenuPengadaan',           
            component: loadPengadaan('MenuPengadaan')
          },
          {
            name: 'customer_Admin',           
            path: '/admins/adminContents/customer_Admin',           
            component: loadView('customer_Admin')
          },   
          {
            name: 'hewan_Admin',           
            path: '/admins/adminContents/hewan_Admin',           
            component: loadView('hewan_Admin')
          },
          {
            name: 'penjualanLayanan_Admin',           
            path: '/admins/adminContents/penjualanLayanan_Admin',           
            component: loadView('penjualanLayanan_Admin')
          },
          {
            name: 'penjualanProduk_Admin',           
            path: '/admins/adminContents/penjualanProduk_Admin',           
            component: loadView('penjualanProduk_Admin')
          },
      ]     
    },
    {       
      path: '/Customer_service/dashboardCS',       
      component: dashboardCS,       
      children: [         
          {           
            name: 'customer_Admin',           
            path: '/Customer_service/customer/MenuCustomer',           
            component: loadCustomer('MenuCustomer')         
          },
          {
            name: 'hewan_Admin',           
            path: '/Customer_service/customer/MenuHewan',           
            component: loadHewan('MenuHewan')
          },
          {
            name: 'transaksi_Amin',           
            path: '/Customer_service/customer/MenuTransaksi',           
            component: loadTransaksi('MenuTransaksi')
          },
      ]     
    },
    {       
      path: '/Cashier/dashboardCashier',       
      component: dashboardCashier,       
      children: [                  
          {
            name: 'penjualanLayanan_Admin',           
            path: '/Cashier/transaksiLayanan/MenuTransaksiLayanan',           
            component: loadTransaksiLayanan('MenuTransaksiLayanan')
          },
          {
            name: 'penjualanProduk_Admin',           
            path: '/Cashier/transaksiProduk/MenuTransaksiProduk',           
            component: loadTransaksiProduk('MenuTransaksiProduk')
          },
      ]     
    }, 
  ],
})