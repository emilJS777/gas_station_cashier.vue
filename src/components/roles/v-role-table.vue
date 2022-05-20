<template>
    <div class="table_parent">
        <div class="table_standard">
            <div class="thead">
                <div class="tr">
                    <div class="th">name</div>
                    <div class="th" v-for="permission in permissions" :key="permission.id">{{permission.title}}</div>
                </div>
            </div>
            <div class="tbody">
                <div class="tr" v-for="role in roles" :key="role.id">
                    <div class="td">{{role.name}}</div>
                    <div class="td" v-for="permission in permissions" :key="permission.id">
                        <div class="check_box_block"  >
                            <input type="checkbox" :id="permission.id" :value="permission.id"
                                   v-if="role.permissions && role.permissions.find(role_permission => role_permission.id === permission.id)"
                                   :checked="true" @click="role_permission_delete_bind(role.id, permission.id)"/>

                            <input type="checkbox" :id="permission.id" :value="permission.id" v-else :checked="false"
                                   @click="role_permission_create_bind(role.id, permission.id)"/>

                        </div>
                    </div>

                                    <div class="menu" v-if="permissions.find(item => item.name === 'role_edit')">
                                        <ul>
                                            <li>
                                                <a :href="'/roles?role_id='+role.id">
                                                    <img src="@/assets/icons/edit.png" alt="">
                                                    Խմբագրել
                                                </a>
                                            </li>
<!--                                            <li>-->
<!--                                                <a href="#">-->
<!--                                                    <img src="@/assets/icons/delete.png" alt="">-->
<!--                                                    Հեռացնել-->
<!--                                                </a>-->
<!--                                            </li>-->
                                        </ul>
                                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    export default {
        name: "v-role-table",
        computed: mapState({
            permissions: state => state.permission.permissions
        }),
        data(){
           return{
               roles: [],
               role_permissions: []
           }
        },
        mounted(){
            this.get_roles()
        },
        methods: {
            get_roles(){
                this.$store.dispatch("role/GET_ROLES").then(data => {
                    if(data.success) {
                        this.roles = data.obj
                        data.obj.forEach(role => this.get_permissions_by_role_id(role.id))
                    }
                })
            },
            get_permissions_by_role_id(role_id){
                this.$store.dispatch("role_permission/GET_PERMISSIONS_BY_ROLE_ID", role_id).then(data => {
                    if(data.success){
                        this.role_permissions = data.obj

                        this.roles.forEach(role => {
                            if(role.id === role_id)
                                role.permissions = data.obj
                        })
                    }
                })
            },

            role_permission_delete_bind(role_id, permission_id){
                this.$store.dispatch("role_permission/DELETE_BIND", {role_id: role_id, permission_id: permission_id}).then(data => {
                    this.emitter.emit("msg-modal", data);
                })
            },

            role_permission_create_bind(role_id, permission_id){
                this.$store.dispatch("role_permission/CREATE_BIND", {role_id: role_id, permission_id: permission_id}).then(data => {
                    this.emitter.emit("msg-modal", data);
                })
            }
        }
    }
</script>

<style scoped>
    .table_parent{
        max-width: 100%;
        display: flex;
        overflow: scroll;
        position: absolute;
    }
    .table_standard{
        margin-bottom: 0;
    }
    .tr{
        display: flex;
        align-items: center;
        grid-gap: 1em;
    }
    .th, .td{
        width: 150px;
    }
    .tbody{
        max-height: 450px;
        overflow: auto;
    }
    .table_standard{

        display: block;
    }
    .check_box_block{
        background-color: initial;
    }
    .menu{
        height: 20px;
    }
</style>