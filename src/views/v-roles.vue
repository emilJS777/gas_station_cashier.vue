<template>
    <div class="roles">
        <h3 class="title"> Դերեր </h3>

        <v-create-role/>

        <v-role-table/>
    </div>
</template>

<script>
    import VCreateRole from "@/components/roles/v-create-role";
    import VRoleTable from "@/components/roles/v-role-table";
    export default {
        name: "v-roles",
        components: {VRoleTable, VCreateRole}
    }
</script>

<style scoped>
.roles{
    position: relative;
}
</style>