<template>
    <div class="sidebar_parent">
        <div class="sidebar">
            <img src="@/assets/icons/toggle.svg" alt="">
            <v-auth :profile="profile"/>
            <v-navbar/>
        </div>
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
    .sidebar_parent{
        position: relative;
        min-height: 100vh;
        height: 100%;
        width: 400px;
    }
    .sidebar{
        background-color: #374c98;
        top: 0;
        bottom: 0;
        width: inherit;
        height: 100%;
        position: fixed;
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