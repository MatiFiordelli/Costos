import menuTemplate from '../templates/menuTemplate.js'

export default class MenuSection extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        this.appendChild(menuTemplate.content.cloneNode(true))
    }
}

