import formRecipeMainInfo from "../templates/formRecipeMainInfoTemplate.js"

export default class FormRecipeMainInfo extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        
    }

    async attributeChangedCallback(name, oldValue, newValue){
        if(name==='config-2'){
            const f = formRecipeMainInfo(newValue)
            f.then((res)=>this.appendChild(res.content.cloneNode(true)))
        }
    }

    static get observedAttributes(){
        return ['config-2']
    }

}