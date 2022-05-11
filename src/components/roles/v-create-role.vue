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
                        <input type="checkbox" :id="permission.id" :value="permission.id" v-model="permissions_form">
                    </div>
                </div>


            </div>


        </div>

        <div class="btn_block toggle_block">
            <button class="btn_standard white_btn" v-if="role_setting" @click="create_role">Ստեղծել դեր</button>

            <button class="btn_standard" @click="()=>this.role_setting=!this.role_setting">{{this.role_setting ? 'Չեղարկել' : 'Ստեղծել դեր'}}</button>
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
                role_form: {name: ''},
                permissions_form: [],
                role_setting: false
            }
        },
        methods: {
            create_role(){
                this.$store.dispatch("role/CREATE_ROLE", this.role_form).then(data => {
                    if(!data.success)
                        this.emitter.emit("msg-modal", data);

                    this.role_permission_bind(data.obj.id)
                })
            },
            role_permission_bind(role_id){
                this.permissions_form.forEach(permission_id => {
                    this.$store.dispatch("role_permission/CREATE_BIND", {role_id: role_id, permission_id: permission_id}).then(data => {
                        this.emitter.emit("msg-modal", data);
                    })
                })
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
    animation-name: role-setting-animation;
}
@keyframes role-setting-animation {
    from{
        margin-bottom: -50px;
    }
    to{
        margin-bottom: 0;
    }
}

    button{
        margin: 5px;
    }
</style>