import get_template from "../../components/get_template.js";
import api from "../../../../static/js/api/adm.js";

export default {
    data: function () {
        return {
            title: "home",
            ultimas8Galeria: [],
        };
    },

    methods: {
        async listarUltimaGaleria() {
            const res = await api.lista_galeria();
            const posts = res;

            this.ultimas8Galeria = posts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 8);
        },
    },

    async mounted() {
        this.caminho_img = "https://api.ecco.ao/carregar_img/";


        await this.listarUltimaGaleria();
    },

    template: await get_template("./assets/js/view/galeria/home"),
};