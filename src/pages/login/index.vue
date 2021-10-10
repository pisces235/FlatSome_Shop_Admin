<template>
    <form @submit.prevent="login">
        <v-col cols="12">
            <label for="">Email*</label>
            <v-text-field
                hint="Email*"
                type="email"
                :rules="[rules.required('email'), rules.emailFormat()]"
                v-model="email"
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <label for="">Password*</label>
            <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                hint="Password*"
                :type="showPassword ? 'text' : 'password'"
                :rules="[
                    rules.required('password'),
                    rules.minLength('password', 8),
                ]"
                v-model="password"
                @click:append="showPassword = !showPassword"
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-btn class="ma-2" outlined color="indigo" type="submit">
                Login
            </v-btn>
        </v-col>
    </form>
</template>

<script>
import validations from "@/utils/validations";
export default {
    name: "AdminLogin",
    data() {
        return {
            dialog: false,
            email: "",
            password: "",
            showPassword: false,
            rules: {
                ...validations,
            },
        };
    },
    methods: {
        async login() {
            let loginInfo = {
                email: this.email,
                password: this.password,
            };
            let response = await this.$store.dispatch(
                "loginAdminUser",
                loginInfo
            );
            if (response.error) {
                alert(response.error);
            } else {
                this.$router.push("/");
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
