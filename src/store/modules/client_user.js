import request from "./_request";

const client_user = {
    namespaced: true,
    actions: {
        async CREATE_BIND(context, body){
            const data = await request.actions.REQUEST(context, "/client_user", "POST", body)
            return data
        }
    }
}

export default client_user