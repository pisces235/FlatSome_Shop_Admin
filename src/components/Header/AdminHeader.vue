<template>
    <v-navigation-drawer permanent expand-on-hover app>
        <v-list-item>
            <router-link to="/"
                ><img src="../../assets/images/logo.png" alt=""
            /></router-link>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item v-for="item in getItems" :key="item.title" link>
                <a v-if="item.title != 'Logout'" :href="item.path">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                </a>
                <a v-if="item.title != 'Logout'" :href="item.path">
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </a>

                <button
                    v-if="item.title == 'Logout'"
                    @click.prevent="logoutUser"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                </button>
                <div v-if="item.title == 'Logout'" @click.prevent="logoutUser">
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </div>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["currentAdminUser"]),

        getItems() {
            if (this.currentAdminUser.name) {
                return this.itemsWithLogout;
            }
            return this.itemsWithLogin;
        },
    },
    data() {
        return {
            right: null,
            itemsWithLogout: [
                {
                    title: "Products",
                    icon: "mdi-clipboard-file",
                    path: "/products",
                },
                {
                    title: "Accounts",
                    icon: "mdi-account-multiple",
                    path: "/accounts",
                },
                {
                    title: "Orders",
                    icon: "mdi-clipboard",
                    path: "/orders",
                },
                {
                    title: "Revenue",
                    icon: "mdi-chart-bar",
                    path: "/revenue",
                },
                {
                    title: "Logout",
                    icon: "mdi-logout",
                },
            ],
            itemsWithLogin: [
                {
                    title: "Login",
                    icon: "mdi-login",
                    path: "/login",
                },
            ],
        };
    },
    methods: {
        logoutUser() {
            this.$store.dispatch("logoutAdminUser");
            this.$router.push("/");
        },
    },
};
</script>

<style lang="scss" scoped>
img {
    width: 90%;
    margin: 15px 5%;
    float: left;
}
a {
    text-decoration: none;
    color: black;
}
a:link,
a:visited,
a:hover,
a:active {
    color: black;
}
</style>
