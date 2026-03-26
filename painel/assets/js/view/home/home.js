import get_template from "../../components/get_template.js";
import { isAuthenticated } from "../../components/auth.js";
import { bus } from "../../components/bus.js"; // ajuste o caminho conforme a tua pasta

export default {
  data: function () {
    return {
      title: "home",
      isloaded: false,
      menuOpen: false,
    };
  },

  methods: {
    toggleMenu() {
      bus.$emit("toggle-menu"); // dispara o evento
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
 


  async mounted() {
    if (isAuthenticated()) {
      console.log("Logado");
    }

    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.isloaded = true;
      }
    };
  },
  template: await get_template("./assets/js/view/home/home"),
};
