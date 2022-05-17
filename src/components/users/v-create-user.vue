<template>
    <div class="create_user_block" v-if="permissions.find(item => item.name === 'user_edit')">
        <div class="user_setting">
            <div class="form_standard" v-if="user_setting">
                <label>Անուն</label>
                <input type="text" placeholder="***" v-model="user_form.first_name"/>
            </div>
            <div class="form_standard" v-if="user_setting">
                <label>Ազգանուն</label>
                <input type="text" placeholder="***" v-model="user_form.last_name"/>
            </div>
            <div class="form_standard" v-if="user_setting">
                <label>Դեր</label>
                <select class="select_standard" v-model="selected_role_id">
                    <option :value="null" selected>ընտրեք դերը</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">
                        {{role.name}}
                    </option>
                </select>
            </div>

            <div class="form_standard" v-if="user_setting">
                <label>Գազալցակայան</label>
                <div class="check_box_block"  v-if="!profile.cash_box_id">
                    <label :for="0">null</label>
                    <input type="radio" name="cash_box" :id="0" :checked="!profile.cash_box_id ? true : ''" v-model="user_form.cash_box_id" :value="null" />
                </div>

                <div class="check_box_block" v-for="cash_box in cash_boxes" :key="cash_box.id">
                    <label :for="cash_box.id">{{cash_box.name}}</label>
                    <input type="radio" name="cash_box" :id="cash_box.id" v-model="user_form.cash_box_id"
                           :value="cash_box.id" :checked="profile.cash_box_id === cash_box.id ? true : false">
                </div>
                <div class="check_box_block cashier" v-if="user_form.cash_box_id || profile.cash_box_id">
                    <label for="cashier">cashier</label>
                    <input type="checkbox" name="cashier" id="cashier"  :value="true" v-model="user_form.cashier">
                </div>
            </div>
        </div>
        <div class="btn_block">
            <button class="btn_standard white_btn" v-if="user_setting"  @click="create_user_ticket">Ստեղծել օգտատեր</button>

            <button class="btn_standard" @click="()=>this.user_setting = !this.user_setting">{{this.user_setting ? 'Չեղարկել' : 'Ստեղծել օգտատեր'}}</button>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    export default {
        name: "v-create-user",
        computed: mapState({
            permissions: state => state.permission.permissions,
            profile: state => state.auth.profile
        }),
        data(){
            return{
                user_setting: false,
                cash_boxes: [],
                roles: [],
                user_form: {
                    first_name: null,
                    last_name: null,
                    cash_box_id: null,
                    cashier: false
                },
                selected_role_id: null
            }
        },
        created(){
            this.get_cash_box_ids()
            this.get_role_ids()
        },
        methods: {
            get_cash_box_ids() {
                this.$store.dispatch("cash_box/GET_CASH_BOX_IDS").then(data => {
                    if(data.success)
                        data.obj.forEach(cash_box_id => this.get_cash_box_by_id(cash_box_id))
                })
            },
            get_cash_box_by_id(cash_box_id){
                this.$store.dispatch("cash_box/GET_CASH_BOX_BY_ID", cash_box_id).then(data => {
                    if(data.success)
                        this.cash_boxes.push(data.obj)
                })
            },
            get_role_ids(){
                this.$store.dispatch("role/GET_ROLES").then(data => {
                    if(data.success)
                        this.roles = data.obj
                })
            },
            // get_role_by_id(role_id){
            //     this.$store.dispatch("role/GET_ROLE_BY_ID", role_id).then(data => {
            //         if(data.success)
            //             this.roles.push(data.obj)
            //     })
            // }
        //    USER CREATE
            create_user_ticket(){
                this.$store.dispatch("user/CREATE_USER_TICKET", this.user_form).then(data => {
                    if(data.success) {
                        console.log({user_id: data.obj.id, role_id: this.selected_role_id})
                        this.$store.dispatch("user_role/CREATE_BIND", {user_id: data.obj.id, role_id: this.selected_role_id}).then(data => {
                            console.log(data)
                        })
                        data.obj.msg = data.obj.ticket
                        this.user_setting = false
                    }
                    this.emitter.emit("msg-modal", data);
                })
            }
        }
    }
</script>

<style scoped>
    .create_user_block{
        display: grid;
        grid-gap: 1em;
        grid-template-columns: 6fr 1fr;
        padding-bottom: 30px;
    }
    .user_setting{
        display: grid;
        grid-gap: 2em;
        grid-template-columns: 250px 250px 250px;

    }
    .user_setting > *{
        animation-duration: .3s;
        animation-name: user-setting-animation;
    }
    @keyframes user-setting-animation {
        from{
            margin-bottom: -30px;
        }
        to{
            margin-bottom: 0;
        }
    }
    .btn_block{
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }
    button{
        padding: 10px 30px;
    }
    .check_box_block{
        display: grid;
        grid-gap: 1em;
        grid-template-columns: 100px 40px;
    }
    .check_box_block input{
        width: max-content;
    }
    .check_box_block label{
        font-weight: initial;
    }
    select{
        background-color: #F5F7FA;
        padding: 10px;
        border: 0;
        margin-right: -10px;
    }
    .cashier{
        margin-top: 10px;
    }
</style>