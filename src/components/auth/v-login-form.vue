<template>
        <form class="auth_form">
            <h1>Մուտք գործել</h1>

            <div class="input_block">
                <input type="text" placeholder="Օգտանուն*" v-model="form.user_name">
            </div>
            <div class="input_block">
                <input type="password" placeholder="Գաղտնաբառ*" v-model="form.password">
            </div>
            <button class="auth_btn" @click="(e)=>{e.preventDefault(); sendLogin(form)}">Մուտք գործել</button>
        </form>
</template>

<script>
    export default {
        name: "v-form",
        data(){
            return{
                form: {
                    user_name: null,
                    password: null
                }
            }
        },
        methods: {
            async sendLogin(form){
                const data = await this.$store.dispatch("auth/LOGIN", form)
                if(!data.success)
                    this.emitter.emit("msg-modal", data);
                else
                    this.$router.push({name: "home"})
            }
        }
    }
</script>

<style scoped>

    
</style>