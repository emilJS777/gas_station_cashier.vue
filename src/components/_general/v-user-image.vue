<template>
    <div class="img_block">
        <img v-if="imageB64" :src="'data:image/'+this.imageFormat+';charset=utf-8;base64, ' + imageB64" alt="">
        <img v-else src="@/assets/images/guest.jpg" alt="">
    </div>
</template>

<script>
    export default {
        props: ['user_id'],
        name: "v-user-image",
        data(){
           return{
               imageB64: null,
               imageFormat: null,
           }
        },
        mounted(){
           this.get_image()
        },
        methods: {
            get_image(){
                this.$store.dispatch("user_image/GET_USER_IMAGE", this.user_id).then(data => {
                    if(data.success){
                        console.log(data)
                        this.imageB64 = data.obj.b64
                        this.imageFormat = data.obj.format
                    }
                })
            }
        }
    }
</script>

<style scoped>
.img_block{
    background-color: #eeeeee;
}
</style>