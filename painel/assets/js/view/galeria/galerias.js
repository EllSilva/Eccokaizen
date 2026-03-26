import get_template from '../../components/get_template.js'
import api from "../../../../../static/js/api/adm.js"

export default {
  data: function () {
    return {
      img: null,
      id_prod: null,

      produtos: [],
    }

  },

  methods: {
    async visualizar(id) { 
      globalThis._blog = this.produtos.find(aluguel => aluguel.id == id)
          // window.location.href = "#/detalhe"
   },
        
   async listar() {
       let res = await api.lista_projecto();
       this.produtos = res
      
       return res;
     },
  },


  async mounted() {
    // this.id_prod = 60;
    this.listar()
    
  },
  
  template: await get_template('./assets/js/view/galeria/galerias')
}