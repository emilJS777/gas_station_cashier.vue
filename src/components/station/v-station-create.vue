<template>
    <div class="mini_create" v-if="permissions.find(item => item.name === 'station_edit')">
        <div class="btn_block" v-if="!station_setting">
            <button class="btn_standard white_btn btn_icon" @click="station_setting_toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-motherboard" viewBox="0 0 16 16">
                    <path d="M11.5 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5Zm2 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5Zm-10 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Zm0 2a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6ZM5 3a1 1 0 0 0-1 1h-.5a.5.5 0 0 0 0 1H4v1h-.5a.5.5 0 0 0 0 1H4a1 1 0 0 0 1 1v.5a.5.5 0 0 0 1 0V8h1v.5a.5.5 0 0 0 1 0V8a1 1 0 0 0 1-1h.5a.5.5 0 0 0 0-1H9V5h.5a.5.5 0 0 0 0-1H9a1 1 0 0 0-1-1v-.5a.5.5 0 0 0-1 0V3H6v-.5a.5.5 0 0 0-1 0V3Zm0 1h3v3H5V4Zm6.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2Z"/>
                    <path d="M1 2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-2H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 9H1V8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6H1V5H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 2H1Zm1 11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11Z"/>
                </svg>
                <span v-if="!station_setting">ավելացնել սարք</span>
                <span v-else>չեղարկել</span>
            </button>
        </div>

        <div class="mini_form" v-if="station_setting">

            <span class="close" @click="station_setting_toggle">&#x2715;</span>

            <div class="form_standard">
                <label for="key">սարքի ID</label>
                <input type="text" placeholder="***" id="key" v-model="station_form.key">
            </div>

            <div class="form_standard">
                <label for="name">սարքի անունը</label>
                <input type="text" placeholder="***" id="name" v-model="station_form.name">
            </div>

            <div class="form_standard">
                <label for="description">սարքի նկարագրությունը</label>
                <input type="text" placeholder="***" id="description" v-model="station_form.description">
            </div>

            <div class="btn_block">
                <button class="btn_standard" @click="station_create">ստեղծել</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "v-station-create",
        props: ['cash_box'],
        computed: mapState({
          permissions: state => state.auth.profile.permissions
        }),
        data(){
            return{
                station_setting: false,
                station_form: {
                    key: null,
                    name: null,
                    description: null,
                    cash_box_id: this.cash_box.id
                }
            }
        },
        // mounted(){
        //     this.station_form.cash_box_id = this.cash_box.id
        // }
        methods: {
            station_setting_toggle(){
                this.station_setting = !this.station_setting
            },
            station_create(){
                this.$store.dispatch("station/CREATE_STATION", this.station_form).then(data => {
                    if(data.success)
                        window.location.reload()
                    this.emitter.emit("msg-modal", data);
                })
            }
        }
    }
</script>

<style scoped>
    .mini_create{
        margin-bottom: 20px;
    }
    .mini_form{
        width: max-content;
        position: relative;
        animation-duration: .3s;
        animation-name: anim-toggle;
    }

    .close{
        position: absolute;
        right: -5px;
        top: -20px;
        padding: 5px;
        cursor: pointer;
        font-size: 22px;
    }
    .mini_form > .btn_block{
        margin-top: 40px;
    }
.form_standard{
    margin-top: 30px;
}
</style>