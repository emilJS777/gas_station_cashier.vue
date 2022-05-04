<template>
    <div class="home">
        <h3 class="title">Ընդհանուր գործիքներ</h3>
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
    export default {
        name: "v-home",
        components: {VStationDataTable, VStationBlocks},
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