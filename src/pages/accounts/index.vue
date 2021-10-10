<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <td colspan="4">
                        <div class="d-inline-flex flex-row">
                            <form
                                class="d-flex ms-8"
                                @submit.prevent="handleSearch"
                            >
                                <input
                                    class="form-control me-2 ms-8"
                                    type="text"
                                    placeholder="Search..."
                                    aria-label="Search"
                                    v-model="search"
                                />
                                <v-btn
                                    type="submit"
                                    class="btn btn-outline-success"
                                    >Search</v-btn
                                >
                            </form>
                        </div>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <th class="text-center">Type</th>
                    <th class="text-center">Name</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Phone Number</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody v-if="searchArray.length == 0">
                <div
                    v-show="returnSearch == false"
                    colspan="3"
                    class="text-center"
                >
                    No user found
                    <div
                        @click="
                            returnSearch = true;
                            search = '';
                        "
                        class="btn btn-link"
                    >
                        Back
                    </div>
                </div>
                <tr
                    v-for="user in users"
                    :key="user._id"
                    v-show="returnSearch == true"
                >
                    <td class="text-center">
                        <div>{{ user.typeAccount }}</div>
                    </td>
                    <td class="text-center">
                        <div>{{ user.name }}</div>
                    </td>
                    <td class="text-center">
                        <div>{{ user.email }}</div>
                    </td>
                    <td class="text-center">
                        <div
                            v-if="
                                (user.phoneNumber && user.phoneNumber != '') ||
                                user.phoneNumber != null
                            "
                        >
                            {{ user.phoneNumber }}
                        </div>
                        <div v-else>null</div>
                    </td>
                    <th class="text-left">
                        <div>
                            <v-dialog
                                transition="dialog-top-transition"
                                max-width="600"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="primary"
                                        v-bind="attrs"
                                        v-on="on"
                                        >Change password</v-btn
                                    >
                                </template>
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="primary" dark
                                            >Change Password</v-toolbar
                                        >
                                        <v-card-text>
                                            <v-text-field type="text" v-model="password" label="New Password *"
                                            placeholder="Enter new password"></v-text-field>
                                            <button class="btn btn-primary" @click="changePassword(user._id)">Save</button>
                                        </v-card-text>
                                        <v-card-actions class="justify-end">
                                            <v-btn
                                                text
                                                @click="dialog.value = false"
                                                >Close</v-btn
                                            >
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </div>
                        <div>
                            <v-btn
                                color="red"
                                @click="deleteProduct(product.slug)"
                                >Delete</v-btn
                            >
                        </div>
                    </th>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-for="user in searchArray" :key="user._id">
                    <td class="text-center">
                        <div>{{ user.typeAccount }}</div>
                    </td>
                    <td class="text-center">
                        <div>{{ user.name }}</div>
                    </td>
                    <td class="text-center">
                        <div>{{ user.email }}</div>
                    </td>
                    <td class="text-center">
                        <div
                            v-if="
                                (user.phoneNumber && user.phoneNumber != '') ||
                                user.phoneNumber != null
                            "
                        >
                            {{ user.phoneNumber }}
                        </div>
                        <div v-else>null</div>
                    </td>
                    <th class="text-left">
                        <div>
                            <v-dialog
                                transition="dialog-top-transition"
                                max-width="600"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="primary"
                                        v-bind="attrs"
                                        v-on="on"
                                        >Change password</v-btn
                                    >
                                </template>
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="primary" dark
                                            >Opening from the top</v-toolbar
                                        >
                                        <v-card-text>
                                            <div class="text-h2 pa-12">
                                                Hello world!
                                            </div>
                                        </v-card-text>
                                        <v-card-actions class="justify-end">
                                            <v-btn
                                                text
                                                @click="dialog.value = false"
                                                >Close</v-btn
                                            >
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </div>
                        <div>
                            <v-btn
                                color="red"
                                @click="deleteProduct(product.slug)"
                                >Delete</v-btn
                            >
                        </div>
                    </th>
                </tr>
            </tbody>
            {{password}}
        </template>
    </v-simple-table>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "AdminAccounts",
    computed: {
        ...mapState(["users"]),
    },
    mounted() {
        this.$store.dispatch("loadUsers");
    },
    data() {
        return {
            search: "",
            searchArray: [],
            returnSearch: true,
            password: '',
        };
    },
    methods: {
        handleSearch() {
            this.searchArray = [];
            for (var i = 0; i < this.users.length; i++) {
                if (
                    this.users[i].name.toLowerCase().includes(this.search) ==
                    true
                ) {
                    this.searchArray.push(this.users[i]);
                }
            }
            if (this.searchArray.length == 0) {
                this.returnSearch = false;
            }
        },
        changePassword(id) {
            this.$store.dispatch("changePassword", {id: id, password: this.password});
            alert("This user is updated!")
            window.location.reload()
        },
    },
};
</script>

<style lang="scss">
.text-center {
    img {
        width: 100px;
    }
    div {
        margin: 10px 0 10px 0;
    }
}
del {
    text-decoration: line-through !important;
}
</style>
