<template>
    <v-container>
        <v-content>
            <div v-if="checkLocation()">
                <div v-if="currentAdminUser.name">
                    Hi {{ currentAdminUser.name }}, welcome to the admin page
                </div>
                <div v-else>Welcome to the admin page, you are not login</div>
            </div>
            <router-view v-if="!checkLocation()"></router-view>
        </v-content>
    </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Admin",
    mounted() {
        this.$store.dispatch("loadCurrentAdminUser");
    },
    computed: {
        ...mapState(["currentAdminUser"]),
    },
    data() {
        return {
        };
    },
    methods: {
        checkLocation() {
            if (window.location.pathname === "/") {
                return true;
            }
            return false;
        },
    },
};
</script>
