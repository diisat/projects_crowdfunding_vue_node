import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import store from './config/store';
import pag_feed_proyectos from './views/pag_feed_proyectos';
import pag_inicio_sesion from './views/pag_inicio_sesion';
import pag_acerca from './views/pag_acerca';
import pag_perfil_usuario from './views/pag_perfil_usuario';
import pag_publicacion_proyecto from './views/pag_publicacion_proyecto';
import pag_registro from './views/pag_registro';


const routes = [
  { path: "/iniciarSesion", component: pag_inicio_sesion },
  { path: "/registro", component: pag_registro },
  { path: "/perfil", component: pag_perfil_usuario },
  { path: "/publicar", component: pag_publicacion_proyecto },
  { path: "/proyectos", component: pag_feed_proyectos },
  { path: "/acercaDe", component: pag_acerca }
]


Vue.config.productionTip = false

Vue.prototype.bus = new Vue()

Vue.use(VueRouter)
Vue.use(vuetify)



const router = new VueRouter({ routes });

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
