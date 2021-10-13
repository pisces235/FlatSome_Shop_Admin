import Vue from "vue";
import Vuex from "vuex";
import jwt_decode from "jwt-decode";

import api from "../service/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],
        currentAdminUser: {},
        products: [],
        newProducts: [],
        relatedProducts: [],
        categories: [],
        deletedProducts: [],
        product: {},
        cart: [],
        blogs: [],
        orders: [],
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        LOGOUT_ADMINUSER(state) {
            state.currentAdminUser = {};
            window.localStorage.currentAdminUser = JSON.stringify({});
        },
        SET_CURRENT_ADMINUSER(state, user) {
            state.currentAdminUser = user;
            window.localStorage.currentAdminUser = JSON.stringify(user);
        },
        SET_ORDERS(state, orders) {
            state.orders = orders;
        },
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_NEW_PRODUCTS(state, products) {
            state.newProducts = products;
        },
        SET_DELETED_PRODUCTS(state, products) {
            state.deletedProducts = products;
        },
        SET_PRODUCT(state, product) {
            state.product = product;
        },
    },
    actions: {
        async addProduct({commit}, newProduct) {
            try {
                await api().post('/products', newProduct);
                return { message: "success" };
            } catch (error) {
                return { message: error.message };
            }
        },
        async changePassword({commit}, {id, password}) {
            try {
                await api().patch(`/users/${id}/change-password`, {password: password});
                return { message: "success" };
            } catch (error) {
                return { message: error.message };
            }
        },
        async deleteProduct({commit}, slug) {
            try {
                await api().delete(`/products/${slug}/force`);
            } catch (error) {
                return { message: error.message };
            }
        },
        async deleteOrder({commit}, order) {
            try {
                await api().delete(`/orders/delete/${order._id}/${order.email}`);
            } catch (error) {
                return { message: error.message };
            }
        },
        async loadUsers({ commit }) {
            let response = await api().get("/users");
            commit("SET_USERS", response.data);
        },
        loadCurrentAdminUser({ commit }) {
            let user = JSON.parse(window.localStorage.currentAdminUser);
            commit("SET_CURRENT_ADMINUSER", user);
        },
        async loginAdminUser({ commit }, loginInfo) {
            try {
                let response = await api().post("/users/signin", {
                    email: loginInfo.email,
                    password: loginInfo.password,
                });
                let decode = jwt_decode(response.data.info.token);
                let user = {
                    name: response.data.info.name,
                    id: decode.sub,
                    typeAccount: response.data.info.typeAccount,
                };

                commit("SET_CURRENT_ADMINUSER", user);

                return user;
            } catch {
                return {
                    error: "Email / password combination was incorrect. Please try again!",
                };
            }
        },
        logoutAdminUser({ commit }) {
            commit("LOGOUT_ADMINUSER");
        },
        async loadOrders({ commit }) {
            let response = await api().get("/orders");
            commit("SET_ORDERS", response.data);
        },
        async loadProducts({ commit }) {
            let response = await api().get("/products");
            commit("SET_PRODUCTS", response.data);
        },
        async loadNewProducts({ commit }) {
            let response = await api().get("/products/newProducts");
            commit("SET_NEW_PRODUCTS", response.data);
        },
        async loadDeletedProducts({ commit }) {
            let response = await api().get("/products/deletedProducts");
            commit("SET_DELETED_PRODUCTS", response.data);
        },
        async loadProductBySlug({ commit }, slug) {
            let response = await api().get(`/products/${slug}`);
            commit("SET_PRODUCT", response.data);
        },
        async trashProduct({commit}, slug) {
            try {
                let res = await api().delete(`/products/${slug}`);
                return { message: res.data.success };
            } catch (error) {
                return { message: error.message };
            }
        },
        async restoreProduct({commit},slug) {
            try {
                let res = await api().patch(`/products/${slug}`);
                return { message: res.data.success };
            } catch (error) {
                return { message: error.message };
            }
        },
        async updateProduct({commit}, newProduct) {
            try {
                await api().put(`/products/${newProduct.slug}`, newProduct);
            } catch (error) {
                return { message: error.message };
            }
        },
        async confirmOrder({commit}, newOrder) {
            try {
                await api().patch(`/orders/${newOrder._id}/confirm-order`, newOrder);
            } catch (error) {
                return { message: error.message };
            }
        },
        async confirmPayment({commit}, newOrder) {
            try {
                await api().patch(`/orders/${newOrder._id}/confirm-payment`, newOrder);
            } catch (error) {
                return { message: error.message };
            }
        },
    },
    modules: {},
    getters: {},
});
