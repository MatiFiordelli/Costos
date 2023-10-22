import templateTableIngredients from '../templates/tableIngredientsTemplate.js'

export default class TableIngredients extends HTMLElement{
    constructor(){
        super()
    }
    
    connectedCallback(){

    } 

    async attributeChangedCallback(name, oldValue, newValue){
        if(name==='config'){
            const f = templateTableIngredients(newValue)
            f.then((res)=>{this.appendChild(res.content.cloneNode(true))})       
        }
    }

    static get observedAttributes(){
        return ['config']
    }
}