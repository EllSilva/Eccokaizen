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
      categoria: null,
      subtitulo: null,
      autor: null,
      titulo: null,
      descricao: null,
      imagem: null, 
      imagemPrincipal: null,
      nome: null,
      imagemVer: null,
      md_nome: null,
      md_imagemVer: null,

      caminho_img: null,
      lista_blog_id: [],
      lista_medias: [],

      url: null,
      img: null,
      noticiaId: null,

          selectedCategoria: "",
      categorias: [
        { id: 1, name: "Ativo" },
        { id: 2, name: "Inativo" },
        { id: 3, name: "aguarde" }, 
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

    updatePreview_media(e) {
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

    async sendMidia() {
      alert("categoria");

      let dataForm = new FormData();
      dataForm.append("url", this.url);
      dataForm.append("img", this.$refs.img.files[0]);
      dataForm.append("noticiaId", this.id);

      let res = await fetch(`http://localhost:3333/testemunhos`, {
        method: "POST",
        body: dataForm,
      });

      console.log("saiu do loopp");

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

    async sendNoticias() {
      let dataForm = new FormData();

      dataForm.append("categoria", this.selectedCategoria);
      dataForm.append("titulo", this.titulo);
      dataForm.append("subtitulo", this.subtitulo);
      dataForm.append("descricao", this.descricao);
      dataForm.append("imagem", this.$refs.img.files[0]);
      dataForm.append("autor", this.autor);
      dataForm.append("noticiaId", this.id);

      let res = await fetch(`http://localhost:3333/testemunhos/`+this.id, {
        method: "PUT",
        body: dataForm,
      });

      console.log("saiu do loopp");

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

    async lista_blogs() {
      let res = await api.lista_testemunho_id(this.id);

      this.lista_blog_id = res.data;

      (this.id = this.lista_blog_id.id),
        (this.selectedCategoria = this.lista_blog_id.categoria),
        (this.titulo = this.lista_blog_id.titulo),
        (this.subtitulo = this.lista_blog_id.subtitulo),
        (this.descricao = this.lista_blog_id.descricao),
        (this.imagem = this.lista_blog_id.imagem),
        (this.autor = this.lista_blog_id.autor),
        (this.lista_medias = this.lista_blog_id.medias),
        console.log(this.lista_medias);

      return res;
    },

    async ordem() {
      this.imagemPrincipal = this.imcaminho_img + this.imagem;
    },

    async executar() {
      await this.lista_blogs(); // espera terminar
      this.ordem(); // só depois executa
    },


  },

  async mounted() {
    this.imcaminho_img = "http://localhost:3333/carregar_img/";
    this.id = this.$route.params.id;

    this.executar();
  },

  template: await get_template("./assets/js/view/testemunho/editar"),
};
