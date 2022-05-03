<template>
    <v-auth-header/>

    <div class="login">
        <v-login-form/>
        <img src="@/assets/images/login.png" alt="">
    </div>

</template>

<script>
    import VLoginForm from "@/components/auth/v-login-form";
    import VAuthHeader from "@/components/auth/v-header";
    export default {
        name: "v-signIn",
        components: {VAuthHeader, VLoginForm}
    }
</script>

<style scoped>
    .login{
        padding-top: 120px;
        padding-bottom: 120px;
        background-color: rgb(242, 242, 242);
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>