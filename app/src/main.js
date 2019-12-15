const Vue = require('vue/dist/vue.js');
const axios = require('axios');

new Vue({
    el: '#app',
    data: {
        pageName: '',
        pageList: []
    },
    created() {
        this.updatePageList();
    },
    methods: {
        createPage(){
            console.log(this.pageName);
            axios.post('./api/createNewHtmlPage.php', {
                'name': this.pageName
            })
            .then((response)=>{
                this.updatePageList();
            })
            .catch(function (error) {
                console.log(error);
            });            
        },
        deletePage(page){
            axios.post('./api/removeHtmlPage.php', {
                'name': page
            })
            .then((response)=>{
                console.log(response)
                this.updatePageList();
            })
            .catch(function (error) {
                console.log(error);
            });             
            
        },
        updatePageList(){
            axios.get('./api')
                .then((response)=>{
                    this.pageList = response.data
                })
        }
    },
})