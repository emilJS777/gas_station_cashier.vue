<template>
        <form>
            <h1>Մուտքագրեք տվյալները</h1>

            <div class="input_block">
                <input type="text" placeholder="Օգտանուն*" v-model="form.user_name">
            </div>
            <div class="input_block">
                <input type="password" placeholder="Գաղտնաբառ*" v-model="form.password">
            </div>
            <button @click="(e)=>{e.preventDefault(); sendLogin(form)}">Մուտք գործել</button>
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
                    this.$router.push({path: "/home"})
            }
        }
    }
</script>

<style scoped>
    h1{
        margin-top: 0;
        text-transform: uppercase;
        color: #343434;
        font-size: 45px;
    }
    form{
        display: block;
        margin: 15px auto;
    }
    img{
        display: block;
        margin: 0 auto;
    }
    .input_block{
        margin-top: 40px;
    }
    input{
        background-color: #EBECED;
        padding: 5px 0px 5px 10px;
        border: 0;
        height: 40px;
        width: 300px;
    }

    button{
        background-color: #343434;
        color: #FAFAFA;
        padding: 15px 10px 15px 10px;
        border: 0;
        font-weight: bold;
        border-radius: 5px;
        width: 300px;
        margin-top: 30px;
        cursor: pointer;
    }
    
</style>