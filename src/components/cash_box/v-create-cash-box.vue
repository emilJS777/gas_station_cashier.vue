<template>
    <div class="cash_box_create" v-if="permissions.find(item => item.name === 'cash_box_edit')">
        <div class="form" v-if="cash_box_setting">
            <h3>ստեղծել դրամարկղ</h3>

            <div class="form_standard">
                <label for="name">Անուն</label>
                <input type="text" placeholder="***" id="name" v-model="this.cash_box_form.name">
            </div>

            <div class="form_standard">
                <label for="description">Նկարագրություն</label>
                <input type="text" placeholder="***" id="description" v-model="this.cash_box_form.description">
            </div>

            <div class="btn_block">
                <button class="btn_standard" @click="cash_box_create">ստեղծել</button>
            </div>
        </div>

        <div class="btn_block btn_absolute">
            <button @click="()=>this.cash_box_setting=!this.cash_box_setting">
                <img src="@/assets/icons/plus.svg" alt="" v-bind:class="this.cash_box_setting ? 'btn_close' : 'btn_plus'">
            </button>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "v-create-cash-box",
        computed: mapState({
            permissions: state => state.permission.permissions
        }),
        data(){
            return{
                cash_box_setting: false,
                cash_box_form: {
                    name: null,
                    description: null
                }
            }
        },
        methods: {
            cash_box_create(){
                this.$store.dispatch("cash_box/GET_CASH_BOX_CREATE", this.cash_box_form).then(data => {
                    if(data.success)
                        window.location.reload()
                    this.emitter.emit("msg-modal", data);
                })
            }
        }
    }
</script>

<style scoped>
    .cash_box_create{
        position: fixed;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 99;
        display: flex;

        justify-content: center;
    }
    .form{
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 40px;
        width: max-content;
        animation-duration: .3s;
        animation-name: form-show;
    }
    @keyframes form-show {
        from{
            margin-right: -200px;
        }
        to{
            margin-right: 0;
        }
    }
    h3{
        margin-bottom: 18px;
    }
    .btn_block{
        margin-top: 20px;
        text-align: right;
    }
.btn_absolute > button{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.26);
    box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.26);
    border: 0;
    position: absolute;
    bottom: 40px;
    right: 40px;
}
    .form_standard{
        margin-top: 20px;
    }
    .btn_plus{
        transition: .2s;
        transform: rotate(0deg);
    }
    .btn_close{
        transition: .3s;
        transform: rotate(135deg);
    }
</style>