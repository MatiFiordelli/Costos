import { capitalizeText } from './index.js'

window.onload = () => {
    window.rowsObj = []
}

const onInputEnableBtn = () => {
    const btnSubmitIngredient = document.querySelector('#btn-submit-ingredients')
    btnSubmitIngredient.disabled = false
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
    const existId = rowsObj.findIndex((p)=>p._id === id)

    const obj = {
        ingrediente: ingredient[rowNumber].value,
        marca: trademark[rowNumber].value,
        precio: price[rowNumber].value,
        unidad_medida: measurementUnit[rowNumber].value,
        categoria: category[rowNumber].value,
        ultima_modificacion: todayDate[rowNumber].value,
        autor: autor[rowNumber].innerHTML.trim(),
        _id: _id[rowNumber].innerHTML.trim(),
    }

    if(existId === -1){
        rowsObj.push(obj)
    }else{
        rowsObj[existId] = obj
    }
}

const onsubmitModifiedIngredients = () => {
    if(form.checkValidity()){
        fetch('http://localhost:3001/updateingredients/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rowsObj)
        })
        .then(()=>{
            console.log('Ingredientes enviados')  
        })
        .catch((err)=>{ console.log(err) })

        window.location.reload()
    } else{
        alert('Completar todos los campos correctamente')
    }
}

window.onChangeValue = onChangeValue
window.onsubmitModifiedIngredients = onsubmitModifiedIngredients
window.onInputEnableBtn = onInputEnableBtn