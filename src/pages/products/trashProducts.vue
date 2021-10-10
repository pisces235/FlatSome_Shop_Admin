<template>
    <v-simple-table v-if="deletedProducts.length > 0">
        <template v-slot:default>
            <thead>
                <tr>
                    <td>
                        <div class="d-flex justify-content-between">
                            <router-link :to="'/products'"
                                ><v-btn color="green darken-1"
                                    >ALL PRODUCTS</v-btn
                                ></router-link
                            >
                        </div>
                    </td>
                    <td>
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
                    <th class="text-center">Image</th>
                    <th class="text-center">Information</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody v-if="searchArray.length == 0">
                <div
                    v-show="returnSearch == false"
                    colspan="3"
                    class="text-center"
                >
                    No product found
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
                    v-for="product in deletedProducts"
                    :key="product.slug"
                    v-show="returnSearch == true"
                >
                    <td class="text-left">
                        <img :src="product.gallery[0]" alt="" />
                    </td>
                    <td class="text-left">
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
                    <th class="text-left">
                        <div>
                            <v-btn
                                color="blue"
                                @click="restoreProduct(product.slug)"
                                >Restore</v-btn
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
                    <td class="text-left">
                        <img :src="product.gallery[0]" alt="" />
                    </td>
                    <td class="text-left">
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
                    <th class="text-left">
                        <div>
                            <v-btn
                                color="blue"
                                @click="restoreProduct(product.slug)"
                                >Restore</v-btn
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
    <v-content v-else>
        The recycle bin is empty, see all product
        <router-link to="/products">here</router-link>
    </v-content>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "AdminProducts",
    computed: {
        ...mapState(["deletedProducts"]),
    },
    mounted() {
        this.$store.dispatch("loadDeletedProducts");
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
            for (var i = 0; i < this.deletedProducts.length; i++) {
                if (
                    this.deletedProducts[i].name
                        .toLowerCase()
                        .includes(this.search) == true
                ) {
                    this.searchArray.push(this.deletedProducts[i]);
                }
            }
            if (this.searchArray.length == 0) {
                this.returnSearch = false;
            }
        },
        deleteProduct(slug) {
            if (
                confirm("Delete this product? You can't restore it any more!")
            ) {
                this.$store.dispatch("deleteProduct", slug);
                this.$router.go(0);
            }
        },
        restoreProduct(slug) {
            if (confirm("Restore this product?")) {
                this.$store.dispatch("restoreProduct", slug);
                this.$router.go(0);
            }
        },
    },
};
</script>

<style lang="scss">
.text-left {
    img {
        width: 100px;
    }
    div {
        margin-bottom: 10px;
    }
}
del {
    text-decoration: line-through !important;
}
</style>
