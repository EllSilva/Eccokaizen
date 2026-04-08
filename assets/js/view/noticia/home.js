import get_template from '../../components/get_template.js'
import api from "../../../../static/js/api/adm.js";

export default {
    data: function () {
        return {
            title: "Contato",
            ultimasPostagens: [],
            termoBusca: "" // texto digitado
        }
    },

    computed: {
        postsFiltrados() {
            if (!this.termoBusca) {
                return this.ultimasPostagens;
            }

            return this.ultimasPostagens.filter(post =>
                post.titulo.toLowerCase().includes(this.termoBusca.toLowerCase()) ||
                post.subtitulo.toLowerCase().includes(this.termoBusca.toLowerCase())
            );
        }
    },

    methods: {
   selecionarPalavra(palavra) {
            this.termoBusca = palavra;
        },
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
            this.$router.push({ name: "detalhe", params: { id } });
            this.codigo = this.$route.params.id;

        },


    },

    async mounted() {

        this.caminho_img = "https://api.ecco.ao/carregar_img/";

        await this.listarUltimosNoticia();

        AOS.init({
            duration: 1000,
        });
    },

    template: await get_template('./assets/js/view/noticia/home')
}