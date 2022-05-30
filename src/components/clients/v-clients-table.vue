<template>
    <div class="table_standard">
        <div class="thead">
            <div class="tr">
                <div class="th">Անուն</div>
                <div class="th">Նկարագրություն</div>
                <div class="th">ստեղծման օր</div>
            </div>
        </div>
        <div class="tbody">
            <div class="tr" v-for="client in clients" :key="client.id">
                <div class="td">{{client.name}}</div>
                <div class="td">{{client.description}}</div>
                <div class="td">{{client.creation_date}}</div>


                                                <div class="menu" v-if="permissions.find(item => item.name === 'client_edit')">
                                                    <ul>
                                                        <li>
                                                            <a :href="'/clients?client_id='+client.id">
                                                                <img src="@/assets/icons/edit.png" alt="">
                                                                Խմբագրել
                                                            </a>
                                                        </li>
                <!--                                        <li>-->
                <!--                                            <a href="#">-->
                <!--                                                <img src="@/assets/icons/delete.png" alt="">-->
                <!--                                                Հեռացնել-->
                <!--                                            </a>-->
                <!--                                        </li>-->
                                                    </ul>
                                                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "v-clients-table",
        computed: mapState({
            permissions: state => state.permission.permissions
        }),
        data(){
            return{
                clients: []
            }
        },
        mounted(){
            this.get_clients()
        },
        methods: {
            get_clients(){
                this.$store.dispatch("client/GET_ALL_CLIENTS").then(data => {
                    if(data.success)
                        this.clients = data.obj.items
                })
            }
        }
    }
</script>

<style scoped>
.tr{
    grid-template-columns: 1fr 1fr 1fr .1fr;
}
</style>