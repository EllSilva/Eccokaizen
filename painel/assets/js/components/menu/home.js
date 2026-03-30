import get_template from "../../components/get_template.js";
import { bus } from "../../components/bus.js"; // ajuste caminho

export default {
  data: function () {
    return {
      title: "home",
      menuOpen: false,
      currentRoute: window.location.hash.replace('#', '')
    };
  },

  methods: {
  
  },

  
  created() {
    bus.$on("toggle-menu", () => {
      this.menuOpen = !this.menuOpen;
    });
  },

    mounted() {
    window.addEventListener('hashchange', () => {
      this.currentRoute = window.location.hash.replace('#', '');
    });   
  },

  template: await get_template("./assets/js/components/menu/home"),
};
