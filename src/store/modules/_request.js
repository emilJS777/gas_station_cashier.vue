import Axios from "axios";
import store from "@/store";

const api_url = "http://localhost:5001/api"
// const api_url = "http://37.252.64.153:5001/api"
// const api_url = "http://192.168.0.10:5001/api"
// const api_url ="http://192.168.31.116:5001/api"

const REFRESH = (payload) => {
    return Axios({
        url: api_url+'/refresh',
        method: "PUT",
        headers: {"Authorization": "Bearer " + localStorage.getItem("refresh")}
    }).then(data => {
        store.commit("request/SET_TOKENS", data.data.obj)
        return store.dispatch("request/REQUEST", payload)
    }).catch(err => {
        if(err.response.status === 422 || err.response.status === 401)
            store.commit("auth/SET_PROFILE", null)
        return err
    })
}

const request = {
    namespaced: true,
    actions: {
        REQUEST(context, path, method, body, access=true){
            return Axios({
                url: api_url+path,
                method: method,
                data: body || {},
                headers: access ? {"Authorization": "Bearer " + localStorage.getItem("access")} : {}
            }).then(data => data.data).catch(err => {
                if(err.response.status === 401 && access || err.response.status === 422 && access)
                    return REFRESH({path, method, body})
                return err.response.data
            })
        },

    },
    mutations: {
        SET_TOKENS(context, payload){
            localStorage.setItem("access", payload.access_token)
            localStorage.setItem("refresh", payload.refresh_token)
        }
    }
}


export default request