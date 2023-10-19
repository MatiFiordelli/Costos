import { capitalizeText } from './index.js'

//let fetchedData = {}
window.onload = () => {
    const todayDate = document.querySelector('#today-date')
    todayDate.value = new Date().toLocaleDateString()
    const autor = document.querySelector('#autor')
    autor.value = capitalizeText('matias')
    window.form = document.querySelector('#form')
}

const onsubmitNewIngredient = () => {
    if(form.checkValidity()){
        const ingredient = document.querySelector('#ingredient')
        const trademark = document.querySelector('#trademark')
        const price = document.querySelector('#price')
        const measurementUnit = document.querySelector('#measurement-unit')
        const category = document.querySelector('#category')
        const todayDate = document.querySelector('#today-date')
        const autor = document.querySelector('#autor')

        const objRecipe = {
            ingrediente: ingredient.value,
            marca: trademark.value,
            precio: price.value,
            unidad_medida: measurementUnit.value,
            categoria: category.value,
            ultima_modificacion: todayDate.value,
            autor: autor.value
        }
        
        fetch('http://localhost:3001/addingredient/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(objRecipe)
        })
        .then(()=>{
            console.log('ingrediente enviado')
        })
        .catch((err)=>console.log(err))

        window.location.reload()
    }else{
        alert('Completar todos los campos correctamente')
    }
}

window.onsubmitNewIngredient = onsubmitNewIngredient