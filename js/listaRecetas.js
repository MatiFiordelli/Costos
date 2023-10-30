import { capitalizeText, findIngredientData } from './index.js'
import templateTableRecipeTbodyContent from './templates/tableRecipeTbodyContentTemplate.js'


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

const addRowsToTable = async (data) => {
    window.tableBody = document.querySelector('#table tbody')
    const recipe = data.receta
    const config = 'list'
    let totalCost = 0

    let totalCostPromise = recipe.map(async (e)=>{
        const objRow = {
            ingredient: capitalizeText(e.ingrediente),
            quantity: e.cantidad,
            trademark: capitalizeText(findIngredientData(dataIngredients, e.ingrediente, e.cantidad).trademark),
            price: findIngredientData(dataIngredients, e.ingrediente, null).price,
            cost: findIngredientData(dataIngredients, e.ingrediente, e.cantidad).cost_value,
            measurement_unit: capitalizeText(findIngredientData(dataIngredients, e.ingrediente, e.cantidad).measurement_unit),
            _id: e.codigo
        }
        const template = await templateTableRecipeTbodyContent(config, objRow)
        tableBody.appendChild(template.content.cloneNode(true))
        totalCost += Number(objRow.cost)
    })

    Promise.all(totalCostPromise).then(()=>{
        document.querySelector('#total-cost').value = '$' + totalCost.toFixed(2)
    })
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