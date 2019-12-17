require('./iframe-load');
const axios = require('axios')
const DOMhelper = require('./dom-helper');

module.exports = class Editor {
    constructor(){
        this.iframe = document.querySelector('iframe');
    }
    open(page){
        this.currentPage = page;

        axios.get('../../' + page)
        .then(res =>DOMhelper.parseStrToDom(res.data))
        .then(DOMhelper.wrapTextNodes)
        .then((dom)=>{
            this.virtualDom = dom;
            return dom;
        })
        .then(DOMhelper.serializeDomToString)
        .then((html)=>axios.post('./api/saveTempPage.php',{html}))
        .then(()=> this.iframe.load('../temp.html'))
        .then(()=> this.enableEditing())
    }
    enableEditing(){
        this.iframe.contentDocument.body.querySelectorAll('text-editor').forEach((el)=>{
            el.contentEditable = 'true';
            el.addEventListener('input', ()=>{
                this.onTextEdit(el);
            })
        })
    }
    onTextEdit(el){
        const id = el.getAttribute('nodeid');
        this.virtualDom.body.querySelector(`[nodeid="${id}"]`).innerHTML = el.innerHTML;
    }
    save(){
        const newDom = this.virtualDom.cloneNode(this.virtualDom);
        DOMhelper.unwrapTextNodes(newDom)
        const html = DOMhelper.serializeDomToString(newDom);
        axios.post('./api/savePage.php', {pageName: this.currentPage, html })        
    }
}