import templateTableIngredients from '../templates/tableIngredientsTemplate.js'

export default class TableIngredients extends HTMLElement{
    constructor(){
        super()
    }
    
    connectedCallback(){

    } 

    async attributeChangedCallback(name, oldValue, newValue){
        const s = templateTableIngredients()
        s.then((res)=>{
            this.appendChild(res.content.cloneNode(true))
        })
        
        if(name === 'config'){
            localStorage.setItem('config', newValue)
            //await import('../templates/tableIngredientsTemplate.js')
            //.then((e)=>this.appendChild(e.default.content.cloneNode(true)))
        }        
    }

    static get observedAttributes(){
        return ['config']
    }
}