import request from "./_request";

const user_role = {
    namespaced: true,
    actions: {
        async CREATE_BIND(context, body){
            const data = await request.actions.REQUEST(context, "/user_role", "POST", body)
            return data
        },
        async GET_ROLE_IDS_BY_USER_ID(context, user_id){
            const data = await request.actions.REQUEST(context, "/roles_by_user/"+user_id, "GET")
            return data
        }
    }
}

export default user_role