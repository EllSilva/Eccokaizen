import Vue from "./vendor/vue.js";
import Router from "./vendor/vue-router.js";

import get_template from "./components/get_template.js";

import page_menu from "./components/menu/home.js";
Vue.component("p-menu", page_menu);

import page_footer from "./components/footer/home.js";
Vue.component("p-footer", page_footer);

import page_login from "./view/login/home.js";
Vue.component("p-login", page_login);

import page_blog from "./view/blogs/blog.js";
Vue.component("p-blog", page_blog);

import page_novo_blog from "./view/blogs/cadastro.js";
Vue.component("p-novo_blog", page_novo_blog);

import page_edita_blog from "./view/blogs/editar.js";
Vue.component("p-edita_blog", page_edita_blog);

import page_galeria from "./view/galeria/galerias.js";
Vue.component("p-galeria", page_galeria);

import page_novo_galeria from "./view/galeria/cadastro.js";
Vue.component("p-novo_galeria", page_novo_galeria);

import page_home from "./view/home/home.js";
Vue.component("p-home", page_home);

import page_novo from "./view/novo_projecto/home.js";
Vue.component("p-novo_projecto", page_novo);

import page_novo_mapa from "./view/novo_projecto/home_mapa.js";
Vue.component("p-novo_mapa", page_novo_mapa);

import page_usuario from "./view/usuario/home.js";
Vue.component("p-usuario", page_usuario);

import page_testemunho from "./view/testemunho/home.js";
Vue.component("p-testemunho", page_testemunho);

import page_lista_testemunho from "./view/testemunho/lista.js";
Vue.component("p-lista_testemunho", page_lista_testemunho);

import page_edita_testemunho from "./view/testemunho/editar.js";
Vue.component("p-edita_testemunho", page_edita_testemunho);


Vue.use(Router);

const routes = [
  { path: "/", component: { template: "<p-login></p-login>" } },
  { path: "/home", component: { template: "<p-home></p-home>" } , meta: { requiresAuth: true }},
  {
    path: "/novo-projecto",
    component: { template: "<p-novo_projecto></p-novo_projecto>" }, meta: { requiresAuth: true }
  },
  {
    path: "/novo-mapa",
    component: { template: "<p-novo_mapa></p-novo_mapa>" }, meta: { requiresAuth: true }
  },

  { path: "/blog", component: { template: "<p-blog></p-blog>" }, meta: { requiresAuth: true }},
  {
    path: "/novo_blog",
    component: { template: "<p-novo_blog></p-novo_blog>" }, meta: { requiresAuth: true }
  },
  {
    path: '/blog/editar/:id',  name:"editar_blog",  
    component: { template: "<p-edita_blog></p-edita_blog>" }, meta: { requiresAuth: true }
  },

  { path: "/galeria", component: { template: "<p-galeria></p-galeria>" }, meta: { requiresAuth: true }},

  {
    path: "/novo_galeria",
    component: { template: "<p-novo_galeria></p-novo_galeria>" }, meta: { requiresAuth: true }
  },

 {
    path: "/novo_testemunho",
    component: { template: "<p-testemunho></p-testemunho>" }, meta: { requiresAuth: true }
  },

 {
    path: "/lista_testemunho",
    component: { template: "<p-lista_testemunho></p-lista_testemunho>" }, meta: { requiresAuth: true }
  },

    {
    path: '/testemunho/editar/:id',  name:"editar_testemunho",  
    component: { template: "<p-edita_testemunho></p-edita_testemunho>" }, meta: { requiresAuth: true }
  },


  { path: "/novo-usuario", component: { template: "<p-usuario></p-usuario>" } , meta: { requiresAuth: true }},
 
];

const router = new Router({ routes });

// 🔥 ADICIONA AQUI (ANTES DO new Vue)
import { isAuthenticated } from "./components/auth.js";

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/");
  } else {
    next();
  }
});

new Vue({
  router,
  data: {},
}).$mount("#app");
(async () => {})();


 
