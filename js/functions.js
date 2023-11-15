const fetchToDelete = async (url, _id) => {
    return fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
        body: JSON.stringify({ '_id': _id })
    })
    .then((res)=>res.json())
    .then((err)=>{
        if(err.message!== 'OK'){
            alert(err.message)
            return true
        }
        alert('Registro eliminado exitosamente')
        return false
    })
}

async function removeRow(e, origin, _id) {
    let i = e.target.closest('tr').rowIndex
    const t = e.target.closest('table')

    const c = confirm('Esta realmente seguro que desea eliminar esta fila?')
    if (c) {

        if (origin === 'recipe') {
            const url = 'https://costos-backend.vercel.app/deleterecipe/'
            //const url = 'http://localhost:3001/deleterecipe/'
            !(await fetchToDelete(url, _id)) && t.deleteRow(i)
        }
        if (origin === 'ingredient') {
            const url = 'https://costos-backend.vercel.app/deleteingredient/'
            //const url = 'http://localhost:3001/deleteingredient/'
            !(await fetchToDelete(url, _id)) && t.deleteRow(i)
        }
        if(origin === 'function in modificaReceta') {
            const thisIsTheFunction_onInputEnableBtn = _id
            thisIsTheFunction_onInputEnableBtn()
            t.deleteRow(i)
        }
        if (origin === null) {
            t.deleteRow(i)
        }
    }
}

const onEmptyingTable = (origin) => {
    if(tableBody.childElementCount === 0){
        tableMainContainer.classList.remove('d-flex')
        
        if(origin==='modifyrecipe') {
            tableMainContainer.classList.add('d-none')
            window.location.reload()
        }
    }
}

window.removeRow = removeRow
window.onEmptyingTable = onEmptyingTable
