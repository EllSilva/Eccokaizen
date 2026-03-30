import get_template from '../../components/get_template.js'
import api from "../../../../static/js/api/adm.js";

export default {
    data: function () {
        return {
            title: "Contato",
            ultimasPostagens: [],
        }
    },

    methods: {
 
        async listarUltimosNoticia() {
            const res = await api.lista_blog();
            const posts = res.data;

            this.ultimasPostagens = posts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 20);
        },



        formatarData(data) {
            const d = new Date(data);
            const dia = String(d.getDate()).padStart(2, "0");
            const mes = String(d.getMonth() + 1).padStart(2, "0");
            const ano = d.getFullYear();

            return `${dia}/${mes}/${ano}`;
        },

        async visualizar(id) {
            this.$router.push({ name: "detalhe_evento", params: { id } });
            this.codigo = this.$route.params.id;

        },


    },

    async mounted() {

        this.caminho_img = "http://localhost:3333/carregar_img/";

        await this.listarUltimosNoticia();

        AOS.init({
            duration: 1000,
        });
    },

    template: await get_template('./assets/js/view/noticia/home')
}