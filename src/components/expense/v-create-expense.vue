<template>
    <div class="mini_create" v-if="permissions.find(item => item.name === 'expense_edit')">
        <div class="btn_block" v-if="!expense_setting">
            <button class="btn_standard white_btn btn_icon" @click="expense_setting_toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-cash-stack" viewBox="0 0 16 16">
                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"/>
                </svg>
                <span v-if="!expense_setting">ավելացնել ծախս</span>
                <span v-else>չեղարկել</span>
            </button>
        </div>

        <div class="mini_form" v-if="expense_setting">
            <span class="close" @click="expense_setting_toggle">&#x2715;</span>
            <div class="form_standard">
                <label for="name">ծախսի անվանումը</label>
                <input type="text" placeholder="***" id="name" v-model="expense_form.name">
            </div>

            <div class="form_standard">
                <label for="description">ծախսի նկարագրությունը</label>
                <input type="text" placeholder="***" id="description" v-model="expense_form.description">
            </div>

            <div class="form_standard">
                <label for="price">ծախսային գին</label>
                <input type="number" placeholder="***" id="price" v-model="expense_form.price">
            </div>

            <div class="btn_block">
                <button class="btn_standard" @click="expense_create">ստեղծել</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "v-create-expense",
        props: ['cash_box'],
        computed: mapState({
            permissions: state => state.auth.profile.permissions
        }),
        data(){
            return{
                expense_setting: false,
                expense_form: {
                    name: null,
                    description: null,
                    price: null,
                    cash_box_id: null
                }
            }
        },
        mounted(){
            this.cash_box_id = this.cash_box.id
        },
        methods: {
            expense_setting_toggle(){
                this.expense_setting = !this.expense_setting
            },
            expense_create(){
                this.$store.dispatch("expense/CREATE_EXPENSE", this.expense_form).then(data => {
                    if(data.success)
                        this.expense_setting_toggle()
                    this.emitter.emit("msg-modal", data);
                })
            }
        }
    }
</script>

<style scoped>

</style>