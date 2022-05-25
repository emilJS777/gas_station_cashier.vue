<template>
    <div class="auth">
        <v-user-image :user_id="profile.id"/>
        <div class="info_block">
            <h4>{{profile.first_name}} {{profile.last_name}}</h4>
            <span>{{profile.name}}</span>
        </div>
        

    </div>

    <div class="upload_image_block">
        <label for="file">
            <span v-if="!imageForm.imageFile">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                </svg>
                 ներբերնել լուսանկար
            </span>

            <input type="file" id="file" @change="changeImageFile" style="display: none" aria-label="Upload image">

            <button @click="create_image" v-if="imageForm.imageFile">ներբերնել</button>
        </label>


        <p>{{this.imageForm.msg}}</p>
    </div>

    <button class="logout" @click="this.logout" v-if="!profile.cashier">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
        </svg>
        դուրս գալ
    </button>
</template>

<script>
    import VUserImage from "@/components/_general/v-user-image";
    export default {
        name: "v-auth",
        components: {VUserImage},
        props: ["profile"],
        mounted(){
            this.$store.dispatch("permission/GET_ALL_PERMISSION")
        },
        data(){
            return{
                imageForm:{
                    msg: null,
                    imageFile: null,
                },
            }
        },
        methods: {
            logout(){
                this.$store.dispatch("auth/LOGOUT")
            },

            changeImageFile(e){
                let files = e.target.files || e.dataTransfer.files;

                if(files[0].type !== 'image/jpeg' && files[0].type !== 'image/jpg') {
                    this.imageForm.msg = 'invalid image format'
                    this.imageForm.imageFile = null
                }
                else {
                    this.imageForm.imageFile = files[0];
                    this.imageForm.msg = null
                }
            },

            create_image(){
                if(!this.imageForm.imageFile)
                    this.imageForm.msg = 'file img not found'
                else{
                    let fd= new FormData()
                    fd.append('image', this.imageForm.imageFile)
                    this.$store.dispatch("user_image/CREATE_USER_IMAGE", fd).then(data=>{
                        if(data.success)
                            location.reload()
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .auth{
        display: grid;
        align-items: center;
        grid-gap: 1em;
        grid-template-columns: 1fr 6fr;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 50px;
        padding-bottom: 30px;
        border-bottom: 1px solid #999;
    }
    .img{
        border-radius: 50%;
        background-color: #fff;
        position: relative;
        width: 50px;
        height: 50px;
        overflow: hidden;
    }
    .img > svg{
        position: absolute;
        color: #374c98;
        left: 50%;
        right: 50%;
        top: 50%;
        bottom: 50%;
        transform: translate(-50%, -50%);
    }

    .logout{
        position: absolute;
        bottom: 0;
        padding: 15px;
        color: #fff;
        border: 0;
        background-color: initial;
        display: flex;
        align-items: center;
        grid-gap: 1em;
        font-size: 18px;
        cursor: pointer;
        border-top: 1px solid #999;
        width: 100%;
    }
    .upload_image_block{
        width: max-content;
        margin-left: 40px;
        margin-top: -15px;
        padding-left: 0px;
        /*margin: -13px auto;*/
    }
    .upload_image_block button, .upload_image_block span{
        background-color: #374c98;
        color: #fff;
        outline: 0;
        border: 0;
        cursor: pointer;
        display: flex;
        grid-gap: .8em;
        /*margin-top: -12px;*/
        padding: 8px;
        font-size: 12px;
    }
</style>