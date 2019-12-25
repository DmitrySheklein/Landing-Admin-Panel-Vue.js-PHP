const Editor = require('./editor')
const Vue = require('vue/dist/vue.js');
const UIkit = require('uikit');
const axios = require('axios');

window.editor = new Editor();

new Vue({
    el: '#app',
    data: {
        showLoader: true,
        pagesList: [],
        backupList: [],
        page: 'index.html'
    },
    methods: {
        onBtnSave(){
            this.showLoader = true;

            window.editor.save(()=>{
                this.loadBackups();
                UIkit.notification({message: 'Успешно сохранено!', status: 'success'})
                this.showLoader = false;
            },
            ()=>{
                UIkit.notification({message: 'Ошибка!', status: 'danger'})
            })
        },
        openPage(page){            
            this.showLoader = true;

            window.editor.open(page, ()=>{
                this.loadBackups();
                this.showLoader = false;
                this.page = page
            })
        },
        loadBackups(){
            axios.get('./backups/backups.json')
                .then(res=>{
                    this.backupList = res.data.filter(el=>{
                       return el.page == this.page;
                    })
                    console.log(this.backupList)
                })
        },
        restoreBackup(backup){
            UIkit.modal.confirm('Восстановить бекап?', {
                labels: {
                    ok: 'Восстановить',
                    cancel: 'Отмена'
                }
            }).then(function() {
                return axios.post('./api/restoreBackup.php',{'file': backup.file, 'page': backup.page, 'time': backup.time})
            })
            .then(()=>{
                window.editor.open(this.page, ()=>{
                    this.showLoader = false;
                })
            })
        }
    },
    created() {
        window.editor.open(this.page, ()=>{
            this.showLoader = false;
        })
        axios.get('./api/getPagesList.php')
            .then(res => {
                this.pagesList = res.data
            })
        this.loadBackups();
    },
})