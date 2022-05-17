import request from "./_request";

const station = {
    namespaced: true,
    actions: {
        async GET_USERS(context){
            const data = await request.actions.REQUEST(context, "/user", "GET")
            return data
        },
        async GET_USER_BY_ID(context, user_id){
            const data = await request.actions.REQUEST(context, "/user/"+user_id, "GET")
            return data
        },
        async CREATE_USER_TICKET(context, body){
            const data = await request.actions.REQUEST(context, "/user/ticket", "POST", body)
            return data
        },
        async CREATE_USER(context, body){
            const data = await request.actions.REQUEST(context, "/user", "POST", body)
            return data
        },
    }
}

export default station