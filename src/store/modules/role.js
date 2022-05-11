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
    }
}

export default role
