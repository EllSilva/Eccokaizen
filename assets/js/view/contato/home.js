import get_template from "../../components/get_template.js";

export default {
  data: function () {
    return {
      title: "Contato",
    };
  },
  async mounted() {
    AOS.init({
      duration: 1000,
    });
  },
  template: await get_template("./assets/js/view/contato/home"),
};
