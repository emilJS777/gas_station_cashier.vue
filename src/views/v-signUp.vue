<template>
    <v-auth-header/>

    <div class="register">
        <v-register-form/>
        <img src="@/assets/images/login.png" alt="">
    </div>
</template>

<script>
    import VAuthHeader from "@/components/auth/v-header";
    import VRegisterForm from "@/components/auth/v-register-form";

    export default {
        name: "v-signUp",
        components: {VRegisterForm, VAuthHeader}
    }
</script>

<style scoped>
    .register{
        padding-top: 120px;
        padding-bottom: 120px;
        background-color: rgb(242, 242, 242);
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>