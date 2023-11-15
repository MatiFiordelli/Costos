import { capitalizeText } from './index.js'
import { postData } from './services/fetchData.js'

window.onload = () => {
    const todayDate = document.querySelector('#today-date')
    todayDate.value = new Date().toLocaleDateString()
    const autor = document.querySelector('#autor')
    let user = sessionStorage.getItem('user-name')
    !user && (user='Visitante')
    autor.value = capitalizeText(user)
}

const onsubmitNewIngredient = async() => {
    const form = document.querySelector('#form')
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
        
        postData('addingredient/', objRecipe)
        .then((res)=>{
            if(!res){
                alert('Ingrediente agregado')
                window.location.reload()
            }
        })
        .catch((err)=>console.log(err))

    }else{
        alert('Completar todos los campos correctamente')
    }
}

window.onsubmitNewIngredient = onsubmitNewIngredient