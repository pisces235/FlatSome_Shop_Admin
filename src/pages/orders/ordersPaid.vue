<template>
    <div class="container-fluid" v-if="orders.length > 0">
        <div class="contain-btn">
            <a href="/orders" class="btn btn-success btn-left"
                >BACK TO ALL ORDERS(unpaid)</a
            >
            <v-text-field
                type="text"
                class="float-right"
                label="Search by email"
                placeholder="Enter an email"
                v-model="search"
                @change="handleSearch()"
            ></v-text-field>
        </div>
        <h2 class="text-center">ALL ORDERS (paid)</h2>
        <div v-if="searchArray.length == 0">
            <div v-show="returnSearch == false" class="text-center">
                No order found
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
            <div
                v-for="o in orders"
                :key="o._id"
                v-show="returnSearch == true && o.payment == true"
            >
                <div class="contain-orders">
                    <h3 class="text-center">Customer information</h3>
                    <p>
                        Date: {{o.paymentDate}} &nbsp; &nbsp; &nbsp; Customer :
                        {{ o.name }} &nbsp; &nbsp; &nbsp; Phone number :
                        {{ o.phoneNumber }}
                    </p>
                    <p v-if="o.address.left_address != ''">
                        Address:
                        {{
                            o.address.left_address +
                            ", " +
                            o.address.ward +
                            ", " +
                            o.address.district +
                            " , " +
                            o.address.province
                        }}
                    </p>
                    <p v-else>
                        Address:
                        {{
                            o.address.ward +
                            ", " +
                            o.address.district +
                            " , " +
                            o.address.province
                        }}
                    </p>
                    <p>Email: {{ o.email }}</p>
                    <p>Note: {{ o.note }}</p>
                    <p class="title text-center">Order</p>
                    <table>
                        <tr>
                            <th>PRODUCT</th>
                            <th class="text-right">SUBTOTAL</th>
                        </tr>
                        <tr v-for="c in o.cart" :key="c.product.slug">
                            <td>
                                <img :src="c.product.gallery[0]" alt="" />
                                <span
                                    >{{ c.product.name }} x
                                    <b>{{ c.quantity }}</b></span
                                >
                            </td>
                            <td class="text-right">
                                <span class="price"
                                    >${{
                                        (c.product.price * c.quantity)
                                            .toFixed(2)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                    }}</span
                                >
                            </td>
                        </tr>
                        <tr>
                            <td class="bold">Total</td>
                            <td class="text-right bold">
                                ${{
                                    o.total
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </td>
                        </tr>
                    </table>
                    <div class="contain-btn">
                        <button
                            class="btn btn-success bold"
                            v-if="o.confirm == false"
                            @click="confirmOrder(o)"
                        >
                            Confirm order
                        </button>

                        <div v-else class="c-green">
                            This order is confirmed
                        </div>

                        <button
                            class="btn btn-danger bold"
                            @click="deleteOrder(o)"
                            v-show="o.confirm == false"
                        >
                            Delete order
                        </button>

                        <button
                            class="btn btn-dark right bold"
                            v-if="o.payment == false"
                            @click="confirmPayment(o)"
                        >
                            Confirm payment
                        </button>
                        <div v-else class="c-green text-right">
                            Customer paid
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-for="o in searchArray" :key="o._id">
                <div class="contain-orders">
                    <h3 class="text-center">Customer information</h3>
                    <p>
                        Date: {{o.paymentDate}} &nbsp; &nbsp; &nbsp; Customer :
                        {{ o.name }} &nbsp; &nbsp; &nbsp; Phone number :
                        {{ o.phoneNumber }}
                    </p>
                    <p v-if="o.address.left_address != ''">
                        Address:
                        {{
                            o.address.left_address +
                            ", " +
                            o.address.ward +
                            ", " +
                            o.address.district +
                            " , " +
                            o.address.province
                        }}
                    </p>
                    <p v-else>
                        Address:
                        {{
                            o.address.ward +
                            ", " +
                            o.address.district +
                            " , " +
                            o.address.province
                        }}
                    </p>
                    <p>Email: {{ o.email }}</p>
                    <p>Note: {{ o.note }}</p>
                    <p class="title text-center">Order</p>
                    <table>
                        <tr>
                            <th>PRODUCT</th>
                            <th class="text-right">SUBTOTAL</th>
                        </tr>
                        <tr v-for="c in o.cart" :key="c.product.slug">
                            <td>
                                <img :src="c.product.gallery[0]" alt="" />
                                <span
                                    >{{ c.product.name }} x
                                    <b>{{ c.quantity }}</b></span
                                >
                            </td>
                            <td class="text-right">
                                <span class="price"
                                    >${{
                                        (c.product.price * c.quantity)
                                            .toFixed(2)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                    }}</span
                                >
                            </td>
                        </tr>
                        <tr>
                            <td class="bold">Total</td>
                            <td class="text-right bold">
                                ${{
                                    o.total
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </td>
                        </tr>
                    </table>
                    <div class="contain-btn">
                        <button
                            class="btn btn-success bold"
                            v-if="o.confirm == false"
                            @click="confirmOrder(o)"
                        >
                            Confirm order
                        </button>

                        <div v-else class="c-green">
                            This order is confirmed
                        </div>

                        <button
                            class="btn btn-danger bold"
                            @click="deleteOrder(o)"
                            v-show="o.confirm == false"
                        >
                            Delete order
                        </button>

                        <button
                            class="btn btn-dark right bold"
                            v-if="o.payment == false"
                            @click="confirmPayment(o)"
                        >
                            Confirm payment
                        </button>
                        <div v-else class="c-green text-right">
                            Customer paid
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container" v-else>
        <p style="color: red">No one to order!</p>
        <a href="/orders" class="btn btn-success btn-left"
            >BACK TO ALL ORDERS(unpaid)</a
        >
    </div>

</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["orders"]),
    },
    mounted() {
        this.$store.dispatch("loadOrders");
    },
    data() {
        return {
            search: "",
            searchArray: [],
            returnSearch: true,
        };
    },
    methods: {
        getSubToTal(index) {
            let subToTal =
                this.cart[index].product.price * this.cart[index].quantity;
            return Math.round(subToTal * 100) / 100;
        },
        getCartSubToTal(cart) {
            let subToTal = 0;
            if (cart.length > 0) {
                cart.forEach(function (item) {
                    subToTal += item.product.price * item.quantity;
                });
            }
            return subToTal;
        },
        handleSearch() {
            this.searchArray = [];
            for (var i = 0; i < this.orders.length; i++) {
                if (
                    this.orders[i].email
                        .toLowerCase()
                        .includes(this.search.toLowerCase()) &&
                    this.orders[i].payment == true
                ) {
                    this.searchArray.push(this.orders[i]);
                }
            }
            if (this.searchArray.length == 0) {
                this.returnSearch = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.bold {
    font-weight: bold;
}
.c-green {
    color: green;
    width: 50%;
    float: left;
}

.right {
    float: right;
}

.btn-left {
    color: white;
    font-weight: 500;
    float: left;
}
.container-fluid {
    .contain-btn {
        width: 70%;
        margin: 30px 15%;
        padding: 0;
        float: left;
        .float-right {
            float: right;
            margin: 0;
            padding: 0;
        }
    }
    .contain-orders {
        width: 70%;
        margin: 30px 15%;
        float: left;
        padding: 35px;
        border: 3px solid #111;
        table {
            width: 100%;
            tr {
                th {
                    border-bottom: solid 3px #ccc;
                    font-weight: 600;
                    font-size: 14px;
                    color: #777;
                }
                td {
                    padding: 10px 0;
                    border-bottom: solid 1px #ccc;
                    font-size: 14px;
                    img {
                        width: 50px;
                        margin-right: 20px;
                    }
                }
            }
        }
        h3 {
            margin: 0 0 20px 0;
            padding: 0;
        }
    }
}
</style>
