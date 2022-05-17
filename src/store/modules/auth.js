import request from "./_request";
import store from ".."

const auth = {
    namespaced: true,
    actions: {
        async LOGIN(context, form){
            const data = await request.actions.REQUEST(context, "/login", "POST", form, false)
            if(data.success)
                store.commit("request/SET_TOKENS", {access_token: data.obj.access_token, refresh_token: data.obj.refresh_token})
            return data
        },
        async GET_PROFILE(context){
            const data = await request.actions.REQUEST(context, "/profile", "GET")

            if(data.success)
                context.commit("SET_PROFILE", data.obj)
            else
                context.commit("SET_PROFILE", null)
            return data
        },
        LOGOUT(){
            store.commit("request/SET_TOKENS", {access_token: null, refresh_token: null})
            window.location.reload()
        }
    },
    mutations: {
        SET_PROFILE(state, payload){
            state.profile = payload
        }
    },
    state: {
        profile: null
    },
    getters: {
        GET_PROFILE: (state) => state.profile
    }
}

export default auth