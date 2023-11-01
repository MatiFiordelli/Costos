import { capitalizeText, findIngredientData } from './index.js'
import templateTableRecipeTbodyContent from './templates/tableRecipeTbodyContentTemplate.js'
import { fetchData, postData } from './services/fetchData.js'

let matchValue = false
window.onload = async () => {
    const todayDate = document.querySelector('#today-date')
    todayDate.value = new Date().toLocaleDateString()

    window.dataIngredients = await fetchData('ingredients')
    
    const lo = document.querySelector('#list-options-ingredient')
    while (lo.hasChildNodes()) {
        lo.removeChild(lo.firstChild)
    }

    dataIngredients.map((e) => {
        let node = document.createElement('option')
        //let input = document.querySelector('#ingredient')
        node.value = capitalizeText(e.ingrediente)
        node.onclick = `input.value=${capitalizeText(e.ingrediente)}`
        lo.appendChild(node)
    })
    
    window.form = document.querySelector('#form')
    window.lo = document.querySelector('#list-options-ingredient')
    window.inputAutor = document.querySelector('#autor')
    window.inputRecipeName = document.querySelector('#recipe-name')
    window.inputCategory = document.querySelector('#category')
    window.inputTodayDate = document.querySelector('#today-date')
    window.inputIngredient = document.querySelector('#ingredient')
    window.inputQuantity = document.querySelector('#quantity')
    window.inputCostValue = document.querySelector('#cost-value')
    window.inputPrice = document.querySelector('#price')
    window.inputMU = document.querySelector('#measurement-unit')
    window.input_ID = document.querySelector('#_id')
    window.btnAddIngredient = document.querySelector('#btn-add-ingredient')
    window.tableMainContainer = document.querySelector('#table-main-container')
    tableMainContainer.style.display = 'none' 
    window.autor = document.querySelector('#autor')
    autor.value = capitalizeText('matias')
    matchValue = false
}

window.onkeydown = (e) => {
    if(e.key === "Enter") 
        e.preventDefault()
}

const initElementsValues = (all) => {
    inputCostValue.value = null
    inputPrice.value = null
    inputMU.value = null
    input_ID.value = null
    btnAddIngredient.disabled = true

    if(all){
        inputIngredient.value = null
        inputQuantity.value = null
    }
}

const oninputAgregarRecetaIngrediente = (e) => {
    matchValue = false

    const setElementsValues = (i) => {
        inputPrice.value = dataIngredients[i].precio.toFixed(2)
        inputMU.value = capitalizeText(dataIngredients[i].unidad_medida)
        input_ID.value = dataIngredients[i]._id
        
        if(inputQuantity.value>0){
            inputCostValue.value = (inputPrice.value * inputQuantity.value).toFixed(2)
            btnAddIngredient.disabled = false
        }
    }

    Array.from(lo.childNodes).map((node, i) => {
        if(node.value === e.target.value) {
            matchValue = true
            setElementsValues(i)
        }        
    })
    if(!matchValue) {
        initElementsValues(false)
    }
}

const onchangeAgregarRecetaCantidad = (e) => {
    if (inputQuantity.value > 0 && matchValue){
        inputCostValue.value = (inputPrice.value * e.target.value).toFixed(2)
        btnAddIngredient.disabled = false
    }else{
        inputCostValue.value = null
        btnAddIngredient.disabled = true
    }
}

const addRowToTable = async (e) => {
    e.preventDefault()
    tableMainContainer.classList.remove('d-none')
    tableMainContainer.classList.add('d-flex')
    window.tableBody = document.querySelector('#table tbody')
    const btnSubmitRecipe = document.querySelector('#btn-submit-recipe')
    btnSubmitRecipe.disabled = false
   
    const config = 'add'
    const objRow = {
        ingredient: inputIngredient.value,
        quantity: inputQuantity.value,
        trademark: capitalizeText(findIngredientData(dataIngredients, inputIngredient.value, null).trademark),
        price: inputPrice.value,
        cost: inputCostValue.value,
        measurement_unit: capitalizeText(inputMU.value),
        _id: input_ID.value
    }
    const template = await templateTableRecipeTbodyContent(config, objRow)
    tableBody.appendChild(template.content.cloneNode(true)) 
    
    initElementsValues(true)
}

const onsubmitNewRecipe = () => {
    if(form.checkValidity()){
       
        const inputIngredientArray = document.querySelectorAll('.ingredient')
        const inputQuantityArray = document.querySelectorAll('.quantity')
        const inputIDArray = document.querySelectorAll('._id')

        const objRecipe = {
            autor: inputAutor.value,
            nombre: inputRecipeName.value,
            ultima_modificacion: inputTodayDate.value,
            categoria: inputCategory.value,
            receta: Array.from(inputIDArray).map((e, i)=> {
                        return {
                            codigo: inputIDArray[i].value,
                            ingrediente: inputIngredientArray[i].value,
                            cantidad: inputQuantityArray[i].value
                        }
                    })
        }

        postData(`addrecipe/`, objRecipe)
        .then(()=>{
            alert('Receta creada')  
            window.location.reload()      
        })
        .catch((err)=>console.log(err))
    }else{
        alert('Completar todos los campos correctamente')
    }
}

window.oninputAgregarRecetaIngrediente = oninputAgregarRecetaIngrediente
window.onchangeAgregarRecetaCantidad = onchangeAgregarRecetaCantidad
window.addRowToTable = addRowToTable
window.onsubmitNewRecipe = onsubmitNewRecipe