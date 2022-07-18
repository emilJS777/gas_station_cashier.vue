<template>
    <div class="mini_create" v-if="permissions.find(item => item.name === 'cash_box_data_edit')">
        <div class="btn_block" v-if="!cash_box_data_setting">
            <button class="btn_standard white_btn btn_icon" @click="cash_box_data_setting_toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-clipboard-data" viewBox="0 0 16 16">
                    <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg>
                <span v-if="!cash_box_data_setting">ավելացնել տվյալները</span>
                <span v-else>չեղարկել</span>
            </button>
        </div>

        <div class="mini_form" v-if="cash_box_data_setting">
            <span class="close" @click="cash_box_data_setting_toggle">&#x2715;</span>
            <div class="form_standard">
                <label for="salary">աշխատավարձ</label>
                <input type="number" placeholder="***" id="salary" v-model="cash_box_data_form.salary">
            </div>

            <div class="form_standard">
                <label for="car_gas">ավտոգազ</label>
                <input type="number" placeholder="***" id="car_gas" v-model="cash_box_data_form.car_gas">
            </div>

            <div class="form_standard">
                <label for="payment_gas">ԳԱԶ մուծում</label>
                <input type="number" placeholder="***" id="payment_gas" v-model="cash_box_data_form.payment_gas">
            </div>

            <div class="form_standard">
                <label for="electricity">ԼՈՒՅՍ մուծում</label>
                <input type="number" placeholder="***" id="electricity" v-model="cash_box_data_form.payment_electricity">
            </div>

            <div class="form_standard">
                <label for="harka">ՀԱՐԿԱ</label>
                <input type="number" placeholder="***" id="harka" v-model="cash_box_data_form.harka">
            </div>

            <div class="form_standard">
                <label for="payment_electricity">r</label>
                <input type="number" placeholder="***" id="payment_electricity" v-model="cash_box_data_form.r">
            </div>

            <div class="form_standard">
                <label for="price">s</label>
                <input type="number" placeholder="***" id="price" v-model="cash_box_data_form.s">
            </div>



            <div class="btn_block">
                <button class="btn_standard" @click="cash_box_data_create">ստեղծել</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "v-create-cash-box-data",
        props: ['cash_box'],
        computed: mapState({
            permissions: state => state.auth.profile.permissions
        }),
        data(){
            return{
                cash_box_data_setting: false,
                cash_box_data_form: {
                    salary: null,
                    car_gas: null,
                    payment_gas: null,
                    payment_electricity: null,
                    harka: null,
                    r: null,
                    s: null,
                    cash_box_id: null,
                }
            }
        },
        mounted(){
            this.cash_box_data_form.cash_box_id = this.cash_box.id
        },
        methods: {
            cash_box_data_setting_toggle(){
                this.cash_box_data_setting = !this.cash_box_data_setting
            },
            cash_box_data_create(){
                this.$store.dispatch("cash_box_data/CREATE_CASH_BOX_DATA", this.cash_box_data_form).then(data => {
                    if(data.success)
                        this.cash_box_data_setting_toggle()
                    this.emitter.emit("msg-modal", data);
                })
            },
        }
    }
</script>

<style scoped>

</style>