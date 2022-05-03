<template>
    <div class="header">
        <div class="logo">
            <img src="@/assets/images/logo.png" alt="">
        </div>
        <div class="navigation">
<!--            <nav>-->
<!--                <ul>-->
<!--                    <li>-->
<!--                        <a href="#">menu</a>-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </nav>-->
        </div>
        <div class="sign">
            <router-link to="/signIn">
                Մուտք գործել
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-header"
    }
</script>

<style scoped>
    .header{
        height: 90px;
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 3fr 1fr;
    }
    .header > div{
        display: flex;
        justify-content: center;
    }
    a{
        color: #343434;
        font-size: 15px;
    }
</style>