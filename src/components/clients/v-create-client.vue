<template>
    <div class="create_client_block">
        <div class="client_setting" >
            <div class="form_standard" v-if="client_setting">
                <label>Անուն</label>
                <input type="text" placeholder="***" v-model="client_form.name"/>
            </div>
            <div class="form_standard" v-if="client_setting">
                <label>Նկարագրություն</label>
                <input type="text" placeholder="***" v-model="client_form.description"/>
            </div>
<!--            <div class="form_standard" v-if="client_setting">-->
<!--                <label>Հաճախորդի ադմին</label>-->
<!--                <select class="select_standard" v-model="selected_user_id">-->
<!--                    <option :value="null" selected>ընտրեք օգտագործողին</option>-->
<!--                    <option v-for="user in users" :key="user.id" value="user.id">-->
<!--                        {{user.first_name}} {{user.last_name}}-->
<!--                    </option>-->
<!--                </select>-->
<!--            </div>-->
        </div>
        <div class="btn_block">
            <button class="btn_standard white_btn" v-if="client_setting" @click="this.$route.query.client_id ? update_client() : create_client()">
                <span v-if="this.$route.query.client_id">Թարմացնել հաճախորդը</span>
                <span v-else>Ստեղծել հաճախորդ</span>
            </button>

            <button class="btn_standard red_btn" @click="delete_client" v-if="client_setting && this.$route.query.client_id">
                Ջնջել հաճախորդը
            </button>

            <button class="btn_standard" @click="toggle_setting">
                {{this.client_setting ? 'Չեղարկել' : 'Ստեղծել հաճախորդ'}}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-create-client",
        data(){
            return{
                client_setting: false,
                // selected_user_id: null,
                client_form: {
                    name: null,
                    description: null
                },
            }
        },
        mounted(){
            if(this.$route.query.client_id) {
                this.client_setting = true
                this.get_client_by_id()
            }
        },
        methods: {
            create_client(){
                this.$store.dispatch("client/CREATE_CLIENT", this.client_form).then(data => {
                    if(data.success)
                        window.location.reload()

                    this.emitter.emit("msg-modal", data);
                })
            },
            update_client(){
                this.$store.dispatch("client/UPDATE_CLIENT", {client_id: this.$route.query.client_id, body: this.client_form}).then(data => {
                    if(data.success)
                        this.toggle_setting()

                    this.emitter.emit("msg-modal", data);
                })
            },
            delete_client(){
                this.$store.dispatch("client/DELETE_CLIENT", this.$route.query.client_id).then(data => {
                    if(data.success)
                        this.toggle_setting()

                    this.emitter.emit("msg-modal", data);
                })
            },
            get_client_by_id(){
                this.$store.dispatch("client/GET_CLIENT_BY_ID", this.$route.query.client_id).then(data => {
                    if(data.success) {
                        this.client_form.name = data.obj.name
                        this.client_form.description = data.obj.description
                    }
                })
            },
            toggle_setting(){
                this.client_form.name = null
                this.client_form.description = null
                this.client_setting = !this.client_setting;
                this.$router.push("/clients")
            }
        }
    }
</script>

<style scoped>
    .create_client_block{
        display: grid;
        grid-gap: 1em;
        grid-template-columns: 6fr 1fr;
        padding-bottom: 30px;
    }
    .client_setting{
        display: grid;
        grid-gap: 2em;
        grid-template-columns: 250px;

    }
    .client_setting > *{
        animation-duration: .3s;
        animation-name: anim-toggle;
    }

    .check_box_block input{
        width: max-content;
    }
    .check_box_block label{
        font-weight: initial;
    }

</style>