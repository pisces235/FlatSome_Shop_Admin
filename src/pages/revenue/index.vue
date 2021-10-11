<template>
    <div class="container-fluid">
        <h1 class="title-page text-center">Revenue Page</h1>
        <p class="all-total">
            Total all time: ${{
                getTotal(getOrdersPaid())
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
        </p>
        <div class="contain-order">
            <label for="searchDate">Search by date(mm/dd/yyyy)</label>
            <input type="date" v-model="searchDate" id="searchDate" />
            <h5 class="text-center">Results</h5>
            <table>
                <tr>
                    <th class="text-left">Date(dd/mm/yyyy)</th>
                    <th class="text-right">Total per day</th>
                </tr>
                <tr v-for="o in getRevenueByDate()" :key="o._id">
                    <td class="text-left">{{ o.date }}</td>
                    <td class="text-right">
                        ${{
                            o.total
                                .toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}
                    </td>
                </tr>
                <tr>
                    <th class="text-left">Total</th>
                    <th class="text-right">
                        ${{
                            getTotal(getRevenueByDate())
                                .toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}
                    </th>
                </tr>
            </table>
        </div>

        <div class="contain-order">
            <label for="searchMonth">Search by month</label>
            <input type="month" v-model="searchMonth" id="searchDate" />
            <h5 class="text-center">Results</h5>
            <table>
                <tr>
                    <th class="text-left">Date(mm/yyyy)</th>
                    <th class="text-right">Total per month</th>
                </tr>
                <tr v-for="o in getRevenueByMonth()" :key="o._id">
                    <td class="text-left">{{ o.date }}</td>
                    <td class="text-right">
                        ${{
                            o.total
                                .toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}
                    </td>
                </tr>
                <tr>
                    <th class="text-left">Total</th>
                    <th class="text-right">
                        ${{
                            getTotal(getRevenueByMonth())
                                .toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}
                    </th>
                </tr>
            </table>
        </div>

        <div class="contain-order">
            <label for="searchYear">Search by year</label>
            <input
                type="text"
                v-model="searchYear"
                id="searchYear"
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                maxlength="4"
            />
            <h5 class="text-center">Results</h5>
            <table>
                <tr>
                    <th class="text-left">Year</th>
                    <th class="text-right">Total per year</th>
                </tr>
                <tr v-for="o in getRevenueByYear()" :key="o._id">
                    <td class="text-left">{{ o.date }}</td>
                    <td class="text-right">
                        ${{
                            o.total
                                .toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}
                    </td>
                </tr>
                <tr>
                    <th class="text-left">Total</th>
                    <th class="text-right">
                        ${{
                            getTotal(getRevenueByYear())
                                .toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}
                    </th>
                </tr>
            </table>
        </div>
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
            searchDate: "",
            searchMonth: "",
            searchYear: "",
            search: "",
            revenueByDays: [],
            revenueByMonths: [],
            revenueByYears: [],
            newOrders: [],
            test: "",
        };
    },
    methods: {
        getOrdersPaid() {
            let newOrders = [];
            let orders = this.orders;
            orders.forEach((order) => {
                if (
                    order.email
                        .toLowerCase()
                        .includes(this.search.toLowerCase()) &&
                    order.payment == true
                ) {
                    newOrders.push(order);
                }
            });
            newOrders.sort(function (a, b) {
                let x = new Date(a.paymentDate);
                let y = new Date(b.paymentDate);
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });
            return newOrders;
        },
        getRevenueByDate() {
            let newOrders = [];
            this.getOrdersPaid().forEach((index) => {
                const data = newOrders.find(
                    (i) => i.date === index.paymentDate
                );
                if (!data) {
                    newOrders.push({
                        date: index.paymentDate,
                        total: index.total,
                    });
                } else {
                    data.total = data.total + index.total;
                }
            });

            if (this.searchDate == "" || this.searchDate == null) {
                return newOrders;
            } else {
                let orders = [];
                let date = new Date(this.searchDate);
                newOrders.forEach((o) => {
                    if (o.date.toString() == this.getFormattedDate(date)) {
                        orders.push(o);
                    }
                });
                return orders;
            }
        },
        getRevenueByMonth() {
            let newOrders = [];
            this.getOrdersPaid().forEach((index) => {
                const data = newOrders.find(
                    (i) => i.date === index.paymentDate.slice(3, 10)
                );
                if (!data) {
                    newOrders.push({
                        date: index.paymentDate.slice(3, 10),
                        total: index.total,
                    });
                } else {
                    data.total = data.total + index.total;
                }
            });

            if (this.searchMonth == "" || this.searchMonth == null) {
                return newOrders;
            } else {
                let orders = [];
                let date = new Date(this.searchMonth);
                newOrders.forEach((o) => {
                    if (
                        o.date.toString() ==
                        this.getFormattedDate(date).slice(3, 10)
                    ) {
                        orders.push(o);
                    }
                });
                return orders
            }
        },
        getRevenueByYear() {
            let newOrders = [];
            this.getOrdersPaid().forEach((index) => {
                const data = newOrders.find(
                    (i) => i.date === index.paymentDate.slice(6, 10)
                );
                if (!data) {
                    newOrders.push({
                        date: index.paymentDate.slice(6, 10),
                        total: index.total,
                    });
                } else {
                    data.total = data.total + index.total;
                }
            });

            if (this.searchYear == "" || this.searchYear == null) {
                return newOrders;
            } else {
                let orders = [];
                let date = new Date(this.searchYear);
                newOrders.forEach((o) => {
                    if (
                        o.date.toString() ==
                        this.getFormattedDate(date).slice(6, 10)
                    ) {
                        orders.push(o);
                    }
                });
                return orders;
            }
        },
        getFormattedDate(date) {
            let year = date.getFullYear();
            let month = (1 + date.getMonth()).toString().padStart(2, "0");
            let day = date.getDate().toString().padStart(2, "0");

            return day + "/" + month + "/" + year;
        },
        getTotal(array) {
            let total = 0;
            array.forEach((a) => {
                total += a.total;
            });
            return total;
        },
    },
};
</script>

<style lang="scss" scoped>
.container-fluid {
    .title-page {
        display: block;
        width: 100%;
        float: left;
    }
    .all-total {
        display: block;
        width: 100%;
        float: left;
        font-size: 35px;
        font-weight: bold;
    }
    .contain-order {
        width: 30%;
        float: left;
        margin-right: 5%;
        label {
            font-weight: bold;
        }
        input {
            border: 1px solid #ccc;
            padding: 5px;
            width: 100%;
        }
        h5 {
            margin: 10px 0;
        }
        table {
            width: 100%;
        }
    }
    .contain-order:last-child {
        margin: 0;
    }
}
</style>
