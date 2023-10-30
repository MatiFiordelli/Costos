import { capitalizeText, findIngredientData } from '../js/index.js'
import templateTableRecipeTbodyContent from './templates/tableRecipeTbodyContentTemplate.js'

let dataIngredients = null
window.onload = () => {
    new bootstrap.Modal(document.querySelector('#recipe-modal')).show()
    window.form = document.querySelector('#form')
    form.style.display = 'none'
    window.todayDate = document.querySelector('#today-date')
    todayDate.value = new Date().toLocaleDateString()
    window.recipeName = document.querySelector('#recipe-name')
    recipeName.oninput = ()=> onInputEnableBtn()
    window.category = document.querySelector('#category')
    category.onchange = ()=> onInputEnableBtn()
    window.codigo = document.querySelector('#_id')
    window.tableMainContainer = document.querySelector('#table-main-container')   
   
    fetch('https://costos-backend.vercel.app/ingredients')
    .then((res) => res.json())
    .then((data) => {
        dataIngredients = data
    })      
}

window.onInputEnableBtn = () => {
    const btnSubmitRecipe = document.querySelector('#btn-submit-recipe')
    if(btnSubmitRecipe.disabled) btnSubmitRecipe.disabled = false
}

const updateMeasurementUnitSelect = (e) => {
    onInputEnableBtn()
    const ingredient = e.closest('tr').querySelectorAll('.ingredient')[0]
    const quantity = e.closest('tr').querySelectorAll('.quantity')[0]
    const trademark = e.closest('tr').querySelectorAll('.trademark')[0]
    const price = e.closest('tr').querySelectorAll('.price')[0]
    const cost_value = e.closest('tr').querySelectorAll('.cost-value')[0]
    const measurementUnit = e.closest('tr').querySelectorAll('.measurement-unit')[0]
    const codigo = e.closest('tr').querySelectorAll('.codigo')[0]
    const ingredientData = findIngredientData(dataIngredients, ingredient.value, quantity.value)

    trademark.value = capitalizeText(ingredientData.trademark)
    price.value = ingredientData.price
    cost_value.value = ingredientData.cost_value
    measurementUnit.value = capitalizeText(ingredientData.measurement_unit)
    codigo.value = ingredientData._id
}

window.updateQuantity = (e) => {
    onInputEnableBtn()
    const quantity = e.closest('tr').querySelectorAll('.quantity')[0]
    const price = e.closest('tr').querySelectorAll('.price')[0]
    const cost_value = e.closest('tr').querySelectorAll('.cost-value')[0]
    cost_value.value = (quantity.value * price.value).toFixed(2)
}

const addRowsToTable = async (data) => {
    window.tableBody = document.querySelector('#table tbody')
    const recipe = data.receta
    const config = 'modify'

    recipe.forEach(async (e)=>{
        const objRow = {
            ingredient: capitalizeText(e.ingrediente),
            quantity: e.cantidad,
            trademark: capitalizeText(findIngredientData(dataIngredients, e.ingrediente, null).trademark),
            price: findIngredientData(dataIngredients, e.ingrediente, null).price,
            cost: findIngredientData(dataIngredients, e.ingrediente, e.cantidad).cost_value,
            measurement_unit: capitalizeText(findIngredientData(dataIngredients, e.ingrediente, null).measurement_unit),
            _id: e.codigo
        }
        const template = await templateTableRecipeTbodyContent(config, objRow)
        tableBody.appendChild(template.content.cloneNode(true))
    })
}

const selectedRow = (id) => { 
    fetch(`https://costos-backend.vercel.app/recipes/_id/${id}`)
    .then((res) => res.json())
    .then((data)=>{
        recipeName.value = capitalizeText(data[0].nombre)
        category.value = capitalizeText(data[0].categoria)
        codigo.value = data[0]._id
        addRowsToTable(data[0])
        form.style.display = 'block'
    })
    .then(()=>{
        const si = document.querySelectorAll('.select-ingredient')
        const template = document.querySelector('#templateSelect1')
        
        dataIngredients.forEach((e, i) => {
            const node = document.createElement('option')
            node.value = capitalizeText(e.ingrediente)
            node.innerHTML = capitalizeText(e.ingrediente)
            template.content.appendChild(node)
        })

        Array.from(si).forEach((el)=>{
            const templateClone = template.content.cloneNode(true)
            el.appendChild(templateClone)
        })
    })
    .catch((err)=>console.log(err))
}

const addNewIngredient = () => {
    onInputEnableBtn()
    const lastRow = document.querySelector('#table tbody>tr:last-child')
    tableBody.appendChild(lastRow.cloneNode(true))
}

const onsubmitModifiedRecipe = () => {
    if(form.checkValidity()){
       
        const inputIngredientArray = document.querySelectorAll('.ingredient')
        const inputQuantityArray = document.querySelectorAll('.quantity')
        const inputIdIngredientArray = document.querySelectorAll('.codigo')

        const objRecipe = {
            nombre: recipeName.value,
            ultima_modificacion: todayDate.value,
            categoria: category.value,
            codigo: codigo.value,
            receta: Array.from(inputIngredientArray).map((e, i)=> {
                        return {
                            codigo: inputIdIngredientArray[i].value,
                            ingrediente: inputIngredientArray[i].value,
                            cantidad: inputQuantityArray[i].value,
                        }
                    })
        }

        fetch('https://costos-backend.vercel.app/updaterecipe/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(objRecipe)
        })
        .then(()=>{
            alert('Receta modificada')
            window.location.reload()
        })
        .catch((err)=>console.log(err))
    }else{
        alert('Completar todos los campos correctamente')
    }
}

window.selectedRow = selectedRow
window.addNewIngredient = addNewIngredient
window.onsubmitModifiedRecipe = onsubmitModifiedRecipe
window.findIngredientData = findIngredientData
window.updateMeasurementUnitSelect = updateMeasurementUnitSelect