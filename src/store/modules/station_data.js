import request from "./_request";

const station_data = {
    namespaced: true,
    actions: {
        async GET_STATION_DATA_IDS(context, payload){
            const data = await request.actions.REQUEST(context,
                "/station_data_by_cash_box_id?cash_box_id="+payload.cash_box_id+"&date="+payload.date,
                "GET")
            return data
        },
        async GET_STATION_DATA_BY_ID(context, station_data_id){
            const data = await request.actions.REQUEST(context, "/station_data/"+station_data_id, "GET")
            return data
        },
    }
}

export default station_data
