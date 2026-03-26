import get_template from "../../components/get_template.js";

export default {
    data: function() {
        return {
            title: "home",
        };
    },

    methods: {



    },

    async mounted() {

        let index = 0;
const slider = document.getElementById("slider");
const total = slider.children.length;

function getVisibleCard2s(){
  if(window.innerWidth <= 600) return 1;
  if(window.innerWidth <= 900) return 2;
  return 3;
}

function updateSlider(){
  const visible = getVisibleCard2s();
  const offset = index * (100 / visible);
  slider.style.transform = `translateX(-${offset}%)`;
  updateDots();
}

function moveSlide(step){
  const visible = getVisibleCard2s();
  index += step;

  if(index < 0) index = total - visible;
  if(index > total - visible) index = 0;

  updateSlider();
}

/* PAGINAÇÃO */
function createDots(){
  const pagination2 = document.getElementById("pagination2");
  pagination2.innerHTML = "";
  const visible = getVisibleCard2s();
  const dotsCount = total - visible + 1;

  for(let i=0; i<dotsCount; i++){
    let dot = document.createElement("span");
    dot.classList.add("dot");
    dot.onclick = () => {
      index = i;
      updateSlider();
    };
    pagination2.appendChild(dot);
  }
}

function updateDots(){
  const dots = document.querySelectorAll(".dot");
  dots.forEach(d => d.classList.remove("active"));
  if(dots[index]) dots[index].classList.add("active");
}

/* AUTO PLAY */
setInterval(() => {
  moveSlide(1);
}, 4000);

/* INIT */
window.addEventListener("resize", () => {
  index = 0;
  createDots();
  updateSlider();
});

createDots();
updateSlider();

    },
    template: await get_template("./assets/js/view/home/home"),
};