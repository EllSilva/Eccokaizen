import get_template from "../../components/get_template.js";
import { isAuthenticated } from "../../components/auth.js";
import { bus } from "../../components/bus.js"; // ajuste o caminho conforme a tua pasta

export default {
  data: function () {
    return {
      error: null,
      msg: null,
      file: "",
      categoria: null,
      subtitulo: null,
      autor: null,
      titulo: null,
      descricao: null,
      nome: null,
      imagemVer: null,

      selectedCategoria: "",
      categorias: [
        { id: 1, name: "Noticia" },
        { id: 2, name: "Promocao" }, 
        { id: 4, name: "Atividade" }, 
        { id: 4, name: "Galeria" },
        { id: 5, name: "outro" },
      ],
    };
  },

  methods: {
    exemploRemover() {
      this.imagemVer = "";
    },

    updatePreview(e) {
      var file,
        files = e.target.files;
      if (files.length === 0) {
        alert("foto nao foi escolhido ");
      }
      console.log(files);
      var imgTamanho = files[0].size;
      if (imgTamanho < 2035028) {
        file = new FileReader();
        file.onload = (e) => {
          this.imagemVer = e.target.result;
          this.nome = files[0].name;
        };
      } else {
        alert("o tamanho da imagem deve ser menor que 2MBs");
      }

      file.readAsDataURL(files[0]);
    },

    async sendFile() {
      let dataForm = new FormData();
      dataForm.append("categoria", this.selectedCategoria);
      dataForm.append("titulo", this.titulo);
      dataForm.append("subtitulo", this.subtitulo);
      dataForm.append("descricao", this.descricao);
      dataForm.append("imagem", this.$refs.img.files[0]);
      dataForm.append("autor", this.autor);

      let res = await fetch(`https://api.ecco.ao/noticias`, {
        method: "POST",
        body: dataForm,
      });

      let data = await res.json();

      if (!data) {
        this.error = data.message;
        iziToast.error({
          title: "Error",
          message: this.error,
          position: "bottomCenter",
        });
        return null;
      }

      this.msg = data.message;
      iziToast.success({
        title: "OK",
        message: this.msg,
        position: "bottomCenter",
      });
    },

    toggleMenu() {
      bus.$emit("toggle-menu"); // dispara o evento
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },

  async mounted() {},

  template: await get_template("./assets/js/view/blogs/cadastro"),
};
