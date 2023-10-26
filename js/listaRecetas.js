import { capitalizeText, findIngredientData } from './index.js'

let dataIngredients = null
window.onload = () => {
    new bootstrap.Modal(document.querySelector('#recipe-modal')).show()
    window.form = document.querySelector('#form')

    fetch('https://costos-backend.vercel.app/ingredients')
    .then((res) => res.json())
    .then((data) => {
        dataIngredients = data
    })  

    const res = document.querySelector('#resolution').innerHTML = window.innerWidth +', '+window.innerHeight
}

const addRowsToTable = (data) => {
    window.tableBody = document.querySelector('#table tbody')
    const recipe = data.receta
    let tbodyContent = ''
    recipe.forEach((e)=>{
        tbodyContent += `        
        <tr>
            <td scope="row" title="Ingrediente">
                <input 
                    type="text" 
                    name="ingredient"
                    class="ingredient recipe-list-input form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="Nombre del ingrediente" 
                    required
                    readonly
                    value="${capitalizeText(e.ingrediente)}"
                >
            </td>
            <td scope="row" title="Cantidad">
                <input 
                    name="quantity"
                    type="text" 
                    class="quantity recipe-list-input form-control w-100 border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="0" 
                    required
                    readonly
                    value="${e.cantidad}"
                >
            </td>
            <td scope="row" title="Marca">
                <input 
                    name="trademark"
                    type="text" 
                    class="trademark recipe-list-input form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="Marca" 
                    required
                    readonly
                    value="${capitalizeText(findIngredientData(dataIngredients, e.ingrediente, e.cantidad).trademark)}"
                >
            </td>
            <td scope="row" title="Precio">
                <input 
                    name="price"
                    type="number" 
                    class="price recipe-list-input form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="0.00" 
                    required
                    readonly
                    value="${findIngredientData(dataIngredients, e.ingrediente, null).price}"
                >
            </td>
            <td scope="row" title="Costo">
                <input 
                    name="cost_value"
                    type="text" 
                    class="cost-value recipe-list-input form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    readonly
                    placeholder="Costo"
                    value="${findIngredientData(dataIngredients, e.ingrediente, e.cantidad).cost_value}"
                >
            </td>
            <td scope="row" title="Unidad de medida">
                <input 
                    name="measurement_unit"
                    type="text" 
                    class="measurement-unit recipe-list-input form-control w-100 border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    readonly
                    placeholder="Unidad de medida"
                    value="${capitalizeText(findIngredientData(dataIngredients, e.ingrediente, e.cantidad).measurement_unit)}"
                >
            </td>
            <td scope="row" title="Codigo">
                <input 
                    name="_id" 
                    type="text" 
                    class="_id recipe-list-input form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none " 
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
    
    tableBody.innerHTML = tbodyContent + tableBody.innerHTML

    const allCosts = document.querySelectorAll('.cost-value')
    const totalCost = Array.from(allCosts).reduce((accum, currentValue) => {
            return accum + Number(currentValue.value)
    }, 0)

    document.querySelector('#total-cost').value = '$' + totalCost.toFixed(2)
}

const selectedRow = (id) => { 
    const recipeNamme = document.querySelector('#recipe-name')
    const category = document.querySelector('#category')
    const lastModification = document.querySelector('#today-date')
    const autor = document.querySelector('#autor')

    fetch(`https://costos-backend.vercel.app/recipes/_id/${id}`)
    .then((res) => res.json())
    .then((data)=>{
        addRowsToTable(data[0])
        form.style.display = 'block'
        recipeNamme.value = capitalizeText(data[0].nombre)
        category.value = capitalizeText(data[0].categoria)
        lastModification.value = data[0].ultima_modificacion
        autor.value = capitalizeText(data[0].autor)
    })
    .catch((err)=>console.log(err))
}

window.selectedRow = selectedRow