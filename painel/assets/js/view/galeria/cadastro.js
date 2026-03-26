import get_template from '../../components/get_template.js'
import api from "../../../../../static/js/api/adm.js"


export default {
  data: function () {
    return {
      error: null,
      msg: null,
      file: "",
      titulo: null,
      categoria: null,
      estado: null,
      link: null,
      imagemLink: null,
      descricao: null,

      img1: null,
      img2: null,
      img3: null,
      img4: null,
      img5: null,
      img6: null,
      img7: null,
      img8: null,
      img9: null,
      img10: null,
      img11: null,
      img12: null,
      img13: null,
      img14: null,
      img15: null,
      img16: null,
      
      nome1: null,
      nome2: null,
      nome3: null,
      nome4: null,
      nome5: null,
      nome6: null,
      nome7: null,
      nome8: null,
      nome9: null,
      nome10: null,
      nome11: null,
      nome12: null,
      nome13: null,
      nome14: null,
      nome15: null,
      nome16: null,
      nome17: null,
      nome18: null,
      nome19: null,
      nome20: null,
    
      imagemVer: null,
      showFoto: true,
      showLink: false,
      inputs: [],
    
    }
  },

  async mounted() {

  },
 


  methods: {


    Btn_link() {
      this.showFoto = false;
      this.showLink = true;
    },

    Btn_foto() {
      this.showLink = false;
      this.showFoto = true;
    },

    exemploRemover() {
      this.imagemVer = "";
    },

    updatePreview(e) {

      const fileList = e.target.files;
      for (let file of fileList) {
        console.log(file);
      }

      var file,
        files = e.target.files;
      if (files.length === 0) {
        alert("foto nao foi escolhido ");
      }

      var imgTamanho = files[0].size;
      if (imgTamanho < 2035028) {


        console.log(files.length);

        file = new FileReader();
        this.selectedFile = e.target.files[0]
        file.onload = (e) => {
          this.imagemVer = e.target.result;
          this.nome = files[0].name;
        };
      } else {
        alert("o tamanho da imagem deve ser menor que 2MBs");
      }

      file.readAsDataURL(files[0]);

    },


 

    async sendFile32323() {
      alert("oi")

      let dataForm = new FormData();
      dataForm.append("img", this.selectedFile, this.selectedFile.name);

      axios.post('https://api.ark-tracos.com/api/projectos/1/img', dataForm)
        .then(res => {
          console.log(res)
        });
    },

  

    async sendFile() {

      let dataForm = new FormData();
      dataForm.append("titulo", this.titulo);
      dataForm.append("categoria", this.categoria);
      dataForm.append("estado", this.estado);
      dataForm.append("img1", this.$refs.img1.files[0]);
      dataForm.append("img2", this.$refs.img2.files[0]);
      dataForm.append("img3", this.$refs.img3.files[0]);
      dataForm.append("img4", this.$refs.img4.files[0]);
      dataForm.append("img5", this.$refs.img5.files[0]);
      dataForm.append("img6", this.$refs.img6.files[0]);
      dataForm.append("img7", this.$refs.img7.files[0]);
      dataForm.append("img8", this.$refs.img8.files[0]); 
      dataForm.append("img9", this.$refs.img9.files[0]);
      dataForm.append("img10", this.$refs.img10.files[0]); 
      dataForm.append("img11", this.$refs.img11.files[0]);
      dataForm.append("img12", this.$refs.img12.files[0]);
      dataForm.append("img13", this.$refs.img13.files[0]);
      dataForm.append("img14", this.$refs.img14.files[0]);
      dataForm.append("img15", this.$refs.img15.files[0]);
      dataForm.append("img16", this.$refs.img16.files[0]);

      dataForm.append("img17", this.$refs.img17.files[0]);
      dataForm.append("img18", this.$refs.img18.files[0]);
      dataForm.append("img19", this.$refs.img19.files[0]);
      dataForm.append("img20", this.$refs.img20.files[0]);
      dataForm.append("descricao", this.descricao);

console.log(dataForm)

      let res = await fetch(
        `https://api.ark-tracos.com/api/projectos`,
        {
          method: "POST",
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

    },


    async cadastra_link() {

      alert("link")
      this.error = null;

      // localStorage.removeItem('token')
      let res = await api.cadastra_projeto(this.titulo, this.categoria, this.link);

      if (res.error) {
        this.error = res.message;
        iziToast.error({
          title: "Error",
          message: this.error,
          position: "bottomCenter",
        });
        return null;
      }

      this.msg = res.message;
      iziToast.success({
        title: "OK",
        message: this.msg,
        position: "bottomCenter",
      });
    },

  },



  template: await get_template('./assets/js/view/galeria/cadastro')
}