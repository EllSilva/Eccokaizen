import get_template from '../../components/get_template.js'

export default {
    data: function () {
        return {
            title: "home",
             importacao: "importacao0",
             exportacao: "exportacao0",
             bordagem: "bordagem0",
             
        } 
        
    },

    methods:{
         
    },

    async mounted() {

       
    },
    template: await get_template('./assets/js/view/novo_projecto/home')
}
 