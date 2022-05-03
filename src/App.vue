<template>
  <div class="view" v-bind:class="this.profile ? 'auth' : 'guest'">

    <v-msg-modal :msg="this.msg" v-if="this.msg.value" @close_modal="this.set_msg(null, '')"/>


    <v-sidebar v-if="profile" :profile="profile"/>

    <router-view></router-view>
  </div>
</template>

<script>
import VSidebar from "@/components/_general/sidebar/v-sidebar";
import {mapState} from "vuex"
import VMsgModal from "@/components/_general/v-msg-modal";
import msgMixin from "@/mixins/msgMixin";
export default {
  name: 'App',
  mixins: [msgMixin],
  components: {
    VMsgModal,
    VSidebar
  },
  computed: mapState({
    profile: state => state.auth.profile
  }),
  mounted(){
    this.emitter.on("msg-modal", data => {
      this.set_msg(data.success, data.obj.msg)
    });
  }
}
</script>

<style src="@/assets/styles/main.css">


</style>
