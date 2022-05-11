<template>
    <div class="date">
        <h4>ընդհանուր: {{this.total_data}}</h4>
        <datepicker v-model="this.picked"  placeholder="asdasd"/>
        <button @click="get_station_data_ids">search</button>
    </div>

    <div class="table_standard">
        <div class="thead">
            <div class="tr">
                <div class="th">քաշը</div>
                <div class="th">ճնշում</div>
                <div class="th">ջերմաստիճանը</div>
                <div class="th">գինը</div>
                <div class="th">ստեղծման օր</div>
            </div>
        </div>
        <div class="tbody">
            <div class="tr" v-for="station_data in this.station_data" :key="station_data.id">
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

</template>

<script>
    // import Datepicker from 'vue3-datepicker';
    import Datepicker from 'vuejs3-datepicker';
    export default {
        name: "v-station-data-table",
        components: {Datepicker},
        props: ['cash_box'],
        data(){
            return{
                total_data: 0,
                station_data: [],
                picked: new Date()
            }
        },
        mounted(){
            this.get_station_data_ids()

        },
        methods:{
            get_station_data_ids(){
                this.station_data = []
                this.total_data = 0

                const date = this.picked.toISOString().split('T')[0]

                this.$store.dispatch("station_data/GET_STATION_DATA_IDS", {date: date, cash_box_id: this.cash_box.id}).then(data => {
                    if(data.success)
                        data.obj.forEach(station_data_id => this.get_station_data_by_id(station_data_id))
                })
            },
            get_station_data_by_id(station_data_id){
                this.$store.dispatch("station_data/GET_STATION_DATA_BY_ID", station_data_id).then(data => {
                    if(data.success) {
                        data.obj.creation_date = new Date(data.obj.creation_date).toISOString().split('T')[0]
                        this.station_data.push(data.obj)
                        this.total_data += parseFloat(data.obj.price)
                    }
                    // SORT THE STATIONS BY NAME
                    this.station_data.sort((a,b)=> (a.id > b.id ? -1 : 1))
                })
            }
        }
    }
</script>

<style scoped>
.date{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-gap: 1em;
    margin-bottom: 10px;
}

.tr{
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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