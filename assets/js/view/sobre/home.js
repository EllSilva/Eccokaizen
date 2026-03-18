import get_template from "../../components/get_template.js";

export default {
  data: function () {
    return {
      title: "home",
    };
  },

  methods: {},

  async mounted() {

    let index = 0;
    const slides = document.querySelector(".slidestime");
    const total = document.querySelectorAll(".slidestime img").length;

    function updateSlide() {
      const isMobile = window.innerWidth <= 600;
      const visible = isMobile ? 1 : 2;
      const move = isMobile ? 100 : 50;
      slides.style.transform = `translateX(-${index * move}%)`;
      return visible;
    }

    document.querySelector(".nexttime").onclick = () => {
      const visible = updateSlide();
      if (index < total - visible) {
        index++;
        updateSlide();
      }
    };

    document.querySelector(".prevtime").onclick = () => {
      if (index > 0) {
        index--;
        updateSlide();
      }
    };

    window.addEventListener("resize", updateSlide);
    updateSlide();

  
    AOS.init({
      duration: 1000,
    });

   
  },


  template: await get_template("./assets/js/view/sobre/home"),
};
