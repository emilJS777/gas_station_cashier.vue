import Vuex from "vuex";

// MODULES
import request from "./modules/_request";
import auth from "./modules/auth";
import station from "./modules/station"
import station_data from "./modules/station_data"
import socket from "./modules/socket"
import cashbox_user from "./modules/cashbox_user";
import cash_box from "./modules/cash_box";
import user from "./modules/user"
import user_role from "./modules/user_role";
import role from "./modules/role"
import permission from "./modules/permission"
import role_permission from "./modules/role_permission";
import expense from "./modules/expense";
import cash_box_data from "./modules/cash_box_data";
import client from "./modules/client"
import client_user from "./modules/client_user";
import user_image from "./modules/user_image";

export default new Vuex.Store({
    namespaced: true,
    modules: {
        request,
        auth,
        station,
        station_data,
        socket,
        cashbox_user,
        cash_box,
        user,
        user_role,
        role,
        permission,
        role_permission,
        expense,
        cash_box_data,
        client,
        client_user,
        user_image
    }
})
