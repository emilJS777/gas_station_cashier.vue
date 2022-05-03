import request from "./_request";

const station = {
    namespaced: true,
    actions: {
        async GET_STATION_IDS(context){
            const data = await request.actions.REQUEST(context, "/station", "GET")
            return data
        },
        async GET_STATION_BY_ID(context, station_id){
            const data = await request.actions.REQUEST(context, "/station/"+station_id, "GET")
            return data
        },
    }
}

export default station