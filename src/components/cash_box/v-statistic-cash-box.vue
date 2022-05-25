<template>
    <div class="statistic">
        <div class="user_block" v-for="cashier in cashiers" :key="cashier.id">
            <v-user-image :user_id="cashier.id"/>
            <div class="info_block">
                    <p class="name">{{cashier.first_name}} {{cashier.last_name}}</p>
                    <p class="status active" v-if="cashier.id === this.active_cashier_id">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-workspace" viewBox="0 0 16 16">
                            <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                            <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z"/>
                        </svg>
                        <span>դրամարկղում</span>
                    </p>
                    <p class="status" v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-emoji-sunglasses" viewBox="0 0 16 16">
                            <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z"/>
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z"/>
                        </svg>
                        <span>հանգստի մեջ</span>
                    </p>
<!--                    <p class="statistic_price">1800.780</p>-->
            </div>
        </div>
    </div>
</template>

<script>

    import VUserImage from "@/components/_general/v-user-image";
    export default {
        name: "v-statistic-cash-box",
        components: {VUserImage},
        props: ['cash_box_id'],

        data(){
            return{
                cashiers: [],
                active_cashier_id: null
            }
        },
        mounted(){
            this.get_cashiers()
            this.get_active_cashier()
        },
        methods: {
            get_cashiers(){
                this.$store.dispatch("cashbox_user/GET_USERS_BY_CASH_BOX_ID", this.cash_box_id).then(data => {
                    if(data.success)
                        data.obj.forEach(user => {
                            user.cashier ? this.cashiers.push(user) : ''
                        })
                })
            },
            get_active_cashier(){
                this.$store.dispatch("cashbox_user/GET_BY_CASH_BOX_ID", this.cash_box_id).then(data => {
                    if(data.success)
                        this.active_cashier_id = data.obj.user_id
                })
            },
        }
    }
</script>

<style scoped>
    .statistic{
        display: flex;
        align-items: center;
        grid-gap: 1em;
        font-weight: bold;
        font-style: italic;
    }
    .user_block{
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-gap: 1em;
        background-color: #f7f7f7;
        border-radius: 12px;
        align-items: center;
        justify-content: center;
    }
    .user_block > div{
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .name{
        color: #374C98;
    }
    .statistic_price{
        color: #ef0e4e;
    }
    .info_block p{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;
    }
    .info_block{
        display: grid !important;
        grid-template-columns: 1fr;
    }
    .status{
        display: flex;
        grid-gap: .5em;
        color: #9c772d;
    }
    .active{
        color: #0a7b0b;
    }
</style>