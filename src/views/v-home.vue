<template>
    <div class="home">
        <h3 class="title">Ընդհանուր գործիքներ</h3>

        <v-cashier-change class="cashier_change"/>
        <div class="station_blocks">
            <v-station-blocks />
        </div>
        <div class="table_block">
            <v-station-data-table/>
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
                stations: []
            }
        },
        mounted(){
            this.$store.dispatch("station/GET_STATION_IDS").then(data => {
                if(data.success)
                    data.obj.forEach(station_id => this.get_station_by_id(station_id))
            })
        },

        methods:{
            get_station_by_id(station_id){
                this.$store.dispatch("station/GET_STATION_BY_ID", station_id).then(data => {
                    if(data.success)
                        this.stations.push(data.obj)


                })
            }
        }
    }
</script>

<style scoped>
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