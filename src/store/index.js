import Vuex from "vuex";

// MODULES
import request from "./modules/_request";
import auth from "./modules/auth";
import station from "./modules/station"
import station_data from "./modules/station_data"
import socket from "./modules/socket"


export default new Vuex.Store({
    namespaced: true,
    modules: {
        request,
        auth,
        station,
        station_data,
        socket,
    }
})
