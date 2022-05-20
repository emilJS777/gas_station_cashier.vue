<template>
    <div class="reports">
        <h3 class="title">Զեկույցներ</h3>

        <div class="cash_box_block" v-for="cash_box in cash_boxes" :key="cash_box.id">
            <h1 class="station_title"  @click="()=>cash_box.show = !cash_box.show">{{cash_box.name}}
                <span v-bind:class="cash_box.show ? 'toggle arrow_top' : 'toggle'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </span>
            </h1>

            <div v-if="cash_box.show" class="report_block">
                <div class="create_block" >
                    <!--                <v-create-expense/>-->
                    <v-create-expense :cash_box="cash_box"/>
                    <v-create-cash-box-data :cash_box="cash_box" :cash_box_data_id="this.cash_box_data_id"/>
                </div>

                <div class="table_block">
                    <v-station-data-table :cash_box="cash_box"/>
                </div>

                <div class="table_block">
                    <v-expense-table/>
                </div>
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
                    if(data.success) {
                        data.obj.show = false
                        this.cash_boxes.push(data.obj)
                    }
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
    .toggle{
        width: max-content;
        height: max-content;
        float: right;
        transition: .3s;
    }
    .arrow_top{
        transform: rotate(-180deg);
        margin-top: 5px;
    }
    .cash_box_block{
        margin-top: 20px;
    }
    .report_block *{
        animation-name: anim-toggle;
        animation-duration: .3s;
    }

</style>