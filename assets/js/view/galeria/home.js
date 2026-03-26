import get_template from "../../components/get_template.js";

export default {
    data: function() {
        return {
            title: "home",
        };
    },

    methods: {},

    async mounted() {

    },

    template: await get_template("./assets/js/view/galeria/home"),
};