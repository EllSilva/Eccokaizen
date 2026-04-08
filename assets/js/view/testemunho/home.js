import get_template from "../../components/get_template.js";
import api from "../../../../static/js/api/adm.js";

export default {
    data: function () {
        return {
            title: "home",
            modalOpen: false,
            currentPage: 1,
            perPage: 12,
            selected: {},
            ultimas8Galeria: [],
            testimonials: [],
        };
    },


    computed: {
        totalPages() {
            return Math.ceil(this.testimonials.length / this.perPage);
        },

        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.testimonials.slice(start, start + this.perPage);
        }
    },


    methods: {
        async listarUltimaGaleria() {
            const res = await api.lista_galeria();
            const posts = res;

            this.ultimas8Galeria = posts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 8);
        },


        async listarTestemunho() {
            const res = await api.lista_testemunhos();
            this.testimonials = res.data;
        },

        openModal(item) {
            this.selected = item;
            this.modalOpen = true;
        },

        closeModal() {
            this.modalOpen = false;
        },

           nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    goToPage(page) {
      this.currentPage = page;
    }
    },

    async mounted() {
        this.caminho_img = "https://api.ecco.ao/carregar_img/";


        await this.listarUltimaGaleria();
        await this.listarTestemunho()
    },

    template: await get_template("./assets/js/view/testemunho/home"),
};