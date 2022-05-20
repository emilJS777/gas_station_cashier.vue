import request from "./_request";

const user_role = {
    namespaced: true,
    actions: {
        async CREATE_BIND(context, body){
            const data = await request.actions.REQUEST(context, "/user_role", "POST", body)
            return data
        },
        async DELETE_BIND(context, body){
            const data = await request.actions.REQUEST(context, "/user_role", "DELETE", body)
            return data
        },
        async GET_ROLES_BY_USER_ID(context, user_id){
            const data = await request.actions.REQUEST(context, "/roles_by_user/"+user_id, "GET")
            return data
        }
    }
}

export default user_role