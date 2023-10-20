import { capitalizeText } from './index.js'

window.onload = () => {
    new bootstrap.Modal(document.querySelector('#recipe-modal')).show()
    window.form = document.querySelector('#form')
    window.dataIngredients = null
    window.tableBody = document.querySelector('#table tbody')

    fetch('https://costos-backend.vercel.app/ingredients')
    .then((res) => res.json())
    .then((data) => {
        dataIngredients = data
    })  

    const res = document.querySelector('#resolution').innerHTML = window.innerWidth +', '+window.innerHeight
}

const findIngredientData = (ingredient, quantity) => {
    let trademark = 'No encontrado'
    let price = 'No encontrado'
    let MU = 'No encontrado'
    let _id = 'No encontrado'
    let costValue = 'No encontrado'

    dataIngredients.some((e, i)=>{
        if(e.ingrediente.toLowerCase()===ingredient.toLowerCase()) {
            trademark = dataIngredients[i].marca
            price = dataIngredients[i].precio
            MU = dataIngredients[i].unidad_medida 
            _id = dataIngredients[i]._id
            costValue = (price * quantity).toFixed(2)
        }
    })
    return {
        trademark: trademark,
        price: price,
        measurement_unit: MU,
        _id: _id,
        cost_value: costValue
    }
}

const addRowsToTable = (data) => {
    const recipe = data.receta
    let tbodyContent = ''
    recipe.forEach((e)=>{
        tbodyContent += `        
        <tr>
            <td scope="row">
                <input 
                    type="text" 
                    name="ingredient"
                    title="Ingrediente"
                    class="ingredient recipe-list-input form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="Nombre del ingrediente" 
                    required
                    readonly
                    value="${capitalizeText(e.ingrediente)}"
                >
            </td>
            <td scope="row">
                <input 
                    name="trademark"
                    type="text" 
                    title="Marca"
                    class="trademark recipe-list-input form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="Marca" 
                    required
                    readonly
                    value="${capitalizeText(findIngredientData(e.ingrediente, e.cantidad).trademark)}"
                >
            </td>
            <td scope="row">
                <input 
                    name="quantity"
                    type="text" 
                    title="Cantidad"
                    class="quantity recipe-list-input form-control w-100 border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="0" 
                    required
                    readonly
                    value="${e.cantidad}"
                >
            </td>
            <td scope="row">
                <input 
                    name="price"
                    type="number" 
                    title="Precio"
                    class="price recipe-list-input form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="0.00" 
                    required
                    readonly
                    value="${findIngredientData(e.ingrediente, e.cantidad).price}"
                >
            </td>
            <td scope="row">
                <input 
                    name="cost_value"
                    type="text" 
                    title="Costo"
                    class="cost-value recipe-list-input form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    readonly
                    placeholder="Costo"
                    value="${findIngredientData(e.ingrediente, e.cantidad).cost_value}"
                >
            </td>
            <td scope="row">
                <input 
                    name="measurement_unit"
                    type="text" 
                    title="Unidad de medida"
                    class="measurement-unit recipe-list-input form-control w-100 border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    readonly
                    placeholder="Unidad de medida"
                    value="${capitalizeText(findIngredientData(e.ingrediente, e.cantidad).measurement_unit)}"
                >
            </td>
            <td scope="row">
                <input 
                    name="_id" 
                    type="text" 
                    title="Codigo"
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
    const lastModification = document.querySelector('#last-modification')
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
}

window.selectedRow = selectedRow