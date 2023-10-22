import modalForRecipes from '../templates/modalForRecipesTemplate.js'

export default class ModalForRecipes extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        this.appendChild(modalForRecipes.content.cloneNode(true))
    }

    async attributeChangedCallback(name, oldValue, newValue){

    }

    static get observedAttributes(){
        return []
    }
}