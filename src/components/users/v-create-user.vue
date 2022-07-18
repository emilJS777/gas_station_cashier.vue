<template>
    <div class="create_user_block" v-if="permissions.find(item => item.name === 'user_edit')">
        <div class="user_setting">
            <div class="form_standard" v-if="user_setting">
                <label>Անուն</label>
                <input type="text" placeholder="***" v-model="user_form.first_name"/>
            </div>
            <div class="form_standard" v-if="user_setting">
              <label>El Hasce</label>
              <input type="text" placeholder="***" v-model="user_form.email_address"/>
            </div>
            <div class="form_standard" v-if="user_setting">
                <label>Ազգանուն</label>
                <input type="text" placeholder="***" v-model="user_form.last_name"/>
            </div>
            <div class="form_standard" v-if="user_setting">
                <label>Դեր</label>
                <select class="select_standard" v-model="user_form.role_id">
                    <option :value="null" selected>ընտրեք դերը</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">
                        {{role.name}}
                    </option>
                </select>
            </div>

            <div class="form_standard" v-if="user_setting && permissions.find(item => item.name === 'client_edit') && clients.length > 0 && !this.$route.query.user_id">
                <label>Հաճախորդ</label>
                <select class="select_standard" v-model="selected_client_id">
                    <option :value="null" selected>հիմնական</option>
                    <option v-for="client in clients" :key="client.id" :value="client.id">
                        {{client.name}}
                    </option>
                </select>
            </div>

            <div class="form_standard" v-if="user_setting && !selected_client_id">
                <label>Գազալցակայան</label>
                <div class="check_box_block"  v-if="!profile.cash_box_id">
                    <label :for="0">null</label>
                    <input type="radio" name="cash_box" :id="0" :checked="!profile.cash_box_id ? true : ''" v-model="user_form.cash_box_id" :value="null" />
                </div>

                <div class="check_box_block"  v-for="cash_box in cash_boxes" :key="cash_box.id" >
                    <label :for="cash_box.id">{{cash_box.name}}</label>
                    <input type="radio" name="cash_box" :id="cash_box.id" v-model="user_form.cash_box_id"
                           :value="cash_box.id" :checked="profile.cash_box_id === cash_box.id ? true : false || user_form.cash_box_id === cash_box.id ? true : false">
                </div>
                <div class="check_box_block cashier" v-if="user_form.cash_box_id || profile.cash_box_id">
                    <label for="cashier">cashier</label>
                    <input type="checkbox" name="cashier" id="cashier"  :value="true" v-model="user_form.cashier">
                </div>
            </div>
        </div>
        <div class="btn_block">
            <button class="btn_standard white_btn" v-if="user_setting"  @click="()=>{this.$route.query.user_id ? update_user() : create_user_ticket()}">
                <span v-if="this.$route.query.user_id">Թարմացնել օգտվողին</span>
                <span v-else>Ստեղծել օգտատեր</span>
            </button>

            <button class="btn_standard red_btn" @click="delete_user" v-if="user_setting && this.$route.query.user_id">
                Ջնջել օգտվողին
            </button>

            <button class="btn_standard" @click="toggle_setting">
                {{this.user_setting ? 'Չեղարկել' : 'Ստեղծել օգտատեր'}}
            </button>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    export default {
      name: "v-create-user",
      computed: mapState({
        permissions: state => state.auth.profile.permissions,
        profile: state => state.auth.profile
      }),
      data() {
        return {
          user_setting: false,
          cash_boxes: [],
          roles: [],
          clients: [],
          selected_client_id: null,
          user_form: {
            first_name: null,
            last_name: null,
            email_address: null,
            cash_box_id: null,
            role_id: null,
            cashier: false
          },
          selected_role_id: null
        }
      },
      mounted() {
        this.get_cash_box_ids()
        this.get_roles()


        if (this.$route.query.user_id) {
          this.get_user_by_id()
          this.user_setting = true
        }
        this.get_clients()


      },
      methods: {
        get_clients() {
          this.$store.dispatch("client/GET_ALL_CLIENTS").then(data => {
            if (data.success)
              this.clients = data.obj
          })
        },
        client_user_bind(user_id) {
          this.$store.dispatch("client_user/CREATE_BIND", {client_id: this.selected_client_id, user_id: user_id})
        },
        get_cash_box_ids() {
          this.$store.dispatch("cash_box/GET_CASH_BOX_IDS").then(data => {
            if (data.success)
              data.obj.forEach(cash_box_id => this.get_cash_box_by_id(cash_box_id))
          })
        },
        get_cash_box_by_id(cash_box_id) {
          this.$store.dispatch("cash_box/GET_CASH_BOX_BY_ID", cash_box_id).then(data => {
            if (data.success)
              this.cash_boxes.push(data.obj)
          })
        },
        get_roles() {
          this.$store.dispatch("role/GET_ROLES").then(data => {
            if (data.success)
              this.roles = data.obj
          })
        },
        user_role_bind(user_id) {
          this.$store.dispatch("user_role/CREATE_BIND", {
            user_id: user_id,
            role_id: this.selected_role_id
          }).then(data => {
            console.log(data)
          })
        },
        get_user_by_id() {
          this.$store.dispatch("user/GET_USER_BY_ID", this.$route.query.user_id).then(data => {
            if (data.success) {
              this.user_form.first_name = data.obj.first_name
              this.user_form.last_name = data.obj.last_name
              this.user_form.cashier = data.obj.cashier
              this.user_form.cash_box_id = data.obj.cash_box_id
              this.user_form.email_address = data.obj.email_address
            }
          })
        },
        //    USER CREATE
        create_user_ticket() {
          this.$store.dispatch("user/CREATE_USER_TICKET", this.user_form).then(data => {
            if (data.success) {
              this.user_role_bind(data.obj.id)

              data.obj.msg = data.obj.ticket

              if (this.selected_client_id)
                this.client_user_bind(data.obj.id)

              this.toggle_setting()
              console.log(this.user_form.role_id)
            }
            this.emitter.emit("msg-modal", data);
          })
        },
        delete_user_roles(user_id) {
          this.$store.dispatch("user_role/GET_ROLES_BY_USER_ID", user_id).then(data => {
            if (data.success) {
              data.obj.forEach(role => {
                this.$store.dispatch("user_role/DELETE_BIND", {user_id: user_id, role_id: role.id})
              })
            }
          })
        },
        update_user() {
          this.$store.dispatch("user/UPDATE_USER", {
            user_id: this.$route.query.user_id,
            body: this.user_form
          }).then(data => {
            if (data.success) {
              this.delete_user_roles(this.$route.query.user_id)
              this.user_role_bind(this.$route.query.user_id)

              if (this.selected_client_id)
                this.client_user_bind(this.$route.query.user_id)

              this.toggle_setting()
            }
            this.emitter.emit("msg-modal", data);

          })
        },
        delete_user() {
          this.$store.dispatch("user/DELETE_USER", this.$route.query.user_id).then(data => {
            if (data.success)
              this.toggle_setting()

            this.emitter.emit("msg-modal", data);
          })
        },
        toggle_setting() {
          this.user_form.first_name = null
          this.user_form.last_name = null
          this.user_form.cash_box_id = null
          this.user_form.cashier = null
          this.user_setting = !this.user_setting;
          this.$router.push("/users")

        }
      }
    }
</script>

<style scoped>
    .create_user_block{
        display: grid;
        grid-gap: 1em;
        grid-template-columns: 6fr 1fr;
        padding-bottom: 30px;
    }
    .user_setting{
        display: grid;
        grid-gap: 2em;
        grid-template-columns: 250px 250px;

    }
    .user_setting > *{
        animation-duration: .3s;
        animation-name: anim-toggle;
    }


    /*button{*/
    /*    padding: 10px 30px;*/
    /*}*/
    .check_box_block{
        display: grid;
        grid-gap: 1em;
        grid-template-columns: 100px 40px;
    }
    .check_box_block input{
        width: max-content;
    }
    .check_box_block label{
        font-weight: initial;
    }
    .cashier{
        margin-top: 10px;
    }
</style>