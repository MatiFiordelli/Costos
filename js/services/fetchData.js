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