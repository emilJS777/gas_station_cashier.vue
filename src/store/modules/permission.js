import request from "./_request";

const permission = {
    namespaced: true,
    actions: {
        async GET_ALL_PERMISSION(context){
            const data = await request.actions.REQUEST(context, "/permission/all", "GET")
            if(data.success)
                context.commit("SET_PERMISSIONS", data.obj)
            return data
        }
    },
    mutations:{
       SET_PERMISSIONS(state, payload){
           state.permissions = payload
       }
    },
    state: {
        permissions: []
    }
}

export default permission