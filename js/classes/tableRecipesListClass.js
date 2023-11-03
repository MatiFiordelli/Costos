import templateTableRecipesList from '../templates/tableRecipesListTemplate.js'
import templateSpinner from '../templates/spinnerTemplate.js'

export default class TableRecipesList extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        
    }

    async attributeChangedCallback(name, oldValue, newValue){
        if(name==='config'){
            this.appendChild(templateSpinner().content.cloneNode(true))

            const f = templateTableRecipesList(newValue)
            f.then((res)=>{
                this.replaceChild(res.content.cloneNode(true), this.childNodes[1])
            })  
        }
    }

    static get observedAttributes(){
        return ['config']
    }
}