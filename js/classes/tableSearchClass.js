import { templateTableSearch, addRowsToTable } from '../templates/tableSearchTemplate/tableSearchTemplate.js'
import templateSpinner from '../templates/spinnerTemplate.js'

export default class TableIngredients extends HTMLElement{
    constructor(){
        super()
    }
    
    connectedCallback(){
        this.appendChild(templateSpinner().content.cloneNode(true))

        let page = 1
        const f = templateTableSearch({page:1})
            f.then((res)=>{
                this.replaceChild(res.content.cloneNode(true), this.childNodes[1])
            }).then(()=>{
                let lastRow = document.querySelector('#bottom')

                let observer = new IntersectionObserver((entries) => {
                    entries.forEach(async(entry) => {
                        if(entry.isIntersecting) {
                            page+=1
                            addRowsToTable({page})               
                        }
                    })
                }, {
                    threshold: 1,
                    rootMargin: "-40px"
                })

                observer.observe(lastRow)
            })
    } 

    async attributeChangedCallback(name, oldValue, newValue){
        if(name==='config'){
            
        }
    }

    static get observedAttributes(){
        return ['config']
    }
}