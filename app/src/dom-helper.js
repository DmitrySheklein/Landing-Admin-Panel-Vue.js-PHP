module.exports = class DOMhelper {
    static serializeDomToString(dom){
        const serializer = new XMLSerializer();
        return serializer.serializeToString(dom);
    }
    static parseStrToDom(str){
        const parser = new DOMParser();
        return parser.parseFromString(str, 'text/html');
    }
    static wrapTextNodes(dom){
            const body = dom.body;

            let textNodes = [];

            function recursyNodes(element){
                element.childNodes.forEach((node) => {
                    if( node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0){
                        textNodes.push(node)
                    } else {
                        recursyNodes(node);
                    }
                });
            }
            recursyNodes(body);
            
            textNodes.forEach((node, i)=> {
                const wrapper = dom.createElement('text-editor');
                node.parentNode.replaceChild(wrapper, node);
                wrapper.appendChild(node);
                wrapper.contentEditable = 'true';
                wrapper.setAttribute('nodeid',i);
            })

        return dom;
    }
    static unwrapTextNodes(dom){
        dom.body.querySelectorAll('text-editor').forEach((el)=>{
            el.parentNode.replaceChild(el.firstChild, el)
        })
    }    
    static wrapImages(dom){

        dom.body.querySelectorAll('img').forEach((img, i)=>{
            img.setAttribute('editableimgid', i);
        })

        return dom;
    }
    static unWrapImages(dom){
        dom.body.querySelectorAll('[editableimgid]').forEach((img, i)=>{
            img.removeAttribute('editableimgid');
        })

        return dom;
    }   


}