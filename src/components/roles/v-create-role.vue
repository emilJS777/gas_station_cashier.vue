<template>
    <div class="create_role" v-if="permissions.find(item => item.name === 'role_edit')">
        <div class="role_setting">
            <div class="form_standard" v-if="role_setting">
                <label>Անուն</label>
                <input type="text" placeholder="***" v-model="this.role_form.name">
            </div>


                        <div class="form_standard" v-if="role_setting">
                            <label>Թույլտվություններ</label>
                            <div class="permissions_block">
                                <div class="check_box_block" v-for="permission in permissions" :key="permission.id">
                                    <label :for="permission.id">{{permission.title}}</label>
                                    <input type="checkbox" :id="permission.id" :value="permission.id"
                                           :checked="role_form.permission_ids.find(permission_id => permission.id === permission_id)"
                                           v-model="role_form.permission_ids">
                                </div>
                            </div>


                        </div>


        </div>

        <div class="btn_block toggle_block">
            <button class="btn_standard white_btn" v-if="role_setting" @click="this.$route.query.role_id ? update_role() : create_role()">
                <span v-if="this.$route.query.role_id">Թարմացնել դերը</span>
                <span v-else>Ստեղծել դեր</span>
            </button>

            <button class="btn_standard red_btn" @click="delete_role" v-if="role_setting && this.$route.query.role_id">
                Ջնջել դերը
            </button>

            <button class="btn_standard" @click="toggle_setting">{{this.role_setting ? 'Չեղարկել' : 'Ստեղծել դեր'}}</button>
        </div>
    </div>


</template>

<script>
    import {mapState} from "vuex"
    export default {
        name: "v-create-role",
        computed: mapState({
            permissions: state => state.permission.permissions
        }),
        data(){
            return{
                role_form: {name: '', permission_ids: []},
                role_setting: false
            }
        },
        mounted(){
            if(this.$route.query.role_id){
                this.get_role_by_id()
                this.role_setting = true
                this.get_permissions_by_role_id(this.$route.query.role_id)

            }
        },
        methods: {
            toggle_permissions_form(permission_id){
                const permission_index = this.permissions_form.indexOf(permission_id)

                permission_index ? this.permissions_form.splice(permission_index, 1) : this.permissions_form.push(permission_id)
            },
            create_role(){
                this.$store.dispatch("role/CREATE_ROLE", this.role_form).then(data => {
                    if(!data.success)
                        this.emitter.emit("msg-modal", data);
                    this.role_permission_bind(data.obj.id)
                }).finally(() => window.location.reload())
            },
            update_role(){

                this.$store.dispatch("role/UPDATE_ROLE", {role_id: this.$route.query.role_id, body: this.role_form}).then(data => {
                    if(data.success) {
                        this.toggle_setting()
                    }

                    this.emitter.emit("msg-modal", data);
                })
            },
            delete_role(){
                this.$store.dispatch("role/DELETE_ROLE", this.$route.query.role_id).then(data => {
                    if(data.success)
                        this.toggle_setting()
                    this.emitter.emit("msg-modal", data);
                })
            },
            role_permission_bind(role_id){
                this.permissions_form.forEach(() => {
                    console.log(this.permissions_form)
                    this.$store.dispatch("role_permission/CREATE_BIND", {role_id: role_id, permission_ids: this.permissions_form}).then(data => {
                        this.emitter.emit("msg-modal", data);
                    })
                })
            },
            get_role_by_id(){
                this.$store.dispatch("role/GET_ROLE_BY_ID", this.$route.query.role_id).then(data => {
                    if(data.success)
                        this.role_form.name = data.obj.name
                })
            },
            get_permissions_by_role_id(role_id) {
               this.$store.dispatch("role_permission/GET_PERMISSIONS_BY_ROLE_ID", role_id).then(data => {
                   if(data.success)
                       data.obj.forEach(permission => {
                           this.permissions_form.push(permission.id)
                       })
               })
            },
            toggle_setting(){
                this.role_form.name = null
                this.role_setting = !this.role_setting;
                this.$router.push("/roles")
            }
        }
    }
</script>

<style scoped>
    .create_role{
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: flex-end;
        grid-gap: 2em;
        padding-bottom: 30px;
    }
    .form_standard{
        margin-top: 30px;
    }
    .permissions_block{
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1em;
    }
    .toggle_block{
        float: right;
        text-align: right;
    }
    .role_setting > *{
        animation-duration: .3s;
        animation-name: anim-toggle;
    }
    button{
        margin: 5px;
    }
</style>