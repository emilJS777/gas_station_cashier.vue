<template>
    <div class="cashier_change_block" v-if="cashiers.length && profile.cashier">
        <select  v-model="next_cashier_id">
            <option :value="null" selected>ընտրեք հաջորդ գանձապաին</option>
            <option v-for="cashier in this.cashiers" :key="cashier.id" :value="cashier.id">
                {{ cashier.first_name }} {{cashier.last_name}}
            </option>
        </select>

        <button @click="this.change_cashier">սմենափոխ</button>
    </div>
</template>

<script>
    import {mapState} from "vuex"

    export default {
        name: "v-cashier-change",
        computed: mapState({
            profile: state => state.auth.profile
        }),
        data(){
            return{
                cashiers: [],
                next_cashier_id: null
            }
        },
        mounted(){
            if(this.profile.cash_box_id)
                this.get_cashiers(this.profile.cash_box_id)
        },
        methods:{
            // GET CASHIERS
            get_cashiers(cash_box_id){
                this.$store.dispatch("cashbox_user/GET_USERS_BY_CASH_BOX_ID", cash_box_id).then(data => {
                    if(data.success)
                        data.obj.forEach(user => {
                            user.cashier ? this.cashiers.push(user) : ''
                        })
                })
            },
            // CHANGE NEXT CASHIER
            change_cashier(){
                if(this.next_cashier_id){
                    this.$store.dispatch("cashbox_user/CHANGE_CASHIER", this.next_cashier_id).then(data => {
                        if(data.success) {
                            this.$store.commit("request/SET_TOKENS", {access_token: null, refresh_token: null})
                            this.$store.commit("auth/SET_PROFILE", null)
                            this.$router.push({path: "/signIn"})
                        }
                        this.emitter.emit("msg-modal", data);
                    })
                }
               else
                    this.emitter.emit("msg-modal", {success: false, obj:{msg: 'ընտրիր հերտափոխին'}});
            }
        }
    }
</script>

<style scoped>
select, button{
    padding: 10px;
    cursor: pointer;
}
select{
    border: 0;
    margin-right: 10px;
}
    button{
        outline: 0;
        border: 0;
        background-color: #3560d0;
        color: #fff;
    }
</style>