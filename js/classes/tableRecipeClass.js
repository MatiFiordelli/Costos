import templateTableRecipe from '../templates/tableRecipeTemplate.js'

export default class TableRecipes extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){

    }

    async attributeChangedCallback(name, oldValue, newValue){
        if(name==='config'){
            const f = templateTableRecipe(newValue)
            f.then((res)=>{this.appendChild(res.content.cloneNode(true))}) 
        }      
    }

    static get observedAttributes(){
        return ['config']
    }
}