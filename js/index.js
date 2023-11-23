import MenuSection from './classes/menuClass.js'
import TableIngredients from './classes/tableIngredientsClass.js'
import TableRecipe from './classes/tableRecipeClass.js'
import TableRecipesList from './classes/tableRecipesListClass.js'
import TableSearch from './classes/tableSearchClass.js'
import ModalForRecipes from './classes/modalForRecipesClass.js'
import FormAddIngredient from './classes/formAddIngredientClass.js'
import FormRecipeMainInfo from './classes/formRecipeMainInfoClass.js'

window.customElements.define('menu-bar', MenuSection)
window.customElements.define('table-ingredients', TableIngredients)
window.customElements.define('table-recipe', TableRecipe)
window.customElements.define('table-recipes-list', TableRecipesList)
window.customElements.define('table-search', TableSearch)
window.customElements.define('modal-for-recipes', ModalForRecipes)
window.customElements.define('form-add-ingredient', FormAddIngredient)
window.customElements.define('form-recipe-main-info', FormRecipeMainInfo)

export const capitalizeText = (text) => {
    if(typeof text === 'undefined' || text === null) return '?'
    return text[0].toUpperCase() + text.slice(1).toLowerCase()    
}

export const findIngredientData = (dataIngredients, codigo, quantity) => {
    const msg = 'No encontrado'
    let _id = msg
    let ingredient = msg
    let trademark = msg
    let price = msg
    let costValue = msg
    let MU = msg
    let category = msg
    let last_modification = msg

    dataIngredients.some((e, i)=>{
        if(e._id===codigo) {
            ingredient = dataIngredients[i].ingrediente
            _id = dataIngredients[i]._id
            trademark = dataIngredients[i].marca
            price = dataIngredients[i].precio
            quantity!==null ? costValue = (price * quantity).toFixed(2) : null
            MU = dataIngredients[i].unidad_medida 
            category = dataIngredients[i].category
            last_modification = dataIngredients[i].ultima_modificacion            
        }
    })
    return {
        ingredient: ingredient,
        _id: _id,
        trademark: trademark,
        price: price,
        cost_value: costValue,
        measurement_unit: MU,
        category: category,
        last_modification: last_modification        
    }
}

export const getUrlParameters = () => {
    const searchParameters = location.search.split('&')
    const inputTerm = searchParameters[0].split('=')[1]
    let queryType = searchParameters[1].split('=')[1]
    inputTerm===null && (inputTerm='')

    const queryTypeElement = document.querySelector('#queryType')
    const queryTypeAllowedList = Array.from(queryTypeElement).map((e)=>e.value) //['Ingredientes', 'Recetas']

    if(queryTypeAllowedList.includes(queryType) ){
        queryTypeElement.value = queryType
    }else{
        queryTypeElement.value = queryTypeAllowedList[0] 
        queryType = queryTypeAllowedList[0] 
    }

    return {inputTerm, queryType}
}

