const Editor = require('./editor')
const Vue = require('vue/dist/vue.js');
const UIkit = require('uikit');
const axios = require('axios');

window.editor = new Editor();

window.VueApp = new Vue({
    el: '#app',
    data: {
        showLoader: true,
        pagesList: [],
        backupList: [],
        page: 'index.html',
        meta: {
            title: '',
            keywords: '',
            description: ''
        },
        auth: false,
        password: '',
        checkPassword: false 
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
                this.meta = window.editor.editorMeta.getMeta();
            })
        },
        loadBackups(){
            axios.get('./backups/backups.json')
                .then(res=>{
                    this.backupList = res.data.filter(el=>{
                       return el.page == this.page;
                    })
                    // console.log(this.backupList)
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
        },
        saveMeta(){
            window.editor.editorMeta.saveMeta(this.meta);
        },
        enableLoader(){
            this.showLoader = true;
        },
        disableLoader(){
            this.showLoader = false;
        },
        Notification(message = 'Hello', status = 'success'){
            UIkit.notification({message, status})
        },
        login() {
            if(this.password.length > 5){
                this.checkPassword = false;

                axios
                    .post('./api/login.php', {'password': this.password})
                    .then(res => {
                        if(res.data.auth === true){
                            this.auth = res.data.auth;
                            this.start();
                        }  else {
                            this.checkPassword = true
                        }
                        console.log(res.data);
                    })
            } else {
                this.checkPassword = true
            }
            
        },
        onlogout(){
            axios
                .get('./api/logout.php')
                .then(res => {
                    if(this.auth = res.data.logout) {
                        window.location.replace('/');
                    }
                    // console.log(res.data);
                })
        },
        start(){
            this.openPage(this.page);
            axios.get('./api/getPagesList.php')
                .then(res => {
                    this.pagesList = res.data
                })
            this.loadBackups();
        }
    },
    created() {
        axios.get('./api/checkAuth.php')
            .then(res => {     
                if(res.data.auth === true){
                    this.start();
                }       
                this.auth = res.data.auth;
            })
    },
})