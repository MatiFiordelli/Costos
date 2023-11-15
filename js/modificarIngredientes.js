import { postData } from './services/fetchData.js'

window.onload = () => {
    window.objIngredient = []
}

const onInputEnableBtn = () => {
    const btnSubmitIngredient = document.querySelector('#btn-submit-ingredients')
    if(btnSubmitIngredient.disabled) btnSubmitIngredient.disabled = false
}

const onChangeValue = (rowNumber) => {
    const ingredient = document.querySelectorAll('.ingredient')
    const trademark = document.querySelectorAll('.trademark')
    const price = document.querySelectorAll('.price')
    const measurementUnit = document.querySelectorAll('.measurement_unit')
    const category = document.querySelectorAll('.category')
    const todayDate = document.querySelectorAll('.today_date')
    const autor = document.querySelectorAll('.autor')
    const _id = document.querySelectorAll('._id')

    const id = _id[rowNumber].innerHTML.trim()
    const existId = objIngredient.findIndex((p)=>p._id === id)

    const obj = {
        ingrediente: ingredient[rowNumber].value,
        marca: trademark[rowNumber].value,
        precio: price[rowNumber].value,
        unidad_medida: measurementUnit[rowNumber].value,
        categoria: category[rowNumber].value,
        ultima_modificacion: new Date().toLocaleDateString(),
        autor: autor[rowNumber].innerHTML.trim(),
        _id: _id[rowNumber].innerHTML.trim(),
    }

    if(existId === -1){
        objIngredient.push(obj)
    }else{
        objIngredient[existId] = obj
    }
}

const onsubmitModifiedIngredients = () => {
    if(form.checkValidity()){
        postData('updateingredients/', objIngredient)
        .then((res)=>{
            if(!res){
                alert('Ingredientes modificados')  
                window.location.reload()
            }
        })
        .catch((err)=>{ console.log(err) })

    } else{
        alert('Completar todos los campos correctamente')
    }
}

window.onChangeValue = onChangeValue
window.onsubmitModifiedIngredients = onsubmitModifiedIngredients
window.onInputEnableBtn = onInputEnableBtn