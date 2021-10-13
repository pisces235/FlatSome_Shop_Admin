<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <td>
                        <div class="d-flex justify-content-between">
                            <router-link :to="'/product/addNew'"
                                ><v-btn color="green darken-1"
                                    >ADD NEW</v-btn
                                ></router-link
                            >
                        </div>
                    </td>
                    <td>
                        <div class="d-inline-flex flex-row">
                            <router-link :to="'/products/trash'"
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
                    v-for="product in products"
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
                            <router-link
                                :to="'/product/edit/' + product.slug"
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
                            <router-link
                                :to="'/product/edit/' + product._id"
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
    name: "AdminProducts",
    computed: {
        ...mapState(["products"]),
    },
    mounted() {
        this.$store.dispatch("loadProducts");
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
            for (var i = 0; i < this.products.length; i++) {
                if (
                    this.products[i].name.toLowerCase().includes(this.search) ==
                    true
                ) {
                    this.searchArray.push(this.products[i]);
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
                this.$store.dispatch("trashProduct", slug).then(response => {
                    if(response.message == true)
                        this.$router.go(0);
                    else {
                        alert("Can't be delete, please try again later!")
                    }
                })

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
