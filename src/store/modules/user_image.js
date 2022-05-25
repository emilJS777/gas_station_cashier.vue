import request from "./_request";

const user_image = {
    namespaced: true,
    actions: {
        async CREATE_USER_IMAGE(context, formData){
            const data = await request.actions.REQUEST(context, "/user_image", "POST", formData)
            return data
        },
        async GET_USER_IMAGE(context, user_id){
            const data = await request.actions.REQUEST(context, "/user_image/"+user_id, "GET")
            return data
        },
        async DELETE_USER_IMAGE(context){
            const data = await request.actions.REQUEST(context, "/user_image", "DELETE")
            return data
        }
    }
}

export default user_image