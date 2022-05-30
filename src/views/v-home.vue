<template>
    <div class="home">
        <h3 class="title">Ընդհանուր գործիքներ</h3>

        <v-cashier-change class="cashier_change"/>

        <v-create-cash-box class="create_cash_box"/>



        <div class="cash_box_block" v-for="cash_box in cash_boxes" :key="cash_box.id">
            <h1 class="station_title">{{cash_box.name}}</h1>

            <div class="create_block">
                <v-station-create :cash_box="cash_box"/>
            </div>

            <div class="station_blocks">
                <v-station-blocks :cash_box="cash_box"/>
            </div>
        </div>
    </div>
</template>

<script>
    import VStationBlocks from "@/components/station/v-station-blocks";
    import VCashierChange from "@/components/v-cashier-change";
    import VCreateCashBox from "@/components/cash_box/v-create-cash-box";
    import VStationCreate from "@/components/station/v-station-create";
    export default {
        name: "v-home",
        components: {VStationCreate, VCreateCashBox, VCashierChange, VStationBlocks},
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
    .home{
        position: relative;
    }
    .cash_box_block{
        margin-bottom: 40px;
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

    .create_block{
        display: flex;
        grid-gap: 2em;
    }
</style>