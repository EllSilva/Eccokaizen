import get_template from "../../components/get_template.js";
import api from "../../../../static/js/api/adm.js";

export default {
    data: function () {
        return {
            error: null,
            msg: null,
            file: "",
            categoria: null,
            subtitulo: null,
            autor: null,
            titulo: null,
            descricao: null,
            imagem: null,
            imagemPrincipal: null,
            createdAt: null,
            imagemVer: null,
            md_nome: null,
            md_imagemVer: null,

            caminho_img: null,
            lista_blog_id: [],




        };
    },

    methods: {
     

        exemploRemover() {
            this.imagemVer = "";
        },

        async lista_blogs() {
            let res = await api.lista_blog_um(this.id);

            this.lista_blog_id = res.data;

            (this.id = this.lista_blog_id.id),
                (this.categoria = this.lista_blog_id.categoria),
                (this.titulo = this.lista_blog_id.titulo),
                (this.subtitulo = this.lista_blog_id.subtitulo),
                (this.descricao = this.lista_blog_id.descricao),
                (this.imagem = this.lista_blog_id.imagem),
                (this.autor = this.lista_blog_id.autor),
                (this.createdAt = this.lista_blog_id.createdAt)

            return res;
        },

        async ordem() {
            this.imagemPrincipal = this.imcaminho_img + this.imagem;

        },

        async executar() {
            await this.lista_blogs(); // espera terminar

            this.ordem(); // só depois executa
        },

        formatarData(data) {
            const d = new Date(data);
            const dia = String(d.getDate()).padStart(2, "0");
            const mes = String(d.getMonth() + 1).padStart(2, "0");
            const ano = d.getFullYear();

            return `${dia}/${mes}/${ano}`;
        },
    },

    async mounted() {
        this.imcaminho_img = "https://api.ecco.ao/carregar_img/";
        this.id = this.$route.params.id;

        this.executar();


    },


    template: await get_template('./assets/js/view/noticia/detalhe')
}