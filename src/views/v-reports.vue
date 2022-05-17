<template>
    <div class="reports">
        <h3 class="title">Զեկույցներ</h3>

        <div class="cash_box_block" v-for="cash_box in cash_boxes" :key="cash_box.id">
            <h1 class="station_title">{{cash_box.name}}</h1>

            <div class="create_block">
<!--                <v-create-expense/>-->
                <v-create-expense :cash_box="cash_box"/>
                <v-create-cash-box-data :cash_box="cash_box" :cash_box_data_id="this.cash_box_data_id"/>
            </div>

            <div class="table_block">
                <v-station-data-table :cash_box="cash_box" @cash_box_data_id="cashbox_data_id=>this.cash_box_data_id = cashbox_data_id"/>
            </div>

            <div class="table_block">
                <v-expense-table/>
            </div>
        </div>
    </div>
</template>

<script>
    import VStationDataTable from "@/components/station/v-station-data-table";
    import VCreateExpense from "@/components/expense/v-create-expense";
    import VExpenseTable from "@/components/expense/v-expense-table";
    import VCreateCashBoxData from "@/components/cash_box/v-create-cash-box-data";
    export default {
        name: "v-reports",
        components: {VCreateCashBoxData, VExpenseTable, VCreateExpense, VStationDataTable},
        data(){
            return{
                cash_boxes: [],
                cash_box_data_id: null
            }
        },
        mounted(){
            this.get_cash_box_ids()
        },
        methods:{
            get_cash_box_ids(){
                this.$store.dispatch("cash_box/GET_CASH_BOX_IDS").then(data => {
                    if(data.success)
                        data.obj.forEach(cash_box_id => {
                            this.get_cash_box_by_id(cash_box_id)
                        })
                })
            },
            get_cash_box_by_id(cash_box_id){
                this.$store.dispatch("cash_box/GET_CASH_BOX_BY_ID", cash_box_id).then(data => {
                    if(data.success)
                        this.cash_boxes.push(data.obj)

                    // SORT THE STATIONS BY NAME
                    this.cash_boxes.sort((a,b)=> (a.id > b.id ? -1 : 1))
                })
            }
        }
    }
</script>

<style scoped>
    .table_block{
        margin-top: 30px;
        margin-bottom: 40px;
    }
    .create_block{
        display: flex;
        grid-gap: 1em;
    }
</style>