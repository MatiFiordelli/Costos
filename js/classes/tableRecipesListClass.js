import templateTableRecipesList from '../templates/tableRecipesListTemaplate.js'

export default class TableRecipesList extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        
    }

    async attributeChangedCallback(name, oldValue, newValue){
        const s = templateTableRecipesList()
        s.then((res)=>{
            this.appendChild(res.content.cloneNode(true))
        })

        if(name === 'config'){
            localStorage.setItem('config', newValue)
            //await import('../templates/tableRecipesTemplate.js')
            //.then((e)=>this.appendChild(e.default.content.cloneNode(true)))            
        }        
    }

    static get observedAttributes(){
        return ['config']
    }
}