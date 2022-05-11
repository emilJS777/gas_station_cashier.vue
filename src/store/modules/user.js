import request from "./_request";

const station = {
    namespaced: true,
    actions: {
        async GET_USERS(context){
            const data = await request.actions.REQUEST(context, "/user", "GET")
            return data
        },
        async CREATE_USER_TICKET(context, body){
            const data = await request.actions.REQUEST(context, "/user/ticket", "POST", body)
            return data
        }
    }
}

export default station