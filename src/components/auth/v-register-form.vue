<template>
    <form class="auth_form">
        <h1>Գրանցվել</h1>

        <div class="input_block">
            <input type="text" placeholder="Օգտանուն*" v-model="form.name">
        </div>
        <div class="input_block">
            <input type="password" placeholder="Գաղտնաբառ*" v-model="form.password">
        </div>
        <div class="input_block">
            <input type="text" placeholder="Գրանցման կոդ*" v-model="form.ticket">
        </div>
        <button class="auth_btn" @click="(e)=>{e.preventDefault(); sendRegister(form)}">Գրանցում</button>
    </form>
</template>

<script>
    export default {
        name: "v-register-form",
        data(){
            return{
                form: {
                    name: null,
                    password: null,
                    ticket: null
                }
            }
        },
        methods: {
            sendRegister(form){
                this.$store.dispatch("user/CREATE_USER", form).then(data => {
                    if(data.success)
                        this.$router.push({name: "signIn"})

                    this.emitter.emit("msg-modal", data);
                })
            }
        }
    }
</script>

<style scoped>

</style>