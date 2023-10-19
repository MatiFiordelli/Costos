import { capitalizeText } from '../js/index.js'

window.onload = () => {
    new bootstrap.Modal(document.querySelector('#recipe-modal')).show()
    window.form = document.querySelector('#form')
    form.style.display = 'none'
    window.todayDate = document.querySelector('#today-date')
    todayDate.value = new Date().toLocaleDateString()
    window.recipeName = document.querySelector('#recipe-name')
    window.category = document.querySelector('#category')
    window.codigo = document.querySelector('#_id')
    window.dataIngredients = null
    window.tableMainContainer = document.querySelector('#table-main-container')
    window.tableBody = document.querySelector('#table tbody')

    fetch('https://costos-backend.vercel.app/ingredients')
    .then((res) => res.json())
    .then((data) => {
        dataIngredients = data
    })    
}

const findIngredientData = (ingredient) => {
    let MU = 'No encontrado'
    let _id = 'No encontrado'
    dataIngredients.some((e, i)=>{
        if(e.ingrediente.toLowerCase()===ingredient.toLowerCase()) {
            MU = dataIngredients[i].unidad_medida 
            _id = dataIngredients[i]._id
        }
    })
    return {
        measurement_unit: MU,
        codigo: _id
    }
}

const updateMeasurementUnitSelect = (e) => {
    const measurementUnit = e.closest('tr').querySelectorAll('.measurement-unit')[0]
    const ingredient = e.closest('tr').querySelectorAll('.ingredient')[0]
    const codigo = e.closest('tr').querySelectorAll('.codigo')[0]
    const ingredientData = findIngredientData(ingredient.value)
    
    measurementUnit.value = capitalizeText(ingredientData['measurement_unit'])
    codigo.value = ingredientData['codigo']
}

const addRowsToTable = (data) => {
    const recipe = data.receta
    let tbodyContent = ''
    recipe.forEach((e)=>{
        tbodyContent += `        
        <tr>
            <td>
                <button 
                    class="btn btn-dark btn-sm mx-auto"
                    onmouseup="removeRow(event, null, null); onEmptyingTable('modifyrecipe')"
                >
                    Eliminar
                </button>
            </td>
            <td scope="row">
                <select 
                    name="ingredient"
                    title="Ingrediente"
                    class="ingredient select-ingredient form-select form-select-sm w-100 border-0 bg-transparent text-black text-center rounded-0" 
                    aria-label="Nombre del ingrediente"
                    placeholder="Elija el ingrediente" 
                    required
                    data-ingredient="${capitalizeText(e.ingrediente)}"
                    onchange="updateMeasurementUnitSelect(this)"
                > 
                    <option value="${capitalizeText(e.ingrediente)}">${capitalizeText(e.ingrediente)}</option>
                </select>
            </td>
            <td scope="row">
                <input 
                    type="number" 
                    name="quantity"
                    title="Cantidad"
                    class="quantity form-control w-100 border-0 bg-transparent text-black text-center rounded-0" 
                    placeholder="0" 
                    step="any"
                    min="0"
                    max="999"
                    required
                    value="${e.cantidad}"
                >
            </td>
            <td scope="row">
                <input 
                    type="text" 
                    title="Unidad de medida"
                    class="measurement-unit form-control w-100 border-0 bg-transparent text-black text-center rounded-0 shadow-none fst-italic text-black-50" 
                    readonly
                    placeholder="Unidad de medida"
                    value="${capitalizeText(findIngredientData(e.ingrediente)['measurement_unit'])}"
                    tabindex="-1"
                >
            </td>
            <td scope="row">
                <input 
                    type="text" 
                    name="codigo" 
                    title="Codigo"
                    class="codigo form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none fst-italic text-black-50" 
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
        recipeName.value = data[0].nombre
        category.value = data[0].categoria
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
}

const addNewIngredient = () => {
    const lastRow = document.querySelector('#table tbody>tr:last-child')
    tableBody.appendChild(lastRow.cloneNode(true))
    const measurementUnit = document.querySelector('#table tbody>tr:last-child>td:nth-child(4)>input')
    const ingredient =      document.querySelector('#table tbody>tr:last-child>td:nth-child(2) option')
    measurementUnit.value= findIngredientData(ingredient.value)['measurement_unit']
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

        fetch('http://localhost:3001/updaterecipe/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(objRecipe)
        })
        .then(()=>{
            console.log('receta enviada')        
        })
        .catch((err)=>console.log(err))
        
        window.location.reload()
    }else{
        alert('Completar todos los campos correctamente')
    }
}

window.selectedRow = selectedRow
window.addNewIngredient = addNewIngredient
window.onsubmitModifiedRecipe = onsubmitModifiedRecipe
window.findIngredientData = findIngredientData
window.updateMeasurementUnitSelect = updateMeasurementUnitSelect