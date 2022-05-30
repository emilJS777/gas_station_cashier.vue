<template>
    <div class="loader">
        <div class="loader_block">
            <div class="spinKit"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-loader"
    }
</script>

<style scoped>
.loader{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
}
.spinKit {
    border: 8px solid #e2dbdb;
    border-radius: 50%;
    border-top: 8px solid #4444a8;
    border-bottom: 8px solid #4040a1;
    width: 90px;
    height: 90px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    display: block;
    margin-bottom: 5px;
}

@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>