import get_template from "../../components/get_template.js";
import api from "../../../../../static/js/api/adm.js";
import { isAuthenticated } from "../../components/auth.js";
import { bus } from "../../components/bus.js"; // ajuste o caminho conforme a tua pasta

export default {
  data: function () {
    return {
      error: null,
      msg: null,
      file: "",
      lista_galerias: [],
      titulo: null,
      imagem: null,
      imagemPrincipal: null,
      nome: null,
      imagemVer: null,
      md_nome: null,
      md_imagemVer: null,

      caminho_img: null,

      lista_medias: [],

      url: null,
      img: null,
      noticiaId: null,

      selectedCategoria: "",
      categorias: [
        { id: 1, name: "Noticia" },
        { id: 2, name: "Promocao" },
        { id: 4, name: "Atividade" },
        { id: 4, name: "Galeria" },
        { id: 5, name: "outro" },
      ]
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
          this.md_imagemVer = e.target.result;
          this.md_nome = files[0].name;
        };
      } else {
        alert("o tamanho da imagem deve ser menor que 2MBs");
      }

      file.readAsDataURL(files[0]);
    },


    async sendGaleria() {

      let dataForm = new FormData();
      dataForm.append("titulo", this.titulo);
      dataForm.append("imagem", this.$refs.img.files[0]);


      let res = await fetch(`http://localhost:3333/galeria`, {
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

    async eliminar(index) {
      // let res = await api.deleter_Blog(this.id); DELETE
      this.editIndex = index;

      let dataForm = new FormData();

      let res = await fetch(
        `http://localhost:3333/galeria/` + this.editIndex,
        {
          method: "DELETE",
          body: dataForm,
        }
      );

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
      this.produtos = (await this.listar()).data;
    },

    async listar() {
      let res = await api.lista_galeria();
      this.lista_galerias = res

      return res;
    },




  },

  async mounted() {

    this.imcaminho_img = "http://localhost:3333/carregar_img/";
    this.id = this.$route.params.id;

    this.listar()
  },

  template: await get_template('./assets/js/view/galeria/cadastro')
}