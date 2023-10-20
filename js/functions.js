const fetchToDelete = async (url, _id) => {
    try {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ '_id': _id })
        })
        return true
    } catch (err) {
        return console.log(err)
    }
}

async function removeRow(e, origin, _id) {
    let i = e.target.closest('tr').rowIndex
    const t = e.target.closest('table')

    const c = confirm('Esta realmente seguro que desea eliminar esta fila?')
    if (c) {

        if (origin === 'recipe') {
            const url = 'https://costos-backend.vercel.app/deleterecipe/'
            await fetchToDelete(url, _id) 
                ? t.deleteRow(i)
                : alert('Ocurrió un error, no se pudo eliminar el producto')
        }
        if (origin === 'ingredient') {
            const url = 'https://costos-backend.vercel.app/deleteingredient/'
            await fetchToDelete(url, _id) 
                ? t.deleteRow(i)
                : alert('Ocurrió un error, no se pudo eliminar el producto')
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
