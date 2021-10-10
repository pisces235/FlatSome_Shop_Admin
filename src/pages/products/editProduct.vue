<template>
    <div>
        <h1 class="text-center">Edit Product</h1>
        <form @submit.prevent="handleSubmit">
            <v-col cols="12">
                <label for="">Name</label>
                <v-text-field
                    hint="Name"
                    type="text"
                    :rules="[rules.required('name')]"
                    v-model="product.name"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <label for="">Categories</label>
                <v-text-field
                    hint="Categories"
                    type="text"
                    :rules="[rules.required('categories')]"
                    v-model="product.categories"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <label for="">Price</label>
                <v-text-field
                    hint="Price"
                    type="text"
                    :rules="[
                        rules.required('price'),
                        rules.numberFormat('price'),
                        rules.minQuantity('price', 0),
                    ]"
                    v-model="product.price"
                    min="0"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <label for="">Sale(%)</label>
                <v-text-field
                    hint="Sale"
                    type="number"
                    :rules="[
                        rules.required('sale'),
                        rules.minQuantity('sale', 0),
                    ]"
                    v-model="product.sale"
                    min="0"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <label for="">Stock</label>
                <v-text-field
                    hint="Stock"
                    type="number"
                    :rules="[
                        rules.required('stock'),
                        rules.minQuantity('stock', 0),
                    ]"
                    v-model="product.stock"
                    min="0"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <label for="">Color</label>
                <v-textarea
                    auto-grow
                    rows="2"
                    row-height="15"
                    hint="Colors of product"
                    v-model="product.color"
                ></v-textarea>
            </v-col>

            <v-col cols="12">
                <label for="">Gallery</label>
                <v-textarea
                    auto-grow
                    rows="4"
                    row-height="15"
                    hint="Image links"
                    v-model="product.gallery"
                ></v-textarea>
            </v-col>

            <v-col cols="12">
                <label for="">Description</label>
                <vue-editor v-model="product.description"></vue-editor>
            </v-col>

            <v-col cols="12">
                <v-btn class="ma-2" outlined color="indigo" type="submit">
                    Edit
                </v-btn>
            </v-col>
        </form>
        <div v-show="message != ''">{{ message }}</div>
    </div>
</template>

<script>
import validations from "@/utils/validations";
import { VueEditor } from "vue2-editor";
import { mapState } from "vuex";

export default {
    async mounted() {
        await this.$store.dispatch(
            "loadProductBySlug",
            this.$route.params.slug
        );
    },
    computed: {
        ...mapState(["product"]),
    },
    components: {
        VueEditor,
    },
    data() {
        return {
            rules: {
                ...validations,
            },
            message: "",
        };
    },
    methods: {
        handleSubmit() {
            this.$store
                .dispatch("updateProduct", this.product)
                .then(() => {
                    this.$store.state.product = {};
                    alert("This product is updated");
                    this.$router.push("/products");
                })
                .catch((error) => {
                    this.message = error;
                });
        },
    },
};
</script>
