<template>
    <div class="table_standard">
        <div class="thead">
            <div class="tr">
                <div class="th"></div>
                <div class="th">Օգտագործողի անունը</div>
                <div class="th">Անուն</div>
                <div class="th">Ազգանուն</div>
                <div class="th">Գրանցման կոդ</div>
                <div class="th">Գազալցակայան</div>
                <div class="th">Դեր</div>
                <div class="th">ստեղծման օր</div>
            </div>
        </div>
        <div class="tbody">
            <div class="tr" v-for="user in users" :key="user.id">
                <div class="td"><v-user-image :user_id="user.id" class="user_image_small"/></div>
                <div class="td">{{user.name || '-'}}</div>
                <div class="td">{{user.first_name}}</div>
                <div class="td">{{user.last_name}}</div>
                <div class="td">{{user.ticket || '-'}}</div>
                <div class="td">{{user.cash_box_name || '-'}}</div>
                <div class="td">{{user.role_name}}</div>
                <div class="td">{{user.creation_date}}</div>


                                <div class="menu" v-if="permissions.find(item => item.name === 'user_edit')">
                                    <ul>
                                        <li>
                                            <a :href="'/users?user_id='+user.id">
                                                <img src="@/assets/icons/edit.png" alt="">
                                                Խմբագրել
                                            </a>
                                        </li>
<!--                                        <li>-->
<!--                                            <a href="#">-->
<!--                                                <img src="@/assets/icons/delete.png" alt="">-->
<!--                                                Հեռացնել-->
<!--                                            </a>-->
<!--                                        </li>-->
                                    </ul>
                                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import VUserImage from "@/components/_general/v-user-image";

    export default {
        name: "v-users-table",
        components: {VUserImage},
        computed: mapState({
          permissions: state => state.auth.profile.permissions
        }),
        data(){
            return{
                users: []
            }
        },
        async mounted(){
            await this.get_users()
        },
        methods: {
            get_users(){
                this.$store.dispatch("user/GET_USERS").then(data => {
                    if(data.success) {
                        this.users = data.obj.items
                        this.get_roles_by_user_id()
                        this.get_cash_box_by_id()
                    }
                })
            },
            get_roles_by_user_id(){
                this.users.forEach(user => {
                    // user.roles = []
                    // this.$store.dispatch("user_role/GET_ROLES_BY_USER_ID", user.id).then(data => {
                    //     if(data.success) {
                    //         user.role = data.obj
                    //       console.log(data.obj)
                    //     }
                    // })
                  this.get_role_by_id(user.id, user.role_id)
                })
            },
            get_role_by_id(user_id, role_id){
                this.$store.dispatch("role/GET_ROLE_BY_ID", role_id).then(data => {
                    this.users.forEach(user => {
                        if(user.id === user_id)
                            user.role_name = data.obj.name
                    })
                })
            },
            get_cash_box_by_id(){
                this.users.forEach(user => {
                    if(user.cash_box_id){
                        this.$store.dispatch("cash_box/GET_CASH_BOX_BY_ID", user.cash_box_id).then(data => {
                            if(data.success)
                                user.cash_box_name = data.obj.name
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .tr{
        grid-template-columns: .6fr 1.3fr 1fr 1fr 1fr 1fr 1fr 1.4fr .2fr .1fr;
    }
    .td{
        overflow: hidden;
        white-space: nowrap;
        display: flex;
        align-items: center;
    }
    button{
        padding: 14px;
        border-radius: 5px;
        border: 0;
        cursor: pointer;
    }
    .tbody{
        max-height: 450px;
        overflow: auto;
    }
</style>