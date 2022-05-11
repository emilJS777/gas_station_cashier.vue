<template>
    <div class="auth">
        <div class="img_block">
            <div class="img">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
            </div>
        </div>
        <div class="info_block">
            <h4>{{profile.first_name}} {{profile.last_name}}</h4>
            <span>{{profile.name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-auth",
        props: ["profile"],
        mounted(){
            this.$store.dispatch("permission/GET_ALL_PERMISSION")
        }
    }
</script>

<style scoped>
    .auth{
        display: grid;
        align-items: center;
        grid-gap: 1em;
        grid-template-columns: 1fr 6fr;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 50px;
        padding-bottom: 30px;
        border-bottom: 1px solid #999;
    }
    .img{
        border-radius: 50%;
        background-color: #fff;
        position: relative;
        width: 50px;
        height: 50px;
        overflow: hidden;
    }
    .img > svg{
        position: absolute;
        color: #374c98;
        left: 50%;
        right: 50%;
        top: 50%;
        bottom: 50%;
        transform: translate(-50%, -50%);
    }
</style>