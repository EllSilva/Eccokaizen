import get_template from "../../components/get_template.js";

export default {
  data: function () {
    return {
      title: "home",
      importacao: "importacao0",
      exportacao: "exportacao0",
      bordagem: "bordagem0",
    };
  },

  methods: {
    initSlidexr(id) {
      const slidexr = document.querySelector("#slidexr" + id);
      const slidexs = slidexr.querySelectorAll(".slidex");
      const next = document.querySelector('.next[data-slidexr="' + id + '"]');
      const prev = document.querySelector('.prev[data-slidexr="' + id + '"]');

      let index = 0;

      function show(i) {
        slidexs.forEach((s) => s.classList.remove("active"));
        slidexs[i].classList.add("active");
      }

      next.onclick = () => {
        index = (index + 1) % slidexs.length;
        show(index);
      };

      prev.onclick = () => {
        index = (index - 1 + slidexs.length) % slidexs.length;
        show(index);
      };
    },
  },

  async mounted() {

    this.initSlidexr(1);
     this.initSlidexr(2);
     this.initSlidexr(3);

  },
  template: await get_template("./assets/js/view/servicos/home"),
};
