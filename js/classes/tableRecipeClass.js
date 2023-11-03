import templateTableRecipe from '../templates/tableRecipeTemplate.js'
import templateSpinner from '../templates/spinnerTemplate.js'

export default class TableRecipes extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        
    }

    async attributeChangedCallback(name, oldValue, newValue){
        if(name==='config'){
            this.appendChild(templateSpinner().content.cloneNode(true))

            const f = templateTableRecipe(newValue)
            f.then((res)=>{
                this.replaceChild(res.content.cloneNode(true), this.childNodes[1])
            }) 
        }      
    }

    static get observedAttributes(){
        return ['config']
    }
}