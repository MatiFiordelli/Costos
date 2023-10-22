import formAddIngredientTemplate from "../templates/formAddIngredientTemplate.js"

export default class FormAddIngredient extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        this.appendChild(formAddIngredientTemplate.content.cloneNode(true))
    }

    async attrubuteChangedCallback(name, oldValue, newValue){

    }

    static get observedAttributes(){
        return []
    }

}