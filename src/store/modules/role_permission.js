import request from "./_request";

const role_permission = {
    namespaced: true,
    actions: {
        async CREATE_BIND(context, body){
            const data = await request.actions.REQUEST(context, "/role_permission", "POST", body)
            return data
        },
        async DELETE_BIND(context, body){
            const data = await request.actions.REQUEST(context, "/role_permission", "DELETE", body)
            return data
        },
        async GET_PERMISSIONS_BY_ROLE_ID(context, role_id){
            const data = await request.actions.REQUEST(context, "/permissions_by_role/"+role_id, "GET")
            return data
        }
    }
}

export default role_permission