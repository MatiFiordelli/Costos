import { capitalizeText, findIngredientData } from './index.js'

let dataIngredients = {}
let matchValue = false
window.onload = () => {
    const todayDate = document.querySelector('#today-date')
    todayDate.value = new Date().toLocaleDateString()

    fetch('https://costos-backend.vercel.app/ingredients')
        .then((res) => res.json())
        .then((data) => {
            dataIngredients = data
            const lo = document.querySelector('#list-options-ingredient')
            while (lo.hasChildNodes()) {
                lo.removeChild(lo.firstChild)
            }

            data.map((e) => {
                let node = document.createElement('option')
                //let input = document.querySelector('#ingredient')
                node.value = capitalizeText(e.ingrediente)
                node.onclick = `input.value=${capitalizeText(e.ingrediente)}`
                lo.appendChild(node)
            })
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
        inputCostValue.value = inputPrice.value * e.target.value
        btnAddIngredient.disabled = false
    }else{
        inputCostValue.value = null
        btnAddIngredient.disabled = true
    }
}

const addRowToTable = (e) => {
    e.preventDefault()
    tableMainContainer.classList.add('d-flex')
    window.tableBody = document.querySelector('#table tbody')
    const btnSubmitRecipe = document.querySelector('#btn-submit-recipe')
    btnSubmitRecipe.disabled = false
    //onclick="removeRow(event); onEmptyingTable(event)"
  
    const tbodyContent = `
        <tr>
            <td>
                <button 
                    class="btn btn-dark btn-sm mx-auto"
                    onmouseup="removeRow(event, null, null); onEmptyingTable('addrecipe')"
                >
                    Eliminar
                </button>
            </td>
            <td scope="row" title="Ingrediente">
                <input 
                    type="text" 
                    name="ingredient"
                    class="ingredient form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="Nombre del ingrediente" 
                    required
                    readonly
                    value="${inputIngredient.value}"
                >
            </td>
            <td scope="row" title="Cantidad">
                <input 
                    type="text" 
                    name="quantity"
                    class="quantity form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="0" 
                    step="any"
                    min="0"
                    max="999"
                    required
                    readonly
                    value="${inputQuantity.value}"
                >
            </td>
            <td scope="row" title="Marca">
                <input 
                    name="trademark"
                    type="text" 
                    class="trademark form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="Marca" 
                    required
                    readonly
                    value="${capitalizeText(findIngredientData(dataIngredients, inputIngredient.value, null).trademark)}"
                >
            </td>
            <td scope="row" title="Precio">
                ${inputPrice.value}
            </td>
            <td scope="row" title="Costo">
                ${inputCostValue.value}
            </td>
            <td scope="row" title="Unidad de medida">
                ${capitalizeText(inputMU.value)}
            </td>
            <td scope="row" title="Codigo">
                <input 
                    type="text" 
                    name="_id" 
                    class="_id form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none " 
                    placeholder="0" 
                    aria-label="Codigo" 
                    required
                    readonly
                    value="${input_ID.value}"
                >
            </td>
        </tr>
    `
    tableBody.innerHTML += tbodyContent
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

        fetch('https://costos-backend.vercel.app/addrecipe/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(objRecipe)
        })
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