<template>
    <div class="msg-modal">
        <div class="content">
            <div class="head">
                <h4 v-if="this.msg.success" class="msg-success">Ձեր հարցումը հաջողությամբ ստացվել է</h4>
                <h4 v-if="!this.msg.success" class="msg-err">Ձեր հարցումը մերժվել է</h4>
            </div>
            <div class="body">
                <i>{{this.msg.value}}</i>
            </div>

            <span @click="this.close_modal">&#x2715;</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-msg-modal",
        props: ['msg'],
        mounted(){
            setInterval(() => {
                this.close_modal()
            } ,5000)
        },
        methods:{
            close_modal(){
                this.$emit('close_modal')
            }
        }
    }
</script>

<style scoped>
    .msg-modal{
        position: fixed;
        width: 100vw;
        left: 0;
        right: 0;
        top: 0;
        animation-duration: 5s;
        animation-name: close-modal;
    }
    @keyframes close-modal {
        0%{
            opacity: 1;
        }
        50%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    .content{
        background-color: #fff;
        padding: 30px;
        position: relative;
        top: 20px;
        left: 50%;
        right: 50%;
        width: max-content;
        transform: translateX(-50%);
        -webkit-box-shadow: 0px 0px 15px -2px rgba(0,0,0,0.27);
        box-shadow: 0px 0px 15px -2px rgba(0,0,0,0.27);
        animation-duration: .4s;
        animation-name: msg-modal-show;
    }
    @keyframes msg-modal-show {
        from{
            top: 0;
            opacity: 0;
        }
        to{
            top: 20px;
            opacity: 1;
        }
    }
    .msg-success{
        color: #185278;
    }
    .msg-err{
        color: #9e003b;
    }
    .head{
        border-bottom: 1px solid #cbcbcb;
        padding-bottom: 10px;
    }
    .body{
        padding-top: 10px;
    }
    span{
        position: absolute;
        right: -10px;
        top: -10px;
        padding: 5px;
        cursor: pointer;
        font-size: 20px;
        background-color: #fff;
        border-radius: 50%;
        border: 1px solid #ccc;
        line-height: 1;
    }
</style>