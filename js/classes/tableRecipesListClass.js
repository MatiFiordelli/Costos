import templateTableRecipesList from '../templates/tableRecipesListTemplate.js'

export default class TableRecipesList extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        
    }

    async attributeChangedCallback(name, oldValue, newValue){
        if(name==='config'){
            const f = templateTableRecipesList(newValue)
            f.then((res)=>{this.appendChild(res.content.cloneNode(true))})  
        }
    }

    static get observedAttributes(){
        return ['config']
    }
}