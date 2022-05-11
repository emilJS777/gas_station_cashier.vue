<template>
    <div class="navbar">
        <ul>
            <li v-bind:class="this.$route.path === '/' ? 'active' : ''">
                <router-link to="/" >
                    <img src="@/assets/icons/home.svg" alt="">
                    Գլխավոր էջ
                </router-link>
            </li>

            <li v-bind:class="this.$route.path === '/users' ? 'active' : ''" v-if="permissions.find(item => item.name === 'user_get')">
                <router-link to="/users" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                    </svg>
                    Օգտատերեր
                </router-link>
            </li>

            <li v-bind:class="this.$route.path === '/roles' ? 'active' : ''" v-if="permissions.find(item => item.name === 'role_get')">
                <router-link to="/roles" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16">
                        <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                    </svg>
                    Դերեր
                </router-link>
            </li>
<!--            <li>-->
<!--                <router-link to="#" @click="()=>this.firms_menu_open = !this.firms_menu_open"-->
<!--                             v-bind:class="this.$route.path === '/data' && !this.firms_menu_open">-->

<!--                    <img src="@/assets/icons/firm-add.svg" alt="">-->
<!--                    Օգտատերեր-->
<!--                    <span v-bind:class="this.firms_menu_open ? 'open' : ''"> &#8249; </span>-->

<!--                </router-link>-->

<!--                <ul v-if="this.firms_menu_open" class="sub_menu">-->
<!--                    <li v-bind:class="this.$route.path === '/data' ? 'active' : ''">-->
<!--                        <router-link to="/data">-->
<!--                            <i></i>-->
<!--                            Դերեր-->
<!--                        </router-link>-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </li>-->
        </ul>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    export default {
        name: "v-navbar",
        computed: mapState({
            permissions: state => state.permission.permissions
        }),
        data(){
            return{
                firms_menu_open: false
            }
        }
    }
</script>

<style scoped>
    .navbar{
        margin: 20px;
    }
    a{
        color: inherit;
        text-decoration: none;
        display: grid;
        align-items: center;
        grid-gap: 1em;
        padding: 13px 21px;
        position: relative;
        grid-template-columns: 1fr 6fr;
    }
    .active{
        background-color: #5369b6;
    }

    a > span{
        position: absolute;
        right: 15px;
        top: 10px;
        font-size: 30px;
        transform: rotate(-90deg);
        transition: .2s;
    }
    span.open{
        transform: rotate(90deg);
        right: 8px;
    }
    .sub_menu{
        animation-duration: .1s;
        animation-name: sub-menu-toggle;
        border-bottom: 1px solid#999;
    }
    @keyframes sub-menu-toggle {
        from{
            margin-top: -20px;
        }
        to{
            margin-top: 0;
        }
    }
</style>