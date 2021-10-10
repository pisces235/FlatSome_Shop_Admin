<template>
    <div>
        <h1 class="text-center">Add Product</h1>
        <form @submit.prevent="handleSubmit">
            <v-col cols="12">
                <label for="">Name</label>
                <v-text-field
                    hint="Name"
                    type="text"
                    :rules="[rules.required('name')]"
                    v-model="name"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <label for="">Categories</label>
                <v-text-field
                    hint="Categories"
                    type="text"
                    :rules="[rules.required('categories')]"
                    v-model="categories"
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
                    v-model="price"
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
                    v-model="sale"
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
                    v-model="stock"
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
                    v-model="color"
                ></v-textarea>
            </v-col>

            <v-col cols="12">
                <label for="">Gallery</label>
                <v-textarea
                    auto-grow
                    rows="4"
                    row-height="15"
                    hint="Image links"
                    v-model="gallery"
                ></v-textarea>
            </v-col>

            <v-col cols="12">
                <label for="">Description</label>
                <vue-editor v-model="description"></vue-editor>
            </v-col>

            <v-col cols="12">
                <v-btn class="ma-2" outlined color="indigo" type="submit">
                    Add
                </v-btn>
            </v-col>
        </form>
        <div v-show="message != ''">{{ message }}</div>
    </div>
</template>

<script>
import validations from "@/utils/validations";
import { VueEditor } from "vue2-editor";

export default {
    components: {
        VueEditor,
    },
    data() {
        return {
            rules: {
                ...validations,
            },
            name: "",
            categories: [],
            color: [],
            price: 0,
            sale: 0,
            stock: 0,
            gallery: [],
            description: "",
            message: "",
            newProduct: {},
        };
    },
    methods: {
        handleSubmit() {
            let newProduct = {
                name: this.name,
                categories: this.categories.trim().split(","),
                color: this.color.trim().split(","),
                price: this.price,
                sale: this.sale,
                stock: this.stock,
                gallery: this.gallery.trim().split(","),
                description: this.description,
            };
            this.$store
                .dispatch("addProduct", newProduct)
                .then((response) => {
                    if (response.message != "success") {
                        this.message = response.message;
                    } else {
                        alert("This product was added");
                        this.$router.push("/products");
                    }
                })
                .catch((error) => {
                    this.message = error;
                });
        },
    },
};
</script>
