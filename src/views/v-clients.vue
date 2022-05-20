<template>
    <div class="clients">
        <h3 class="title">Հաճախորդներ</h3>

        <v-create-client  v-if="permissions.find(item => item.name === 'client_edit')"/>
        <v-clients-table  v-if="permissions.find(item => item.name === 'client_get')"/>
    </div>
</template>

<script>
    import VClientsTable from "@/components/clients/v-clients-table";
    import VCreateClient from "@/components/clients/v-create-client";
    import {mapState} from "vuex";
    export default {
        name: "v-clients",
        components: {VCreateClient, VClientsTable},
        computed: mapState({
            permissions: state => state.permission.permissions
        }),
    }
</script>

<style scoped>

</style>