import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import mitt from 'mitt';
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'


const emitter = mitt();
const app = createApp(App)

app.use(router)
app.use(store)

const WSocket = new VueSocketIO({
    debug: true,
    connection: SocketIO('ws://37.252.64.153:5001'), //options object is Optional
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_',
    }
})
app.use(WSocket)
app.config.globalProperties.emitter = emitter;
app.mount('#app')
