import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/////////////////// dashboard (sidebar) untuk tiap role /////////////////////
const dashboardAdmin = () => import("./views/admins/dashboardAdmin.vue");
const dashboardCS = () => import("./views/Customer_service/dashboardCS.vue");
const dashboardCashier = () => import("./views/Cashier/dashboardCashier.vue");

// ////////////////// login dan landing page ////////////////////////
// const loginLayout = () => import("./views/SignIn.vue");
// const landingPageLayout = () => import("./views/Customer/landingPage.vue");

///////////////// load gemblung sebelum dibenerin ////////////////////
const navbarBeforeLogin = () => import("./views/navbarHome.vue");
const navbarAfterLogin = () => import("./views/users/navbarHome.vue");

function loadView(view) {
  return () => import(`./views/admins/adminContents/${view}.vue`);
}

function loadViewBefore(view) {
  return () => import(`./views/${view}.vue`);
}

function loadViewAfter(view) {
  return () => import(`./views/users/${view}.vue`);
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
function loadStok(view) {
  return () => import(`./views/admins/produk/${view}.vue`);
}
function loadHewan(view) {
  return () => import(`./views/Customer_service/hewan/${view}.vue`);
}
function loadCustomer(view) {
  return () => import(`./views/Customer_service/customer/${view}.vue`);
}
function loadTransaksi(view) {
  return () => import(`./views/Customer_service/transaksi/${view}.vue`);
}
function loadTransaksiProduk(view) {
  return () => import(`./views/Cashier/transaksiProduk/${view}.vue`);
}
function loadTransaksiLayanan(view) {
  return () => import(`./views/Cashier/transaksiLayanan/${view}.vue`);
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: navbarBeforeLogin,
      children: [
        {
          path: "/",
          name: "Welcome",
          component: loadViewBefore("Welcome"),
        },
        {
          path: "/views/DaftarProduk",
          name: "DaftarProduk",
          component: loadViewBefore("DaftarProduk"),
        },
        {
          path: "/views/signin",
          name: "SignIn",
          component: loadViewBefore("SignIn"),
        },
        {
          path: "/views/signup",
          name: "SignUp",
          component: loadViewBefore("SignUp"),
        },
        {
          path: "/views/about",
          name: "about",
          component: loadViewBefore("About"),
        },
      ],
    },
    {
      path: "/views/users",
      component: navbarAfterLogin,
      children: [
        {
          path: "/views/users",
          name: "Welcome",
          component: loadViewAfter("Welcome"),
        },
        {
          path: "/views/users/produkUser",
          name: "produkUser",
          component: loadViewAfter("produkUser"),
        },
        {
          path: "/views/users/layananUser",
          name: "layananUser",
          component: loadViewAfter("layananUser"),
        },
        {
          path: "/views/users/transaksiLayananCS",
          name: "transaksiLayananCS",
          component: loadViewAfter("transaksiLayananCS"),
        },
        {
          path: "/views/users/transaksiProdukCS",
          name: "transaksiProdukCS",
          component: loadViewAfter("transaksiProdukCS"),
        },
        {
          path: "/views/users/pembayaranProdukKasir",
          name: "pembayaranProdukKasir",
          component: loadViewAfter("pembayaranProdukKasir"),
        },
        {
          path: "/views/users/pembayaranLayananKasir",
          name: "pembayaranLayananKasir",
          component: loadViewAfter("pembayaranLayananKasir"),
        },
        {
          path: "/views/users/aboutUser",
          name: "aboutUser",
          component: loadViewAfter("About"),
        },
      ],
    },
    {
      path: "/admins/dashboardAdmin",
      component: dashboardAdmin,
      children: [
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "userAdmin",
          path: "/admins/adminContents/userAdmin",
          component: loadView("userAdmin"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "welcomeAdmin",
          path: "/admins/welcomeAdmin",
          component: loadView("welcomeAdmin"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "layanan_Admin",
          path: "/admins/layanan/MenuLayanan",
          component: loadLayanan("MenuLayanan"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "produk_Admin",
          path: "/admins/produk/MenuProduk",
          component: loadProduk("MenuProduk"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "pegawai_Admin",
          path: "/admins/pegawai/MenuPegawai",
          component: loadPegawai("MenuPegawai"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "supplier_Admin",
          path: "/admins/supplier/MenuSupplier",
          component: loadSupplier("MenuSupplier"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "jenisHewan_Admin",
          path: "/admins/jenisHewan/MenuJenisHewan",
          component: loadJenis("MenuJenisHewan"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "ukuranHewan_Admin",
          path: "/admins/ukuran/MenuUkuran",
          component: loadUkuran("MenuUkuran"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "pengadaan_Admin",
          path: "/admins/pengadaan/MenuPengadaan",
          component: loadPengadaan("MenuPengadaan"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "stok_Admin",
          path: "/admins/produk/Stok",
          component: loadStok("Stok"),
        },
        {
          // beforeEnter(to, from, next) {
          //   if (sessionStorage.getItem("Nama") != null) {
          //     next();
          //   } else {
          //     sessionStorage.removeItem("Nama");
          //     next({ path: "/views/signin" });
          //   }
          // },
          name: "pengadaan_Diproses",
          path: "/admins/pengadaan/PengadaanDiproses",
          component: loadPengadaan("PengadaanDiproses"),
        },
        {
          // beforeEnter(to, from, next) {
          //   if (sessionStorage.getItem("Nama") != null) {
          //     next();
          //   } else {
          //     sessionStorage.removeItem("Nama");
          //     next({ path: "/views/signin" });
          //   }
          // },
          name: "pengadaan_Selesai",
          path: "/admins/pengadaan/PengadaanSelesai",
          component: loadPengadaan("PengadaanSelesai"),
        },
      ],
    },
    {
      path: "/Customer_service/dashboardCS",
      component: dashboardCS,
      children: [
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "customer_Admin",
          path: "/Customer_service/customer/MenuCustomer",
          component: loadCustomer("MenuCustomer"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "hewan_Admin",
          path: "/Customer_service/hewan/MenuHewan",
          component: loadHewan("MenuHewan"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "transaksi_Admin",
          path: "/Customer_service/transaksi/MenuTransaksi",
          component: loadTransaksi("MenuTransaksi"),
        },
      ],
    },
    {
      path: "/Cashier/dashboardCashier",
      component: dashboardCashier,
      children: [
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "penjualanLayanan_Admin",
          path: "/Cashier/transaksiLayanan/MenuTransaksiLayanan",
          component: loadTransaksiLayanan("MenuTransaksiLayanan"),
        },
        {
          beforeEnter(to, from, next) {
            if (sessionStorage.getItem("Nama") != null) {
              next();
            } else {
              sessionStorage.removeItem("Nama");
              next({ path: "/views/signin" });
            }
          },
          name: "penjualanProduk_Admin",
          path: "/Cashier/transaksiProduk/MenuTransaksiProduk",
          component: loadTransaksiProduk("MenuTransaksiProduk"),
        },
      ],
    },
  ],
});
