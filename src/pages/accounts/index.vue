<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <td>
                        <div class="d-flex justify-content-between">
                            <router-link :to="'/admin/user/addNew'"
                                ><v-btn color="green darken-1"
                                    >ADD NEW</v-btn
                                ></router-link
                            >
                        </div>
                    </td>
                    <td colspan="4">
                        <div class="d-inline-flex flex-row">
                            <router-link :to="'/admin/users/trash'"
                                ><v-btn color=""
                                    >RECYCLE BIN</v-btn
                                ></router-link
                            >
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
                    <th class="text-left">
                        <div>
                            <router-link :to="'/admin/user/edit/' + user._id"
                                ><v-btn color="blue">Change password</v-btn></router-link
                            >
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
                <tr v-for="product in searchArray" :key="product.slug">
                    <td class="text-center">
                        <img :src="product.gallery[0]" alt="" />
                    </td>
                    <td class="text-center">
                        <div>
                            <b>Name:</b> {{ product.name }} &nbsp; <b>ID:</b>
                            {{ product._id }}
                        </div>
                        <div>
                            <span
                                ><b>Categories:</b>
                                {{ product.categories.toString() }} &nbsp;</span
                            >
                            <span
                                ><b>Color:</b>
                                {{ product.color.toString() }} &nbsp;</span
                            >
                            <span v-show="product.sale == 0"
                                ><b>Price:</b> ${{ product.price }} &nbsp;</span
                            >
                            <span v-show="product.sale > 0"
                                ><b>Price:</b> from
                                <del>${{ product.price }}</del> to ${{
                                    product.price -
                                    (product.price * product.sale) / 100
                                }}
                                &nbsp;</span
                            >
                            <span v-show="product.sale > 0"
                                ><b>Sale:</b> {{ product.sale }}% &nbsp;</span
                            >
                            <span><b>Sold:</b> {{ product.sold }} &nbsp;</span>
                            <span><b>Stock:</b> {{ product.stock }}</span>
                        </div>
                        <div>
                            <b>Description:</b>
                            <span v-html="product.description" />
                        </div>
                    </td>
                    <th class="text-center">
                        <div>
                            <router-link
                                :to="'/admin/product/edit/' + product._id"
                                ><v-btn color="blue">Edit</v-btn></router-link
                            >
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
        deleteProduct(slug) {
            if (
                confirm(
                    "Delete this product? This product will be moving to the recycle bin!"
                )
            ) {
                this.$store.dispatch("trashProduct", slug);
                this.$router.go(0);
            }
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
