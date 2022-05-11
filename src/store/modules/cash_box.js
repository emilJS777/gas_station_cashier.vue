import request from "./_request";

const cash_box= {
    namespaced: true,
    actions: {
        async GET_CASH_BOX_IDS(context){
            const data = await request.actions.REQUEST(context, "/cash_box", "GET")
            return data
        },
        async GET_CASH_BOX_BY_ID(context, cash_box_id){
            const data = await request.actions.REQUEST(context, "/cash_box/"+cash_box_id, "GET")
            return data
        }
    }
}

export default cash_box