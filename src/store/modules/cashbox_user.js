import request from "./_request";

const cashbox_user = {
    namespaced: true,
    actions: {
        async GET_USERS_BY_CASH_BOX_ID(context, cash_box_id){
            const data = await request.actions.REQUEST(context, "/cash_box_user/users_by_cash_box_id/"+cash_box_id, "GET")
            return data
        },
        async CHANGE_CASHIER(context, cashier_id){
            const data = await request.actions.REQUEST(context, "/cash_box_user/request_change/"+cashier_id, "PUT")
            return data
        }
    }
}

export default cashbox_user