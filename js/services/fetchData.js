export async function fetchData(collectionName){
    return fetch(`https://costos-backend.vercel.app/${collectionName}`, {
    //return fetch(`http://localhost:3001/${collectionName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    .then((res)=>{
        return res.json()
    })
    .catch((e)=>{
        let c = confirm('Ocurrió un error al intentar obtener los datos. Desea reintentar?')
        c ? location.reload() : location.assign('/')
    
    })
}

export async function postData(url, obj){
    return fetch(`https://costos-backend.vercel.app/${url}`, {
    //return fetch(`http://localhost:3001/${url}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((err)=>{
        if(err.message!== 'OK'){
            alert(err.message)
            return true
        }
        return false
    })    
}

export const search = async(queryType, query, page, amount) => {
    const queryAllIngredients = `
    {
        allIngredients(page: ${page}, amount: ${amount}){
            ingredient
            trademark
            price
            measurement_unit
            category
            last_modification
            autor
            _id
        }
    }`

    const queryAllRecipes = `
    {
        allRecipes(page: ${page}, amount: ${amount}){
            name
        }
    }`

    const queryIngredients = `
    {
        findIngredients(name: "${query}", page: ${page}, amount: ${amount}){
            ingredient
            trademark
            price
            measurement_unit
            category
            last_modification
            autor
            _id
        }
    }`

    const queryRecipes = `
    {
        findRecipes(name: "${query}", page: ${page}, amount: ${amount}){
            name
            category
            last_modification
            autor
            _id
        }
    }`
    
    return fetch('http://localhost:4000/graphql',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
            query: queryType==='Ingredientes' 
                        ? queryIngredients
                        : queryRecipes
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(queryType==='Ingredientes') return {data: data.data.findIngredients, fieldsAmount: 8}
        if(queryType==='Recetas' ) return {data: data.data.findRecipes, fieldsAmount: 5}
    })
    .catch(()=>alert('Ocurrio un error al intentar obtener los datos, intentelo de nuevo mas tarde'))
}
