import { capitalizeText, findIngredientData } from '../js/index.js'

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

const addRowsToTable = (data) => {
    window.tableBody = document.querySelector('#table tbody')
    const recipe = data.receta
    let tbodyContent = ''
    recipe.forEach((e)=>{
        tbodyContent += `        
        <tr>
            <td>
                <button 
                    class="btn btn-dark btn-sm mx-auto"
                    onmouseup="removeRow(event, 'function in modificaReceta', onInputEnableBtn); onEmptyingTable('modifyrecipe');"
                >
                    Eliminar
                </button>
            </td>
            <td scope="row" title="Ingrediente">
                <select 
                    name="ingredient"
                    class="ingredient select-ingredient form-select form-select-sm w-auto border-0 bg-transparent text-black text-center rounded-0" 
                    aria-label="Nombre del ingrediente"
                    placeholder="Elija el ingrediente" 
                    required
                    data-ingredient="${capitalizeText(e.ingrediente)}"
                    onchange="updateMeasurementUnitSelect(this)"
                > 
                    <option value="${capitalizeText(e.ingrediente)}">${capitalizeText(e.ingrediente)}</option>
                </select>
            </td>
            <td scope="row" title="Cantidad">
                <input 
                    type="number" 
                    name="quantity"
                    class="quantity form-control w-auto border-0 bg-transparent text-black text-center rounded-0" 
                    placeholder="0" 
                    step="any"
                    min="0.001"
                    max="999"
                    required
                    value="${e.cantidad}"
                    oninput="updateQuantity(this)"
                >
            </td>
            <td scope="row" title="Marca">
                <input 
                    type="text" 
                    name="trademark"
                    class="trademark form-control w-auto border-0 bg-transparent text-black-50 text-center rounded-0 shadow-none" 
                    placeholder="Marca" 
                    required
                    readonly
                    value="${capitalizeText(findIngredientData(dataIngredients, e.ingrediente, null).trademark)}"
                >
            </td>
            <td scope="row" title="Precio">
                <input 
                    type="number" 
                    name="price"
                    class="price recipe-list-input form-control w-auto border-0 bg-transparent text-black-50 text-center rounded-0 shadow-none" 
                    placeholder="0.00" 
                    required
                    readonly
                    value="${findIngredientData(dataIngredients, e.ingrediente, null).price}"
                >
            </td>
            <td scope="row" title="Costo">
                <input 
                    type="number" 
                    name="cost-value"
                    class="cost-value recipe-list-input form-control w-auto border-0 bg-transparent text-black-50 text-center rounded-0 shadow-none" 
                    readonly
                    placeholder="Costo"
                    value="${findIngredientData(dataIngredients, e.ingrediente, e.cantidad).cost_value}"
                >
            </td>
            <td scope="row" title="Unidad de medida">
                <input 
                    type="text" 
                    name="measurement-unit"
                    class="measurement-unit form-control w-auto border-0 bg-transparent text-black-50 text-center rounded-0 shadow-none fst-italic text-black-50" 
                    readonly
                    placeholder="Unidad de medida"
                    value="${capitalizeText(findIngredientData(dataIngredients, e.ingrediente, null).measurement_unit)}"
                    tabindex="-1"
                >
            </td>
            <td scope="row" title="Codigo">
                <input 
                    type="text" 
                    name="codigo" 
                    class="codigo form-control w-auto border-0 bg-transparent text-black-50 text-center rounded-0 shadow-none fst-italic text-black-50" 
                    placeholder="0" 
                    aria-label="Codigo" 
                    required
                    readonly
                    value="${e.codigo}"
                >
            </td>
        </tr>
    `
    })
    //onchange="this.closest('tr').querySelector('.measurement-unit').value=findIngredientData(this.value) "
    tableBody.innerHTML = tbodyContent + tableBody.innerHTML
    
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
    const measurementUnit = document.querySelector('#table tbody>tr:last-child>td:nth-child(4)>input')
    const ingredient =      document.querySelector('#table tbody>tr:last-child>td:nth-child(2) option')
    measurementUnit.value= findIngredientData(dataIngredients, ingredient.value, null).measurement_unit
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