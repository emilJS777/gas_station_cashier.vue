<template>

    <div class="date">

        <div class="total_block">
            <div>
                <h4>Օրվա ծախսը: <span>{{parseFloat(this.total_expense).toFixed(2)}}</span></h4>
                <h4>Քաշը: <span>{{parseFloat(this.total_weight).toFixed(2)}}</span></h4>
                <h4>Ավտո: <span>{{this.total_count}}</span></h4>
                <h4>Աբարոթ: <span>{{parseFloat(this.total_price).toFixed(2)}}</span></h4>
                <h4>%: <span>{{parseFloat(parseFloat(this.total_price).toFixed(2) / parseFloat(this.total_weight).toFixed(2)).toFixed(1) === 'NaN' ? '-' : parseFloat(parseFloat(this.total_price).toFixed(2) / parseFloat(this.total_weight).toFixed(2)).toFixed(1)}}</span></h4>
                <h4>Շահույթ: <span>{{parseFloat(parseFloat(this.total_price).toFixed(2) - parseFloat(this.total_expense).toFixed(2) - this.salary).toFixed(2)}}</span></h4>

            </div>

            <div  v-if="permissions.find(item => item.name === 'cash_box_data_get')">
                <h4>Աշխատավարձ: <span>{{this.salary <= 0 ? '-' : this.salary}}</span></h4>
                <h4>Ավտոգազ: <span>{{this.car_gas || '-'}}</span></h4>
                <h4>ԳԱԶ մուծում: <span>{{this.payment_gas || '-'}}</span></h4>
                <h4>ԼՈՒՅՍ մուծում: <span>{{this.payment_electricity || '-'}}</span></h4>
                <h4>ՀԱՐԿԱ: <span>{{this.payment_gas || '-'}}</span></h4>
            </div>

            <div v-if="permissions.find(item => item.name === 'cash_box_data_get')">
                <h4>Հոսանք: <span>{{typeof parseFloat(this.t / this.total_weight).toFixed(8) !== number  ? '-' : parseFloat(this.t / this.total_weight).toFixed(8)}}</span></h4>
                <h4>R: <span>{{this.r || '-'}}</span></h4>
                <h4>S: <span>{{this.s || '-'}}</span></h4>
                <h4>T: <span>{{this.t <= 0 ? '-' : this.t}}</span></h4>
            </div>
        </div>
        <div class="date_filter_block">
            <datepicker v-model="this.picked"/>
            <button @click="get_data">search</button>
        </div>
    </div>

<!--    STATION DATA -->


    <div class="table_standard">
        <h4>Կայանի տվյալները</h4>

        <div class="thead">
            <div class="tr">
                <div class="th">Գանձապահ</div>
                <div class="th">քաշը</div>
                <div class="th">ճնշում</div>
                <div class="th">ջերմաստիճանը</div>
                <div class="th">գինը</div>
                <div class="th">ստեղծման օր</div>
            </div>
        </div>
        <div class="tbody">
            <div class="tr" v-for="station_data in this.station_data" :key="station_data.id">
                <div class="td">{{station_data.cashier_full_name || '-'}}</div>
                <div class="td">{{station_data.weight}}</div>
                <div class="td">{{station_data.pressure}}</div>
                <div class="td">{{station_data.temperature}}</div>
                <div class="td">{{station_data.price}}</div>
                <div class="td">{{station_data.creation_date}}</div>


<!--                <div class="menu">-->
<!--                    <ul>-->
<!--                        <li>-->
<!--                            <router-link :to="'/home'">-->
<!--                                <img src="@/assets/icons/edit.png" alt="">-->
<!--                                Խմբագրել-->
<!--                            </router-link>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <a href="#">-->
<!--                                <img src="@/assets/icons/delete.png" alt="">-->
<!--                                Հեռացնել-->
<!--                            </a>-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                </div>-->
            </div>
        </div>
    </div>

<!--    EXPENSES DATA-->

    <div class="table_standard expense_table">
        <h4>Ծախսեր</h4>

        <div class="thead">
            <div class="tr">
                <div class="th">Անուն</div>
                <div class="th">Նկարագրություն</div>
                <div class="th">գինը</div>
                <div class="th">ստեղծման օր</div>
            </div>
        </div>
        <div class="tbody">
            <div class="tr" v-for="expense in expenses" :key="expense.id">
                <div class="td">{{expense.name}}</div>
                <div class="td">{{expense.description}}</div>
                <div class="td">{{expense.price}}</div>
                <div class="td">{{expense.creation_date}}</div>


                <!--                <div class="menu">-->
                <!--                    <ul>-->
                <!--                        <li>-->
                <!--                            <router-link :to="'/home'">-->
                <!--                                <img src="@/assets/icons/edit.png" alt="">-->
                <!--                                Խմբագրել-->
                <!--                            </router-link>-->
                <!--                        </li>-->
                <!--                        <li>-->
                <!--                            <a href="#">-->
                <!--                                <img src="@/assets/icons/delete.png" alt="">-->
                <!--                                Հեռացնել-->
                <!--                            </a>-->
                <!--                        </li>-->
                <!--                    </ul>-->
                <!--                </div>-->
            </div>
        </div>
    </div>

</template>

