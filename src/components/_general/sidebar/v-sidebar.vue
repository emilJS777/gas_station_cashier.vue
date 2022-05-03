<template>
    <div class="sidebar">
        <img src="@/assets/icons/toggle.svg" alt="">
        <v-auth :profile="profile"/>
        <v-navbar/>
    </div>
</template>

<script>
    import VAuth from "./v-auth";
    import VNavbar from "./v-navbar";
    export default {
        name: "v-sidebar",
        props: ["profile"],
        components: {VNavbar, VAuth}
    }
</script>

<style scoped>
    .sidebar{
        background-color: #374c98;
        top: 0;
        bottom: 0;
        min-height: 100vh;
        position: relative;
    }
    *{
        color: #fff;
    }
    img{
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
    }
</style>