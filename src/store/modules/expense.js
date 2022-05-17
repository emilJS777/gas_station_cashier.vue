import request from "./_request";

const expense = {
    namespaced: true,
    actions: {
        async CREATE_EXPENSE(context, body){
            const data = await request.actions.REQUEST(context, "/expense", "POST", body)
            return data
        },
        async GET_ALL_EXPENSES(context, date){
            const data = await request.actions.REQUEST(context, "/expense?date="+date, "GET")
            return data
        }
    }
}

export default expense