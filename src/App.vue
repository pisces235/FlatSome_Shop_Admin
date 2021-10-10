<template>
    <v-app>
        <AdminHeader class="header"/>

        <v-main>
            <router-view></router-view>
        </v-main>

    </v-app>
</template>

<script>
import AdminHeader from "./components/Header/AdminHeader.vue";

export default {
    name: "App",

    data() {
        return {};
    },
    components: {
        AdminHeader,
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    text-decoration: none !important;
    list-style-type: none;
    font-family: Lato, sans-serif;
}
.header {
    width: 100%;
    float: left;
    opacity: 0.9;
}
.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    max-height: 70px !important;
}
.sticky + .v-main {
    margin-top: 60px !important;
}
.v-main {
    width: 100%;
    float: left;
}
footer {
    width: 100%;
    float: left;
    background-color: #777777 !important;
}
</style>