<script>
    // import Datepicker from 'vue3-datepicker';
    import Datepicker from 'vuejs3-datepicker';
    import {mapState} from "vuex";
    export default {
        name: "v-station-data-table",
        components: {Datepicker},
        props: ['cash_box'],
        computed: mapState({
          permissions: state => state.auth.profile.permissions
        }),
        data(){
            return{
                //STATION DATA
                total_weight: 0,
                total_price: 0,
                total_count: 0,
                station_data: [],

                picked: new Date(),

                //EXPENSE
                total_expense: 0,
                expenses: [],

                // CASH BOX DATA
                salary: 0,
                car_gas: 0,
                payment_gas: 0,
                payment_electricity: 0,
                harka: 0,
                r: 0,
                s: 0,
                t: 0
            }
        },
        mounted(){
            this.get_data()

        },
        methods: {
            get_data() {
                const date = this.picked.toISOString().split('T')[0]

                this.get_station_data_ids(date)
                this.get_expenses(date)
                this.get_cash_box_data(date)

                this.get_yesterday_cash_box_data(new Date(this.picked.getTime() - 86400000).toISOString().split('T')[0])
            },
            get_station_data_ids(date) {
                this.station_data = []
                this.total_price = 0
                this.total_weight = 0
                this.total_count = 0


                this.$store.dispatch("station_data/GET_STATION_DATA_IDS", {
                    date: date,
                    cash_box_id: this.cash_box.id
                }).then(data => {
                    if (data.success)
                        data.obj.forEach(station_data_id => this.get_station_data_by_id(station_data_id))
                })
            },
            get_station_data_by_id(station_data_id) {
                this.$store.dispatch("station_data/GET_STATION_DATA_BY_ID", station_data_id).then(data => {

                    if (data.success) {
                        data.obj.creation_date = new Date(data.obj.creation_date).toISOString().split('T')[0]

                        this.station_data.push(data.obj)

                        this.total_price += parseFloat(data.obj.price)
                        this.total_weight += parseFloat(data.obj.weight)
                        this.total_count += 1

                        this.get_cashier_by_id(data.obj.cashier_id, data.obj.id)
                    }
                    // SORT THE STATIONS BY NAME
                    this.station_data.sort((a, b) => (a.id > b.id ? -1 : 1))
                })
            },
            get_cashier_by_id(cashier_id, station_data_id) {
                this.$store.dispatch("user/GET_USER_BY_ID", cashier_id).then(data => {
                    if (data.success) {

                        this.station_data.forEach(station_data => {
                            if (station_data.id === station_data_id)
                                station_data.cashier_full_name = data.obj.first_name + ' ' + data.obj.last_name
                        })

                    }

                })
            },
            get_expenses(date) {
                this.total_expense = 0


                this.$store.dispatch("expense/GET_ALL_EXPENSES", date).then(data => {
                    if (data.success) {
                        this.expenses = data.obj

                        this.expenses.forEach(expense => {
                            expense.creation_date = new Date(expense.creation_date).toISOString().split('T')[0]
                            this.total_expense += parseFloat(expense.price)
                        })
                    }
                    // SORT THE STATIONS BY NAME
                    this.expenses.sort((a, b) => (a.id > b.id ? -1 : 1))
                })
            },
            get_cash_box_data(date) {
                this.$store.dispatch("cash_box_data/GET_BY_DATE", {
                    date: date,
                    cash_box_id: this.cash_box.id
                }).then(data => {
                    if (data.success) {
                        this.salary = data.obj.salary
                        this.car_gas = data.obj.car_gas
                        this.payment_gas = data.obj.payment_gas
                        this.payment_electricity = data.obj.payment_electricity
                        this.harka = data.obj.harka
                        this.r = data.obj.r
                        this.s = data.obj.s
                    } else {
                        this.car_gas = 0
                        this.payment_gas = 0
                        this.payment_electricity = 0
                        this.harka = 0
                        this.r = 0
                        this.s = 0
                        this.salary = 0
                    }
                })
            },
            get_yesterday_cash_box_data(date) {
                this.$store.dispatch("cash_box_data/GET_BY_DATE", {
                    date: date,
                    cash_box_id: this.cash_box.id
                }).then(data => {
                    if (data.success) {
                        this.t = ((this.r - data.obj.r) * 80 * 51 + (this.s - data.obj.s) * 80 * 46) || '-'


                    } else {
                        this.t = 0
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .date_filter_block{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        grid-gap: 1em;
        margin-bottom: 20px;
    }

    .table_standard h4{
        background-color: #dde1e8;
        padding: 5px;
        color: #000;
        font-weight: initial;
    }
    h4 span{
        font-weight: initial;
        font-style: italic;
    }
    .total_block{
        display: grid;
        grid-gap: 3em;
        grid-template-columns: 1fr 1fr 1fr;
        width: max-content;
    }
    .total_block div{
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: .5em;
        width: max-content;
    }
    .total_block h4{
        display: flex;
        grid-gap: .5em;
        width: max-content;
    }
.date{
    /*display: grid;*/
    align-items: flex-end;
    grid-gap: 1em;
    margin-bottom: 10px;
    grid-template-columns: 2fr 1fr;
}

.tr{
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
button{
  padding: 14px;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
}
.tbody{
    max-height: 450px;
    overflow: auto;
}
</style>