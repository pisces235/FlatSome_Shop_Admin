import Vue from "vue";
import VueRouter from "vue-router";

import AdminHome from "../pages";
import AdminLogin from "../pages/login";
import AdminAccounts from "../pages/accounts";
import AdminOrders from "../pages/orders";
import OrdersPaid from "../pages/orders/ordersPaid.vue"
import Revenue from "../pages/revenue";
import AdminProducts from "../pages/products";
import AdminTrashProducts from "../pages/products/trashProducts.vue";
import AdminAddProduct from "../pages/products/addNewProduct";
import AdminEditProduct from "../pages/products/editProduct";

import ErrorPage from "../pages/error";

Vue.use(VueRouter);

const routes = [
    {
        path: "*",
        name: "ErrorPage",
        component: ErrorPage,
        meta: { hideHeader: true, hideFooter: true, hideAdminHeader: true },
    },
    {
        path: "/",
        name: "AdminHome",
        component: AdminHome,
        meta: { hideHeader: true, hideFooter: true },
        beforeEnter: (to, from, next) => {
            let currentAdminUser = JSON.parse(
                window.localStorage.currentAdminUser
            );
            if (currentAdminUser && currentAdminUser.typeAccount === "admin") {
                next();
            } else {
                next("/login");
            }
        },
        children: [
            {
                path: "accounts",
                name: "AdminAccounts",
                component: AdminAccounts,
            },
            {
                path: "orders",
                name: "AdminOrders",
                component: AdminOrders,
            },
            {
                path: "orders-paid",
                name: "OrdersPaid",
                component: OrdersPaid,
            },
            {
                path: "products",
                name: "AdminProducts",
                component: AdminProducts,
            },
            {
                path: "products/trash",
                name: "AdminTrashProducts",
                component: AdminTrashProducts,
            },
            {
                path: "product/addNew",
                name: "AdminAddProduct",
                component: AdminAddProduct,
            },
            {
                path: "product/edit/:slug",
                name: "AdminEditProduct",
                component: AdminEditProduct,
            },
            {
                path: "revenue",
                name: "Revenue",
                component: Revenue,
            },
        ],
    },
    {
        path: "/login",
        name: "AdminLogin",
        component: AdminLogin,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
