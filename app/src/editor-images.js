const axios = require('axios');

module.exports = class EditorImage {
    constructor(element, virtualElement){
        this.element = element;
        this.virtualElement = virtualElement;
        this.imgUploader = document.querySelector('#img-uploader');
                
        this.element.addEventListener('click', ()=>{
            this.onClick();
        })
    }
    onClick(){
        this.imgUploader.click();

        this.imgUploader.onchange = ()=> {
            if(this.imgUploader.files && this.imgUploader.files[0]){
                VueApp.enableLoader();

                let formData = new FormData();
                formData.append('image',this.imgUploader.files[0])

                axios.post('./api/uploadImg.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res)=>{
                    this.virtualElement.src = this.element.src = 'img/' + res.data.src;
                })
                .catch(()=> VueApp.Notification('Ошибка загрузки изображения', 'danger'))
                .finally(()=>{
                    VueApp.disableLoader();
                    this.imgUploader.value = '';                    
                })
            }
        }
    }
}