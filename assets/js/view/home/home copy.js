import get_template from "../../components/get_template.js";

export default {
  data: function () {
    return {
      title: "home",
    };
  },

  methods: {


  },

  async mounted() {

    
  
    const slide_pris = document.querySelectorAll('.slide_pri');
    let currentSlide_pri = 0;
    const typewriterText = [
      "Construindo o Futuro com Inovação",
      "Infraestruturas Modernas e Sustentáveis",
      "Tecnologia e Energia que Movem África"
    ];

    const typewriterElement = document.getElementById('typewriter');

    function typeWriterEffect(text, i = 0) {
      if (i < text.length) {
        typewriterElement.textContent = text.substring(0, i + 1);
        setTimeout(() => typeWriterEffect(text, i + 1), 80);
      }
    }

    function showSlide_pri(index) {
      slide_pris.forEach(slide_pri => slide_pri.classList.remove('active'));
      slide_pris[index].classList.add('active');
      typewriterElement.textContent = "";
      typeWriterEffect(typewriterText[index]);
    }

    setInterval(() => {
      currentSlide_pri = (currentSlide_pri + 1) % slide_pris.length;
      showSlide_pri(currentSlide_pri);
    }, 6000);

    showSlide_pri(currentSlide_pri);
 



    
 
    const frases = [
      " Elétricas",
      " Mecânicas ",
      " industriais"
    ];
    const typewriter = document.getElementById('typewriter');
    let fraseIndex = 0;
    let charIndex = 0;
    let apagando = false;
    const velocidade = 100;

    function escrever() {
      const fraseAtual = frases[fraseIndex];
      const proximaFrase = frases[(fraseIndex + 1) % frases.length];

      if (!apagando) {
        // Digita letra por letra
        typewriter.textContent = fraseAtual.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === fraseAtual.length) {
          apagando = true;
          setTimeout(escrever, 1500); // espera antes de apagar
          return;
        }
      } else {
        // Apaga letra por letra **menos a última**
        if (charIndex > 1) {
          typewriter.textContent = fraseAtual.slice(0, charIndex - 1) + fraseAtual.charAt(charIndex - 1);
          charIndex--;
        } else {
          // Mantém a última letra e inicia a próxima frase
          const ultimaLetra = typewriter.textContent.slice(-1);
          fraseIndex = (fraseIndex + 1) % frases.length;
          charIndex = 0;
          apagando = false;
          typewriter.textContent = ultimaLetra;
        }
      }

      setTimeout(escrever, velocidade);
    }

    escrever();
  
    
    AOS.init({
      duration: 1000,
    });
   
  
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
