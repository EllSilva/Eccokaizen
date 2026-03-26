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


import page_galeria from './view/galeria/home.js'
Vue.component('p-galeria', page_galeria)


import page_contato from './view/contato/home.js'
Vue.component('p-contato', page_contato)

Vue.use(Router)



const routes = [
    { path: '/', component: { template: '<p-home></p-home>' } },
    { path: '/servicos', component: { template: '<p-servicos></p-servicos>' } },
    { path: '/sobre', component: { template: '<p-sobre></p-sobre>' } },
    { path: '/noticias', component: { template: '<p-noticia></p-noticia>' } },
    { path: '/galeria', component: { template: '<p-galeria></p-galeria>' } },

    { path: '/contato', component: { template: '<p-contato></p-contato>' } }
]

const router = new Router({ routes })

new Vue({
    router,
    data: {}
}).$mount('#app')

;
(async() => {})()