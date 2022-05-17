import request from "./_request";

const station = {
    namespaced: true,
    actions: {
        async GET_STATION_IDS(context, cash_box_id){
            const data = await request.actions.REQUEST(context, "/station?cash_box_id="+cash_box_id, "GET")
            return data
        },
        async GET_STATION_BY_ID(context, station_id){
            const data = await request.actions.REQUEST(context, "/station/"+station_id, "GET")
            return data
        },
        async CREATE_STATION(context, body){
            const data = await request.actions.REQUEST(context, "/station", "POST", body)
            return data
        },
    }
}

export default station