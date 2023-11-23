import { search } from '../../services/fetchData.js'
import { tableSearchTbodyIngredients } from './tableSearchTbodyIngredients.js'
import { tableSearchTbodyRecipes } from './tableSearchTbodyRecipes.js'
import { tableSearchStructure } from './tableSearchStructure.js'

export const addRowsToTable = async({page}) => {
    const { getUrlParameters } = await import('../../index.js')
    const {inputTerm, queryType} = getUrlParameters()
    
    let innerTBody = []
    const {data, fieldsAmount} = await search(queryType, inputTerm, page, 20)

    if(data.length > 0){
        if(queryType==='Ingredientes') innerTBody = tableSearchTbodyIngredients(data)
        if(queryType==='Recetas') innerTBody = tableSearchTbodyRecipes(data)

        let tbody = document.querySelector('tbody')
        if(tbody===null){
            return innerTBody
        }else{
            tbody.innerHTML += String(innerTBody).replaceAll('</tr>,', '</tr>')
        }    
    } else return innerTBody=[`<tr><td colspan="${fieldsAmount}">No se encontraron resultados</td></tr>`]
}

export const templateTableSearch = async ({page}) => {        
    const tableSearch = document.createElement('template')
    const { getUrlParameters } = await import('../../index.js')
    const { queryType } = getUrlParameters()
    
    tableSearch.innerHTML = await tableSearchStructure(queryType, page)

    const el = tableSearch.content.firstElementChild
    const charactersCommaToBeRemoved = el.firstChild
    el.removeChild(charactersCommaToBeRemoved)

    return tableSearch
}