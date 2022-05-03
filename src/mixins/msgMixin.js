
const msgMixin = {
    data(){
        return{
            msg:{
                success: null,
                value: '',
            }
        }
    },
    methods:{
        set_msg(success, value){
            this.msg.success = success;
            this.msg.value = value;
        }
    }
}
export default msgMixin