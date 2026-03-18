import get_template from "../../components/get_template.js";

export default {
  data: function () {
    return {
      title: "home",
      activo: false,
      activo1: true,
      activo2: false,
      activo3: false,
      activo4: false,
      activo5: false,
    };
  },

  methods: {},

  async mounted() {

    const toggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");

    toggle.addEventListener("click", () => {
      mobileNav.style.display =
        mobileNav.style.display === "block" ? "none" : "block";
    });


  const links = document.querySelectorAll(".menu a");

  // 🔥 1. Quando clicar, salva no localStorage
  links.forEach(link => {
    link.addEventListener("click", () => {
      localStorage.setItem("menuAtivo", link.dataset.id);

      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 🔥 2. Ao carregar a página, aplica o ativo salvo
  const ativo = localStorage.getItem("menuAtivo");
  if (ativo) {
    links.forEach(l => {
      if (l.dataset.id === ativo) {
        l.classList.add("active");
      }
    });
  } else {
    // define o primeiro como ativo se nada estiver salvo
    links[0].classList.add("active");
  }


  },

  template: await get_template("./assets/js/components/menu/home"),
};
