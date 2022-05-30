import request from "./_request";

const client = {
    namespaced: true,
    actions: {
        async CREATE_CLIENT(context, body){
            const data = await request.actions.REQUEST(context, "/client", "POST", body)
            return data
        },
        async UPDATE_CLIENT(context, params){
            const data = await request.actions.REQUEST(context, "/client/"+params.client_id, "PUT", params.body)
            return data
        },
        async DELETE_CLIENT(context, client_id){
            const data = await request.actions.REQUEST(context, "/client/"+client_id, "DELETE")
            return data
        },
        async GET_ALL_CLIENTS(context){
            const data = await request.actions.REQUEST(context, "/client?page=1&per_page=50", "GET")
            return data
        },
        async GET_CLIENT_BY_ID(context, client_id){
            const data = await request.actions.REQUEST(context, "/client/"+client_id, "GET")
            return data
        },
    }
}

export default client
