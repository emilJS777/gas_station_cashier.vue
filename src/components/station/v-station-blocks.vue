<template>
    <div class="station_block" v-for="station in this.stations" :key="station.id">
        <span>{{station.name}}</span>
        <img v-bind:class="station.data ? 'active' : ''" src="@/assets/icons/station.png" alt="">
        <div><p>քաշը </p><span>{{station.data ? station.data.weight : 0.00}}</span></div>

        <div><p>ճնշում </p><span>{{station.data ? station.data.pressure : 0.00}}</span></div>

        <div><p>ջերմաստիճանը </p><span>{{station.data ? station.data.temperature : 0.00}}</span></div>

        <div><p>գինը </p><span>{{station.data ? station.data.price : 0.00}}</span></div>

        <button v-if="station.data" @click="this.clearData(station.id)">Cancel</button>
    </div>
</template>

<script>
    export default {
        name: "v-station-block",
        data(){
            return{
                stations: []
            }
        },
        mounted(){
            this.get_station_ids()
        },
        // GET STATION DATA BY SOCKET
        created(){
            this.sockets.subscribe('stationData', (data) => {
                console.log(data)
                this.stations.forEach(station => {
                    station.id === data.station_id ? station.data = data : ''
                })
            });
        },
        methods:{
            // STATIONS GET
            get_station_ids(){
                this.$store.dispatch("station/GET_STATION_IDS").then(data => {
                    if(data.success)
                        data.obj.forEach(station_id => this.get_station_by_id(station_id))
                })
            },
            get_station_by_id(station_id){
                this.$store.dispatch("station/GET_STATION_BY_ID", station_id).then(data => {
                    if(data.success)
                        this.stations.push(data.obj)

                    // SORT THE STATIONS BY NAME
                    this.stations.sort((a,b)=> (a.name > b.name ? 1 : -1))
                })
            },

            // STATION DATA CLEAR
            clearData(station_id){
                this.stations.find(station => station_id === station.id ? station.data = null : '')
            }

        }
    }
</script>

<style scoped>
    .station_block{
        background-color: #F5F7FA;
        border-radius: 8px;
        display: block;
        width: 240px;
        padding-top: 28px;
        padding-bottom: 48px;
        color: #999;
        position: relative;
    }
    .station_block > span{
        position: absolute;
        top: -20px;
        left: 0;
        color: #374C98;
        background-color: inherit;
        padding: 13px;
        border-radius: 8px;
    }
    .station_block > *{
        display: block;
        margin: 0 auto;
    }
    .station_block > img{
        margin-bottom: 19px;
        width: 100px;
        opacity: .3;
    }
    .station_block > img.active{
        animation: station-active 1s infinite;
    }
    @keyframes station-active {
        from{
            opacity: .6;
        }
        to{
            opacity: .2;
        }
    }
    p{
        padding-left: 15px;
        padding-right: 15px;
        line-height: 2.5;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .station_block > div{
        display: flex;
        align-items: center;
        position: relative;
    }
    .station_block > div span{
        position: absolute;
        right: 10px;

    }
    .station_block div:nth-child(odd){
        background-color: #eaeaea;
    }
    span{
        font-weight: bold;
        font-size: 18px;
    }
    button{
        position: absolute;
        bottom: -15px;
        left: 50%;
        right: 50%;
        transform: translateX(-50%);
        width: max-content;
        line-height: 2;
        padding: 5px 15px;
        cursor: pointer;
        background-color: #718cee;
        border: 0;
        color: #fff;
        font-size: 15px;
    }
    button:active{
        background-color: #2c50d4;
    }
</style>