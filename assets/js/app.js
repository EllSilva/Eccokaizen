import Vue from './vendor/vue.js'
import Router from './vendor/vue-router.js'

import get_template from './components/get_template.js'

import page_menu from './components/menu/home.js'
Vue.component('p-menu', page_menu)

import page_footer from './components/footer/home.js'
Vue.component('p-footer', page_footer)

import page_home from './view/home/home.js'
Vue.component('p-home', page_home)

import page_servicos from './view/servicos/home.js'
Vue.component('p-servicos', page_servicos)

import page_sobre from './view/sobre/home.js'
Vue.component('p-sobre', page_sobre)

import page_noticia from './view/noticia/home.js'
Vue.component('p-noticia', page_noticia)

import page_noticia_detalhe from './view/noticia/detalhe.js'
Vue.component('p-noticia_detalhe', page_noticia_detalhe)

import page_galeria from './view/galeria/home.js'
Vue.component('p-galeria', page_galeria)

import page_testemunho from './view/testemunho/home.js'
Vue.component('p-testemunho', page_testemunho)

import page_contato from './view/contato/home.js'
Vue.component('p-contato', page_contato)

Vue.use(Router)

const routes = [
    { path: '/', name:"editar_testemunho", component: { template: '<p-home></p-home>' } },
    { path: '/servicos', component: { template: '<p-servicos></p-servicos>' } },
    { path: '/sobre', component: { template: '<p-sobre></p-sobre>' } },
    { path: '/noticias', component: { template: '<p-noticia></p-noticia>' } },
    { path: '/noticias', component: { template: '<p-noticia></p-noticia>' } },
      {
    path: '/noticias/detalhe/:id',  name:"detalhe",  
    component: { template: "<p-noticia_detalhe></p-noticia_detalhe>" }, meta: { requiresAuth: true }
  },
    { path: '/galeria', component: { template: '<p-galeria></p-galeria>' } },
  { path: '/testemunho', component: { template: '<p-testemunho></p-testemunho>' } },

    { path: '/contato', component: { template: '<p-contato></p-contato>' } }
]

const router = new Router({ routes })

new Vue({
    router,
    data: {}
}).$mount('#app')

;
(async() => {})()