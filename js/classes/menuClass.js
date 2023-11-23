import { templateMenu } from '../templates/menuTemplate.js'


export default class MenuSection extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        templateMenu().then((res)=>{
            this.appendChild(res.content.cloneNode(true))                     
        })        
    }

    async attributeChangedCallback(name, oldValue, newValue){
        
    }

    static get observedAttributes(){
        return ['config']
    }
}

