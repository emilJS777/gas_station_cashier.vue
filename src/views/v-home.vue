<template>
    <div class="home">
        <h3 class="title">Ընդհանուր գործիքներ</h3>

        <v-cashier-change class="cashier_change"/>

        <div class="cash_box_block" v-for="cash_box in cash_boxes" :key="cash_box.id">
            <h1>{{cash_box.name}}</h1>

            <div class="station_blocks">
                <v-station-blocks :cash_box="cash_box"/>
            </div>
            <div class="table_block">
                <v-station-data-table :cash_box="cash_box"/>
            </div>
        </div>
    </div>
</template>

<script>
    import VStationBlocks from "@/components/station/v-station-blocks";
    import VStationDataTable from "@/components/station/v-station-data-table";
    import VCashierChange from "@/components/v-cashier-change";
    export default {
        name: "v-home",
        components: {VCashierChange, VStationDataTable, VStationBlocks},
        props: ['profile'],
        data(){
            return{
                cash_boxes: []
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
    .cash_box_block{
        margin-bottom: 40px;
    }
    h1{
        margin-bottom: 40px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        opacity: .6;
    }
    .cashier_change{
        position: absolute;
        top: 20px;
        right: 50px;
    }
    .station_blocks{
        display: grid;
        align-items: center;
        grid-gap: 2em;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    .table_block{
        margin-top: 80px;
    }
</style>