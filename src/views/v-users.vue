<template>
    <div class="users">
        <h3 class="title">Օգտատերեր</h3>
        <v-create-user/>
        <v-users-table/>
    </div>
</template>

<script>
    import VUsersTable from "@/components/users/v-users-table";
    import VCreateUser from "@/components/users/v-create-user";
    export default {
        name: "v-users",
        components: {VCreateUser, VUsersTable}
    }
</script>

<style scoped>

</style>