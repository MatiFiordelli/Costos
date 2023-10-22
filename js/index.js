import MenuSection from './classes/menuClass.js'
import TableIngredients from './classes/tableIngredientsClass.js'
import TableRecipe from './classes/tableRecipeClass.js'
import TableRecipesList from './classes/tableRecipesListClass.js'
import ModalForRecipes from './classes/modalForRecipesClass.js'
import FormAddIngredient from './classes/formAddIngredientClass.js'
import FormRecipeMainInfo from './classes/formRecipeMainInfoClass.js'

window.customElements.define('menu-bar', MenuSection)
window.customElements.define('table-ingredients', TableIngredients)
window.customElements.define('table-recipe', TableRecipe)
window.customElements.define('table-recipes-list', TableRecipesList)
window.customElements.define('modal-for-recipes', ModalForRecipes)
window.customElements.define('form-add-ingredient', FormAddIngredient)
window.customElements.define('form-recipe-main-info', FormRecipeMainInfo)

export const capitalizeText = (text) => {
    if(typeof text === 'undefined' || text === null) return '?'
    return text[0].toUpperCase() + text.slice(1).toLowerCase()    
}