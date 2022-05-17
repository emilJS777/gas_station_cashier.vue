import request from "./_request";

const cash_box_data = {
    namespaced: true,
    actions: {
        async CREATE_CASH_BOX_DATA(context, form){
            const data = await request.actions.REQUEST(context, "/cash_box_data", "POST", form)
            return data
        },
        async GET_BY_DATE(context, params){
            const data = await request.actions.REQUEST(context, "/cash_box_data?cash_box_id="+params.cash_box_id+"&date="+params.date, "GET")
            return data
        },
    }
}

export default cash_box_data