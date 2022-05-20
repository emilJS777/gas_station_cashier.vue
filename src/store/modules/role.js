import request from "./_request";

const role = {
    namespaced: true,
    actions: {
        async GET_ROLE_BY_ID(context, role_id){
            const data = await request.actions.REQUEST(context, "/role/"+role_id, "GET")
            return data
        },
        async GET_ROLES(context){
            const data = await request.actions.REQUEST(context, "/role", "GET")
            return data
        },
        async CREATE_ROLE(context, body){
            const data = await request.actions.REQUEST(context, "/role", "POST", body)
            return data
        },
        async UPDATE_ROLE(context, params){
            const data = await request.actions.REQUEST(context, "/role/"+params.role_id, "PUT", params.body)
            return data
        },
        async DELETE_ROLE(context, role_id){
            const data = await request.actions.REQUEST(context, "/role/"+role_id, "DELETE")
            return data
        },
    }
}

export default role
