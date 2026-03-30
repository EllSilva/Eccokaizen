import get_template from "../../components/get_template.js";
import api from "../../../../static/js/api/adm.js";

export default {
  data: function () {
    return {
      title: "home",
      ultimas4Postagens: [],
      ultimas8Galeria: [],
      caminho_img: null,

      currentIndex: 0,
      startX: 0,
      interval: null,

      testimonials: []

    };
  },

  computed: {
    visible() {
      if (window.innerWidth <= 600) return 1
      if (window.innerWidth <= 900) return 2
      return 3
    },

    slides() {
      // CLONE para loop infinito
      return [...this.testimonials, ...this.testimonials.slice(0, this.visible)]
    },

    total() {
      return this.testimonials.length
    },

    sliderStyle() {
      const offset = this.currentIndex * (100 / this.visible)
      return {
        transform: `translateX(-${offset}%)`,
        transition: "0.5s ease"
      }
    }
  },

  methods: {

    move(step) {
      this.currentIndex += step

      if (this.currentIndex >= this.total) {
        setTimeout(() => {
          this.currentIndex = 0
        }, 500)
      }

      if (this.currentIndex < 0) {
        this.currentIndex = this.total - 1
      }
    },

    goTo(i) {
      this.currentIndex = i
    },

    startAutoPlay() {
      this.interval = setInterval(() => {
        this.move(1)
      }, 4000)
    },

    stopAutoPlay() {
      clearInterval(this.interval)
    },

    touchStart(e) {
      this.startX = e.touches[0].clientX
    },

    touchEnd(e) {
      let endX = e.changedTouches[0].clientX

      if (this.startX - endX > 50) this.move(1)
      if (endX - this.startX > 50) this.move(-1)
    },

    async listarUltimosNoticia() {
      const res = await api.lista_blog();
      const posts = res.data;

      this.ultimas4Postagens = posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);
    },

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
 
      console.log(this.testimonials)
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

    this.startAutoPlay()

    window.addEventListener("resize", () => {
      this.currentIndex = 0
    })

    this.caminho_img = "http://localhost:3333/carregar_img/";

    await this.listarUltimosNoticia();
    await this.listarUltimaGaleria();
     await this.listarTestemunho();
   


  },

  template: await get_template("./assets/js/view/home/home"),
};