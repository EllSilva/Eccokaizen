import get_template from "../../components/get_template.js";

export default {
  data: function () {
    return {
      title: "home",
    };
  },

  methods: {},

  async mounted() {
    const slide_pris = document.querySelectorAll(".slide_pri");
    let currentSlide_pri = 0;
    const typewriterText = [
      "Soluções",
      "Inovação",
      "Tecnologia",
      "Engenharia",
      "Industrial",
    ];

    const typewriterElement = document.getElementById("typewriter");

    function typeWriterEffect(text, i = 0) {
      if (i < text.length) {
        typewriterElement.textContent = text.substring(0, i + 1);
        setTimeout(() => typeWriterEffect(text, i + 1), 80);
      }
    }

    function showSlide_pri(index) {
      slide_pris.forEach((slide_pri) => slide_pri.classList.remove("active"));
      slide_pris[index].classList.add("active");
      typewriterElement.textContent = "";
      typeWriterEffect(typewriterText[index]);
    }

    setInterval(() => {
      currentSlide_pri = (currentSlide_pri + 1) % slide_pris.length;
      showSlide_pri(currentSlide_pri);
    }, 6000);

    showSlide_pri(currentSlide_pri);

    //========================================

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

    //========================================

    AOS.init({
      duration: 400,
    });

    //========================================

    var swiper = new Swiper(".mySwiperservico", {
      spaceBetween: 30,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        // quando a largura for >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        // quando a largura for >= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // quando a largura for >= 768px
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // quando a largura for >= 1024px
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });
  },
  template: await get_template("./assets/js/view/home/home"),
};
