<template>
    <div class="table_standard">
        <div class="thead">
            <div class="tr">
                <div class="th">քաշը</div>
                <div class="th">ճնշում</div>
                <div class="th">ջերմաստիճանը</div>
                <div class="th">գինը</div>
                <div class="th">ստեղծման օր</div>
                <div class="th"></div>
            </div>
        </div>
        <div class="tbody">
            <div class="tr" v-for="station_data in this.station_data" :key="station_data.id">
                <div class="td">{{station_data.weight}}</div>
                <div class="td">{{station_data.pressure}}</div>
                <div class="td">{{station_data.temperature}}</div>
                <div class="td">{{station_data.price}}</div>
                <div class="td">{{station_data.creation_date}}</div>


                <div class="menu">
                    <ul>
                        <li>
                            <router-link :to="'/home'">
                                <img src="@/assets/icons/edit.png" alt="">
                                Խմբագրել
                            </router-link>
                        </li>
                        <li>
                            <a href="#">
                                <img src="@/assets/icons/delete.png" alt="">
                                Հեռացնել
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-station-data-table",
        data(){
            return{
                station_data: []
            }
        },
        mounted(){
            this.get_station_data_ids()
        },
        methods:{
            get_station_data_ids(){
                this.$store.dispatch("station_data/GET_STATION_DATA_IDS").then(data => {
                    if(data.success)
                        data.obj.forEach(station_data_id => this.get_station_data_by_id(station_data_id))
                })
            },
            get_station_data_by_id(station_data_id){
                this.$store.dispatch("station_data/GET_STATION_DATA_BY_ID", station_data_id).then(data => {
                    if(data.success)
                        this.station_data.push(data.obj)
                })
            }
        }
    }
</script>

<style scoped>
.tr{
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr .1fr;
}
</style>